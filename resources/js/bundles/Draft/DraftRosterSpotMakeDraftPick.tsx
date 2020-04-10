//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import {
  IAllPlayerSeasonsBatting,
  IAllPlayerSeasonsPitching,
  IPositionBatting,
  IPositionPitching,
  IPlayerSeason,
  IPlayerSeasonBatting,
  IPlayerSeasonPitching,
  IStatCategoryBatting,
  IStatCategoryPitching,
} from '@/state/playerSeason/types'

import { allStatCategories } from '@/state/draft/defaults'

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
  isUsersTeam,
  makeDraftPick,
  position,
  playerSeasons,
  positionIndex
}: IDraftRosterSpotMakeDraftPick) => {

  // Refs
  const container = useRef()
  const updateVisiblePlayerSeasonsTimeout = useRef(null)

  // Redux
  const hasDraftEnded = useSelector((state: IAppState) => state.draft.allDrafts[draftId].hasDraftEnded)

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

  // Close the dropdown when the draft has ended
  useEffect(() => {
    if(hasDraftEnded) {
      setIsDropdownVisible(false)
    }
  }, [ hasDraftEnded ])

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

    // Search the input value for filter operators
    const operators = [ ">", "<" ]
    const inputValueIncludesOperator = operators.some(operator => inputValue.includes(operator))
    let filterBy = 'NAME' as 'NAME' | 'STAT'
    let filters: { 
      statCategory: IStatCategoryBatting | IStatCategoryPitching
      operator: string
      statValue: number
    }[] = []

    // If a filter operator is present, parse the input value and generate the filters
    if(inputValueIncludesOperator) {
      const inputValueFilters = inputValue.split(",")
      inputValueFilters.forEach(inputValueFilter => {
        const filterOperator = operators.find(operator => inputValueFilter.includes(operator))
        if(filterOperator) {
          const statCategory = allStatCategories.find(statCategory => {
            const inputValueBeforeOperator = inputValueFilter.split(filterOperator)[0].trim()
            const inputValueStatCategory = inputValueBeforeOperator.substring(0, statCategory.length)
            return (
              statCategory.length === inputValueBeforeOperator.length &&
              statCategory.toLowerCase() === inputValueStatCategory.toLowerCase()
            )
          })
          if(statCategory) {
            const inputValueAfterOperator = inputValueFilter.split(filterOperator).slice(-1)[0].trim()
            const inputValueStatValue = Number(inputValueAfterOperator) 
            if(!isNaN(inputValueStatValue)) {
              filterBy = 'STAT'
              filters.push({
                operator: operators.find(operator => inputValueFilter.includes(operator)),
                statCategory: statCategory,
                statValue: inputValueStatValue
              })
            }
          }
        }
      })
    }

    // Filter the eligibile player seasons
    return inputValue && [ ...eligiblePlayerSeasons ].filter(playerSeasonId => {

        // Get the player season
        const playerSeason = playerSeasons[playerSeasonId]

        // Filter based on the player season stats
        if(filterBy === 'STAT' && playerSeason && playerSeason.stats) {
          return filters.every(filter => {
            switch(filter.operator) {
              case ">": {
                // @ts-ignore
                return playerSeason.stats[filter.statCategory] > filter.statValue
              }
              case "<": {
                // @ts-ignore
                return playerSeason.stats[filter.statCategory] < filter.statValue
              }
            }

          })
        }
        // Filter based on the player season name and the year
        else if(playerSeason && playerSeason.name && playerSeason.nameLast && playerSeason.year) {
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
    ).slice(0, 20)
  }

  return (
    <Container
      ref={container}>
      <DraftPickInput
        readOnly={!isUsersTeam || hasDraftEnded}
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
        isDropdownVisible={isUsersTeam && isDropdownVisible}
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
              <Underline>Search For Players By:</Underline><br/>
              - Name and Year (e.g. "Mike Trout 2012" or "Griffey 99")<br/>
              - Season Stat Totals (e.g "HR > 30" or "R > 100, SB > 25")
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
  isUsersTeam: boolean
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

const Underline = styled.span`
  text-decoration: underline;
  font-weight: bold;
`


export default DraftRosterSpotMakeDraftPick
