//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { 
  IDraft, 
  IDraftRosterSpotBatting,
  IDraftRosterSpotPitching
} from '@/state/draft/types'
import {
  IStatCategoryBatting,
  IStatCategoryPitching
} from '@/state/stats/types'
import { ITeam } from '@/state/team/types'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsTeam = ({
  draftId,
  teamId,
  hasBackground,
  rosterSpot,
  statCategories
}: IDraftRoomTeamsTeam) => {

  const rosterSpotStatCategories: React.ReactElement[] = [ ...statCategories ].map(statCategory => (
    <StatCategory
      key={statCategory}>
      {statCategory}
    </StatCategory>
  ))

  return (
    <Container
      hasBackground={hasBackground}>
      {[
        <StatCategory
          key="rosterSpot">
          {rosterSpot}
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
  teamId: ITeam['id']
  hasBackground: boolean
  rosterSpot: IDraftRosterSpotBatting | IDraftRosterSpotPitching
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
