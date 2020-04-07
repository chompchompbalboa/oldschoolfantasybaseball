//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { 
  IPlayerSeasonPitching,
  IPositionPitching
} from '@/state/playerSeason/types'
import { ITeam } from '@/state/team/types'

import { updateDraft } from '@/state/draft/actions'

import {
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
  const allDraftPicksPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].allDraftPicksPitching)
  const allPlayerSeasonsPitching = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsPitching)
  const draftPicksByTeamPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].draftPicksByTeamPitching)
  const draftRosterSpotsPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].rosterSpotsPitching)
  const playerSeasonsByPositionPitching = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionPitching)

  const deleteDraftPickPitching = (
    position: IPositionPitching, 
    playerSeasonId: IPlayerSeasonPitching['playerSeasonId']
  ) => {

    const nextAllDraftPicksPitching: IDraft['allDraftPicksPitching'] = {}
    Object.keys(allDraftPicksPitching).forEach(currentPlayerSeasonId => {
      if(currentPlayerSeasonId !== playerSeasonId) {
        nextAllDraftPicksPitching[currentPlayerSeasonId] = allDraftPicksPitching[currentPlayerSeasonId]
      }
    })

    const nextDraftPicksByTeamPitching = {
      ...draftPicksByTeamPitching,
      [teamId]: {
        ...draftPicksByTeamPitching[teamId],
        [position]: draftPicksByTeamPitching[teamId][position].map(currentPlayerSeasonId => 
          currentPlayerSeasonId !== playerSeasonId
            ? currentPlayerSeasonId
            : null
        )
      }
    }
    dispatch(updateDraft(draftId, {
      allDraftPicksPitching: nextAllDraftPicksPitching,
      draftPicksByTeamPitching: nextDraftPicksByTeamPitching
    }))
  }

  // Make Draft Pick Pitching
  const makeDraftPickPitching = (
    position: IPositionPitching, 
    rosterSpotIndex: number,
    playerSeasonPitching: IPlayerSeasonPitching
  ) => {
    dispatch(updateDraft(draftId, {
      allDraftPicksPitching: {
        ...allDraftPicksPitching,
        [playerSeasonPitching.playerSeasonId]: teamId
      },
      draftPicksByTeamPitching: {
        ...draftPicksByTeamPitching,
        [teamId]: {
          ...draftPicksByTeamPitching[teamId],
          [position]: draftPicksByTeamPitching[teamId][position].map((playerSeasonId, index) => 
            index === rosterSpotIndex 
              ? playerSeasonPitching.playerSeasonId
              : playerSeasonId
          )
        }
      }
    }))
  }

  // Roster Spots Pitching
  const rosterSpotsPitching: ReactElement[] = []
  allPositionsPitching.forEach(position => {
    const rosterSpotCount = draftRosterSpotsPitching[position]
    for(let i = 0; i < rosterSpotCount; i++) {
      rosterSpotsPitching.push(
        <DraftRosterSpot
          key={position + i}
          draftId={draftId}
          draftPickId={draftPicksByTeamPitching[teamId][position][i]}
          deleteDraftPick={deleteDraftPickPitching}
          eligiblePlayerSeasons={
            playerSeasonsByPositionPitching[position].filter(playerSeasonId => 
              allDraftPicksPitching[playerSeasonId] === undefined
            )
          }
          makeDraftPick={makeDraftPickPitching}
          playerSeasons={allPlayerSeasonsPitching}
          position={position}
          positionNames={allPositionsPitchingNames}
          rosterSpotIndex={i}/>
      )
    }
  })

  return (
    <DraftRosterGroup
      header="Pitching"
      rosterSpots={rosterSpotsPitching}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoster {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

export default DraftRoster
