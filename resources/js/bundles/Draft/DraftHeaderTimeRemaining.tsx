//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import { updateDraft } from '@/state/draft/actions'

import DraftHeaderTime from '@draft/DraftHeaderTime'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftHeaderDraftingTimeRemaining = ({
  draftId
}: IDraftHeaderDraftingTimeRemaining) => {

  // Redux
  const dispatch = useDispatch()
  const isDraftPaused = useSelector((state: IAppState) => state.draft.allDrafts[draftId].isDraftPaused)
  const draftDuration = useSelector((state: IAppState) => state.draft.allDrafts[draftId].duration)

  // End Draft
  const endDraft = () => {
    dispatch(updateDraft(draftId, {
      hasDraftEnded: true
    }))
  }

  return (
    <DraftHeaderTime
      initialTime={draftDuration}
      isPaused={isDraftPaused}
      onTimeEnd={() => endDraft()}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftHeaderDraftingTimeRemaining {
  draftId: IDraft['id']
}

export default DraftHeaderDraftingTimeRemaining
