//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import {
  allDraftRosterSpotsBatting,
  allDraftRosterSpotsPitching
} from '@/state/draft/defaults'

import DraftRoomContent from '@draft/DraftRoomContent'
import DraftRoomContentChoice from '@draft/DraftRoomContentChoice'
import DraftRoomDraftPicks from '@draft/DraftRoomDraftPicks'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomDraft = ({
  draftId,
  isActiveContent
}: IDraftRoomDraft) => {

  const draftNumberOfRounds = useSelector((state: IAppState) => {
    const draft = state.draft.allDrafts[draftId]
    let numberOfRounds = 0
    allDraftRosterSpotsBatting.forEach(draftRosterSpotBatting => numberOfRounds += draft.roster.batting[draftRosterSpotBatting])
    allDraftRosterSpotsPitching.forEach(draftRosterSpotPitching => numberOfRounds += draft.roster.pitching[draftRosterSpotPitching])
    return numberOfRounds
  })

  // Draft Room Content Choices
  const draftRoomContentChoices = _.times(draftNumberOfRounds, time => "Round " + (time + 1)).map(contentChoice => {
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
      <DraftRoomDraftPicks 
        draftId={draftId}
        numberOfRounds={draftNumberOfRounds}/>
    </DraftRoomContent>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomDraft {
  draftId: IDraft['id']
  isActiveContent: boolean
}

export default DraftRoomDraft
