//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftPicksList from '@/bundles/Draft/DraftPicksList'
import DraftStandings from '@/bundles/Draft/DraftStandings'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftOverview = ({
  draftId,
  teamId
}: IDraftOverview) => {

  return (
    <Container>
      <DraftStandings
        draftId={draftId}
        teamId={teamId}/>
      <DraftPicksList
        draftId={draftId}
        teamId={teamId}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftOverview {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: fixed;
  top: 4rem;
  left: 50vw;
  width: 50vw;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
`

export default DraftOverview
