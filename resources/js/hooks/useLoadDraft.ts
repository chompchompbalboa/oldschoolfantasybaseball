//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import { 
  setAllDrafts,
  updateActiveDraftId
} from '@/state/draft/actions'
import { defaultDraft } from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
export const useLoadDraft = (): IReturnValue => {

  const dispatch = useDispatch()
  const draftId = useSelector((state: IAppState) => state.draft.activeDraftId)
  const allDrafts = useSelector((state: IAppState) => state.draft.allDrafts)

  useEffect(() => {
    if(draftId === null) {
      const newDraft = defaultDraft()
      dispatch(setAllDrafts({
        ...allDrafts,
        [newDraft.id]: newDraft
      }))
      dispatch(updateActiveDraftId(newDraft.id))
    }
  }, [ draftId ])

  return {
    draftId
  }
}

//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------
interface IReturnValue {
  draftId: IDraft['id'] | null
}