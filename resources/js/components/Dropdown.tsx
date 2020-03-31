//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const Dropdown = ({ 
  children,
  className,
  closeDropdown,
  isDropdownVisible
}: IDropdown) => {

  // Refs
  const dropdown = useRef(null)

  // Effects
  useEffect(() => {
    if(isDropdownVisible) {
      addEventListener('click', closeDropdownOnClickOutside)
    }
    else {
      removeEventListener('click', closeDropdownOnClickOutside)
    }
    return () => removeEventListener('click', closeDropdownOnClickOutside)
  }, [ isDropdownVisible ])

  // Close Dropdown On Click Outside
  const closeDropdownOnClickOutside = (e: MouseEvent) => {
    if(dropdown && dropdown.current && !dropdown.current.contains(e.target)) {
      closeDropdown()
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
  className?: string
  children?: any
  closeDropdown(): void
  isDropdownVisible: boolean
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
