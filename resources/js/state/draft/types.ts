//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import {
  IStatCategoryBatting,
  IStatCategoryPitching
} from '@/state/stats/types'
import {
  ITeam
} from '@/state/team/types'

//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------
export interface IAllDrafts { [draftId: string]: IDraft }

export interface IDraft {
  id: string
  statCategoriesBatting: IStatCategoryBatting[]
  statCategoriesPitching: IStatCategoryPitching[]
  teams: ITeam['id'][]
}

export interface IDraftUpdates {
  statCategoriesBatting?: IDraft['statCategoriesBatting']
  statCategoriesPitching?: IDraft['statCategoriesPitching']
  teams?: IDraft['teams']
}