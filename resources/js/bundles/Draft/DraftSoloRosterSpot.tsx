//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useRef, useState } from 'react'
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

  // Refs
  const container = useRef()

  // Redux
  const allPlayerSeasonsEligibleAtRosterSpot = useSelector((state: IAppState) => state.player.allPlayerSeasonsByPosition[rosterSpot])

  // State
  const [ activeDropdownOptionIndex, setActiveDropdownIndex ] = useState(0)
  const [ inputValue, setInputValue ] = useState('')
  const [ isDropdownVisible, setIsDropdownVisible ] = useState(false)

  // Visible Player Seasons
  const visiblePlayerSeasons = inputValue && allPlayerSeasonsEligibleAtRosterSpot.filter(playerSeason => 
    (playerSeason.name + playerSeason.year).split(' ').join('').toLowerCase().includes(inputValue.split(' ').join('').toLowerCase())
  ).filter((_, index) => index < 25)

  const handleDraftPick = () => {
    const playerSeason = visiblePlayerSeasons[activeDropdownOptionIndex]
    setIsDropdownVisible(false)
    setInputValue(playerSeason.name + " " + playerSeason.year)
  }

  return (
    <Container
      ref={container}>
      <RosterSpot>
        {allDraftRosterSpotNames[rosterSpot]}
      </RosterSpot>
      <DraftPickContainer>
        <DraftPickInput
          onBlur={() => setIsDropdownVisible(false)}
          onChange={nextInputValue => {
            setIsDropdownVisible(true)
            setInputValue(nextInputValue)
          }}
          onFocus={() => setIsDropdownVisible(true)}
          value={inputValue}/>
        <DraftPickDropdown
          activeDropdownOptionIndex={activeDropdownOptionIndex}
          closeDropdown={() => setIsDropdownVisible(false)}
          containerRef={container}
          dropdownOptionsLength={visiblePlayerSeasons.length}
          isDropdownVisible={isDropdownVisible}
          selectDropdownOption={handleDraftPick}
          setActiveDropdownOptionIndex={setActiveDropdownIndex}>
          {visiblePlayerSeasons 
            ? visiblePlayerSeasons.map((playerSeason, index) => (
                <DraftPickDropdownOption 
                  key={playerSeason.name + playerSeason.year}
                  isActive={activeDropdownOptionIndex === index}
                  onMouseEnter={() => setActiveDropdownIndex(index)}>
                  {playerSeason.name} {playerSeason.year}
                </DraftPickDropdownOption>
              ))
            : <DraftPickDropdownOption
                isActive={false}>
                Start typing to see available players
              </DraftPickDropdownOption>
          }
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
`

const DraftPickDropdownOption = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  background-color: ${ ({ isActive }: IDraftPickDropdownOption) => isActive ? 'rgb(240, 240, 240)'  : 'transparent' };
`
interface IDraftPickDropdownOption {
  isActive: boolean
}

export default IDraftSoloRosterSpot
