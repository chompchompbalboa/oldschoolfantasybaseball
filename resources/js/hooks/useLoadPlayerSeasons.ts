//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useState, useEffect } from 'react'
import localForage from 'localforage'
import { useDispatch, useSelector } from 'react-redux'
import { orderBy } from 'lodash'

import { query } from '@/api'

import { IAppState } from '@/state'
import {
  IAllPlayerSeasonsBatting,
  IAllPlayerSeasonsPitching,
  IPlayerSeasonsByPositionBatting,
  IPlayerSeasonsByPositionPitching,
  IPlayerSeasonVersion,
  IPlayerSeasonBatting,
  IPlayerSeasonPitching,
  IPositionBatting,
  IPositionPitching
} from '@/state/playerSeason/types'

import { 
  setAllPlayerSeasonsBatting,
  setAllPlayerSeasonsPitching,
  setPlayerSeasonsByPositionBatting,
  setPlayerSeasonsByPositionPitching
} from '@/state/playerSeason/actions'

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
export const useLoadPlayerSeasons = (): IReturnValue => {

  // Redux
  const dispatch = useDispatch()
  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const allPlayerSeasonsPitching = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsPitching)
  const playerSeasonsByPositionBatting = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionBatting)
  const playerSeasonsByPositionPitching = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionPitching)

  // State
  const [ isPlayerSeasonsStoredLocally, setIsPlayerSeasonsStoredLocally ] = useState(true)
  const [ isPlayerSeasonsLoading, setIsPlayerSeasonsLoading ] = useState(false)

  // Override the default behavior and force the playerSeasons to be loaded from the backend if needed
  const forceLoadFromBackend = false

  // Have Player Seasons Loaded
  const havePlayerSeasonsLoaded = 
    allPlayerSeasonsBatting !== null && 
    allPlayerSeasonsPitching !== null && 
    playerSeasonsByPositionPitching !== null && 
    playerSeasonsByPositionBatting !== null

  // Attempt to get the player seasons from localForage
  useEffect(() => {
    localForage.getItem('playerSeasonsVersion')
      .then((localPlayerSeasonsVersion: IPlayerSeasonVersion) => {
        if(localPlayerSeasonsVersion) {
          query.getPlayerSeasonsVersion().then(response => {
            const currentPlayerSeasonsVersion = response.data
            if(localPlayerSeasonsVersion === currentPlayerSeasonsVersion) {
              localForage.getItem('allPlayerSeasonsBatting').then((localAllPlayerSeasonsBatting: IAllPlayerSeasonsBatting) => {
                localAllPlayerSeasonsBatting
                  ? dispatch(setAllPlayerSeasonsBatting(localAllPlayerSeasonsBatting))
                  : setIsPlayerSeasonsStoredLocally(false)
              })
              localForage.getItem('allPlayerSeasonsPitching').then((localAllPlayerSeasonsPitching: IAllPlayerSeasonsPitching) => {
                localAllPlayerSeasonsPitching
                  ? dispatch(setAllPlayerSeasonsPitching(localAllPlayerSeasonsPitching))
                  : setIsPlayerSeasonsStoredLocally(false)
              })
              localForage.getItem('playerSeasonsByPositionBatting').then((localPlayerSeasonsByPositionBatting: IPlayerSeasonsByPositionBatting) => {
                localPlayerSeasonsByPositionBatting
                  ? dispatch(setPlayerSeasonsByPositionBatting(localPlayerSeasonsByPositionBatting))
                  : setIsPlayerSeasonsStoredLocally(false)
              })
              localForage.getItem('playerSeasonsByPositionPitching').then((localPlayerSeasonsByPositionPitching: IPlayerSeasonsByPositionPitching) => {
                localPlayerSeasonsByPositionPitching
                  ? dispatch(setPlayerSeasonsByPositionPitching(localPlayerSeasonsByPositionPitching))
                  : setIsPlayerSeasonsStoredLocally(false)
              })
            }
            else {
              setIsPlayerSeasonsStoredLocally(false)
            }
          })
        }
        else {
          setIsPlayerSeasonsStoredLocally(false)
        }
      })
      .catch(() => {
        setIsPlayerSeasonsStoredLocally(false)
      })
  }, [])

  // When the player seasons have loaded, generate the tiers lists
  useEffect(() => {
    if(havePlayerSeasonsLoaded) {
      buildTiersLists()
      setIsPlayerSeasonsLoading(false)
    }
  }, [ havePlayerSeasonsLoaded ])

  // When conditions are met, trigger loading the player seasons from the backend
  useEffect(() => {
    if(
      (!havePlayerSeasonsLoaded && !isPlayerSeasonsStoredLocally && !isPlayerSeasonsLoading) ||
      forceLoadFromBackend
    ) {
      setIsPlayerSeasonsLoading(true)
      loadPlayerSeasonsFromBackend()
    }
  }, [ havePlayerSeasonsLoaded, isPlayerSeasonsLoading, isPlayerSeasonsStoredLocally ])

  // Load Player Seasons From Backend
  const loadPlayerSeasonsFromBackend = () => {
    query.getPlayerSeasonsVersion().then(response => {
      localForage.setItem('playerSeasonsVersion', response.data)
    })
    query.getAllPlayerSeasonsBatting().then(response => {
      const nextAllPlayerSeasonsBatting = response.data
      dispatch(setAllPlayerSeasonsBatting(nextAllPlayerSeasonsBatting))
      localForage.setItem('allPlayerSeasonsBatting', nextAllPlayerSeasonsBatting)
    })
    query.getAllPlayerSeasonsPitching().then(response => {
      const nextAllPlayerSeasonsPitching = response.data
      dispatch(setAllPlayerSeasonsPitching(nextAllPlayerSeasonsPitching))
      localForage.setItem('allPlayerSeasonsPitching', nextAllPlayerSeasonsPitching)
    })
    query.getPlayerSeasonsByPositionBatting().then(response => {
      const nextPlayerSeasonsByPositionBatting = response.data as IPlayerSeasonsByPositionBatting
      dispatch(setPlayerSeasonsByPositionBatting(nextPlayerSeasonsByPositionBatting))
      localForage.setItem('playerSeasonsByPositionBatting', nextPlayerSeasonsByPositionBatting)
    })
    query.getPlayerSeasonsByPositionPitching().then(response => {
      const nextPlayerSeasonsByPositionPitching = response.data
      dispatch(setPlayerSeasonsByPositionPitching(nextPlayerSeasonsByPositionPitching))
      localForage.setItem('playerSeasonsByPositionPitching', nextPlayerSeasonsByPositionPitching)
    })
  }

  const buildTiersLists = () => {
    buildTiersListsBatting()
    buildTiersListsPitching()
  }

  const buildTiersListsBatting = () => {
    const nextPlayerSeasonsByPositionBatting: IPlayerSeasonsByPositionBatting = {
      CATCHER: null,
      FIRST_BASEMAN: null,
      SECOND_BASEMAN: null,
      SHORTSTOP: null,
      THIRD_BASEMAN: null,
      OUTFIELD: null,
      DESIGNATED_HITTER: null
    }
    Object.keys(playerSeasonsByPositionBatting).forEach((position: IPositionBatting) => {
      nextPlayerSeasonsByPositionBatting[position] = orderBy(
        playerSeasonsByPositionBatting[position],
        [ playerSeasonId => getPlayerSeasonScoreBatting(playerSeasonId) ],
        [ 'desc' ]
      ).filter(playerSeasonId => allPlayerSeasonsBatting[playerSeasonId] !== undefined)
    })
    dispatch(setPlayerSeasonsByPositionBatting(nextPlayerSeasonsByPositionBatting))
  }

  const getPlayerSeasonScoreBatting = (playerSeasonId: IPlayerSeasonBatting['playerSeasonId']) => {
    const playerSeason = allPlayerSeasonsBatting[playerSeasonId]
    if(playerSeason) {
      const playerSeasonScore = 
        ((Number(playerSeason.stats.HR) * 2) + (Number(playerSeason.stats.SB) * 1.5) + Number(playerSeason.stats.RBI) + Number(playerSeason.stats.R)) *
        (1 + playerSeason.stats.AVG)
      return playerSeasonScore
    }
    return -1
  }

  const buildTiersListsPitching = () => {
    const nextPlayerSeasonsByPositionPitching: IPlayerSeasonsByPositionPitching = {
      STARTING_PITCHER: null,
      RELIEF_PITCHER: null
    }
    Object.keys(playerSeasonsByPositionPitching).forEach((position: IPositionPitching) => {
      nextPlayerSeasonsByPositionPitching[position] = orderBy(
        playerSeasonsByPositionPitching[position],
        [ playerSeasonId => getPlayerSeasonScorePitching(position, playerSeasonId) ],
        [ 'desc' ]
      ).filter(playerSeasonId => allPlayerSeasonsPitching[playerSeasonId] !== undefined)
    })
    dispatch(setPlayerSeasonsByPositionPitching(nextPlayerSeasonsByPositionPitching))
  }

  const getPlayerSeasonScorePitching = (position: IPositionPitching, playerSeasonId: IPlayerSeasonPitching['playerSeasonId']) => {
    const playerSeason = allPlayerSeasonsPitching[playerSeasonId]
    if(playerSeason) {
      if(position === 'STARTING_PITCHER') {
        const playerSeasonScore = 
          (Number(playerSeason.stats.SO) +
          Number(playerSeason.stats.W) * 5)
          /
          (Number(playerSeason.stats.ERA))
        return playerSeasonScore
      }
      if(position === 'RELIEF_PITCHER') {
        if(Number(playerSeason.stats.IPouts) < 375) {
          const playerSeasonScore = 
            (Number(playerSeason.stats.SO) +
            Number(playerSeason.stats.SV) * 3)
            /
            (Number(playerSeason.stats.ERA))
          return playerSeasonScore
        }
        return -1
      }
    }
    return -1
  }

  return {
    isPlayerSeasonsLoading,
    havePlayerSeasonsLoaded
  }
}

//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------
interface IReturnValue {
  isPlayerSeasonsLoading: boolean
  havePlayerSeasonsLoaded: boolean
}