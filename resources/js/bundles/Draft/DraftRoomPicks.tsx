//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'

import { IDraft } from '@/state/draft/types'

import DraftRoomContent from '@draft/DraftRoomContent'
import DraftRoomContentChoice from '@draft/DraftRoomContentChoice'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomPicks = ({
  draftId,
  isActiveContent
}: IDraftRoomPicks) => {

  // Draft Room Content Choices
  const draftRoomContentChoices = ([
    'Round 1',
    'Round 2',
    'Round 3',
    'Round 4',
    'Round 5'
  ]).map(contentChoice => {
    return (
      <DraftRoomContentChoice
        key={contentChoice}
        isActive={false}>
        {contentChoice}
      </DraftRoomContentChoice>
    )
  })

  return (
    <DraftRoomContent
      isActiveContent={isActiveContent}
      contentChoices={draftRoomContentChoices}>
    </DraftRoomContent>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomPicks {
  draftId: IDraft['id']
  isActiveContent: boolean
}

export default DraftRoomPicks
