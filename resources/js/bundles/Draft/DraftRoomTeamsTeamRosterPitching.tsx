//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import { 
  allDraftRosterSpotsPitching
} from '@/state/draft/defaults'

import DraftRoomTeamsTeamRosterSpot from '@draft/DraftRoomTeamsTeamRosterSpot'
import DraftRoomTeamsTeamRosterStatCategories from '@draft/DraftRoomTeamsTeamRosterStatCategories'
import DraftRoomTeamsTeamRosterStatCategory from '@draft/DraftRoomTeamsTeamRosterStatCategory'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsTeamRosterPitching = ({
  draftId,
  teamId
}: IDraftRoomTeamsTeamRosterPitching) => {

  // Redux
  const draftRoster = useSelector((state: IAppState) => state.draft.allDrafts[draftId].roster)
  const draftStatCategoriesPitching = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesPitching)

  const teamRosterSpotsPitching: React.ReactElement[] = []
  let rosterSpotHasBackground: boolean = false
  allDraftRosterSpotsPitching.forEach(rosterSpotPitching => {
    const rosterSpotCount = draftRoster.pitching[rosterSpotPitching]
    for(let i = 0; i < rosterSpotCount; i++) {
      teamRosterSpotsPitching.push(
        <DraftRoomTeamsTeamRosterSpot
          key={rosterSpotPitching + i}
          draftId={draftId}
          hasBackground={rosterSpotHasBackground}
          rosterSpot={rosterSpotPitching}
          statCategories={draftStatCategoriesPitching}
          teamId={teamId}/> 
      )
      rosterSpotHasBackground = !rosterSpotHasBackground
    }
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
      statCategories={statCategoriesPitching}/>
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