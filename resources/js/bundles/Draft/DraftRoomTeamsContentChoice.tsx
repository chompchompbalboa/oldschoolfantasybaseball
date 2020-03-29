//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { CLOSE } from '@/assets/icons'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import { updateDraft } from '@/state/draft/actions'
import { updateTeam } from '@/state/team/actions'

import Icon from '@/components/Icon'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsContentChoice = ({
  draftId,
  teamId,
  setActiveTeamId
}: IDraftRoomTeamsContentChoice) => {

  // Redux
  const dispatch = useDispatch()
  const draftTeams = useSelector((state: IAppState) => state.draft.allDrafts[draftId].teams)
  const team = useSelector((state: IAppState) => state.team.allTeams[teamId])

  return (
    <Container>
      <TeamName
        onClick={() => setActiveTeamId(teamId)}>
        <TeamNameInput
          value={team.name}
          onChange={e => {
            dispatch(updateTeam(teamId, { name: e.target.value }))
          }}/>
      </TeamName>
      <DeleteTeam
        onClick={() => {
          dispatch(updateDraft(draftId, {
            teams: draftTeams.filter(currentTeamId => currentTeamId !== teamId)
          }))
        }}>
        <Icon
          icon={CLOSE}/>
      </DeleteTeam>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTeamsContentChoice {
  draftId: IDraft['id']
  teamId: ITeam['id']
  setActiveTeamId(nextActiveTeamId: ITeam['id']): void
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: inherit;
`

const TeamName = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: inherit;
`

const TeamNameInput = styled.input`
  cursor: pointer;
  width: 10rem;
  font-size: inherit;
  padding: 0.25rem;
  border: none;
  outline: none;
  background-color: transparent;
  text-align: center;
  font-weight: inherit;
`

const DeleteTeam = styled.div`
  padding-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: rgb(200, 0, 0);
  }
`

export default DraftRoomTeamsContentChoice