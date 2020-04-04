//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import { 
  setAllDrafts,
  updateActiveDraftId
} from '@/state/draft/actions'
import { setAllTeams } from '@/state/team/actions'

import { defaultDraft } from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
export const useLoadDraft = (): IReturnValue => {

  // Redux
  const dispatch = useDispatch()
  const draftId = useSelector((state: IAppState) => state.draft.activeDraftId)
  const allDrafts = useSelector((state: IAppState) => state.draft.allDrafts)
  const allTeams = useSelector((state: IAppState) => state.team.allTeams)

  // Local Variables
  const allTeamIds = Object.keys(allTeams)
  const userTeamId = allTeamIds.length > 0 && allTeamIds[0]

  // Load a new draft if there's no activeDraftId
  useEffect(() => {
    if(draftId === null) {
      const { 
        newDraft,
        newTeams
      } = defaultDraft()
      
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

  // Return the draftId and the user's teamId
  return {
    draftId,
    userTeamId
  }
}

//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------
interface IReturnValue {
  draftId: IDraft['id']
  userTeamId: ITeam['id']
}