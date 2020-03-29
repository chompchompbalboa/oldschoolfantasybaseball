//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
import { 
  ITeamActions,
  SET_ALL_TEAMS
} from '@/state/team/actions'

import { IAllTeams } from '@/state/team/types'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
export type ITeamState = {
  allTeams: IAllTeams
}

export const initialDraftState: ITeamState = {
  allTeams: {}
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
export const teamReducer = (state = initialDraftState, action: ITeamActions): ITeamState => {
	switch (action.type) {

    case SET_ALL_TEAMS: {
      const { nextAllTeams } = action
      return {
        ...state,
        allTeams: nextAllTeams
      }
    }

		default:
			return state
	}
}

export default teamReducer
