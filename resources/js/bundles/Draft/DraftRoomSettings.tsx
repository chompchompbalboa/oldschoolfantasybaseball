//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'

import DraftRoomSettingsStatCategories from '@draft/DraftRoomSettingsStatCategories'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomSettings = ({
  draftId
}: IDraftRoomSettings) => {

  return (
    <Container>
      <DraftRoomSettingsStatCategories
        draftId={draftId}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomSettings {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftRoomSettings
