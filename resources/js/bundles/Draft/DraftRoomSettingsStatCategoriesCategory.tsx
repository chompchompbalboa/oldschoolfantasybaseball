//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { 
  IStatCategoryBatting, 
  IStatCategoryPitching 
} from '@/state/stats/types'

import DraftRoomContentTile from '@draft/DraftRoomContentTile'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomSettingsStatCategoriesCategory = ({
  draftStatCategories,
  statCategories,
  toggleStatCategory
}: IDraftRoomSettingsStatCategoriesCategory) => {

  return (
    <Container>
      {[ ...statCategories ].map(statCategory => (
        <DraftRoomContentTile
        key={statCategory}>
          <StatCategoryLabel>
            {statCategory}
          </StatCategoryLabel>
          <StatCategoryInput
          type="checkbox"
          checked={[ ...draftStatCategories ].includes(statCategory)}
          onChange={() => toggleStatCategory(statCategory)}/>
        </DraftRoomContentTile>
      ))}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomSettingsStatCategoriesCategory {
  draftStatCategories: IStatCategoryBatting[] | IStatCategoryPitching[]
  statCategories: IStatCategoryBatting[] | IStatCategoryPitching[]
  toggleStatCategory(statCategory: IStatCategoryBatting | IStatCategoryPitching): void
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

const StatCategoryLabel = styled.label`
  margin-right: 0.2rem;
`

const StatCategoryInput = styled.input``

export default DraftRoomSettingsStatCategoriesCategory
