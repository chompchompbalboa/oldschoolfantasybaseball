//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { RefObject, useEffect } from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const Dropdown = ({ 
  activeDropdownOptionIndex,
  children,
  className,
  containerRef,
  closeDropdown,
  dropdownOptions,
  isDropdownVisible,
  selectDropdownOption,
  setActiveDropdownOptionIndex
}: IDropdown) => {

  // Add event listeners when the dropdown is visible
  useEffect(() => {
    if(isDropdownVisible) {
      addEventListener('click', closeDropdownOnClickOutside)
      addEventListener('keydown', handleDropdownKeydown)
    }
    else {
      removeEventListener('click', closeDropdownOnClickOutside)
      removeEventListener('keydown', handleDropdownKeydown)
    }
    return () => {
      removeEventListener('click', closeDropdownOnClickOutside)
      removeEventListener('keydown', handleDropdownKeydown)
    }
  }, [ 
    activeDropdownOptionIndex, 
    containerRef && containerRef.current, 
    dropdownOptions, 
    isDropdownVisible 
  ])

  // Update the activeDropdownIndex when dropdownOptionsLength is 0
  useEffect(() => {
    if(dropdownOptions.length === 0 && activeDropdownOptionIndex !== 0) {
      setActiveDropdownOptionIndex(0)
    }
  }, [ activeDropdownOptionIndex, dropdownOptions.length ])

  // Close Dropdown On Click Outside
  const closeDropdownOnClickOutside = (e: MouseEvent) => {
    if(containerRef && containerRef.current && !containerRef.current.contains(e.target as Node)) {
      closeDropdown()
    }
  }

  // Update Active Dropdown Option Index On Keydown
  const handleDropdownKeydown = (e: KeyboardEvent) => {
    // Close the dropdown when 'Escape' is pressed
    if(e.key === 'Escape') {
      closeDropdown()
    }
    // Update the active dropdown option index when 'ArrowUp' or 'ArrowDown' is pressed
    if(setActiveDropdownOptionIndex) {
      if(e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveDropdownOptionIndex(Math.max(0, activeDropdownOptionIndex - 1))
      }
      if(e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveDropdownOptionIndex(Math.min(dropdownOptions.length - 1, activeDropdownOptionIndex + 1))
      }
    }
    // Select the active dropdown option when 'Enter' or 'Tab' is pressed
    if(selectDropdownOption && ([ 'Enter', 'Tab' ].includes(e.key))) {
      selectDropdownOption()
    }
  }

  return (
    <StyledDropdown
      className={className}
      isDropdownVisible={isDropdownVisible}>
      {children}
    </StyledDropdown>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDropdown {
  activeDropdownOptionIndex?: number
  className?: string
  containerRef: RefObject<HTMLElement>
  children?: any
  closeDropdown(): void
  dropdownOptions?: any[]
  isDropdownVisible: boolean
  selectDropdownOption?(): void 
  setActiveDropdownOptionIndex?(nextActiveDropdownOptionIndex: number): void
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledDropdown = styled.div`
  z-index: 1000;
  position: relative;
  display: ${ ({ isDropdownVisible }: IStyledDropdown ) => isDropdownVisible ? 'block' : 'none' };
  top: 0;
  left: 0;
  width: 100%;
  max-height: 50vh;
  overflow-y: scroll;
  background-color: white;
  box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.25);
`
interface IStyledDropdown {
  isDropdownVisible: boolean
}

export default Dropdown
