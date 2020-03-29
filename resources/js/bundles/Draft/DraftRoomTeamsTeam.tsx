//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftRoomTeamsTeamRoster from '@draft/DraftRoomTeamsTeamRoster'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsTeam = ({
  draftId,
  teamId
}: IDraftRoomTeamsTeam) => {

  return (
    <Container>
      <DraftRoomTeamsTeamRoster
        draftId={draftId}
        teamId={teamId}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTeamsTeam {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftRoomTeamsTeam
