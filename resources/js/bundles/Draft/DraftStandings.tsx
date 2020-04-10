//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import Standings from '@/components/Standings'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftStandings = ({
  draftId,
  teamId
}: IDraftStandings) => {

  return (
    <Container>
      <Standings
        draftId={draftId}
        teamId={teamId}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftStandings {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  padding-bottom: 1rem;
`

export default DraftStandings
