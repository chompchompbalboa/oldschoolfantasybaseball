//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const Input = ({ 
  className,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  value 
}: IInput) => (
  <StyledInput
    className={className}
    onBlur={onBlur}
    onChange={e => onChange(e.target.value)}
    onFocus={onFocus}
    placeholder={placeholder}
    value={value}/>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IInput {
  className?: string // Required by styled components
  onBlur?(): void
  onChange(nextInputValue: string): void
  onFocus?(): void
  placeholder?: string
  value: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 0.25rem;
`

export default Input
