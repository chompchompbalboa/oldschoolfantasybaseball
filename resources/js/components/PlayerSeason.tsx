//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import Stats from '@/components/Stats'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRosterSpotMakeDraftPick = ({ 
  playerSeason
}: IDraftRosterSpotMakeDraftPick) => {

  return (
    <Container>
      <Player>
        {playerSeason.name} {playerSeason.year}
      </Player>
      <Stats
        stats={playerSeason.stats}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRosterSpotMakeDraftPick {
  playerSeason: {
    name: string
    year: number
    stats: {
      name: string
      value: string | number
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

export default DraftRosterSpotMakeDraftPick
