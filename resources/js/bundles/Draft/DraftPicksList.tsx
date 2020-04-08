//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import {
  allPositionsNames
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftPicksList = ({
  draftId,
  teamId
}: IDraftPicksList) => {

  const allDraftPicksBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].allDraftPicksBatting)
  const allDraftPicksPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].allDraftPicksPitching)
  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const allPlayerSeasonsPitching = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsPitching)
  const allTeams = useSelector((state: IAppState) => state.team.allTeams)

  const allDraftPicks = {
    ...allDraftPicksBatting,
    ...allDraftPicksPitching
  }

  const allPlayerSeasons = {
    ...allPlayerSeasonsBatting,
    ...allPlayerSeasonsPitching
  }

  const orderedDraftPicks = _.orderBy(allDraftPicks, [ 'timestamp' ], [ 'desc' ])

  return (
    <Container>
      {orderedDraftPicks.map(draftPick => {
        const team = allTeams[draftPick.teamId]
        const playerSeason = allPlayerSeasons[draftPick.playerSeasonId]
        return (
          <DraftPick
            key={playerSeason.playerSeasonId}>
            {team.name} drafted {playerSeason.name}'s {playerSeason.year} season at {allPositionsNames[draftPick.position]}-{draftPick.positionIndex + 1}
          </DraftPick>
        )
      }
      )}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftPicksList {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;
  height: calc(50vh - 2rem);
  overflow-y: scroll;
`

const DraftPick = styled.div``

export default DraftPicksList
