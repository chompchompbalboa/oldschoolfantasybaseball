//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'
import { 
  IStatCategoryBatting,
  IStatCategoryPitching 
} from '@/state/stats/types'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomTeamsTeamRosterStatCategory = ({
  statCategory
}: IDraftRoomTeamsTeamRosterStatCategory) => (
    <StatCategoryLabel>
      {statCategory}
    </StatCategoryLabel>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomTeamsTeamRosterStatCategory {
  statCategory: IStatCategoryBatting | IStatCategoryPitching
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StatCategoryLabel = styled.th``

export default DraftRoomTeamsTeamRosterStatCategory
