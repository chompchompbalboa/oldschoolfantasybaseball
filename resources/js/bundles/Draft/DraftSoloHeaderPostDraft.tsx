//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { IDraft } from '@/state/draft/types'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftSoloHeaderPostDraft = ({
  draftId
}: IDraftSoloHeaderPostDraft) => (
  <>
    PostDraft
  </>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftSoloHeaderPostDraft {
  draftId: IDraft['id']
}

export default DraftSoloHeaderPostDraft
