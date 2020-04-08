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
export const DraftSoloHeaderDraftingPitching = ({
  draftId,
  teamId
}: IDraftSoloHeaderDraftingPitching) => {

  const {
    teamStatsPitching
  } = useGetTeamStats(draftId)

  return (
    <Container>
      <Stats
        stats={teamStatsPitching[teamId]}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftSoloHeaderDraftingPitching {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

export default DraftSoloHeaderDraftingPitching
