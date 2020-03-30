//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
import { 
  IPlayerActions,
  SET_ALL_PLAYERS
} from '@/state/player/actions'

import { 
  IAllPlayers,
  IPlayer
} from '@/state/player/types'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
// @ts-ignore
const initialDataPlayers = initialDraftData.players as IPlayer[]
const initialDataAllPlayers = {} as IAllPlayers
const initialDataAllPlayerIds = [] as IPlayer['id'][]
initialDataPlayers.forEach((player: IPlayer) => {
  initialDataAllPlayerIds.push(player.id)
  initialDataAllPlayers[player.id] = player
})

export type IPlayerState = {
  allPlayerIds: IPlayer['id'][]
  allPlayers: IAllPlayers
}

export const initialDraftState: IPlayerState = {
  allPlayerIds: initialDataAllPlayerIds,
  allPlayers: initialDataAllPlayers
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
export const playerReducer = (state = initialDraftState, action: IPlayerActions): IPlayerState => {
	switch (action.type) {

    case SET_ALL_PLAYERS: {
      const { nextAllPlayers } = action
      return {
        ...state,
        allPlayers: nextAllPlayers
      }
    }

		default:
			return state
	}
}

export default playerReducer
