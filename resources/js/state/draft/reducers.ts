//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
import { 
  IDraftActions,
  SET_ALL_DRAFTS,
  UPDATE_ACTIVE_DRAFT_ID,
  UPDATE_DRAFT
} from '@/state/draft/actions'

import { IAllDrafts } from '@/state/draft/types'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
export type IDraftState = {
  activeDraftId: string | null
  allDrafts: IAllDrafts
}

export const initialDraftState: IDraftState = {
  activeDraftId: null,
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

    case UPDATE_ACTIVE_DRAFT_ID: {
      const { nextActiveDraftId } = action
      return {
        ...state,
        activeDraftId: nextActiveDraftId
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
