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
  padding: 0.9rem;
  background-color: rgb(240, 240, 240);
  border-radius: 3px;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
`

export default Button
