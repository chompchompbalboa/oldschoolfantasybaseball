//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'

import { 
  IDraft, 
  IDraftRoster, 
  IDraftRosterBatting,
  IDraftRosterPitching,
  IDraftRosterSpotBatting,
  IDraftRosterSpotPitching
} from '@/state/draft/types'
import { 
  IAllTeams,
  ITeam
} from '@/state/team/types'

import { defaultTeams } from '@/state/team/defaults'

//-----------------------------------------------------------------------------
// Default Draft
//-----------------------------------------------------------------------------
export const defaultDraft: () => IReturnValue = () => {

  const newTeams: IAllTeams = {}
  const newTeamIds: ITeam['id'][] = []
  defaultTeams(4).forEach(newTeam => {
    newTeams[newTeam.id] = newTeam
    newTeamIds.push(newTeam.id)
  })

  const newDraft: IDraft = {
    id: createUuid(),
    statCategoriesBatting: [ 'AVG', 'HR', 'R', 'RBI', 'SB' ],
    statCategoriesPitching: [ 'ERA', 'IP', 'K', 'SV', 'WHIP' ],
    teams: newTeamIds,
    roster: defaultDraftRoster(),
    timePeriod: {
      startYear: 1950,
      endYear: 2019
    }
  }
  
  return {
    newDraft,
    newTeams
  }
}

interface IReturnValue {
  newDraft: IDraft
  newTeams: IAllTeams
}

//-----------------------------------------------------------------------------
// Default Draft Roster
//-----------------------------------------------------------------------------
export const defaultDraftRoster = () => ({
  batting: defaultDraftRosterBatting(),
  pitching: defaultDraftRosterPitching()
} as IDraftRoster)

export const defaultDraftRosterBatting = () => ({
  CATCHER: 1,
  FIRST_BASEMAN: 1,
  SECOND_BASEMAN: 1,
  SHORTSTOP: 1,
  THIRD_BASEMAN: 1,
  OUTFIELD: 3,
  UTIL: 1,
} as IDraftRosterBatting)

export const defaultDraftRosterPitching = () => ({
  PITCHER: 6,
  STARTING_PITCHER: 0,
  RELIEF_PITCHER: 0
} as IDraftRosterPitching)

export const allDraftRosterSpotsBatting = Object.keys(defaultDraftRosterBatting()) as IDraftRosterSpotBatting[]
export const allDraftRosterSpotsPitching = Object.keys(defaultDraftRosterPitching()) as IDraftRosterSpotPitching[]

export const allDraftRosterSpotNames = {
  CATCHER: "C",
  FIRST_BASEMAN: "1B",
  SECOND_BASEMAN: "2B",
  SHORTSTOP: "SS",
  THIRD_BASEMAN: "3B",
  OUTFIELD: "OF",
  UTIL: "UTIL",
  PITCHER: "P",
  STARTING_PITCHER: "RP",
  RELIEF_PITCHER: "SP"
}