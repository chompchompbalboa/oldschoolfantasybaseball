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
export const DraftRoomContent = ({
  draftId,
  activeContent
}: IDraftRoomContent) => {

  const components = {
    DRAFT_SETTINGS: DraftRoomSettings,
    DRAFT_TEAMS: DraftRoomTeams,
    DRAFT_PICKS: DraftRoomPicks
  }

  const ActiveContent = components[activeContent]

  return (
    <Container>
      <ActiveContent
        draftId={draftId}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomContent {
  draftId: IDraft['id']
  activeContent: IDraftRoomActiveContent
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftRoomContent
