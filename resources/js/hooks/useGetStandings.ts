//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useSelector } from 'react-redux'

import { useGetTeamStats } from '@/hooks'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import {
  formatStatValue
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Hook
//-----------------------------------------------------------------------------
export const useGetStandings = (
  draftId: IDraft['id']
) => {

  const allTeams = useSelector((state: IAppState) => state.team.allTeams)
  const draftStatCategoriesBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesBatting)
  const draftStatCategoriesPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesPitching)
  const draftTeams = useSelector((state: IAppState) => state.draft.allDrafts[draftId].teams)

  const {
    allTeamStatValuesBatting,
    allTeamStatValuesPitching
  } = useGetTeamStats(draftId)

  // Batting
  const teamRanksByStatCategoryBatting: { 
    [statCategory: string]: {
      [teamId: string]: number
    } 
  } = {}
  draftStatCategoriesBatting.forEach(statCategory => {

    teamRanksByStatCategoryBatting[statCategory] = {}

    const teamsByStatValue: {
      [statValue: number]: ITeam['id'][]
    } = {}

    draftTeams.forEach(teamId => {
      teamRanksByStatCategoryBatting[statCategory][teamId] = 0
      const statValue = allTeamStatValuesBatting[teamId][statCategory] || 0
      teamsByStatValue[statValue]
        ? teamsByStatValue[statValue].push(teamId)
        : teamsByStatValue[statValue] = [ teamId ]
    })

    const rankedStatValues = Object.keys(teamsByStatValue).map(statValue => Number(statValue)).sort().reverse()

    let points = draftTeams.length
    rankedStatValues.forEach(statValue => {
      const teams = teamsByStatValue[statValue]
      if(teams.length === 1) {
        teamRanksByStatCategoryBatting[statCategory][teams[0]] = points
        points--
      }
      else {
        let totalPointsAvailable = 0
        for(let i = 0; i < teams.length; i++) {
          totalPointsAvailable = totalPointsAvailable + points
          points--
        }
        const eachTeamsPoints = totalPointsAvailable / teams.length
        teams.forEach(teamId => {
          teamRanksByStatCategoryBatting[statCategory][teamId] = eachTeamsPoints
        })
      }
    })
  })

  // Pitching
  const teamRanksByStatCategoryPitching: { 
    [statCategory: string]: {
      [teamId: string]: number
    } 
  } = {}
  draftStatCategoriesPitching.forEach(statCategory => {

    teamRanksByStatCategoryPitching[statCategory] = {}

    const teamsByStatValue: {
      [statValue: number]: ITeam['id'][]
    } = {}

    draftTeams.forEach(teamId => {
      teamRanksByStatCategoryPitching[statCategory][teamId] = 0
      const statValue = allTeamStatValuesPitching[teamId][statCategory] || 0
      teamsByStatValue[statValue]
        ? teamsByStatValue[statValue].push(teamId)
        : teamsByStatValue[statValue] = [ teamId ]
    })

    const sortedStatValues = Object.keys(teamsByStatValue).map(statValue => Number(statValue)).sort()
    const rankedStatValues = [ 'ERA', 'WHIP' ].includes(statCategory) 
      ? sortedStatValues
      : sortedStatValues.reverse()

    let points = draftTeams.length
    rankedStatValues.forEach(statValue => {
      const teams = teamsByStatValue[statValue]
      if(teams.length === 1) {
        teamRanksByStatCategoryPitching[statCategory][teams[0]] = points
        points--
      }
      else {
        let totalPointsAvailable = 0
        for(let i = 0; i < teams.length; i++) {
          totalPointsAvailable = totalPointsAvailable + points
          points--
        }
        const eachTeamsPoints = totalPointsAvailable / teams.length
        teams.forEach(teamId => {
          teamRanksByStatCategoryPitching[statCategory][teamId] = eachTeamsPoints
        })
      }
    })
  })

  // Totals
  const teamsPointsOverall: {
    [teamId: string]: number
  } = {}
  draftTeams.forEach(teamId => {
    const battingPointsTotal = draftStatCategoriesBatting.reduce((total, statCategory) => 
      total + teamRanksByStatCategoryBatting[statCategory][teamId]
    , 0)
    const pitchingPointsTotal = draftStatCategoriesPitching.reduce((total, statCategory) => 
      total + teamRanksByStatCategoryPitching[statCategory][teamId]
    , 0)
    teamsPointsOverall[teamId] = battingPointsTotal + pitchingPointsTotal
  })

  const rankedTeams = Object.keys(teamsPointsOverall).sort((team1Id, team2Id) => {
    return teamsPointsOverall[team2Id] - teamsPointsOverall[team1Id]
  })

  const standings = rankedTeams.map(teamId => {
    const team = allTeams[teamId]
    const battingStats = draftStatCategoriesBatting.map(statCategory => ({
      statCategory: statCategory,
      value: formatStatValue[statCategory](allTeamStatValuesBatting[teamId][statCategory]),
      rank: teamRanksByStatCategoryBatting[statCategory][teamId]
    }))
    const pitchingStats = draftStatCategoriesPitching.map(statCategory => ({
      statCategory: statCategory,
      value: formatStatValue[statCategory](allTeamStatValuesPitching[teamId][statCategory]),
      rank: teamRanksByStatCategoryPitching[statCategory][teamId]
    }))
    return {
      id: teamId,
      name: team.name,
      stats: [
        ...battingStats,
        ...pitchingStats
      ],
      total: teamsPointsOverall[teamId]
    }
  })
  

  return {
    allTeamStatValuesBatting,
    allTeamStatValuesPitching,
    statCategories: [
      ...draftStatCategoriesBatting,
      ...draftStatCategoriesPitching
    ],
    standings
  }
}