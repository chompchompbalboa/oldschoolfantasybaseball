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
  id: string
  playerId: IPlayer['playerId']
  yearId: number
  AVG: number
  OPS: number
  HR: number
  R: number
  RBI: number
  SB: number
}

export interface IPitchingStats {
  id: string
  playerId: IPlayer['playerId']
  yearId: number
  IP: number
  K: number
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
  'IP' |
  'K' |
  'ERA' | 
  'WHIP' |
  'QS' |
  'SV'