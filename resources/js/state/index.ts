//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { combineReducers } from 'redux'
import draftReducer from '@/state/draft/reducers'
import playerSeasonReducer from '@/state/playerSeason/reducers'
import teamReducer from '@/state/team/reducers'

//-----------------------------------------------------------------------------
// Combine Reducers
//-----------------------------------------------------------------------------
export const appReducer = combineReducers({
  draft: draftReducer,
  playerSeason: playerSeasonReducer,
  team: teamReducer
})

export type IAppState = ReturnType<typeof appReducer>
