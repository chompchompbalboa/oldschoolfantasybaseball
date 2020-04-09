//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState } from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftRosterBatting from '@/bundles/Draft/DraftRosterBatting'
import DraftRosterPitching from '@/bundles/Draft/DraftRosterPitching'
import DraftRosterChooseVisibleRoster from '@/bundles/Draft/DraftRosterChooseVisibleRoster'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoster = ({
  draftId,
  teamId
}: IDraftRoster) => {

  const [ visibleTeamId, setVisibleTeamId ] = useState(teamId)

  return (
    <Container>
      <DraftRosterChooseVisibleRoster
        draftId={draftId}
        setVisibleTeamId={setVisibleTeamId}
        visibleTeamId={visibleTeamId}
        usersTeamId={teamId}/>
      <DraftRosterBatting
        draftId={draftId}
        teamId={visibleTeamId}
        isUsersTeam={visibleTeamId === teamId}/>
      <DraftRosterPitching
        draftId={draftId}
        teamId={visibleTeamId}
        isUsersTeam={visibleTeamId === teamId}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoster {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  width: 50vw;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
`

export default DraftRoster
