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
  draftId: IDraft['id']
) => {

  // Redux
  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const allPlayerSeasonsPitching = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsPitching)
  const draftStatCategoriesBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesBatting)
  const draftStatCategoriesPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesPitching)
  const draftPicksByTeamBatting = useSelector((state: IAppState) => draftId && state.draft.allDrafts[draftId].draftPicksByTeamBatting)
  const draftPicksByTeamPitching = useSelector((state: IAppState) => draftId && state.draft.allDrafts[draftId].draftPicksByTeamPitching)
  const draftTeams = useSelector((state: IAppState) => draftId && state.draft.allDrafts[draftId].teams)

  // Batting
  const sumStatCategoryBatting = (
    teamId: ITeam['id'],
    statCategory: IStatCategoryBatting
  ) => {
    const teamDraftPicksBatting = draftPicksByTeamBatting[teamId]
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
    AB: (teamId: ITeam['id']) => sumStatCategoryBatting(teamId, 'AB'),
    AVG: (teamId: ITeam['id']) => (sumStatCategoryBatting(teamId, 'H') / Math.max(1, sumStatCategoryBatting(teamId, 'AB'))),
    H: (teamId: ITeam['id']) => sumStatCategoryBatting(teamId, 'H'),
    HR: (teamId: ITeam['id']) => sumStatCategoryBatting(teamId, 'HR'),
    R: (teamId: ITeam['id']) => sumStatCategoryBatting(teamId, 'R'),
    RBI: (teamId: ITeam['id']) => sumStatCategoryBatting(teamId, 'RBI'),
    SB: (teamId: ITeam['id']) => sumStatCategoryBatting(teamId, 'SB')
  }

  // Pitching
  const sumStatCategoryPitching = (
    teamId: ITeam['id'],
    statCategory: IStatCategoryPitching
  ) => {
    const teamDraftPicksPitching = draftPicksByTeamPitching[teamId]
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
    IPouts: (teamId: ITeam['id']) => (sumStatCategoryPitching(teamId, 'IPouts') / 3),
    W: (teamId: ITeam['id']) => sumStatCategoryPitching(teamId, 'W'),
    SV: (teamId: ITeam['id']) => sumStatCategoryPitching(teamId, 'SV'),
    ERA: (teamId: ITeam['id']) => ((
      sumStatCategoryPitching(teamId, 'ER') / 
      Math.max((sumStatCategoryPitching(teamId, 'IPouts') / 3), 0.33)
    ) * 9),
    WHIP: (teamId: ITeam['id']) => (
      (sumStatCategoryPitching(teamId, 'H') + sumStatCategoryPitching(teamId, 'BB') + sumStatCategoryPitching(teamId, 'IBB'))/ 
      Math.max((sumStatCategoryPitching(teamId, 'IPouts') / 3), 0.33)
    ),
    SO: (teamId: ITeam['id']) => sumStatCategoryPitching(teamId, 'SO'),
    BB: (teamId: ITeam['id']) => sumStatCategoryPitching(teamId, 'BB'),
    ER: (teamId: ITeam['id']) => sumStatCategoryPitching(teamId, 'ER'),
    H: (teamId: ITeam['id']) => sumStatCategoryPitching(teamId, 'H'),
    IBB: (teamId: ITeam['id']) => sumStatCategoryPitching(teamId, 'IBB')
  }

  const allTeamStatValuesBatting: {
    [teamId: string]: {
      [statCategory: string]: number
    }
  } = {}
  const teamStatsBatting: {
    [teamId: string]: { 
      category: IStatCategoryBatting
      name: string, 
      value: number
    }[]
  } = {}
  draftTeams.forEach(teamId => {
    teamStatsBatting[teamId] = draftStatCategoriesBatting.map(statCategory => { 
      const statName = allStatCategoriesBattingNames[statCategory]
      const statValue = statCategoriesValuesBatting[statCategory](teamId)
      allTeamStatValuesBatting[teamId] = { ...allTeamStatValuesBatting[teamId] || {} }
      allTeamStatValuesBatting[teamId][statCategory] = statValue
      return {
        category: statCategory,
        name: statName,
        value: statValue
      }
    })
  })

  const allTeamStatValuesPitching: {
    [teamId: string]: {
      [statCategory: string]: number
    }
  } = {}
  const teamStatsPitching: {
    [teamId: string]: { 
      category: IStatCategoryPitching
      name: string, 
      value: number 
    }[]
  } = {}
  draftTeams.forEach(teamId => {
    teamStatsPitching[teamId] = draftStatCategoriesPitching.map(statCategory => { 
      const statName = allStatCategoriesPitchingNames[statCategory]
      const statValue = statCategoriesValuesPitching[statCategory](teamId)
      allTeamStatValuesPitching[teamId] = { ...allTeamStatValuesPitching[teamId] || {} }
      allTeamStatValuesPitching[teamId][statCategory] = statValue
      return {
        category: statCategory,
        name: statName,
        value: statValue
      }
    })
  })

  return {
    allTeamStatValuesBatting,
    allTeamStatValuesPitching,
    teamStatsBatting,
    teamStatsPitching
  }
}