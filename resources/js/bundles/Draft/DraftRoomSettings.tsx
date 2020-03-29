//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState } from 'react'

import { IDraft } from '@/state/draft/types'

import DraftRoomContent from '@draft/DraftRoomContent'
import DraftRoomContentChoice from '@draft/DraftRoomContentChoice'
import DraftRoomSettingsRosters from '@draft/DraftRoomSettingsRosters'
import DraftRoomSettingsStatCategoriesBatting from '@draft/DraftRoomSettingsStatCategoriesBatting'
import DraftRoomSettingsStatCategoriesPitching from '@draft/DraftRoomSettingsStatCategoriesPitching'
import DraftRoomSettingsTimePeriod from '@draft/DraftRoomSettingsTimePeriod'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomSettings = ({
  draftId,
  isActiveContent
}: IDraftRoomSettings) => {

  // State
  const [ activeContent, setActiveContent ] = useState('STAT_CATEGORIES_BATTING' as IDraftRoomSettingsContent)

  // Content Choices Text
  const draftRoomContentChoicesText = {
    STAT_CATEGORIES_BATTING: 'Batting Stats',
    STAT_CATEGORIES_PITCHING: 'Pitching Stats',
    ROSTERS: 'Rosters',
    TIME_PERIOD: 'Time Period',
  }

  // Draft Room Content Choices
  const draftRoomContentChoices = ([
    'STAT_CATEGORIES_BATTING',
    'STAT_CATEGORIES_PITCHING',
    'ROSTERS',
    'TIME_PERIOD'
  ] as IDraftRoomSettingsContent[]).map(contentChoice => (
      <DraftRoomContentChoice
        key={contentChoice}
        isActive={activeContent === contentChoice}
        onClick={() => setActiveContent(contentChoice)}>
        {draftRoomContentChoicesText[contentChoice]}
      </DraftRoomContentChoice>
  ))

  // Components 
  const components = {
    STAT_CATEGORIES_BATTING: DraftRoomSettingsStatCategoriesBatting,
    STAT_CATEGORIES_PITCHING: DraftRoomSettingsStatCategoriesPitching,
    ROSTERS: DraftRoomSettingsRosters,
    TIME_PERIOD: DraftRoomSettingsTimePeriod

  }

  // Active Component
  const ActiveComponent = components[activeContent]

  return (
    <DraftRoomContent
      isActiveContent={isActiveContent}
      contentChoices={draftRoomContentChoices}>
      <ActiveComponent
        draftId={draftId}/> 
    </DraftRoomContent>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomSettings {
  draftId: IDraft['id']
  isActiveContent: boolean
}

export type IDraftRoomSettingsContent = 
  'STAT_CATEGORIES_BATTING' |
  'STAT_CATEGORIES_PITCHING' | 
  'ROSTERS' |
  'TIME_PERIOD'

export default DraftRoomSettings
