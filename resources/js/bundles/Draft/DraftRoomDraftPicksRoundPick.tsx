//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

import { mutation } from '@/api'

import { IAppState } from '@/state'
import { 
  IDraft,
  IDraftRosterSpotBatting,
  IDraftRosterSpotPitching
} from '@/state/draft/types'
import { ITeam } from '@/state/team/types'
import { 
  IStatCategoryBatting,
  IStatCategoryPitching
} from '@/state/stats/types'

import { 
  updateDraft
} from '@/state/draft/actions'
import { 
  setAllBattingStats,
  setAllPitchingStats
} from '@/state/stats/actions'

import { 
  allDraftRosterSpotsBatting,
  allDraftRosterSpotsPitching,
  allDraftRosterSpotNames
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomDraftPicksRoundPick = ({
  draftId,
  teamId,
  round,
  pick
}: IDraftRoomDraftPicksRoundPick) => {

  const dispatch = useDispatch()
  const draft = useSelector((state: IAppState) => state.draft.allDrafts[draftId])
  const team = useSelector((state: IAppState) => state.team.allTeams[teamId])
  const allBattingStats = useSelector((state: IAppState) => state.stats.allBattingStats)
  const allPitchingStats = useSelector((state: IAppState) => state.stats.allPitchingStats)
  const allPlayerIds = useSelector((state: IAppState) => state.player.allPlayerIds)
  const allPlayers = useSelector((state: IAppState) => state.player.allPlayers)
  const draftPick = draft.picks[round + '.' + pick]
  const isPickDisabled = round > draft.currentRound || pick > draft.currentPick

  const draftPickStats = draftPick && draftPick.isLocked 
    // @ts-ignore
    ? allDraftRosterSpotsBatting.includes(draftPick.position)
      ? allBattingStats[draftPick.statsId]
      : allPitchingStats[draftPick.statsId]
    : null

  const [ errorMessage, setErrorMessage ] = useState('')
  const [ playerInputValue, setPlayerInputValue ] = useState('')
  const [ yearInputValue, setYearInputValue ] = useState('')
  const [ positionInputValue, setPositionInputValue ] = useState('' as IDraftRosterSpotBatting | IDraftRosterSpotPitching)

  const handleDraftPickSubmit = () => {
    setErrorMessage('')
    mutation.createDraftPick(
      playerInputValue, 
      Number(yearInputValue), 
      positionInputValue as IStatCategoryBatting | IStatCategoryPitching
    )
    .then(response => {
      const stats = response.data
      // @ts-ignore
      if(allDraftRosterSpotsBatting.includes(positionInputValue)) {
        dispatch(setAllBattingStats({
          ...allBattingStats,
          [stats.ID]: stats
        }))
      }
      // @ts-ignore
      if(allDraftRosterSpotsPitching.includes(positionInputValue)) {
        dispatch(setAllPitchingStats({
          ...allPitchingStats,
          [stats.ID]: stats
        }))
      }
      dispatch(updateDraft(draftId, {
        currentRound: pick === draft.teams.length ? round + 1 : round,
        currentPick: pick === draft.teams.length ? 1 : pick + 1,
        picks: {
          ...draft.picks,
          [round + '.' + pick]: {
            id: round + '.' + pick,
            teamId: team.id,
            position: positionInputValue,
            isLocked: true,
            statsId: stats.ID
          }
        }
      }))
    })
    .catch(() => {
      setTimeout(() => {
        setErrorMessage("That season could not be found")
      }, 250)
    })
  }

  const playerDataList = () => {
    return (
      <datalist id="players">
        {playerInputValue 
          ? allPlayerIds.filter(playerId => 
                allPlayers[playerId].name.toLowerCase().includes(playerInputValue.toLowerCase())
              ).filter((_, index) => index < 10).map(playerId => (
              <option 
                key={playerId}
                value={playerId}>
                {allPlayers[playerId].name} ({playerId})
              </option>
            ))
          : null
        }
      </datalist>
    )
  }

  const yearDataList = () => {
    return (
      <datalist id="years">
        {_.times((draft.timePeriod.endYear - draft.timePeriod.startYear + 1), time => (
            <option
              key={time}
              value={draft.timePeriod.endYear - time} />
        ))}
      </datalist>
    )
  }

  const positionDataList = () => {
    return (
      <datalist id="positions">
        {allDraftRosterSpotsBatting.map(rosterSpot => (
          <option key={rosterSpot} value={rosterSpot}>
            {allDraftRosterSpotNames[rosterSpot]}
          </option>
        ))}
        {allDraftRosterSpotsPitching.map(rosterSpot => (
          <option key={rosterSpot} value={rosterSpot}>
            {allDraftRosterSpotNames[rosterSpot]}
          </option>
        ))}
      </datalist>
    )
  }

  return (
    <Container>
      <Header>
        { round }.{ pick } ({ team.name })
      </Header>
      <DraftPick>
        {draftPick && draftPick.isLocked
          ? <>
              <DraftPickInfo>
                {allPlayers[draftPickStats.playerID].name} / {draftPickStats.yearID} / {draftPick.position} 
              </DraftPickInfo>
            </>
          : <>
              <DraftPickInput
                disabled={isPickDisabled}
                list="players"
                onChange={e => setPlayerInputValue(e.target.value)}
                placeholder="Player"
                value={playerInputValue}/>
                {playerDataList()}
              <DraftPickInput
                disabled={isPickDisabled}
                list="years"
                onChange={e => setYearInputValue(e.target.value)}
                placeholder="Year"
                value={yearInputValue}
                width="5rem"/>
                {yearDataList()}
              <DraftPickInput
                disabled={isPickDisabled}
                list="positions"
                onChange={e => setPositionInputValue(e.target.value as IDraftRosterSpotBatting | IDraftRosterSpotPitching)}
                placeholder="Position"
                value={positionInputValue}
                width="5rem"/>
                {positionDataList()}
              <DraftPickSubmitButton
                onClick={handleDraftPickSubmit}
                disabled={isPickDisabled}>
                Submit Pick
              </DraftPickSubmitButton>
              <DraftPickErrorMessage>
                {errorMessage}
              </DraftPickErrorMessage>
            </>
        }
      </DraftPick>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomDraftPicksRoundPick {
  draftId: IDraft['id']
  teamId: ITeam['id']
  round: number
  pick: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  padding: 0.5rem;
  background-color: rgb(240, 240, 240);
`

const DraftPick = styled.div`
  padding: 0.5rem;
`

const DraftPickInput = styled.input`
  margin-right: 1rem;
  padding: 0.25rem;
  width: ${ ({ width = "10rem" }: IDraftPickInput ) => width };
  border: none;
  border-bottom: 1px solid rgb(200, 200, 200);
  outline: none;
  background-color: transparent;
  text-align: center;
  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`
interface IDraftPickInput {
  width?: string
}

const DraftPickSubmitButton = styled.button`
  padding: 0.25rem;
`

const DraftPickErrorMessage = styled.div`
`

const DraftPickInfo = styled.div``

export default DraftRoomDraftPicksRoundPick
