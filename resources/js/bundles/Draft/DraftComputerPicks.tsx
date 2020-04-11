//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

import { useInterval } from '@/hooks'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { 
  IPlayerSeason,
  IPositionBatting,
  IPositionPitching
} from '@/state/playerSeason/types'
import { ITeam } from '@/state/team/types'

import {
  updateDraft
} from '@/state/draft/actions'

import {
  allPositionsBatting
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftComputerPicks = ({
  draftId,
  usersTeamId
}: IDraftComputerPicks) => {

  // Redux
  const dispatch = useDispatch()
  const allDraftPicksBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].allDraftPicksBatting)
  const allDraftPicksPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].allDraftPicksPitching)
  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const allPlayerSeasonsPitching = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsPitching)
  const draftDuration = useSelector((state: IAppState) => state.draft.allDrafts[draftId].duration)
  const draftDifficulty = useSelector((state: IAppState) => state.draft.allDrafts[draftId].difficulty)
  const draftPicksByTeamBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].draftPicksByTeamBatting)
  const draftPicksByTeamPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].draftPicksByTeamPitching)
  const draftTeams = useSelector((state: IAppState) => state.draft.allDrafts[draftId].teams)
  const draftRosterSpotsBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].rosterSpotsBatting)
  const draftRosterSpotsPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].rosterSpotsPitching)
  const isDraftPaused = useSelector((state: IAppState) => state.draft.allDrafts[draftId].isDraftPaused)
  const playerSeasonsByPositionBatting = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionBatting)
  const playerSeasonsByPositionPitching = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionPitching)

  const rosterSpots = {
    ...draftRosterSpotsBatting,
    ...draftRosterSpotsPitching
  }
  // State
  const [ draftPicks, setDraftPicks ] = useState(null as ILocalDraftPick[])
  const [ numberOfPicksMade, setNumberOfPicksMade ] = useState(0)

  // Determine how often picks need to be made
  const totalRosterSpotsBatting = Object.keys(draftRosterSpotsBatting).reduce((total, rosterSpot) => 
    total + draftRosterSpotsBatting[rosterSpot as IPositionBatting]
  , 0)
  const totalRosterSpotsPitching = Object.keys(draftRosterSpotsPitching).reduce((total, rosterSpot) => 
    total + draftRosterSpotsPitching[rosterSpot as IPositionPitching]
  , 0)
  const totalRosterSpotsPerTeam = totalRosterSpotsBatting + totalRosterSpotsPitching
  const totalPicksNeeded = (draftTeams.length - 1) * totalRosterSpotsPerTeam
  const pickInterval = _.random(0, (draftDuration / (totalPicksNeeded * 1.25)) * 1.25) * 1000

  // Build the array of picks that will need to be made
  useEffect(() => {
    if(draftPicks === null) {
      let draftPicksCount = 0
      let initialDraftPicks: ILocalDraftPick[] = []
      draftTeams.forEach(teamId => {
        if(teamId !== usersTeamId) {
          Object.keys(rosterSpots).forEach((position: IPositionBatting | IPositionPitching)  => {
            for(let i = 0; i < rosterSpots[position]; i++) {
              initialDraftPicks.push({
                id: draftPicksCount,
                teamId: teamId,
                position: position,
                positionIndex: i
              })
              draftPicksCount++
            }
          })
        }
      })
    setDraftPicks(initialDraftPicks)
    }
  }, [ draftPicks ])

  // Make the draft picks
  useInterval(() => {
    const nextNumberOfPicksMade = numberOfPicksMade + 1
    if(nextNumberOfPicksMade <= totalPicksNeeded && !isDraftPaused) {
      const draftPick = _.sample(draftPicks)
      const isBattingOrPitching = allPositionsBatting.includes(draftPick.position as IPositionBatting)
        ? 'BATTING'
        : 'PITCHING'
      if(isBattingOrPitching === 'BATTING') {
        const eligiblePlayerSeasonIds = playerSeasonsByPositionBatting[draftPick.position as IPositionBatting]
        let playerSeasonId: IPlayerSeason['playerSeasonId'] = null
        while(playerSeasonId === null) {
          const randomPlayerSeasonId = eligiblePlayerSeasonIds[(Math.random() * (eligiblePlayerSeasonIds.length / draftDifficulty)) | 0]
          if(allPlayerSeasonsBatting[randomPlayerSeasonId]) {
            playerSeasonId = randomPlayerSeasonId
          }
        }
        dispatch(updateDraft(draftId, {
          allDraftPicksBatting: {
            ...allDraftPicksBatting,
            [playerSeasonId]: {
              teamId: draftPick.teamId,
              playerSeasonId: playerSeasonId,
              position: draftPick.position as IPositionBatting,
              positionIndex: draftPick.positionIndex,
              timestamp: moment()
            }
          },
          draftPicksByTeamBatting: {
            ...draftPicksByTeamBatting,
            [draftPick.teamId]: {
              ...draftPicksByTeamBatting[draftPick.teamId],
              [draftPick.position]: draftPicksByTeamBatting[draftPick.teamId][draftPick.position as IPositionBatting].map((currentPlayerSeasonId, index) => 
                index === draftPick.positionIndex
                  ? playerSeasonId
                  : currentPlayerSeasonId
              )
            }
          }
        }))
      }
      else {
        const eligiblePlayerSeasonIds = playerSeasonsByPositionPitching[draftPick.position as IPositionPitching]
        let playerSeasonId: IPlayerSeason['playerSeasonId'] = null
        while(playerSeasonId === null) {
          const randomPlayerSeasonId = eligiblePlayerSeasonIds[(Math.random() * (eligiblePlayerSeasonIds.length / draftDifficulty)) | 0]
          if(allPlayerSeasonsPitching[randomPlayerSeasonId]) {
            playerSeasonId = randomPlayerSeasonId
          }
        }
        dispatch(updateDraft(draftId, {
          allDraftPicksPitching: {
            ...allDraftPicksPitching,
            [playerSeasonId]: {
              teamId: draftPick.teamId,
              playerSeasonId: playerSeasonId,
              position: draftPick.position as IPositionPitching,
              positionIndex: draftPick.positionIndex,
              timestamp: moment()
            }
          },
          draftPicksByTeamPitching: {
            ...draftPicksByTeamPitching,
            [draftPick.teamId]: {
              ...draftPicksByTeamPitching[draftPick.teamId],
              [draftPick.position]: draftPicksByTeamPitching[draftPick.teamId][draftPick.position as IPositionPitching].map((currentPlayerSeasonId, index) => 
                index === draftPick.positionIndex
                  ? playerSeasonId
                  : currentPlayerSeasonId
              )
            }
          }
        }))
      }
      setNumberOfPicksMade(numberOfPicksMade + 1)
      setDraftPicks(draftPicks.filter(currentDraftPick => currentDraftPick.id !== draftPick.id))
    }
  }, pickInterval)

  return <></>
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftComputerPicks {
  draftId: IDraft['id']
  usersTeamId: ITeam['id']
}

export interface ILocalDraftPick {
  id: number,
  teamId: ITeam['id'],
  position: IPositionBatting | IPositionPitching
  positionIndex: number
}

export default DraftComputerPicks
