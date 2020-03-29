//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'

import { IDraftRoomActiveContent } from '@draft/DraftRoom'

import  DraftRoomPicks from '@draft/DraftRoomPicks'
import  DraftRoomSettings from '@draft/DraftRoomSettings'
import  DraftRoomTeams from '@draft/DraftRoomTeams'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomActiveContent = ({
  draftId,
  activeContent
}: IDraftRoomActiveContentProps) => {

  return (
    <Container>
      <DraftRoomSettings
        draftId={draftId}
        isActiveContent={activeContent === 'DRAFT_SETTINGS'}/>
      <DraftRoomTeams
        draftId={draftId}
        isActiveContent={activeContent === 'DRAFT_TEAMS'}/>
      <DraftRoomPicks
        draftId={draftId}
        isActiveContent={activeContent === 'DRAFT_PICKS'}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomActiveContentProps {
  draftId: IDraft['id']
  activeContent: IDraftRoomActiveContent
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  height: calc(100vh - 3rem);
`

export default DraftRoomActiveContent
