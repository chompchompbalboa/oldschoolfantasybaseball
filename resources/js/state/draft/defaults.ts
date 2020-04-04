//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'

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
  defaultTeams(4).forEach(newTeam => {
    newTeams[newTeam.id] = newTeam
    newTeamIds.push(newTeam.id)
  })

  const userTeam = newTeams[newTeamIds[0]]

  const newDraft: IDraft = {
    id: createUuid(),
    startTime: moment().add(1, 's'),
    hasDraftStarted: false,
    hasDraftEnded: false,
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

const defaultStatCategoriesBatting: IStatCategoryBatting[] = [ 'HR', 'R', 'RBI', 'SB', 'AVG' ]
const defaultStatCategoriesPitching: IStatCategoryPitching[] = [ 'ERA', 'SO', 'SV' ]

const defaultAllDraftPicksByTeamBatting = (teamIds: ITeam['id'][]) => {
  const draftPicksByTeamBatting: IDraft['draftPicksByTeamBatting'] = {}
  teamIds.forEach(teamId => {
    draftPicksByTeamBatting[teamId] = {
      CATCHER: defaultStatCategoriesBatting.map(() => null),
      FIRST_BASEMAN: defaultStatCategoriesBatting.map(() => null),
      SECOND_BASEMAN: defaultStatCategoriesBatting.map(() => null),
      SHORTSTOP: defaultStatCategoriesBatting.map(() => null),
      THIRD_BASEMAN: defaultStatCategoriesBatting.map(() => null),
      OUTFIELD: defaultStatCategoriesBatting.map(() => null),
      DESIGNATED_HITTER: defaultStatCategoriesBatting.map(() => null),
    }
  })
  return draftPicksByTeamBatting
}

const defaultAllDraftPicksByTeamPitching = (teamIds: ITeam['id'][]) => {
  const draftPicksByTeamPitching: IDraft['draftPicksByTeamPitching'] = {}
  teamIds.forEach(teamId => {
    draftPicksByTeamPitching[teamId] = {
      STARTING_PITCHER: defaultStatCategoriesPitching.map(() => null),
      RELIEF_PITCHER: defaultStatCategoriesPitching.map(() => null),
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
  STARTING_PITCHER: "RP",
  RELIEF_PITCHER: "SP"
}