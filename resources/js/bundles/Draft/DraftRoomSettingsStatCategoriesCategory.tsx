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
export const DraftRoomSettingsStatCategoriesCategory = ({
  draftStatCategories,
  header,
  statCategories,
  toggleStatCategory
}: IDraftRoomSettingsStatCategoriesCategory) => {

  return (
    <Container>
      <Header>{header}</Header>
      <StatCategories>
         {[ ...statCategories ].map(statCategory => (
           <StatCategory
            key={statCategory}>
             <StatCategoryLabel>
               {statCategory}
             </StatCategoryLabel>
             <StatCategoryInput
              type="checkbox"
              checked={[ ...draftStatCategories ].includes(statCategory)}
              onChange={() => toggleStatCategory(statCategory)}/>
           </StatCategory>
         ))}
      </StatCategories>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomSettingsStatCategoriesCategory {
  draftStatCategories: IStatCategoryBatting[] | IStatCategoryPitching[]
  header: string
  statCategories: IStatCategoryBatting[] | IStatCategoryPitching[]
  toggleStatCategory(statCategory: IStatCategoryBatting | IStatCategoryPitching): void
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

const Header = styled.div``

const StatCategories = styled.div`
  display: flex;
`

const StatCategory = styled.div`
  margin-left: 0.5rem;
`

const StatCategoryLabel = styled.label`
  margin-right: 0.2rem;
`

const StatCategoryInput = styled.input``

export default DraftRoomSettingsStatCategoriesCategory
