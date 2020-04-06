//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'

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
  
  if(!havePlayerSeasonsLoaded && !isPlayerSeasonsLoading) {
    setIsPlayerSeasonsLoading(true)
    query.getAllPlayerSeasons()
      .then(response => {
        const playerSeasons = response.data
        batch(() => {
          dispatch(setAllPlayerSeasonsBatting(playerSeasons.allPlayerSeasonsBatting))
          dispatch(setAllPlayerSeasonsPitching(playerSeasons.allPlayerSeasonsPitching))
          dispatch(setPlayerSeasonsByPositionBatting(playerSeasons.playerSeasonsByPositionBatting))
          dispatch(setPlayerSeasonsByPositionPitching(playerSeasons.playerSeasonsByPositionPitching))
        })
        setIsPlayerSeasonsLoading(false)
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