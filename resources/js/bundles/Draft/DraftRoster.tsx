//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { 
  IPlayerSeasonBatting,
  IPlayerSeasonPitching,
  IPositionBatting,
  IPositionPitching
} from '@/state/playerSeason/types'
import { ITeam } from '@/state/team/types'

//import { updateDraft } from '@/state/draft/actions'
//import { updateTeam } from '@/state/team/actions'

import {
  allPositionsBatting,
  allPositionsBattingNames,
  allPositionsPitching,
  allPositionsPitchingNames
} from '@/state/draft/defaults'

import DraftRosterGroup from '@/bundles/Draft/DraftRosterGroup'
import DraftRosterSpot from '@/bundles/Draft/DraftRosterSpot'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoster = ({
  draftId,
  teamId
}: IDraftRoster) => {

  // Redux
  const dispatch = useDispatch()
  false && console.log(dispatch)
  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const allPlayerSeasonsPitching = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsPitching)
  const draftRosterSpotsBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].rosterSpotsBatting)
  const draftRosterSpotsPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].rosterSpotsPitching)
  const playerSeasonsByPositionBatting = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionBatting)
  const playerSeasonsByPositionPitching = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionPitching)

  // Make Draft Pick Batting
  const makeDraftPickBatting = (
    position: IPositionBatting, 
    rosterSpotIndex: number,
    playerSeasonBatting: IPlayerSeasonBatting
  ) => {
  }

  // Make Draft Pick Pitching
  const makeDraftPickPitching = (
    position: IPositionPitching, 
    rosterSpotIndex: number,
    playerSeasonPitching: IPlayerSeasonPitching
  ) => {
  }

  // Roster Spots Batting
  const rosterSpotsBatting: ReactElement[] = []
  allPositionsBatting.forEach(position => {
    const rosterSpotCount = draftRosterSpotsBatting[position]
    for(let i = 0; i < rosterSpotCount; i++) {
      rosterSpotsBatting.push(
        <DraftRosterSpot
          key={position + i}
          draftId={draftId}
          eligiblePlayerSeasons={playerSeasonsByPositionBatting[position]}
          makeDraftPick={makeDraftPickBatting}
          playerSeasons={allPlayerSeasonsBatting}
          position={position}
          positionNames={allPositionsBattingNames}
          rosterSpotIndex={i}/>
      )
    }
  })

  // Roster Spots Pitching
  const rosterSpotsPitching: ReactElement[] = []
  allPositionsPitching.forEach(position => {
    const rosterSpotCount = draftRosterSpotsPitching[position]
    for(let i = 0; i < rosterSpotCount; i++) {
      rosterSpotsPitching.push(
        <DraftRosterSpot
          key={position + i}
          draftId={draftId}
          eligiblePlayerSeasons={playerSeasonsByPositionPitching[position]}
          makeDraftPick={makeDraftPickPitching}
          playerSeasons={allPlayerSeasonsPitching}
          position={position}
          positionNames={allPositionsPitchingNames}
          rosterSpotIndex={i}/>
      )
    }
  })

  return (
    <Container>
      <DraftRosterGroup
        header="Batting"
        rosterSpots={rosterSpotsBatting}/>
      <DraftRosterGroup
        header="Pitching"
        rosterSpots={rosterSpotsPitching}/>
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
  position: relative;
  top: 4rem;
`

export default DraftRoster
