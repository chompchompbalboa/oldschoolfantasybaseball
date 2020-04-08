//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'
import {
  IAllPlayerSeasonsBatting,
  IAllPlayerSeasonsPitching,
  IPositionBatting,
  IPositionPitching,
  IPlayerSeason,
  IPlayerSeasonBatting,
  IPlayerSeasonPitching,
} from '@/state/playerSeason/types'

import DraftPickDropdownOption from '@draft/DraftRosterSpotMakeDraftPickDropdownOption'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRosterSpotMakeDraftPick = ({ 
  draftId,
  draftPickId,
  eligiblePlayerSeasons,
  makeDraftPick,
  position,
  playerSeasons,
  positionIndex
}: IDraftRosterSpotMakeDraftPick) => {

  // Refs
  const container = useRef()
  const updateVisiblePlayerSeasonsTimeout = useRef(null)

  // State
  const [ activeDropdownOptionIndex, setActiveDropdownOptionIndex ] = useState(0)
  const [ inputValue, setInputValue ] = useState('')
  const [ isDropdownVisible, setIsDropdownVisible ] = useState(false)
  const [ visiblePlayerSeasons, setVisiblePlayerSeasons ] = useState([] as IPlayerSeason['playerSeasonId'][])

  // Clear the input value when the draft pick is deleted
  useEffect(() => {
    if(draftPickId === null) {
      setInputValue('')
    }
  }, [ draftPickId ])

  // Update the visiblePlayerSeasons when the input value changes
  useEffect(() => {
    if([0, 1].includes(inputValue.length)) {
      setVisiblePlayerSeasons(getVisiblePlayerSeasons())
    }
    else {
      clearTimeout(updateVisiblePlayerSeasonsTimeout.current)
      updateVisiblePlayerSeasonsTimeout.current = setTimeout(() => {
        setVisiblePlayerSeasons(getVisiblePlayerSeasons())
      }, 100)
    }
  }, [ inputValue ])

  // Handle Make Draft Pick
  const handleMakeDraftPick = () => {
    setIsDropdownVisible(false)
    if(visiblePlayerSeasons) {
      const playerSeason = playerSeasons[visiblePlayerSeasons[activeDropdownOptionIndex]]
      if(playerSeason) {
        setInputValue(playerSeason.name + " " + playerSeason.year)
        makeDraftPick(position, positionIndex, playerSeason)
      }
    }
  }

  // Visible Player Seasons
  const getVisiblePlayerSeasons = () => {
    return inputValue && [ ...eligiblePlayerSeasons ].filter(playerSeasonId => {
        const playerSeason = playerSeasons[playerSeasonId]
        if(playerSeason && playerSeason.name && playerSeason.nameLast && playerSeason.year) {
          const playerNameSearchTerm = playerSeason.name.split(' ').join('').toLowerCase()
          const playerNameLastSearchTerm = playerSeason.nameLast.split(' ').join('').toLowerCase()
          const playerYearSearchTerm = playerSeason.year + ''
          const inputValueSearchTerm = inputValue.split(' ').join('').toLowerCase()
          const inputValueIncludesFullPlayerYear = 
            inputValueSearchTerm.includes(playerYearSearchTerm) ||
            inputValueSearchTerm.includes(playerYearSearchTerm.slice(-2))
          const playerNameIncludesInputValue = 
            playerNameSearchTerm.includes(inputValueSearchTerm) ||
            playerNameLastSearchTerm.includes(inputValueSearchTerm)
          const inputValueIncludesPlayerName = 
            inputValueSearchTerm.includes(playerNameLastSearchTerm)
          const inputValueIncludesPlayerYear = 
            (inputValue.slice(-2) === ' ' + playerYearSearchTerm.slice(0, 1) && !inputValueIncludesFullPlayerYear) ||
            (inputValue.slice(-2) === ' ' + playerYearSearchTerm.slice(2, 3) && !inputValueIncludesFullPlayerYear) ||
            (inputValueSearchTerm.slice(-2) === playerYearSearchTerm.slice(0, 2) && !inputValueIncludesFullPlayerYear) ||
            (inputValueSearchTerm.slice(-3) === playerYearSearchTerm.slice(0, 3) && !inputValueIncludesFullPlayerYear) ||
            inputValueIncludesFullPlayerYear
          return (
            playerNameIncludesInputValue ||
            inputValueIncludesPlayerName && inputValueIncludesPlayerYear
          )
        }
        return false
      }
    ).filter((_, index) => index < 25)
  }

  return (
    <Container
      ref={container}>
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
        dropdownOptions={visiblePlayerSeasons}
        isDropdownVisible={isDropdownVisible}
        selectDropdownOption={handleMakeDraftPick}
        setActiveDropdownOptionIndex={setActiveDropdownOptionIndex}>
        {visiblePlayerSeasons
          ? visiblePlayerSeasons.map((playerSeasonId, index) => {
            return (
              <DraftPickDropdownOption 
                key={playerSeasonId}
                draftId={draftId}
                playerSeasonId={playerSeasonId}
                isActive={activeDropdownOptionIndex === index}
                onClick={handleMakeDraftPick}
                onMouseEnter={() => setActiveDropdownOptionIndex(index)}/>
            )})
          : <DropdownOptionPlaceholder>
              Start typing to see eligible players...
            </DropdownOptionPlaceholder>
        }
      </DraftPickDropdown>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRosterSpotMakeDraftPick {
  draftId: IDraft['id']
  draftPickId: IPlayerSeasonBatting['playerSeasonId'] | IPlayerSeasonPitching['playerSeasonId'] | null
  eligiblePlayerSeasons: IPlayerSeasonBatting['playerSeasonId'][] | IPlayerSeasonPitching['playerSeasonId'][]
  makeDraftPick(
    position: IPositionBatting | IPositionPitching,
    positionIndex: number,
    playerSeason: IPlayerSeasonBatting | IPlayerSeasonPitching
  ): void
  position: IPositionBatting | IPositionPitching
  playerSeasons: IAllPlayerSeasonsBatting | IAllPlayerSeasonsPitching
  positionIndex: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
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

const DropdownOptionPlaceholder = styled.div`
  width: 100%;
  padding: 0.5rem;
`


export default DraftRosterSpotMakeDraftPick
