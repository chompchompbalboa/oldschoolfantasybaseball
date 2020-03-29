//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomContentChoice = ({
  children,
  isActive,
  onClick = () => null
}: IDraftRoomContentChoice) => {

  return (
    <Container
      isActive={isActive}
      onClick={onClick}>
      {children}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomContentChoice {
  children?: any
  isActive: boolean
  onClick?(...args: any): void
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  cursor: pointer;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ ({ isActive }: IContainer ) => isActive ? 'rgb(240, 240, 240)' : 'transparent' };
  font-weight: ${ ({ isActive }: IContainer ) => isActive ? 'bold' : 'inherit' };
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`
interface IContainer {
  isActive: boolean
}

export default DraftRoomContentChoice
