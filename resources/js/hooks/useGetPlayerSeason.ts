//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { 
  IStatCategoryBatting,
  IStatCategoryPitching
} from '@/state/playerSeason/types'
import { IDraft } from '@/state/draft/types'
import { IPlayerSeason } from '@/state/playerSeason/types'

import { 
  allStatCategoriesBattingNames,
  allStatCategoriesPitchingNames
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Hook
//-----------------------------------------------------------------------------
export const useGetPlayerSeason = (
  draftId: IDraft['id'],
  playerSeasonId: IPlayerSeason['playerSeasonId']
) => {

  // Redux
  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const allPlayerSeasonsPitching = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsPitching)
  const isBattingOrPitching = allPlayerSeasonsBatting[playerSeasonId]
    ? 'BATTING' 
    : 'PITCHING'
  const draftStatCategories = useSelector((state: IAppState) => isBattingOrPitching === 'BATTING' 
    ? state.draft.allDrafts[draftId].statCategoriesBatting
    : state.draft.allDrafts[draftId].statCategoriesPitching
  )

  // Get Stat Category Name
  const getStatCategoryName  = (
    statCategory: IStatCategoryBatting | IStatCategoryPitching
  ) => {
    return isBattingOrPitching === 'BATTING'
      ? allStatCategoriesBattingNames[statCategory as IStatCategoryBatting]
      : allStatCategoriesPitchingNames[statCategory as IStatCategoryPitching]
  }

  // Get Stat Category Value
  const getStatCategoryValue  = (
    statCategory: IStatCategoryBatting | IStatCategoryPitching
  ) => {
    return isBattingOrPitching === 'BATTING'
      ? allPlayerSeasonsBatting[playerSeasonId].stats[statCategory as IStatCategoryBatting]
      : allPlayerSeasonsPitching[playerSeasonId].stats[statCategory as IStatCategoryPitching]
  }

  // Player Season
  const playerSeason = isBattingOrPitching === 'BATTING'
    ? allPlayerSeasonsBatting[playerSeasonId]
    : allPlayerSeasonsPitching[playerSeasonId]

  return {
    playerSeason: {
      name: playerSeason.name,
      year: playerSeason.year,
      stats: [ ...draftStatCategories ].map(statCategory => {
        return {
          category: statCategory,
          name: getStatCategoryName(statCategory),
          value: getStatCategoryValue(statCategory)
        }
      })
    }
  }
}