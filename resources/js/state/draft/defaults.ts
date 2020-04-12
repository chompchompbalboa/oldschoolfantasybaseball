//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'
import _ from 'lodash'

import { IDraft } from '@/state/draft/types'
import { 
  IPositionBatting,
  IPositionPitching,
  IStatCategoryBatting, 
  IStatCategoryPitching
} from '@/state/playerSeason/types'
import { 
  IAllTeams,
  ITeam
} from '@/state/team/types'

import { defaultTeams } from '@/state/team/defaults'
import moment from 'moment'

//-----------------------------------------------------------------------------
// Default Draft
//-----------------------------------------------------------------------------
export const defaultDraft = () => {

  const newTeams: IAllTeams = {}
  const newTeamIds: ITeam['id'][] = []
  defaultTeams(10).forEach(newTeam => {
    newTeams[newTeam.id] = newTeam
    newTeamIds.push(newTeam.id)
  })

  const userTeam = newTeams[newTeamIds[0]]

  const newDraft: IDraft = {
    id: createUuid(),
    startTime: moment().add(2, 's'),
    duration: 30,
    hasDraftStarted: false,
    hasDraftEnded: false,
    isDraftPaused: false,
    difficulty: 10,
    teams: newTeamIds,
    statCategoriesBatting: defaultStatCategoriesBatting,
    statCategoriesPitching: defaultStatCategoriesPitching,
    rosterSpotsBatting: defaultDraftRosterBatting,
    rosterSpotsPitching: defaultDraftRosterPitching,
    allDraftPicksBatting: {},
    allDraftPicksPitching: {},
    draftPicksByTeamBatting: defaultAllDraftPicksByTeamBatting(newTeamIds),
    draftPicksByTeamPitching: defaultAllDraftPicksByTeamPitching(newTeamIds)
  }
  
  return {
    newDraft,
    newTeams,
    userTeam
  } as IReturnValue
}

interface IReturnValue {
  newDraft: IDraft
  newTeams: IAllTeams
  userTeam: ITeam
}

//-----------------------------------------------------------------------------
// Defaults
//-----------------------------------------------------------------------------
const defaultDraftRosterBatting = {
  CATCHER: 1,
  FIRST_BASEMAN: 1,
  SECOND_BASEMAN: 1,
  SHORTSTOP: 1,
  THIRD_BASEMAN: 1,
  OUTFIELD: 3,
  DESIGNATED_HITTER: 1,
}

const defaultDraftRosterPitching = {
  STARTING_PITCHER: 5,
  RELIEF_PITCHER: 2
}

const defaultStatCategoriesBatting: IStatCategoryBatting[] = [  'AVG', 'HR', 'R', 'RBI', 'SB' ]
const defaultStatCategoriesPitching: IStatCategoryPitching[] = [ 'W', 'ERA', 'WHIP', 'SO', 'SV' ]

const defaultAllDraftPicksByTeamBatting = (teamIds: ITeam['id'][]) => {
  const draftPicksByTeamBatting: IDraft['draftPicksByTeamBatting'] = {}
  teamIds.forEach(teamId => {
    draftPicksByTeamBatting[teamId] = {
      CATCHER: _.times(defaultDraftRosterBatting['CATCHER'], () => null),
      FIRST_BASEMAN: _.times(defaultDraftRosterBatting['FIRST_BASEMAN'], () => null),
      SECOND_BASEMAN: _.times(defaultDraftRosterBatting['SECOND_BASEMAN'], () => null),
      SHORTSTOP: _.times(defaultDraftRosterBatting['SHORTSTOP'], () => null),
      THIRD_BASEMAN: _.times(defaultDraftRosterBatting['THIRD_BASEMAN'], () => null),
      OUTFIELD: _.times(defaultDraftRosterBatting['OUTFIELD'], () => null),
      DESIGNATED_HITTER: _.times(defaultDraftRosterBatting['DESIGNATED_HITTER'], () => null),
    }
  })
  return draftPicksByTeamBatting
}

const defaultAllDraftPicksByTeamPitching = (teamIds: ITeam['id'][]) => {
  const draftPicksByTeamPitching: IDraft['draftPicksByTeamPitching'] = {}
  teamIds.forEach(teamId => {
    draftPicksByTeamPitching[teamId] = {
      STARTING_PITCHER: _.times(defaultDraftRosterPitching['STARTING_PITCHER'], () => null),
      RELIEF_PITCHER: _.times(defaultDraftRosterPitching['RELIEF_PITCHER'], () => null),
    }
  })
  return draftPicksByTeamPitching
}

export const allPositionsBatting: IPositionBatting[] = [ 
  'CATCHER',
  'FIRST_BASEMAN',
  'SECOND_BASEMAN',
  'SHORTSTOP',
  'THIRD_BASEMAN',
  'OUTFIELD',
  'DESIGNATED_HITTER'
]
export const allPositionsPitching: IPositionPitching[] = [
  'STARTING_PITCHER',
  'RELIEF_PITCHER'
]

export const allPositionsBattingNames = {
  CATCHER: "C",
  FIRST_BASEMAN: "1B",
  SECOND_BASEMAN: "2B",
  SHORTSTOP: "SS",
  THIRD_BASEMAN: "3B",
  OUTFIELD: "OF",
  DESIGNATED_HITTER: "DH",
}

export const allPositionsPitchingNames = {
  STARTING_PITCHER: "SP",
  RELIEF_PITCHER: "RP"
}

export const allPositionsNames = {
  ...allPositionsBattingNames,
  ...allPositionsPitchingNames
}

export const allStatCategoriesBatting: IStatCategoryBatting[] = [ 
  'AB',
  'AVG',
  'H',
  'HR',
  'R',
  'RBI',
  'SB'
]
export const allStatCategoriesPitching: IStatCategoryPitching[] = [
  'IPouts',
  'W',
  'SV',
  'ERA',
  'WHIP',
  'SO',
  'BB',
  'ER',
  'H',
  'IBB'
]

export const allStatCategories = [
  ...allStatCategoriesBatting,
  ...allStatCategoriesPitching
]

export const allStatCategoriesBattingNames = {
  AB: "AB",
  AVG: "AVG",
  H: "H",
  HR: "HR",
  R: "R",
  RBI: "RBI",
  SB: "SB"
}

export const allStatCategoriesPitchingNames = {
  IPouts: "IP",
  W: "W",
  SV: "SV",
  ERA: "ERA",
  WHIP: "WHIP",
  SO: "SO",
  BB: "BB",
  ER: "ER",
  H: "H",
  IBB: "IBB"
}

export const formatStatValue = {
  AB: (statValue: number) => statValue,
  H: (statValue: number) => statValue,
  R: (statValue: number) => statValue,
  HR: (statValue: number) => statValue,
  RBI: (statValue: number) => statValue,
  SB: (statValue: number) => statValue,
  AVG: (statValue: number) => Number(statValue).toFixed(3).replace("0.", "."),
  IPouts: (statValue: number) => (Number(statValue) / 3).toFixed(1),
  W: (statValue: number) => statValue,
  SV: (statValue: number) => statValue,
  ER: (statValue: number) => statValue,
  ERA: (statValue: number) => Number(statValue).toFixed(2),
  WHIP: (statValue: number) => Number(statValue).toFixed(3),
  SO: (statValue: number) => statValue,
  BB: (statValue: number) => statValue,
  IBB: (statValue: number) => statValue,
}