//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { IStatCategoryBatting } from '@/state/stats/types'

import { updateDraft } from '@/state/draft/actions'

import DraftRoomSettingsStatCategoriesCategory from '@draft/DraftRoomSettingsStatCategoriesCategory'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomSettingsStatCategoriesBatting = ({
  draftId
}: IDraftRoomSettingsStatCategoriesBatting) => {

  // Redux
  const dispatch = useDispatch()
  const draftStatCategoriesBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesBatting)

  // Stat Categories
  const statCategoriesBatting: IStatCategoryBatting[] = [ 'AVG', 'OPS', 'HR', 'R', 'RBI', 'SB' ]

  // Toggle Stat Category
  const toggleStatCategory = (statCategory: IStatCategoryBatting) => {
    const nextDraftStatCategoriesBatting =
      draftStatCategoriesBatting?.includes(statCategory)
        ? draftStatCategoriesBatting.filter(currentStatCategory => currentStatCategory !== statCategory)
        : [ ...draftStatCategoriesBatting, statCategory ]
    dispatch(updateDraft(draftId, { statCategoriesBatting: nextDraftStatCategoriesBatting }))
  }

  return (
    <DraftRoomSettingsStatCategoriesCategory
      draftStatCategories={draftStatCategoriesBatting}
      header="Batting"
      statCategories={statCategoriesBatting}
      toggleStatCategory={toggleStatCategory}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomSettingsStatCategoriesBatting {
  draftId: IDraft['id']
}

export default DraftRoomSettingsStatCategoriesBatting
