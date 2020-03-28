//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { IAllDrafts } from '@/state/draft/types'

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export type IDraftActions = ICreateDraft

//-----------------------------------------------------------------------------
// Create Message
//-----------------------------------------------------------------------------
export const SET_ALL_DRAFTS = 'SET_ALL_DRAFTS'
interface ICreateDraft {
  type: typeof SET_ALL_DRAFTS
  nextAllDrafts: IAllDrafts
}

export const setAllDrafts = (nextAllDrafts: IAllDrafts): IDraftActions => {
	return {
		type: SET_ALL_DRAFTS,
		nextAllDrafts
	}
}