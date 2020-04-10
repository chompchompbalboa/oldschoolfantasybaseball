//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import pluralize from 'pluralize'
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator'
import { v4 as createUuid } from 'uuid'
import _ from 'lodash'

import { ITeam } from '@/state/team/types'

//-----------------------------------------------------------------------------
// Default Team
//-----------------------------------------------------------------------------
export const defaultTeam: (teamName: string) => ITeam = (teamName: string) => ({
  id: createUuid(),
  name: teamName,
  draftPicks: {
    batting: [],
    pitching: []
  }
})

//-----------------------------------------------------------------------------
// Default Teams
//-----------------------------------------------------------------------------
export const defaultTeams: (numberOfTeams: number) => ITeam[] = (numberOfTeams: number = 10) => {
  return _.times(numberOfTeams, () => {
    const teamNameFirst = uniqueNamesGenerator({ 
      dictionaries: [ colors ],
      length: 1,
      style: "capital"
    })
    const teamNameLast = pluralize.plural(uniqueNamesGenerator({ 
      dictionaries: [ animals ],
      length: 1,
      style: "capital"
    }))
    return defaultTeam(teamNameFirst + " " + teamNameLast)
  }
  )
}