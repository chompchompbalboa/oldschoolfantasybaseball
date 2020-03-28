//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { 
  IAllBattingStats,
  IAllPitchingStats
} from '@/state/stats/types'

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export type IDraftActions = 
  ISetAllBattingStats |
  ISetAllPitchingStats

//-----------------------------------------------------------------------------
// Set All Batting Stats
//-----------------------------------------------------------------------------
export const SET_ALL_BATTING_STATS = 'SET_ALL_BATTING_STATS'
interface ISetAllBattingStats {
  type: typeof SET_ALL_BATTING_STATS
  nextAllBattingStats: IAllBattingStats
}

export const setAllBattingStats = (nextAllBattingStats: IAllBattingStats): IDraftActions => {
	return {
		type: SET_ALL_BATTING_STATS,
		nextAllBattingStats
	}
}

//-----------------------------------------------------------------------------
// Set All Pitching Stats
//-----------------------------------------------------------------------------
export const SET_ALL_PITCHING_STATS = 'SET_ALL_PITCHING_STATS'
interface ISetAllPitchingStats {
  type: typeof SET_ALL_PITCHING_STATS
  nextAllPitchingStats: IAllPitchingStats
}

export const setAllPitchingStats = (nextAllPitchingStats: IAllPitchingStats): IDraftActions => {
	return {
		type: SET_ALL_PITCHING_STATS,
		nextAllPitchingStats
	}
}