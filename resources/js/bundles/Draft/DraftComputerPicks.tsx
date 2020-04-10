//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState } from 'react'
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

import {
  updateDraft
} from '@/state/draft/actions'

import {
  allPositionsBatting,
  allPositionsPitching
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftComputerPicks = ({
  draftId
}: IDraftComputerPicks) => {

  // Redux
  const dispatch = useDispatch()
  const allDraftPicksBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].allDraftPicksBatting)
  const allDraftPicksPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].allDraftPicksPitching)
  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const allPlayerSeasonsPitching = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsPitching)
  const draftDuration = useSelector((state: IAppState) => state.draft.allDrafts[draftId].duration)
  const draftPicksByTeamBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].draftPicksByTeamBatting)
  const draftPicksByTeamPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].draftPicksByTeamPitching)
  const draftTeams = useSelector((state: IAppState) => state.draft.allDrafts[draftId].teams)
  const draftRosterSpotsBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].rosterSpotsBatting)
  const draftRosterSpotsPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].rosterSpotsPitching)
  const isDraftPaused = useSelector((state: IAppState) => state.draft.allDrafts[draftId].isDraftPaused)
  const playerSeasonsByPositionBatting = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionBatting)
  const playerSeasonsByPositionPitching = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionPitching)

  // State
  const [ currentTeamId, setCurrentTeamId ] = useState(draftTeams[1])
  const [ currentTeamNumberOfPicksMade, setCurrentTeamNumberOfPicksMade ] = useState(0)
  const [ currentPosition, setCurrentPosition ] = useState(allPositionsBatting[0] as IPositionBatting | IPositionPitching)
  const [ currentPositionRosterSpots, setCurrentPositionRosterSpots ] = useState(draftRosterSpotsBatting[currentPosition as IPositionBatting])
  const [ currentPositionRosterSpotIndex, setCurrentPositionRosterSpotIndex ] = useState(0)
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

  useInterval(() => {
    const nextNumberOfPicksMade = numberOfPicksMade + 1
    if(nextNumberOfPicksMade <= totalPicksNeeded && !isDraftPaused) {
      const isBattingOrPitching = allPositionsBatting.includes(currentPosition as IPositionBatting)
        ? 'BATTING'
        : 'PITCHING'
      if(isBattingOrPitching === 'BATTING') {
        const eligiblePlayerSeasonIds = playerSeasonsByPositionBatting[currentPosition as IPositionBatting]
        let playerSeasonId: IPlayerSeason['playerSeasonId'] = null
        while(playerSeasonId === null) {
          const randomPlayerSeasonId = eligiblePlayerSeasonIds[(Math.random() * eligiblePlayerSeasonIds.length) | 0]
          if(allPlayerSeasonsBatting[randomPlayerSeasonId]) {
            playerSeasonId = randomPlayerSeasonId
          }
        }
        dispatch(updateDraft(draftId, {
          allDraftPicksBatting: {
            ...allDraftPicksBatting,
            [playerSeasonId]: {
              teamId: currentTeamId,
              playerSeasonId: playerSeasonId,
              position: currentPosition as IPositionBatting,
              positionIndex: currentPositionRosterSpotIndex,
              timestamp: moment()
            }
          },
          draftPicksByTeamBatting: {
            ...draftPicksByTeamBatting,
            [currentTeamId]: {
              ...draftPicksByTeamBatting[currentTeamId],
              [currentPosition]: draftPicksByTeamBatting[currentTeamId][currentPosition as IPositionBatting].map((currentPlayerSeasonId, index) => 
                index === currentPositionRosterSpotIndex
                  ? playerSeasonId
                  : currentPlayerSeasonId
              )
            }
          }
        }))
      }
      else {
        const eligiblePlayerSeasonIds = playerSeasonsByPositionPitching[currentPosition as IPositionPitching]
        let playerSeasonId: IPlayerSeason['playerSeasonId'] = null
        while(playerSeasonId === null) {
          const randomPlayerSeasonId = eligiblePlayerSeasonIds[(Math.random() * eligiblePlayerSeasonIds.length) | 0]
          if(allPlayerSeasonsPitching[randomPlayerSeasonId]) {
            playerSeasonId = randomPlayerSeasonId
          }
        }
        dispatch(updateDraft(draftId, {
          allDraftPicksPitching: {
            ...allDraftPicksPitching,
            [playerSeasonId]: {
              teamId: currentTeamId,
              playerSeasonId: playerSeasonId,
              position: currentPosition as IPositionPitching,
              positionIndex: currentPositionRosterSpotIndex,
              timestamp: moment()
            }
          },
          draftPicksByTeamPitching: {
            ...draftPicksByTeamPitching,
            [currentTeamId]: {
              ...draftPicksByTeamPitching[currentTeamId],
              [currentPosition]: draftPicksByTeamPitching[currentTeamId][currentPosition as IPositionPitching].map((currentPlayerSeasonId, index) => 
                index === currentPositionRosterSpotIndex
                  ? playerSeasonId
                  : currentPlayerSeasonId
              )
            }
          }
        }))

      }
      const positions = [
        ...allPositionsBatting, 
        ...allPositionsPitching
      ]
      const rosterSpots = {
        ...draftRosterSpotsBatting,
        ...draftRosterSpotsPitching
      }
      // Update currentTeamId
      const nextTeamIndex = draftTeams.indexOf(currentTeamId) + 1 === draftTeams.length 
        ? 1
        : draftTeams.indexOf(currentTeamId) + 1
      const nextTeamId = draftTeams[nextTeamIndex]

      setCurrentTeamId(nextTeamId)

      if(nextTeamIndex === 1) {
        const nextPositionsRosterSpotIndex  = currentPositionRosterSpotIndex + 1
        if(nextPositionsRosterSpotIndex === currentPositionRosterSpots) {
          const nextPositionIndex = positions.indexOf(currentPosition) + 1
          setCurrentPosition(positions[nextPositionIndex])
          setCurrentPositionRosterSpots(rosterSpots[positions[nextPositionIndex]])
          setCurrentPositionRosterSpotIndex(0)

        }
        else {
          setCurrentPositionRosterSpotIndex(nextPositionsRosterSpotIndex)
        }
      }

      // Update the number of picks made
      setCurrentTeamNumberOfPicksMade(currentTeamNumberOfPicksMade + 1)
      setNumberOfPicksMade(numberOfPicksMade + 1)
    }
  }, pickInterval)

  return <></>
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftComputerPicks {
  draftId: IDraft['id']
}

export default DraftComputerPicks
