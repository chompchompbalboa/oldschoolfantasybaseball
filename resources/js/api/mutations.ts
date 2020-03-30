//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from '@/api/axios'

import { IPlayer } from '@/state/player/types'
import { 
  IStatCategoryBatting,
  IStatCategoryPitching
} from '@/state/stats/types'

//-----------------------------------------------------------------------------
// Queries
//-----------------------------------------------------------------------------
export const createDraftPick = async (
  playerId: IPlayer['id'], 
  yearId: number, 
  position: IStatCategoryBatting | IStatCategoryPitching
) => {
	return axios.post('/api/draft/pick', { playerId, yearId, position })
}
