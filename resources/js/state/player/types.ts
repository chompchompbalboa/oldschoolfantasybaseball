export interface IAllPlayers { [playerId: string]: IPlayer }

export interface IAllPlayerSeasonsByPosition { 
  CATCHER: IPlayerSeason[],
  FIRST_BASEMAN: IPlayerSeason[],
  SECOND_BASEMAN: IPlayerSeason[],
  SHORTSTOP: IPlayerSeason[],
  THIRD_BASEMAN: IPlayerSeason[],
  OUTFIELD: IPlayerSeason[],
  UTIL: IPlayerSeason[],
  PITCHER: IPlayerSeason[],
  STARTING_PITCHER: IPlayerSeason[],
  RELIEF_PITCHER: IPlayerSeason[],
 }

export interface IPlayer {
  id: string
  name: string
}

export interface IPlayerSeason {
  name: string
  year: number
  AB: number
  H: number
  R: number
  HR: number
  RBI: number
  SB: number
  AVG: number
}