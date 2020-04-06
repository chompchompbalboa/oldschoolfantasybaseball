//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftRosterBatting from '@/bundles/Draft/DraftRosterBatting'
import DraftRosterPitching from '@/bundles/Draft/DraftRosterPitching'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoster = ({
  draftId,
  teamId
}: IDraftRoster) => {

  return (
    <Container>
      <DraftRosterBatting
        draftId={draftId}
        teamId={teamId}/>
      <DraftRosterPitching
        draftId={draftId}
        teamId={teamId}/>
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
  width: 100vw;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
`

export default DraftRoster
