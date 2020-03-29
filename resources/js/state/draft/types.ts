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
  roster: IDraftRoster
  timePeriod: IDraftTimePeriod
}

export interface IDraftUpdates {
  statCategoriesBatting?: IDraft['statCategoriesBatting']
  statCategoriesPitching?: IDraft['statCategoriesPitching']
  teams?: IDraft['teams']
  roster?: IDraft['roster']
  timePeriod?: IDraft['timePeriod']
}

export interface IDraftRoster {
  batting: IDraftRosterBatting
  pitching: IDraftRosterPitching
}

export interface IDraftRosterBatting {
  CATCHER: number
  FIRST_BASEMAN: number
  SECOND_BASEMAN: number
  THIRD_BASEMAN: number
  SHORTSTOP: number
  OUTFIELD: number
  UTIL: number
}

export interface IDraftRosterPitching {
  PITCHER: number
  STARTING_PITCHER: number
  RELIEF_PITCHER: number
}

export type IDraftRosterSpotBatting = keyof IDraftRosterBatting
export type IDraftRosterSpotPitching = keyof IDraftRosterPitching

export interface IDraftTimePeriod {
  startYear: number
  endYear: number
}