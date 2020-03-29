//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import { ITeam } from '@/state/team/types'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsContentChoice = ({
  teamId,
  setActiveTeamId
}: IDraftRoomTeamsContentChoice) => {

  const team = useSelector((state: IAppState) => state.team.allTeams[teamId])

  return (
    <Container
      onClick={() => setActiveTeamId(teamId)}>
      {team.name}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTeamsContentChoice {
  teamId: ITeam['id']
  setActiveTeamId(nextActiveTeamId: ITeam['id']): void
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: inherit;
`

export default DraftRoomTeamsContentChoice