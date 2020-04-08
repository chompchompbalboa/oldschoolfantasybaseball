//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { Moment } from 'moment'

import {
  IPlayerSeason,
  IPositionBatting,
  IPositionPitching,
  IStatCategoryBatting,
  IStatCategoryPitching
} from '@/state/playerSeason/types'
import { ITeam } from '@/state/team/types'

//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------
export interface IAllDrafts { [draftId: string]: IDraft }

export interface IDraft {
  id: string
  startTime: Moment
  duration: number
  hasDraftStarted: boolean
  hasDraftEnded: boolean
  isDraftPaused: boolean
  teams: ITeam['id'][]
  statCategoriesBatting: IStatCategoryBatting[],
  statCategoriesPitching: IStatCategoryPitching[]
  rosterSpotsBatting: {
    CATCHER: number
    FIRST_BASEMAN: number
    SECOND_BASEMAN: number
    THIRD_BASEMAN: number
    SHORTSTOP: number
    OUTFIELD: number
    DESIGNATED_HITTER: number
  }
  rosterSpotsPitching: {
    STARTING_PITCHER: number
    RELIEF_PITCHER: number
  }
  allDraftPicksBatting: { [ playerSeasonId: string ]: {
    teamId: ITeam['id']
    playerSeasonId: IPlayerSeason['playerSeasonId']
    position: IPositionBatting
    positionIndex: number
    timestamp: Moment
  }}
  allDraftPicksPitching: { [ playerSeasonId: string ]: {
    teamId: ITeam['id']
    playerSeasonId: IPlayerSeason['playerSeasonId']
    position: IPositionPitching
    positionIndex: number
    timestamp: Moment
  }}
  draftPicksByTeamBatting: {
    [ teamId: string ]: {
      CATCHER: IPlayerSeason['playerSeasonId'][]
      FIRST_BASEMAN: IPlayerSeason['playerSeasonId'][]
      SECOND_BASEMAN: IPlayerSeason['playerSeasonId'][]
      THIRD_BASEMAN: IPlayerSeason['playerSeasonId'][]
      SHORTSTOP: IPlayerSeason['playerSeasonId'][]
      OUTFIELD: IPlayerSeason['playerSeasonId'][]
      DESIGNATED_HITTER: IPlayerSeason['playerSeasonId'][]
    }
  }
  draftPicksByTeamPitching: {
    [ teamId: string ]: {
      STARTING_PITCHER: IPlayerSeason['playerSeasonId'][]
      RELIEF_PITCHER: IPlayerSeason['playerSeasonId'][]
    }
  }
}

export interface IDraftUpdates {
  hasDraftStarted?: IDraft['hasDraftStarted']
  hasDraftEnded?: IDraft['hasDraftEnded']
  isDraftPaused?: IDraft['isDraftPaused']
  allDraftPicksBatting?: IDraft['allDraftPicksBatting']
  allDraftPicksPitching?: IDraft['allDraftPicksPitching']
  draftPicksByTeamBatting?: IDraft['draftPicksByTeamBatting']
  draftPicksByTeamPitching?: IDraft['draftPicksByTeamPitching']
}