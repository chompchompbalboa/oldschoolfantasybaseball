//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
import { 
  IDraftActions,
  SET_ALL_DRAFTS,
  UPDATE_DRAFT
} from '@/state/draft/actions'

import { IAllDrafts } from '@/state/draft/types'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
export type IDraftState = {
  activeDraft: string | null
  allDrafts: IAllDrafts
}

export const initialDraftState: IDraftState = {
  activeDraft: null,
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

    case UPDATE_DRAFT: {
      const { draftId, updates } = action
      return {
        ...state,
        allDrafts: {
          ...state.allDrafts,
          [draftId]: {
            ...state.allDrafts[draftId],
            ...updates
          }
        }
      }
    }

		default:
			return state
	}
}

export default userReducer
