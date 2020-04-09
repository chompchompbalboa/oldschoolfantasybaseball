//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import Dropdown from '@/components/Dropdown'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRosterChooseVisibleRoster = ({
  draftId,
  usersTeamId,
  visibleTeamId,
  setVisibleTeamId
}: IDraftRosterChooseVisibleRoster) => {

  const container = useRef()

  const [ activeDropdownOptionIndex, setActiveDropdownOptionIndex ] = useState(0)
  const [ isDropdownVisible, setIsDropdownVisible ] = useState(false)

  const allTeams = useSelector((state: IAppState) => state.team.allTeams)
  const draftTeams = useSelector((state: IAppState) => state.draft.allDrafts[draftId].teams)

  const handleSetVisibleTeamId = () => {
    setIsDropdownVisible(false)
    setVisibleTeamId(draftTeams[activeDropdownOptionIndex])
  }
  return (
    <Container
      ref={container}>
      <CurrentTeam
        isUsersTeam={visibleTeamId === usersTeamId}
        onClick={() => setIsDropdownVisible(true)}>
        {allTeams[visibleTeamId].name}
      </CurrentTeam>
      <Dropdown
        activeDropdownOptionIndex={activeDropdownOptionIndex}
        containerRef={container}
        closeDropdown={() => setIsDropdownVisible(false)}
        dropdownOptions={draftTeams}
        isDropdownVisible={isDropdownVisible}
        selectDropdownOption={handleSetVisibleTeamId}>
        {draftTeams.map((teamId, index) => (
          <DropdownOption
            key={teamId}
            isVisibleTeam={visibleTeamId === teamId}
            onClick={handleSetVisibleTeamId}
            onMouseEnter={() => setActiveDropdownOptionIndex(index)}>
            {allTeams[teamId].name}
          </DropdownOption>
        ))}
      </Dropdown>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRosterChooseVisibleRoster {
  draftId: IDraft['id']
  usersTeamId: ITeam['id']
  visibleTeamId: ITeam['id']
  setVisibleTeamId(nextVisibleTeamId: ITeam['id']): void
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  background-color: rgb(240, 240, 240);
`

const CurrentTeam = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${ ({ isUsersTeam }: ICurrentTeam ) => isUsersTeam ? 'bold' : 'inherit' };
`
interface ICurrentTeam {
  isUsersTeam: boolean
}

const DropdownOption = styled.div`
  padding: 0.5rem;
  font-weight: ${ ({ isVisibleTeam }: IDropdownOption ) => isVisibleTeam ? 'bold' : 'inherit' };
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`
interface IDropdownOption {
  isVisibleTeam: boolean
}


export default DraftRosterChooseVisibleRoster
