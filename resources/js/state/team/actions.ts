//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { 
	IAllTeams,
	ITeam,
	ITeamUpdates
} from '@/state/team/types'

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export type ITeamActions = 
	ISetAllTeams |
	IUpdateTeam

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

//-----------------------------------------------------------------------------
// Update Team
//-----------------------------------------------------------------------------
export const UPDATE_TEAM = 'UPDATE_TEAM'
interface IUpdateTeam {
  type: typeof UPDATE_TEAM
	teamId: ITeam['id']
	updates: ITeamUpdates
}

export const updateTeam = (teamId: ITeam['id'], updates: ITeamUpdates): ITeamActions => {
	return {
		type: UPDATE_TEAM,
		teamId,
		updates
	}
}