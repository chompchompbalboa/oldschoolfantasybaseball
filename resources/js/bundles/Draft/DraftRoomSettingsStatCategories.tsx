//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'

import DraftRoomSettingsStatCategoriesBatting from '@draft/DraftRoomSettingsStatCategoriesBatting'
import DraftRoomSettingsStatCategoriesPitching from '@draft/DraftRoomSettingsStatCategoriesPitching'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomSettingsStatCategories = ({
  draftId
}: IDraftRoomSettingsStatCategories) => {

  return (
    <Container>
      <DraftRoomSettingsStatCategoriesBatting
        draftId={draftId}/>
      <DraftRoomSettingsStatCategoriesPitching 
        draftId={draftId}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomSettingsStatCategories {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftRoomSettingsStatCategories
