//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useState, useEffect } from 'react'
import localForage from 'localforage'
import { useDispatch, useSelector } from 'react-redux'

import { query } from '@/api'

import { IAppState } from '@/state'
import {
  IAllPlayerSeasonsBatting,
  IAllPlayerSeasonsPitching,
  IPlayerSeasonsByPositionBatting,
  IPlayerSeasonsByPositionPitching,
  IPlayerSeasonVersion
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

  // Override the default behavior and force the playerSeasons to be loaded from the backend
  const forceLoadFromBackend = false

  // Have Player Seasons Loaded
  const havePlayerSeasonsLoaded = 
    allPlayerSeasonsBatting !== null && 
    allPlayerSeasonsPitching !== null && 
    playerSeasonsByPositionPitching !== null && 
    playerSeasonsByPositionBatting !== null

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

  useEffect(() => {
    if(havePlayerSeasonsLoaded) {
      setIsPlayerSeasonsLoading(false)
    }
  }, [ havePlayerSeasonsLoaded ])

  useEffect(() => {
    if(
      (!havePlayerSeasonsLoaded && !isPlayerSeasonsStoredLocally && !isPlayerSeasonsLoading) ||
      forceLoadFromBackend
    ) {
      setIsPlayerSeasonsLoading(true)
      loadPlayerSeasonsFromBackend()
    }
  }, [ havePlayerSeasonsLoaded, isPlayerSeasonsLoading, isPlayerSeasonsStoredLocally ])

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
      const nextPlayerSeasonsByPositionBatting = response.data
        dispatch(setPlayerSeasonsByPositionBatting(nextPlayerSeasonsByPositionBatting))
        localForage.setItem('playerSeasonsByPositionBatting', nextPlayerSeasonsByPositionBatting)
    })
    query.getPlayerSeasonsByPositionPitching().then(response => {
      const nextPlayerSeasonsByPositionPitching = response.data
        dispatch(setPlayerSeasonsByPositionPitching(nextPlayerSeasonsByPositionPitching))
        localForage.setItem('playerSeasonsByPositionPitching', nextPlayerSeasonsByPositionPitching)
    })
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