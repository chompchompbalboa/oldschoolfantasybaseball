//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
import { 
  IStatsActions,
  SET_ALL_BATTING_STATS,
  SET_ALL_PITCHING_STATS
} from '@/state/stats/actions'

import { 
  IAllBattingStats,
  IAllPitchingStats
} from '@/state/stats/types'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
export type IStatsState = {
  allBattingStats: IAllBattingStats,
  allPitchingStats: IAllPitchingStats
}

export const initialDraftState: IStatsState = {
  allBattingStats: {},
  allPitchingStats: {}
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
export const userReducer = (state = initialDraftState, action: IStatsActions): IStatsState => {
	switch (action.type) {

    case SET_ALL_BATTING_STATS: {
      const { nextAllBattingStats } = action
      return {
        ...state,
        allBattingStats: nextAllBattingStats
      }
    }

    case SET_ALL_PITCHING_STATS: {
      const { nextAllPitchingStats } = action
      return {
        ...state,
        allPitchingStats: nextAllPitchingStats
      }
    }

		default:
			return state
	}
}

export default userReducer
