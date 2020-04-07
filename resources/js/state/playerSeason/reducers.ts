//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
import {
  IPlayerSeasonActions,
  SET_ALL_PLAYER_SEASONS_BATTING,
  SET_ALL_PLAYER_SEASONS_PITCHING,
  SET_PLAYER_SEASONS_BY_POSITION_BATTING,
  SET_PLAYER_SEASONS_BY_POSITION_PITCHING
} from '@/state/playerSeason/actions'

import { 
  IAllPlayerSeasonsBatting,
  IAllPlayerSeasonsPitching,
  IPlayerSeasonsByPositionBatting,
  IPlayerSeasonsByPositionPitching
} from '@/state/playerSeason/types'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
export interface IPlayerState {
  allPlayerSeasonsBatting: IAllPlayerSeasonsBatting
  playerSeasonsByPositionBatting: IPlayerSeasonsByPositionBatting
  allPlayerSeasonsPitching: IAllPlayerSeasonsPitching
  playerSeasonsByPositionPitching: IPlayerSeasonsByPositionPitching
}

export const initialDraftState: IPlayerState = {
  allPlayerSeasonsBatting: null,
  allPlayerSeasonsPitching: null,
  playerSeasonsByPositionBatting: null,
  playerSeasonsByPositionPitching: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
export const playerReducer = (state = initialDraftState, action: IPlayerSeasonActions): IPlayerState => {

  switch(action.type) {

    case SET_ALL_PLAYER_SEASONS_BATTING: {
      const { nextAllPlayerSeasonsBatting } = action
      return {
        ...state, 
        allPlayerSeasonsBatting: nextAllPlayerSeasonsBatting
      }
    }

    case SET_ALL_PLAYER_SEASONS_PITCHING: {
      const { nextAllPlayerSeasonsPitching } = action
      return {
        ...state, 
        allPlayerSeasonsPitching: nextAllPlayerSeasonsPitching
      }
    }

    case SET_PLAYER_SEASONS_BY_POSITION_BATTING: {
      const { nextPlayerSeasonsByPositionBatting } = action
      return {
        ...state, 
        playerSeasonsByPositionBatting: nextPlayerSeasonsByPositionBatting
      }
    }

    case SET_PLAYER_SEASONS_BY_POSITION_PITCHING: {
      const { nextPlayerSeasonsByPositionPitching } = action
      return {
        ...state, 
        playerSeasonsByPositionPitching: nextPlayerSeasonsByPositionPitching
      }
    }

    default:
      return state
  }
}

export default playerReducer
