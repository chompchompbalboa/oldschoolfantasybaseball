//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import {
  IStatCategoryBatting,
  IStatCategoryPitching
} from '@/state/stats/types'

//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------
export interface IAllDrafts { [draftId: string]: IDraft }

export interface IDraft {
  id: string
  statCategoriesBatting: IStatCategoryBatting[]
  statCategoriesPitching: IStatCategoryPitching[]
}

export interface IDraftUpdates {
  statCategoriesBatting?: IDraft['statCategoriesBatting']
  statCategoriesPitching?: IDraft['statCategoriesPitching']
}