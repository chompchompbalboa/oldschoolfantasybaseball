//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { 
	IAllPlayers
} from '@/state/player/types'

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export type IPlayerActions = 
	ISetAllPlayers

//-----------------------------------------------------------------------------
// Set All Drafts
//-----------------------------------------------------------------------------
export const SET_ALL_PLAYERS = 'SET_ALL_PLAYERS'
interface ISetAllPlayers {
  type: typeof SET_ALL_PLAYERS
  nextAllPlayers: IAllPlayers
}

export const setAllPlayers = (nextAllPlayers: IAllPlayers): IPlayerActions => {
	return {
		type: SET_ALL_PLAYERS,
		nextAllPlayers
	}
}