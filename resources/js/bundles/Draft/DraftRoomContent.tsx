//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomContent = ({
  children,
  contentChoices,
  isActiveContent
}: IDraftRoomContent) => {

  return (
    <Container
      isActiveContent={isActiveContent}>
      <DraftRoomContentChoices>
        {contentChoices}
      </DraftRoomContentChoices>
      <ActiveContent>
        {children}
      </ActiveContent>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomContent {
  children?: any
  contentChoices: React.ReactElement[]
  isActiveContent: boolean
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: ${ ({ isActiveContent }: IContainer ) => isActiveContent ? 'flex' : 'none' };
  height: 100%;
`
interface IContainer {
  isActiveContent: boolean
}

const DraftRoomContentChoices = styled.div`
  width: 20%;
  height: 100%;
  border-right: 1px solid black;
  overflow-y: scroll;
`

const ActiveContent = styled.div`
  width: 80%;
  height: 100%;
  overflow-y: scroll;
`

export default DraftRoomContent
