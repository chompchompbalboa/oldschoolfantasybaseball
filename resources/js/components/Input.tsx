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
  readOnly = false,
  value 
}: IInput) => (
  <StyledInput
    className={className}
    cursor={readOnly ? 'default' : 'auto'}
    onBlur={onBlur}
    onChange={e => onChange(e.target.value)}
    onFocus={onFocus}
    placeholder={placeholder}
    readOnly={readOnly}
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
  readOnly?: boolean
  value: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledInput = styled.input`
  cursor: ${ ({ cursor }: IStyledInput ) => cursor };
  border: none;
  outline: none;
  padding: 0.25rem;
`
interface IStyledInput {
  cursor?: 'default' | 'auto'
}

export default Input
