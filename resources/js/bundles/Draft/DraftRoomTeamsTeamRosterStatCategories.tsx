//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsTeamRosterStats = ({
  header,
  rosterSpots,
  statCategories,
}: IDraftRoomTeamsTeamRosterStats) => {

  return (
    <Container>
      <Header>
        {header}
      </Header>
      <RosterTable>
        <RosterTableHead>
          <StatCategories>
            {[
              <StatCategoryLabel
                key="Position">
                Position
              </StatCategoryLabel>,
              ...statCategories
            ]}
          </StatCategories>
        </RosterTableHead>
        <RosterSpots>
          {rosterSpots}
        </RosterSpots>
      </RosterTable>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTeamsTeamRosterStats {
  header: string
  rosterSpots: React.ReactElement[]
  statCategories: React.ReactElement[]
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

const Header = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: rgb(240, 240, 240);
  text-align: center;
`

const RosterTable = styled.table`
  width: 100%;
  table-layout: fixed;
`

const RosterTableHead = styled.thead`
`

const StatCategories = styled.tr``

const StatCategoryLabel = styled.th``

const RosterSpots = styled.tbody`
`

export default DraftRoomTeamsTeamRosterStats
