//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomContentTile = ({
  children,
  width = "10rem"
}: IDraftRoomContentTile) => {

  return (
    <Container
      containerWidth={width}>
      {children}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomContentTile {
  children?: any
  width?: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: ${ ({ containerWidth }: IContainer ) => containerWidth };
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`
interface IContainer {
  containerWidth: string
}

export default DraftRoomContentTile
