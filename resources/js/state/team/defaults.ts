//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'
import _ from 'lodash'

import { ITeam } from '@/state/team/types'

//-----------------------------------------------------------------------------
// Default Team
//-----------------------------------------------------------------------------
export const defaultTeam = (teamName: string) => ({
  id: createUuid(),
  name: teamName
} as ITeam)

//-----------------------------------------------------------------------------
// Default Teams
//-----------------------------------------------------------------------------
export const defaultTeams = (numberOfTeams: number = 4) => {
  return _.times(numberOfTeams, (time: number) => defaultTeam("Team " + (time + 1))) as ITeam[]
}