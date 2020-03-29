//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { combineReducers } from 'redux'
import draftReducer from '@/state/draft/reducers'
import statsReducer from '@/state/stats/reducers'
import teamReducer from '@/state/team/reducers'

//-----------------------------------------------------------------------------
// Combine Reducers
//-----------------------------------------------------------------------------
export const appReducer = combineReducers({
  draft: draftReducer,
  stats: statsReducer,
  team: teamReducer
})

export type IAppState = ReturnType<typeof appReducer>
