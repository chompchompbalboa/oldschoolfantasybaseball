//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'
import _ from 'lodash'

import { ITeam } from '@/state/team/types'

//-----------------------------------------------------------------------------
// Default Team
//-----------------------------------------------------------------------------
const teamNames = [ "Jake", "JB", "Josh", "Rocky"]
export const defaultTeam = (teamName: string, teamNameIndex?: number) => ({
  id: createUuid(),
  name: teamNameIndex ? teamNames[teamNameIndex - 1] : teamName
} as ITeam)

//-----------------------------------------------------------------------------
// Default Teams
//-----------------------------------------------------------------------------
export const defaultTeams = (numberOfTeams: number = 4) => {
  return _.times(numberOfTeams, (time: number) => defaultTeam("Team " + (time + 1), time + 1)) as ITeam[]
}