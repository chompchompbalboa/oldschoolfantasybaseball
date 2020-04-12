//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { 
  IStatCategoryBatting, 
  IStatCategoryPitching 
} from '@/state/playerSeason/types'

import Stats from '@/components/Stats'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const PlayerSeason = ({ 
  isStatsVisible = true,
  playerSeason
}: IPlayerSeason) => {

  return (
    <Container>
      <Player>
        {playerSeason.name} {playerSeason.year}
      </Player>
      {isStatsVisible && 
        <Stats
          stats={playerSeason.stats}/>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IPlayerSeason {
  isStatsVisible?: boolean
  playerSeason: {
    name: string
    year: number
    stats: {
      category: IStatCategoryBatting | IStatCategoryPitching
      name: string
      value: number
    }[]
  }
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

const Player = styled.div`
  width: 20rem;
`

export default PlayerSeason
