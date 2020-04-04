//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState} from '@/state'
import { IDraft } from '@/state/draft/types'
import { IStatCategoryBatting } from '@/state/playerSeason/types'
import { ITeam } from '@/state/team/types'

import { 
  allPositionsBatting
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftSoloHeaderDraftingBatting = ({
  draftId,
  teamId
}: IDraftSoloHeaderDraftingBatting) => {

  const allPlayerSeasonsBatting = useSelector((state: IAppState) => state.playerSeason.allPlayerSeasonsBatting)
  const teamDraftPicksBatting = useSelector((state: IAppState) => draftId && teamId && state.draft.allDrafts[draftId].draftPicksByTeamBatting[teamId])
  const draftStatCategoriesBatting = useSelector((state: IAppState) => state.draft.allDrafts[draftId].statCategoriesBatting)

  const sumStatCategory = (statCategory: IStatCategoryBatting) => {
    return allPositionsBatting
            .map(currentPosition => teamDraftPicksBatting[currentPosition]
                                      .map(playerSeasonId => playerSeasonId && allPlayerSeasonsBatting[playerSeasonId] 
                                                              ? allPlayerSeasonsBatting[playerSeasonId].stats[statCategory] 
                                                              : 0
                                      )
                                      .reduce((total, currentPlayerSeasonStat) => total + Number(currentPlayerSeasonStat), 0)
            )
            .reduce((total, currentPositionStat) => total + Number(currentPositionStat), 0)
  }

  const statCategories = {
    AB: {
      name: 'AB',
      value: () => sumStatCategory('AB')
    },
    AVG: {
      name: 'AVG',
      value: () => (sumStatCategory('H') / Math.max(1, sumStatCategory('AB'))).toFixed(3).replace('0.', '.')
    },
    H: {
      name: 'H',
      value: () => sumStatCategory('H')
    },
    HR: {
      name: 'HR',
      value: () => sumStatCategory('HR')
    },
    R: {
      name: 'R',
      value: () => sumStatCategory('R')
    },
    RBI: {
      name: 'RBI',
      value: () => sumStatCategory('RBI')
    },
    SB: {
      name: 'SB',
      value: () => sumStatCategory('SB')
    }
  }

  return (
    <Container>
      {draftStatCategoriesBatting.map((draftStatCategory => (
        <Stat
          key={draftStatCategory}>
          <StatName>
            {statCategories[draftStatCategory].name}:
          </StatName>
          <StatValue>
            {statCategories[draftStatCategory].value()}
          </StatValue>
        </Stat>
      )))}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftSoloHeaderDraftingBatting {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
`

const Stat = styled.div`
  margin-left: 0.5rem;
  display: flex;
`

const StatName = styled.div``

const StatValue = styled.div`
  margin-left: 0.25rem;
`

export default DraftSoloHeaderDraftingBatting
