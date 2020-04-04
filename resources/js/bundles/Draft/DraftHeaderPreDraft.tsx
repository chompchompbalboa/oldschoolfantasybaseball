//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { IDraft } from '@/state/draft/types'

import DraftHeaderStartTime from '@draft/DraftHeaderStartTime'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftHeaderPreDraft = ({
  draftId
}: IDraftHeaderPreDraft) => (
  <DraftHeaderStartTime
    draftId={draftId}/>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftHeaderPreDraft {
  draftId: IDraft['id']
}

export default DraftHeaderPreDraft
