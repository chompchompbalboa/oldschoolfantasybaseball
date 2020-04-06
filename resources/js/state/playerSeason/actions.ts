//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { 
  IAllPlayerSeasonsBatting,
  IAllPlayerSeasonsPitching,
  IPlayerSeasonsByPositionBatting,
  IPlayerSeasonsByPositionPitching
} from '@/state/playerSeason/types'

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export type IPlayerSeasonActions = 
  ISetAllPlayerSeasonsBatting |
  ISetAllPlayerSeasonsPitching |
  ISetPlayerSeasonsByPositionBatting |
  ISetPlayerSeasonsByPositionPitching 

//-----------------------------------------------------------------------------
// Set All Player Seasons Batting
//-----------------------------------------------------------------------------
export const SET_ALL_PLAYER_SEASONS_BATTING = 'SET_ALL_PLAYER_SEASONS_BATTING'
interface ISetAllPlayerSeasonsBatting {
  type: typeof SET_ALL_PLAYER_SEASONS_BATTING
  nextAllPlayerSeasonsBatting: IAllPlayerSeasonsBatting
}

export const setAllPlayerSeasonsBatting = (nextAllPlayerSeasonsBatting: IAllPlayerSeasonsBatting): IPlayerSeasonActions => {
	return {
		type: SET_ALL_PLAYER_SEASONS_BATTING,
		nextAllPlayerSeasonsBatting
	}
}

//-----------------------------------------------------------------------------
// Set All Player Seasons Pitching
//-----------------------------------------------------------------------------
export const SET_ALL_PLAYER_SEASONS_PITCHING = 'SET_ALL_PLAYER_SEASONS_PITCHING'
interface ISetAllPlayerSeasonsPitching {
  type: typeof SET_ALL_PLAYER_SEASONS_PITCHING
  nextAllPlayerSeasonsPitching: IAllPlayerSeasonsPitching
}

export const setAllPlayerSeasonsPitching = (nextAllPlayerSeasonsPitching: IAllPlayerSeasonsPitching): IPlayerSeasonActions => {
	return {
		type: SET_ALL_PLAYER_SEASONS_PITCHING,
		nextAllPlayerSeasonsPitching
	}
}

//-----------------------------------------------------------------------------
// Set Player Seasons By Position Batting
//-----------------------------------------------------------------------------
export const SET_PLAYER_SEASONS_BY_POSITION_BATTING = 'SET_PLAYER_SEASONS_BY_POSITION_BATTING'
interface ISetPlayerSeasonsByPositionBatting {
  type: typeof SET_PLAYER_SEASONS_BY_POSITION_BATTING
  nextPlayerSeasonsByPositionBatting: IPlayerSeasonsByPositionBatting
}

export const setPlayerSeasonsByPositionBatting = (nextPlayerSeasonsByPositionBatting: IPlayerSeasonsByPositionBatting): IPlayerSeasonActions => {
	return {
		type: SET_PLAYER_SEASONS_BY_POSITION_BATTING,
		nextPlayerSeasonsByPositionBatting
	}
}

//-----------------------------------------------------------------------------
// Set Player Seasons By Position Pitching
//-----------------------------------------------------------------------------
export const SET_PLAYER_SEASONS_BY_POSITION_PITCHING = 'SET_PLAYER_SEASONS_BY_POSITION_PITCHING'
interface ISetPlayerSeasonsByPositionPitching {
  type: typeof SET_PLAYER_SEASONS_BY_POSITION_PITCHING
  nextPlayerSeasonsByPositionPitching: IPlayerSeasonsByPositionPitching
}

export const setPlayerSeasonsByPositionPitching = (nextPlayerSeasonsByPositionPitching: IPlayerSeasonsByPositionPitching): IPlayerSeasonActions => {
	return {
		type: SET_PLAYER_SEASONS_BY_POSITION_PITCHING,
		nextPlayerSeasonsByPositionPitching
	}
}