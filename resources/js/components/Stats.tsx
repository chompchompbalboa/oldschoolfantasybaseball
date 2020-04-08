//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { 
  IStatCategoryBatting,
  IStatCategoryPitching 
} from '@/state/playerSeason/types'

import {
  formatStatValue
} from '@/state/draft/defaults'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const Stats = ({ 
  stats
}: IStats) => {

  return (
    <Container>
      {stats.map(stat => (
        <Stat
          key={stat.name}>
          <StatName>{stat.name}: </StatName>
          <StatValue>{formatStatValue[stat.category](stat.value)}</StatValue>
        </Stat>
      ))}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IStats {
  stats: {
    category: IStatCategoryBatting | IStatCategoryPitching
    name: string
    value: number
  }[]
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
`

const Stat = styled.div`
  width: 7rem;
  display: flex;
`

const StatName = styled.div`
  font-weight: bold;
`

const StatValue = styled.div`
  flex-grow: 1;
  text-align: center;
`

export default Stats
