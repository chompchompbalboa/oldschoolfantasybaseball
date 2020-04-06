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
import { ITeam } from '@/state/team/types'

import { 
  allPositionsBatting,
  allPositionsPitching,
  allStatCategoriesBattingNames,
  allStatCategoriesPitchingNames
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Hook
//-----------------------------------------------------------------------------
export const useGetTeamStats = (
  draftId: IDraft['id'],
  teamId: ITeam['id']
) => {

  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const draftStatCategoriesBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesBatting)
  const teamDraftPicksBatting = useSelector((state: IAppState) => draftId && teamId && state.draft.allDrafts[draftId].draftPicksByTeamBatting[teamId])
  const allPlayerSeasonsPitching = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsPitching)
  const draftStatCategoriesPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesPitching)
  const teamDraftPicksPitching = useSelector((state: IAppState) => draftId && teamId && state.draft.allDrafts[draftId].draftPicksByTeamPitching[teamId])

  // Batting
  const sumStatCategoryBatting = (statCategory: IStatCategoryBatting) => {
    return allPositionsBatting
      .map(currentPosition => teamDraftPicksBatting[currentPosition]
        .map(playerSeasonId => playerSeasonId && allPlayerSeasonsBatting[playerSeasonId] 
            ? allPlayerSeasonsBatting[playerSeasonId].stats[statCategory] 
            : 0
        )
        .reduce((total, currentPlayerSeasonStat) => total + Number(currentPlayerSeasonStat), 0)
      )
      .reduce((total, currentPositionStat) => total + Number(currentPositionStat), 0)
  }
  const statCategoriesValuesBatting = {
    AB: () => sumStatCategoryBatting('AB'),
    AVG: () => (sumStatCategoryBatting('H') / Math.max(1, sumStatCategoryBatting('AB'))).toFixed(3).replace('0.', '.'),
    H: () => sumStatCategoryBatting('H'),
    HR: () => sumStatCategoryBatting('HR'),
    R: () => sumStatCategoryBatting('R'),
    RBI: () => sumStatCategoryBatting('RBI'),
    SB: () => sumStatCategoryBatting('SB')
  }

  // Pitching
  const sumStatCategoryPitching = (statCategory: IStatCategoryPitching) => {
    return allPositionsPitching
      .map(currentPosition => teamDraftPicksPitching[currentPosition]
        .map(playerSeasonId => playerSeasonId && allPlayerSeasonsPitching[playerSeasonId] 
            ? allPlayerSeasonsPitching[playerSeasonId].stats[statCategory] 
            : 0
        )
        .reduce((total, currentPlayerSeasonStat) => total + Number(currentPlayerSeasonStat), 0)
      )
      .reduce((total, currentPositionStat) => total + Number(currentPositionStat), 0)
  }
  const statCategoriesValuesPitching = {
    IPouts: () => (sumStatCategoryPitching('IPouts') / 3).toFixed(1),
    W: () => sumStatCategoryPitching('W'),
    SV: () => sumStatCategoryPitching('SV'),
    ERA: () => ((
      sumStatCategoryPitching('ER') / 
      Math.max((sumStatCategoryPitching('IPouts') / 3), 0.33)
    ) * 9).toFixed(2),
    WHIP: () => (
      (sumStatCategoryPitching('H') + sumStatCategoryPitching('BB') + sumStatCategoryPitching('IBB'))/ 
      Math.max((sumStatCategoryPitching('IPouts') / 3), 0.33)
    ).toFixed(3),
    SO: () => sumStatCategoryPitching('SO'),
    BB: () => sumStatCategoryPitching('BB'),
    ER: () => sumStatCategoryPitching('ER'),
    H: () => sumStatCategoryPitching('H'),
    IBB: () => sumStatCategoryPitching('IBB')
  }

  return {
    teamStatsBatting: draftStatCategoriesBatting.map(statCategory => ({ 
      name: allStatCategoriesBattingNames[statCategory],
      value: statCategoriesValuesBatting[statCategory]()
    })),
    teamStatsPitching: draftStatCategoriesPitching.map(statCategory => ({ 
      name: allStatCategoriesPitchingNames[statCategory],
      value: statCategoriesValuesPitching[statCategory]()
    }))
  }
}