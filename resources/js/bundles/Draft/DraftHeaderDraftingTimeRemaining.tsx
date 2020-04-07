//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

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
  const draftDuration = useSelector((state: IAppState) => state.draft.allDrafts[draftId].duration)

  // End Draft
  const endDraft = () => {
    dispatch(updateDraft(draftId, {
      hasDraftEnded: true
    }))
  }

  return (
    <Container>
      <DraftHeaderTime
        initialTime={draftDuration}
        onTimeEnd={() => endDraft()}
        textAfter=" remaining"/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftHeaderDraftingTimeRemaining {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftHeaderDraftingTimeRemaining
