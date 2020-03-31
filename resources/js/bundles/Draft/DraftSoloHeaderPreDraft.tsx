//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { IDraft } from '@/state/draft/types'

import DraftSoloHeaderStartTime from '@draft/DraftSoloHeaderStartTime'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftSoloHeaderPreDraft = ({
  draftId
}: IDraftSoloHeaderPreDraft) => (
  <DraftSoloHeaderStartTime
    draftId={draftId}/>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftSoloHeaderPreDraft {
  draftId: IDraft['id']
}

export default DraftSoloHeaderPreDraft
