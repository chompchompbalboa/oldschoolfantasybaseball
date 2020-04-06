//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const Button = ({
  className,
  children,
  onClick
}: IButton) => (
  <Container
    className={className}
    onClick={onClick}>
    {children}
  </Container>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IButton {
  className?: string
  children?: any
  onClick(...args: any): void
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  cursor: pointer;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 3px;
`

export default Button
