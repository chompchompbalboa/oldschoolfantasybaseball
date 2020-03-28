//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
import { 
  IDraftActions,
  SET_ALL_DRAFTS
} from '@/state/Draft/actions'

import { IAllDrafts } from '@/state/draft/types'
//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
export type IDraftState = {
  allDrafts: IAllDrafts
}

export const initialDraftState: IDraftState = {
  allDrafts: {}
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
export const userReducer = (state = initialDraftState, action: IDraftActions): IDraftState => {
	switch (action.type) {

    case SET_ALL_DRAFTS: {
      const { nextAllDrafts } = action
      return {
        ...state,
        allDrafts: nextAllDrafts
      }
    }

		default:
			return state
	}
}

export default userReducer
