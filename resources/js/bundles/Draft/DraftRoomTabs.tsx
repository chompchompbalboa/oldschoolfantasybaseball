//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraftRoomActiveContent } from '@draft/DraftRoom'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTabs = ({
  activeContent,
  setActiveContent
}: IDraftRoomTabs) => {
  return (
    <Container>
      <Tab
        isActive={activeContent === 'DRAFT_SETTINGS'}
        onClick={() => setActiveContent('DRAFT_SETTINGS')}>
        Settings
      </Tab>
      <Tab
        isActive={activeContent === 'DRAFT_TEAMS'}
        onClick={() => setActiveContent('DRAFT_TEAMS')}>
        Teams
      </Tab>
      <Tab
        isActive={activeContent === 'DRAFT_PICKS'}
        onClick={() => setActiveContent('DRAFT_PICKS')}>
        Draft
      </Tab>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTabs {
  activeContent: IDraftRoomActiveContent
  setActiveContent(nextActiveContent: IDraftRoomActiveContent): void
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items; center;
`

const Tab = styled.div`
  cursor: pointer;
  width: 33%;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${ ({ isActive }: ITab ) => isActive ? 'bold' : 'inherit' };
`
interface ITab {
  isActive: boolean
}

export default DraftRoomTabs
