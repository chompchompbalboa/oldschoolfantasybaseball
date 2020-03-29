//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { 
	IAllTeams
} from '@/state/team/types'

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export type ITeamActions = 
	ISetAllTeams

//-----------------------------------------------------------------------------
// Set All Teams
//-----------------------------------------------------------------------------
export const SET_ALL_TEAMS = 'SET_ALL_TEAMS'
interface ISetAllTeams {
  type: typeof SET_ALL_TEAMS
  nextAllTeams: IAllTeams
}

export const setAllTeams = (nextAllTeams: IAllTeams): ITeamActions => {
	return {
		type: SET_ALL_TEAMS,
		nextAllTeams
	}
}