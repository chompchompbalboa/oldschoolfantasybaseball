//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { useGetTeamStats } from '@/hooks/useGetTeamStats'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import Stats from '@/components/Stats'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftSoloHeaderDraftingBatting = ({
  draftId,
  teamId
}: IDraftSoloHeaderDraftingBatting) => {

  const {
    teamStatsBatting
  } = useGetTeamStats(draftId)

  return (
    <Container>
      <Stats
        stats={teamStatsBatting[teamId]}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftSoloHeaderDraftingBatting {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
`

export default DraftSoloHeaderDraftingBatting
