//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import {
  IDraftRosterSpotBatting,
  IDraftRosterSpotPitching
} from '@/state/draft/types'

import {
  allDraftRosterSpotNames
} from '@/state/draft/defaults'

import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const IDraftSoloRosterSpot = ({ 
  rosterSpot 
}: IIDraftSoloRosterSpot) => {

  // Redux
  const allPlayerIds = useSelector((state: IAppState) => state.player.allPlayerIds)
  const allPlayers = useSelector((state: IAppState) => state.player.allPlayers)

  // State
  const [ inputValue, setInputValue ] = useState('')
  const [ isDropdownVisible, setIsDropdownVisible ] = useState(false)


  const dropdownOptions = inputValue
    ? allPlayerIds.filter(playerId => 
          allPlayers[playerId].name.toLowerCase().includes(inputValue.toLowerCase())
        ).filter((_, index) => index < 5).map(playerId => (
        <div 
          key={playerId}>
          {allPlayers[playerId].name}
        </div>
      ))
    : <div>Start typing to see available players</div>

  return (
    <Container>
      <RosterSpot>
        {allDraftRosterSpotNames[rosterSpot]}
      </RosterSpot>
      <DraftPickContainer>
        <DraftPickInput
          onBlur={() => setIsDropdownVisible(false)}
          onChange={nextInputValue => setInputValue(nextInputValue)}
          onFocus={() => setIsDropdownVisible(true)}
          value={inputValue}/>
        <DraftPickDropdown
          closeDropdown={() => setIsDropdownVisible(false)}
          isDropdownVisible={isDropdownVisible}>
          {dropdownOptions}
        </DraftPickDropdown>
      </DraftPickContainer>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IIDraftSoloRosterSpot {
  rosterSpot: IDraftRosterSpotBatting | IDraftRosterSpotPitching
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid rgb(240, 240, 240);
  display: flex;
  align-items: center;
  overflow-y: visible
`

const RosterSpot = styled.div`
  padding: 0.5rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgb(240, 240, 240);
`

const DraftPickContainer = styled.div`
  width: 100%;
  height: 100%;
`

const DraftPickInput = styled(Input)`
  width: 100%;
  height: 100%;
`

const DraftPickDropdown = styled(Dropdown)`
  background-color: rgb(250, 250, 250);
  padding: 1rem 0.5rem; 
`

export default IDraftSoloRosterSpot
