//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { 
    IAllPlayerSeasonsBatting,
    IPlayerSeasonsByPositionBatting,
    IAllPlayerSeasonsPitching,
    IPlayerSeasonsByPositionPitching
} from '@/state/playerSeason/types'

//-----------------------------------------------------------------------------
// Initial Data
//-----------------------------------------------------------------------------
declare global {
	const initialData: IInitialData
	interface IInitialData {
        allPlayerSeasonsBatting: IAllPlayerSeasonsBatting
        playerSeasonsByPositionBatting: IPlayerSeasonsByPositionBatting
        allPlayerSeasonsPitching: IAllPlayerSeasonsPitching
        playerSeasonsByPositionPitching: IPlayerSeasonsByPositionPitching
	}
}
export {} // Typescript needs this file to be a module
