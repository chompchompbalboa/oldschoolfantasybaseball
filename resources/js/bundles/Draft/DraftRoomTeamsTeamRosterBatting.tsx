//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import { 
  allDraftRosterSpotsBatting
} from '@/state/draft/defaults'

import DraftRoomTeamsTeamRosterSpot from '@draft/DraftRoomTeamsTeamRosterSpot'
import DraftRoomTeamsTeamRosterStatCategories from '@draft/DraftRoomTeamsTeamRosterStatCategories'
import DraftRoomTeamsTeamRosterStatCategory from '@draft/DraftRoomTeamsTeamRosterStatCategory'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsTeamRosterBatting = ({
  draftId,
  teamId
}: IDraftRoomTeamsTeamRosterBatting) => {

  // Redux
  const draftRoster = useSelector((state: IAppState) => state.draft.allDrafts[draftId].roster)
  const draftStatCategoriesBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesBatting)

  const teamRosterSpotsBatting: React.ReactElement[] = []
  let rosterSpotHasBackground: boolean = false
  allDraftRosterSpotsBatting.forEach(rosterSpotBatting => {
    const rosterSpotCount = draftRoster.batting[rosterSpotBatting]
    for(let i = 0; i < rosterSpotCount; i++) {
      teamRosterSpotsBatting.push(
        <DraftRoomTeamsTeamRosterSpot
          key={rosterSpotBatting + i}
          draftId={draftId}
          hasBackground={rosterSpotHasBackground}
          rosterSpot={rosterSpotBatting}
          statCategories={draftStatCategoriesBatting}
          teamId={teamId}/> 
      )
      rosterSpotHasBackground = !rosterSpotHasBackground
    }
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
      statCategories={statCategoriesBatting}/>
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