//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState } from 'react'
import styled from 'styled-components'

import { useGetStandings } from '@/hooks'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const Standings = ({
  draftId,
  teamId
}: IStandings) => {

  const [ displayStandingsOrStats, setDisplayStandingsOrStats ] = useState('STANDINGS' as 'STANDINGS' | 'STATS')

  const { 
    standings,
    statCategories
  } = useGetStandings(draftId)

  return (
    <Container>
      <ToggleStandingsOrStats>
        <ToggleButton
          isActive={displayStandingsOrStats === 'STANDINGS'}
          onClick={() => setDisplayStandingsOrStats('STANDINGS')}>
          Standings
        </ToggleButton>
        <ToggleButton
          isActive={displayStandingsOrStats === 'STATS'}
          onClick={() => setDisplayStandingsOrStats('STATS')}>
          Stats
        </ToggleButton>
      </ToggleStandingsOrStats>
      <StyledTable>
        <thead>
          <StatCategories>
            {[ "Rank", "Team", ...statCategories, "Total" ].map(statCategory => (
              <StatCategory
                key={statCategory}>
                {statCategory}
              </StatCategory>
            )
            )}
          </StatCategories>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <Team
              key={team.id}
              isUsersTeam={team.id === teamId}>
              <TeamRank>
                {index + 1}
              </TeamRank>
              <TeamName>
                {team.name}
              </TeamName>
              {displayStandingsOrStats === 'STANDINGS'
                ? team.stats.map((stat, index) => (
                    <TeamStatRank
                      key={index}>
                      {stat.rank}
                    </TeamStatRank>
                  ))
                : team.stats.map((stat, index) => (
                  <TeamStatRank
                    key={index}>
                    {stat.value}
                  </TeamStatRank>
                ))
              }
              <TeamTotal>
                {team.total}
              </TeamTotal>
            </Team>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IStandings {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const ToggleStandingsOrStats = styled.div`
  width: 100%;
  display: flex;
`
const ToggleButton = styled.div`
  cursor: pointer;
  width: 50%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ ({ isActive }: IToggleButton ) => isActive ? 'rgb(240, 240, 240)' : 'transparent' };
  font-weight: ${ ({ isActive }: IToggleButton ) => isActive ? 'bold' : 'inherit' };
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`
interface IToggleButton {
  isActive: boolean
}

const StatCategories = styled.tr``
const StatCategory = styled.th``


const Team = styled.tr`
  font-weight: ${ ({ isUsersTeam }: IStyledTeam ) => isUsersTeam ? 'bold' : 'inherit' };
  background-color: ${ ({ isUsersTeam }: IStyledTeam ) => isUsersTeam ? 'rgb(240, 240, 240)' : 'transparent' };
  &:hover {
    background-color: rgb(245, 245, 245);
  }
`
interface IStyledTeam {
  isUsersTeam: boolean
}

const TeamCell = styled.td`
  text-align: center;
  border: none;
`
const TeamRank = styled(TeamCell)``
const TeamName = styled(TeamCell)``
const TeamStatRank = styled(TeamCell)``
const TeamTotal = styled(TeamCell)``

export default Standings
