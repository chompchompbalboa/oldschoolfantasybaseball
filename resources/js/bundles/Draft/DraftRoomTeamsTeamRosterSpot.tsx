//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import { 
  IDraft, 
  IDraftRosterSpotBatting,
  IDraftRosterSpotPitching
} from '@/state/draft/types'
import {
  IBattingStats,
  IPitchingStats,
  IStatCategoryBatting,
  IStatCategoryPitching
} from '@/state/stats/types'
import { ITeam } from '@/state/team/types'

import {
  allDraftRosterSpotsBatting
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsTeam = ({
  draftId,
  statsId,
  teamId,
  hasBackground,
  position,
  statCategories
}: IDraftRoomTeamsTeam) => {


  // @ts-ignore
  const stats = useSelector((state: IAppState) => allDraftRosterSpotsBatting.includes(position) 
    ? state.stats.allBattingStats[statsId]
    : state.stats.allPitchingStats[statsId]
  )
  const player = useSelector((state: IAppState) => state.player.allPlayers[stats.playerID])
  const rosterSpotStatCategories: React.ReactElement[] = [ ...statCategories ].map(statCategory => {
    // @ts-ignore
    const value = stats[statCategory]
    return (
      <StatCategory
        key={statCategory}>
        {value}
      </StatCategory>
    )
  })

  return (
    <Container
      hasBackground={hasBackground}>
      {[
        <StatCategory
          key="name">
          {player.name}
        </StatCategory>,
        <StatCategory
          key="year">
          {stats.yearID}
        </StatCategory>,
        <StatCategory
          key="position">
          {position}
        </StatCategory>,
        ...rosterSpotStatCategories
      ]}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTeamsTeam {
  draftId: IDraft['id']
  statsId: IBattingStats['ID'] | IPitchingStats['ID']
  teamId: ITeam['id']
  hasBackground: boolean
  position: IDraftRosterSpotBatting | IDraftRosterSpotPitching
  statCategories: IStatCategoryBatting[] | IStatCategoryPitching[]
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.tr`
  background-color: ${ ({ hasBackground }: IContainer ) => hasBackground ? 'rgb(245, 245, 245)' : 'transparent' };
`
interface IContainer {
  hasBackground: boolean
}

const StatCategory = styled.td`
  text-align: center;
`

export default DraftRoomTeamsTeam
