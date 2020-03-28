//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { combineReducers } from 'redux'
import draftReducer from '@/state/draft/reducers'
import statsReducer from '@/state/stats/reducers'

//-----------------------------------------------------------------------------
// Combine Reducers
//-----------------------------------------------------------------------------
export const appReducer = combineReducers({
  draft: draftReducer,
  stats: statsReducer
})

export type IAppState = ReturnType<typeof appReducer>
