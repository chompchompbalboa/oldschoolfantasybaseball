//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
import { 
  IAllPlayerSeasonsBatting,
  IAllPlayerSeasonsPitching,
  IPlayerSeasonsByPositionBatting,
  IPlayerSeasonsByPositionPitching
} from '@/state/playerSeason/types'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
export type IPlayerState = {
  allPlayerSeasonsBatting: IAllPlayerSeasonsBatting
  playerSeasonsByPositionBatting: IPlayerSeasonsByPositionBatting
  allPlayerSeasonsPitching: IAllPlayerSeasonsPitching
  playerSeasonsByPositionPitching: IPlayerSeasonsByPositionPitching
}

export const initialDraftState: IPlayerState = {
  allPlayerSeasonsBatting: initialData.allPlayerSeasonsBatting,
  allPlayerSeasonsPitching: initialData.allPlayerSeasonsPitching,
  playerSeasonsByPositionBatting: initialData.playerSeasonsByPositionBatting,
  playerSeasonsByPositionPitching: initialData.playerSeasonsByPositionPitching
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
export const playerReducer = (state = initialDraftState): IPlayerState => {
  return state
}

export default playerReducer
