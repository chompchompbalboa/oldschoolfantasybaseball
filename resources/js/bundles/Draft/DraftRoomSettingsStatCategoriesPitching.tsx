//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { IStatCategoryPitching } from '@/state/stats/types'

import { updateDraft } from '@/state/draft/actions' 

import DraftRoomSettingsStatCategoriesCategory from '@draft/DraftRoomSettingsStatCategoriesCategory'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomSettingsStatCategoriesPitching = ({
  draftId
}: IDraftRoomSettingsStatCategoriesPitching) => {

  // Redux
  const dispatch = useDispatch()
  const draftStatCategoriesPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesPitching)

  const statCategoriesPitching: IStatCategoryPitching[] = [ 'ERA', 'IP', 'K', 'QS', 'SV', 'WHIP' ]

  const toggleStatCategory = (statCategory: IStatCategoryPitching) => {
    const nextDraftStatCategoriesPitching =
      draftStatCategoriesPitching?.includes(statCategory)
        ? draftStatCategoriesPitching.filter(currentStatCategory => currentStatCategory !== statCategory)
        : [ ...draftStatCategoriesPitching, statCategory ]
    dispatch(updateDraft(draftId, { statCategoriesPitching: nextDraftStatCategoriesPitching }))
  }

  return (
    <DraftRoomSettingsStatCategoriesCategory
      draftStatCategories={draftStatCategoriesPitching}
      statCategories={statCategoriesPitching}
      toggleStatCategory={toggleStatCategory}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomSettingsStatCategoriesPitching {
  draftId: IDraft['id']
}

export default DraftRoomSettingsStatCategoriesPitching
