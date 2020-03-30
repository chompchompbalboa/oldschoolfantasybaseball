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
  allDraftRosterSpotsPitching
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsTeamRosterPitching = ({
  draftId,
  teamId
}: IDraftRoomTeamsTeamRosterPitching) => {

  // Redux
  const draftPicks = useSelector((state: IAppState) => state.draft.allDrafts[draftId].picks)
  const draftStatCategoriesPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesPitching)
  const allPitchingStats = useSelector((state: IAppState) => state.stats.allPitchingStats)

  const teamRosterSpotsPitching: React.ReactElement[] = []
  let rosterSpotHasBackground: boolean = false
  Object.keys(draftPicks).forEach(draftPickId => {
    const draftPick = draftPicks[draftPickId]
    // @ts-ignore
    if(draftPick.teamId === teamId && allDraftRosterSpotsPitching.includes(draftPick.position)) {
      teamRosterSpotsPitching.push(
        <DraftRoomTeamsTeamRosterSpot
          key={draftPickId}
          draftId={draftId}
          hasBackground={rosterSpotHasBackground}
          position={draftPick.position}
          statCategories={draftStatCategoriesPitching}
          statsId={draftPick.statsId}
          teamId={teamId}/> 
      )
    }
  })

  const statCategoriesTotals: React.ReactElement[] = draftStatCategoriesPitching.map(statCategoryPitching => {
    let total = 0
    Object.keys(draftPicks).forEach(draftPickId => {
      const draftPick = draftPicks[draftPickId]
      // @ts-ignore
      if(draftPick.teamId === teamId && allDraftRosterSpotsPitching.includes(draftPick.position)) {
        total = total + allPitchingStats[draftPick.statsId][statCategoryPitching]
      }
    })
    return (
      <td style={{ textAlign: "center"}} key={statCategoryPitching}>{total}</td>
    )
  })

  const statCategoriesPitching: React.ReactElement[] = draftStatCategoriesPitching.map(statCategoryPitching => (
    <DraftRoomTeamsTeamRosterStatCategory
      key={statCategoryPitching}
      statCategory={statCategoryPitching}/>
  ))

  return (
    <DraftRoomTeamsTeamRosterStatCategories
      header="Pitching"
      rosterSpots={teamRosterSpotsPitching}
      statCategories={statCategoriesPitching}
      totals={statCategoriesTotals}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTeamsTeamRosterPitching {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

export default DraftRoomTeamsTeamRosterPitching