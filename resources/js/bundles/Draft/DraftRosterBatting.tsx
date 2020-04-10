//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { ReactElement } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { 
  IPlayerSeasonBatting,
  IPositionBatting
} from '@/state/playerSeason/types'
import { ITeam } from '@/state/team/types'

import { updateDraft } from '@/state/draft/actions'

import {
  allPositionsBatting,
  allPositionsBattingNames
} from '@/state/draft/defaults'

import DraftRosterGroup from '@/bundles/Draft/DraftRosterGroup'
import DraftRosterSpot from '@/bundles/Draft/DraftRosterSpot'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoster = ({
  draftId,
  teamId,
  isUsersTeam
}: IDraftRoster) => {

  // Redux
  const dispatch = useDispatch()
  const allDraftPicksBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].allDraftPicksBatting)
  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const draftPicksByTeamBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].draftPicksByTeamBatting)
  const draftRosterSpotsBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].rosterSpotsBatting)
  const playerSeasonsByPositionBatting = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionBatting)

  // Delete Draft Pick Batting
  const deleteDraftPickBatting = (
    position: IPositionBatting, 
    playerSeasonId: IPlayerSeasonBatting['playerSeasonId']
  ) => {

    const nextAllDraftPicksBatting: IDraft['allDraftPicksBatting'] = {}
    Object.keys(allDraftPicksBatting).forEach(currentPlayerSeasonId => {
      if(currentPlayerSeasonId !== playerSeasonId) {
        nextAllDraftPicksBatting[currentPlayerSeasonId] = allDraftPicksBatting[currentPlayerSeasonId]
      }
    })

    const nextDraftPicksByTeamBatting = {
      ...draftPicksByTeamBatting,
      [teamId]: {
        ...draftPicksByTeamBatting[teamId],
        [position]: draftPicksByTeamBatting[teamId][position].map(currentPlayerSeasonId => 
          currentPlayerSeasonId !== playerSeasonId
            ? currentPlayerSeasonId
            : null
        )
      }
    }
    dispatch(updateDraft(draftId, {
      allDraftPicksBatting: nextAllDraftPicksBatting,
      draftPicksByTeamBatting: nextDraftPicksByTeamBatting
    }))
  }

  // Make Draft Pick Batting
  const makeDraftPickBatting = (
    position: IPositionBatting, 
    positionIndex: number,
    playerSeasonBatting: IPlayerSeasonBatting
  ) => {
    dispatch(updateDraft(draftId, {
      allDraftPicksBatting: {
        ...allDraftPicksBatting,
        [playerSeasonBatting.playerSeasonId]: {
          teamId: teamId,
          playerSeasonId: playerSeasonBatting.playerSeasonId,
          position: position,
          positionIndex: positionIndex,
          timestamp: moment()
        }
      },
      draftPicksByTeamBatting: {
        ...draftPicksByTeamBatting,
        [teamId]: {
          ...draftPicksByTeamBatting[teamId],
          [position]: draftPicksByTeamBatting[teamId][position].map((playerSeasonId, index) => 
            index === positionIndex 
              ? playerSeasonBatting.playerSeasonId
              : playerSeasonId
          )
        }
      }
    }))
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
          draftPickId={draftPicksByTeamBatting[teamId][position][i]}
          deleteDraftPick={deleteDraftPickBatting}
          eligiblePlayerSeasons={
            playerSeasonsByPositionBatting[position].filter(playerSeasonId => 
              allDraftPicksBatting[playerSeasonId] === undefined
            )
          }
          isUsersTeam={isUsersTeam}
          makeDraftPick={makeDraftPickBatting}
          playerSeasons={allPlayerSeasonsBatting}
          position={position}
          positionNames={allPositionsBattingNames}
          positionIndex={i}/>
      )
    }
  })

  return (
    <DraftRosterGroup
      header={false}
      rosterSpots={rosterSpotsBatting}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoster {
  draftId: IDraft['id']
  teamId: ITeam['id']
  isUsersTeam: boolean
}

export default DraftRoster
