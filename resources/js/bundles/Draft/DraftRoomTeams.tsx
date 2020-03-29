//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import DraftRoomContent from '@draft/DraftRoomContent'
import DraftRoomContentChoice from '@draft/DraftRoomContentChoice'
import DraftRoomTeamsContentChoice from '@draft/DraftRoomTeamsContentChoice'
import DraftRoomTeamsTeam from '@draft/DraftRoomTeamsTeam'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeams = ({
  draftId,
  isActiveContent
}: IDraftRoomTeams) => {

  // Redux
  const draftTeams = useSelector((state: IAppState) => state.draft.allDrafts[draftId].teams)

  // State
  const [ activeTeamId, setActiveTeamId ] = useState(draftTeams[0])

  // Draft Room Content Choices
  const draftRoomContentChoices = draftTeams.map(draftTeamId => {
    return (
      <DraftRoomContentChoice
        key={draftTeamId}
        isActive={activeTeamId === draftTeamId}>
        <DraftRoomTeamsContentChoice
          setActiveTeamId={setActiveTeamId}
          teamId={draftTeamId}/>
      </DraftRoomContentChoice>
    )
  })

  return (
    <DraftRoomContent
      isActiveContent={isActiveContent}
      contentChoices={draftRoomContentChoices}>
      <DraftRoomTeamsTeam
        teamId={activeTeamId}/>
    </DraftRoomContent>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTeams {
  draftId: IDraft['id']
  isActiveContent: boolean
}

export default DraftRoomTeams
