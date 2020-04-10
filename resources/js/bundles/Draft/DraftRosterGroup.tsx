//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { ReactElement } from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRosterGroup = ({
  header,
  rosterSpots
}: IDraftRosterGroup) => {

  return (
    <Container>
      {header && <Header />}
      <RosterSpots>
        {rosterSpots}
      </RosterSpots>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRosterGroup {
  header: boolean
  rosterSpots: ReactElement[]
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

const Header = styled.div`
  height: 1rem;
  background-color: rgb(240, 240, 240);
`

const RosterSpots = styled.div``

export default DraftRosterGroup
