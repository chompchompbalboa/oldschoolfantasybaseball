//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { 
	IAllDrafts,
	IDraft,
	IDraftUpdates
} from '@/state/draft/types'

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export type IDraftActions = 
	ISetAllDrafts | 
	IUpdateActiveDraftId |
	IUpdateDraft

//-----------------------------------------------------------------------------
// Set All Drafts
//-----------------------------------------------------------------------------
export const SET_ALL_DRAFTS = 'SET_ALL_DRAFTS'
interface ISetAllDrafts {
  type: typeof SET_ALL_DRAFTS
  nextAllDrafts: IAllDrafts
}

export const setAllDrafts = (nextAllDrafts: IAllDrafts): IDraftActions => {
	return {
		type: SET_ALL_DRAFTS,
		nextAllDrafts
	}
}

//-----------------------------------------------------------------------------
// Update Draft
//-----------------------------------------------------------------------------
export const UPDATE_ACTIVE_DRAFT_ID = 'UPDATE_ACTIVE_DRAFT_ID'
interface IUpdateActiveDraftId {
	type: typeof UPDATE_ACTIVE_DRAFT_ID
	nextActiveDraftId: IDraft['id']
}

export const updateActiveDraftId = (nextActiveDraftId: IDraft['id']): IDraftActions => {
	return {
		type: UPDATE_ACTIVE_DRAFT_ID,
		nextActiveDraftId
	}
}

//-----------------------------------------------------------------------------
// Update Draft
//-----------------------------------------------------------------------------
export const UPDATE_DRAFT = 'UPDATE_DRAFT'
interface IUpdateDraft {
	type: typeof UPDATE_DRAFT
	draftId: IDraft['id']
  updates: IDraftUpdates
}

export const updateDraft = (draftId: IDraft['id'], updates: IDraftUpdates): IDraftActions => {
	return {
		type: UPDATE_DRAFT,
		draftId,
		updates
	}
}