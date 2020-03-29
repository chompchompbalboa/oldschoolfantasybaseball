//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'

import { IDraft } from '@/state/draft/types'
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
  defaultTeams(10).forEach(newTeam => {
    newTeams[newTeam.id] = newTeam
    newTeamIds.push(newTeam.id)
  })

  const newDraft: IDraft = {
    id: createUuid(),
    statCategoriesBatting: [ 'AVG', 'OPS', 'HR', 'R', 'RBI', 'SB' ],
    statCategoriesPitching: [ 'ERA', 'IP', 'K', 'QS', 'SV', 'WHIP' ],
    teams: newTeamIds
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