export interface IAllTeams { [teamId: string]: ITeam }

export interface ITeam {
  id: string
  name: string
}

export interface ITeamUpdates {
  name?: ITeam['name']
}