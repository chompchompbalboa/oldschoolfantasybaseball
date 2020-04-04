//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import {
  IDraft
} from '@/state/draft/types'
import {
  IAllPlayerSeasonsBatting,
  IAllPlayerSeasonsPitching,
  IPositionBatting,
  IPositionPitching,
  IPlayerSeasonBatting,
  IPlayerSeasonPitching,
} from '@/state/playerSeason/types'

import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRosterSpot = ({ 
  eligiblePlayerSeasons,
  makeDraftPick,
  position,
  positionNames,
  playerSeasons,
  rosterSpotIndex
}: IDraftRosterSpot) => {

  // Refs
  const container = useRef()

  // State
  const [ activeDropdownOptionIndex, setActiveDropdownIndex ] = useState(0)
  const [ inputValue, setInputValue ] = useState('')
  const [ isDropdownVisible, setIsDropdownVisible ] = useState(false)
  const [ isDraftPickMade, setIsDraftPickMade ] = useState(false)

  // Handle Make Draft Pick
  const handleMakeDraftPick = () => {
    setIsDropdownVisible(false)
    if(visiblePlayerSeasons) {
      const playerSeason = playerSeasons[visiblePlayerSeasons[activeDropdownOptionIndex]]
      setInputValue(playerSeason.name + " " + playerSeason.year)
      makeDraftPick(position, rosterSpotIndex, playerSeason)
      setIsDraftPickMade(true)
    }
  }

  // Visible Player Seasons
  const visiblePlayerSeasons = inputValue && [ ...eligiblePlayerSeasons ].filter(playerSeasonId => {
      const playerSeason = playerSeasons[playerSeasonId]
      return playerSeason && playerSeason.name && playerSeason.year &&
      (playerSeason.name + playerSeason.year).split(' ').join('').toLowerCase().includes(inputValue.split(' ').join('').toLowerCase())
    }
  ).filter((_, index) => index < 25)

  return (
    <Container
      ref={container}>
      <RosterSpot>
        {positionNames[position]}
      </RosterSpot>
      <DraftPickContainer>
        {isDraftPickMade
          ? <DraftPick>
              Draft Pick
            </DraftPick>
          : <>
              <DraftPickInput
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
                selectDropdownOption={handleMakeDraftPick}
                setActiveDropdownOptionIndex={setActiveDropdownIndex}>
                {visiblePlayerSeasons 
                  ? visiblePlayerSeasons.map((playerSeasonId, index) => {
                      const playerSeason = playerSeasons[playerSeasonId]
                      return (
                        <DraftPickDropdownOption 
                          key={playerSeason.name + playerSeason.year}
                          isActive={activeDropdownOptionIndex === index}
                          onClick={handleMakeDraftPick}
                          onMouseEnter={() => setActiveDropdownIndex(index)}>
                          {playerSeason.name} {playerSeason.year}
                        </DraftPickDropdownOption>
                      )
                    })
                  : <DraftPickDropdownOption
                      isActive={false}>
                      Start typing to see available players
                    </DraftPickDropdownOption>
                }
              </DraftPickDropdown>
            </>
        }
      </DraftPickContainer>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRosterSpot {
  draftId: IDraft['id']
  eligiblePlayerSeasons: IPlayerSeasonBatting['playerSeasonId'][] | IPlayerSeasonPitching['playerSeasonId'][]
  makeDraftPick(
    position: IPositionBatting | IPositionPitching,
    rosterSpotIndex: number,
    playerSeason: IPlayerSeasonBatting | IPlayerSeasonPitching
  ): void
  position: IPositionBatting | IPositionPitching
  positionNames: {
    [position: string]: string
  }
  playerSeasons: IAllPlayerSeasonsBatting | IAllPlayerSeasonsPitching
  rosterSpotIndex: number
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

const DraftPick = styled.div`
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

export default DraftRosterSpot
