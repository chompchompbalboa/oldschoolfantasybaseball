//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { 
  IDraft,
  IDraftType
} from '@/state/draft/types'

import { 
  setAllDrafts,
  updateActiveDraftId
} from '@/state/draft/actions'
import { 
  setAllTeams
} from '@/state/team/actions'

import { defaultDraft } from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
export const useLoadDraft = (draftType: IDraftType): IReturnValue => {

  const dispatch = useDispatch()
  const draftId = useSelector((state: IAppState) => state.draft.activeDraftId)
  const allDrafts = useSelector((state: IAppState) => state.draft.allDrafts)
  const allTeams = useSelector((state: IAppState) => state.team.allTeams)

  useEffect(() => {
    if(draftId === null) {
      const { 
        newDraft,
        newTeams
      } = defaultDraft(draftType)
      
      dispatch(setAllDrafts({
        ...allDrafts,
        [newDraft.id]: newDraft
      }))
      dispatch(setAllTeams({
        ...allTeams,
        ...newTeams
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