//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import { updateDraft } from '@/state/draft/actions'
import { setAllTeams } from '@/state/team/actions'

import { defaultTeam } from '@/state/team/defaults'

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
  const dispatch = useDispatch()
  const allTeams = useSelector((state: IAppState) => state.team.allTeams)
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
          draftId={draftId}
          setActiveTeamId={setActiveTeamId}
          teamId={draftTeamId}/>
      </DraftRoomContentChoice>
    )
  })
  return (
    <DraftRoomContent
      isActiveContent={isActiveContent}
      contentChoices={[ 
        ...draftRoomContentChoices,
        <DraftRoomContentChoice
          key="AddTeam"
          onClick={() => {
            const newTeam = defaultTeam("Team " + (draftTeams.length + 1))
            dispatch(setAllTeams({
              ...allTeams,
              [newTeam.id]: newTeam
            }))
            dispatch(updateDraft(draftId, {
              teams: [ ...draftTeams, newTeam.id ]
            }))
          }}>
          Add Team
        </DraftRoomContentChoice>
      ]}>
      <DraftRoomTeamsTeam
        draftId={draftId}
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
