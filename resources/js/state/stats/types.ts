//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { IPlayer } from '@/state/player/types'

//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------
export interface IAllBattingStats { [battingStatsId: string]: IBattingStats }
export interface IAllPitchingStats { [pitchingStatsId: string]: IPitchingStats }

export interface IBattingStats {
  ID: string
  playerID: IPlayer['id']
  yearID: number
  AVG: number
  OPS: number
  HR: number
  R: number
  RBI: number
  SB: number
}

export interface IPitchingStats {
  ID: string
  playerID: IPlayer['id']
  yearID: number
  IPouts: number
  SO: number
  ERA: number
  WHIP: number
  QS: number
  SV: number
}

export type IStatCategoryBatting = 
  'AVG' |
  'OPS' |
  'HR' |
  'R' | 
  'RBI' |
  'SB'

export type IStatCategoryPitching = 
  'IPouts' |
  'SO' |
  'ERA' | 
  'WHIP' |
  'QS' |
  'SV'