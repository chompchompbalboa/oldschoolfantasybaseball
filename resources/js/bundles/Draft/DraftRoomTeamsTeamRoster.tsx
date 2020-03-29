//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftRoomTeamsTeamRosterBatting from '@draft/DraftRoomTeamsTeamRosterBatting'
import DraftRoomTeamsTeamRosterPitching from '@draft/DraftRoomTeamsTeamRosterPitching'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsTeamRoster = ({
  draftId,
  teamId
}: IDraftRoomTeamsTeamRoster) => {

  return (
    <Container>
      <DraftRoomTeamsTeamRosterBatting
        draftId={draftId}
        teamId={teamId}/>
      <DraftRoomTeamsTeamRosterPitching
        draftId={draftId}
        teamId={teamId}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTeamsTeamRoster {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

export default DraftRoomTeamsTeamRoster
