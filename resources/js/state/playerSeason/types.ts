export interface IAllPlayerSeasonsBatting { [ playerSeasonId: string ]: IPlayerSeasonBatting }
export interface IAllPlayerSeasonsPitching { [ playerSeasonId: string ]: IPlayerSeasonPitching }

export interface IPlayerSeasonsByPositionBatting { 
  CATCHER: IPlayerSeasonBatting['playerSeasonId'][],
  FIRST_BASEMAN: IPlayerSeasonBatting['playerSeasonId'][],
  SECOND_BASEMAN: IPlayerSeasonBatting['playerSeasonId'][],
  SHORTSTOP: IPlayerSeasonBatting['playerSeasonId'][],
  THIRD_BASEMAN: IPlayerSeasonBatting['playerSeasonId'][],
  OUTFIELD: IPlayerSeasonBatting['playerSeasonId'][],
  DESIGNATED_HITTER: IPlayerSeasonBatting['playerSeasonId'][]
}

export interface IPlayerSeasonsByPositionPitching {
  PITCHER: IPlayerSeasonPitching['playerSeasonId'][],
  STARTING_PITCHER: IPlayerSeasonPitching['playerSeasonId'][],
  RELIEF_PITCHER: IPlayerSeasonPitching['playerSeasonId'][],
}

export interface IPlayerSeason {
  playerSeasonId: string
  name: string
  year: number
}

export type IStatCategoryBatting = keyof IPlayerSeasonBatting['stats']
export interface IPlayerSeasonBatting extends IPlayerSeason {
  stats: {
    AB: number
    H: number
    R: number
    HR: number
    RBI: number
    SB: number
    AVG: number
  }
}

export type IStatCategoryPitching = keyof IPlayerSeasonPitching['stats']
export interface IPlayerSeasonPitching extends IPlayerSeason {
  stats: {
    ERA: number
    SO: number
    SV: number
  }
}

export type IPositionBatting = 
  'CATCHER' |
  'FIRST_BASEMAN' | 
  'SECOND_BASEMAN' |
  'SHORTSTOP' | 
  'THIRD_BASEMAN' |
  'OUTFIELD' | 
  'DESIGNATED_HITTER' 


export type IPositionPitching = 
  'STARTING_PITCHER' |
  'RELIEF_PITCHER' 
