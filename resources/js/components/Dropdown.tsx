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
  dropdownOptionsLength,
  isDropdownVisible,
  selectDropdownOption,
  setActiveDropdownOptionIndex
}: IDropdown) => {

  // Add event listeners when the dropdown is visible
  useEffect(() => {
    if(isDropdownVisible) {
      addEventListener('click', closeDropdownOnClickOutside)
      addEventListener('keydown', updateActiveDropdownOptionIndexOnKeydown)
    }
    else {
      removeEventListener('click', closeDropdownOnClickOutside)
      removeEventListener('keydown', updateActiveDropdownOptionIndexOnKeydown)
    }
    return () => {
      removeEventListener('click', closeDropdownOnClickOutside)
      removeEventListener('keydown', updateActiveDropdownOptionIndexOnKeydown)
    }
  }, [ activeDropdownOptionIndex, dropdownOptionsLength, isDropdownVisible ])

  // Update the activeDropdownIndex when dropdownOptionsLength is 0
  useEffect(() => {
    if(dropdownOptionsLength === 0 && activeDropdownOptionIndex !== 0) {
      setActiveDropdownOptionIndex(0)
    }
  }, [ activeDropdownOptionIndex, dropdownOptionsLength ])

  // Close Dropdown On Click Outside
  const closeDropdownOnClickOutside = (e: MouseEvent) => {
    if(containerRef && containerRef.current && !containerRef.current.contains(e.target as Node)) {
      closeDropdown()
    }
  }

  // Update Active Dropdown Option Index On Keydown
  const updateActiveDropdownOptionIndexOnKeydown = (e: KeyboardEvent) => {
    if(setActiveDropdownOptionIndex) {
      if(e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveDropdownOptionIndex(Math.max(0, activeDropdownOptionIndex - 1))
      }
      if(e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveDropdownOptionIndex(Math.min(dropdownOptionsLength - 1, activeDropdownOptionIndex + 1))
      }
    }
    if(selectDropdownOption && e.key === 'Enter') {
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
  dropdownOptionsLength?: number
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
  background-color: white;
`
interface IStyledDropdown {
  isDropdownVisible: boolean
}

export default Dropdown
