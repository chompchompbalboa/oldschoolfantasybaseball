//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftRoomTeamsTeamRosterSpot from '@draft/DraftRoomTeamsTeamRosterSpot'
import DraftRoomTeamsTeamRosterStatCategories from '@draft/DraftRoomTeamsTeamRosterStatCategories'
import DraftRoomTeamsTeamRosterStatCategory from '@draft/DraftRoomTeamsTeamRosterStatCategory'

import {
  allDraftRosterSpotsBatting
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsTeamRosterBatting = ({
  draftId,
  teamId
}: IDraftRoomTeamsTeamRosterBatting) => {

  // Redux
  const draftPicks = useSelector((state: IAppState) => state.draft.allDrafts[draftId].picks)
  const draftStatCategoriesBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesBatting)
  const allBattingStats = useSelector((state: IAppState) => state.stats.allBattingStats)

  const teamRosterSpotsBatting: React.ReactElement[] = []
  let rosterSpotHasBackground: boolean = false
  Object.keys(draftPicks).forEach(draftPickId => {
    const draftPick = draftPicks[draftPickId]
    // @ts-ignore
    if(draftPick.teamId === teamId && allDraftRosterSpotsBatting.includes(draftPick.position) ) {
      teamRosterSpotsBatting.push(
        <DraftRoomTeamsTeamRosterSpot
          key={draftPickId}
          draftId={draftId}
          hasBackground={rosterSpotHasBackground}
          position={draftPick.position}
          statCategories={draftStatCategoriesBatting}
          statsId={draftPick.statsId}
          teamId={teamId}/> 
      )
    }
  })

  const statCategoriesTotals: React.ReactElement[] = draftStatCategoriesBatting.map(statCategoryBatting => {
    let total = 0
    Object.keys(draftPicks).forEach(draftPickId => {
      const draftPick = draftPicks[draftPickId]
      // @ts-ignore
      if(draftPick.teamId === teamId && allDraftRosterSpotsBatting.includes(draftPick.position)) {
        total = total + allBattingStats[draftPick.statsId][statCategoryBatting]
      }
    })
    return (
      <td style={{ textAlign: "center"}} key={statCategoryBatting}>{total}</td>
    )
  })

  const statCategoriesBatting: React.ReactElement[] = draftStatCategoriesBatting.map(statCategoryBatting => (
    <DraftRoomTeamsTeamRosterStatCategory
      key={statCategoryBatting}
      statCategory={statCategoryBatting}/>
  ))

  return (
    <DraftRoomTeamsTeamRosterStatCategories
      header="Batting"
      rosterSpots={teamRosterSpotsBatting}
      statCategories={statCategoriesBatting}
      totals={statCategoriesTotals}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTeamsTeamRosterBatting {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

export default DraftRoomTeamsTeamRosterBatting