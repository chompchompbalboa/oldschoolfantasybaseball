//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { IDraft } from '@/state/draft/types'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftSoloHeaderDrafting = ({
  draftId
}: IDraftSoloHeaderDrafting) => (
  <>
    Drafting
  </>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftSoloHeaderDrafting {
  draftId: IDraft['id']
}

export default DraftSoloHeaderDrafting
