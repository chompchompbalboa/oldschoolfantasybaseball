//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { query } from '@/api'

import { IAppState } from '@/state'
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

  const dispatch = useDispatch()
  const [ isPlayerSeasonsLoading, setIsPlayerSeasonsLoading ] = useState(false)
  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const allPlayerSeasonsPitching = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsPitching)
  const playerSeasonsByPositionBatting = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionBatting)
  const playerSeasonsByPositionPitching = useSelector((state: IAppState) => state.playerSeason.playerSeasonsByPositionPitching)

  const havePlayerSeasonsLoaded = 
    allPlayerSeasonsBatting !== null && 
    allPlayerSeasonsPitching !== null && 
    playerSeasonsByPositionPitching !== null && 
    playerSeasonsByPositionBatting !== null

  useEffect(() => {
    if(havePlayerSeasonsLoaded) {
      setIsPlayerSeasonsLoading(false)
    }
  }, [ havePlayerSeasonsLoaded ])
  
  if(!havePlayerSeasonsLoaded && !isPlayerSeasonsLoading) {
    setIsPlayerSeasonsLoading(true)
    query.getAllPlayerSeasonsBatting().then(response => {
        dispatch(setAllPlayerSeasonsBatting(response.data))
    })
    query.getAllPlayerSeasonsPitching().then(response => {
        dispatch(setAllPlayerSeasonsPitching(response.data))
    })
    query.getPlayerSeasonsByPositionBatting().then(response => {
        dispatch(setPlayerSeasonsByPositionBatting(response.data))
    })
    query.getPlayerSeasonsByPositionPitching().then(response => {
        dispatch(setPlayerSeasonsByPositionPitching(response.data))
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