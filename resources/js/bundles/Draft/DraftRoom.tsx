//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState } from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'

import DraftRoomActiveContent from '@draft/DraftRoomActiveContent'
import DraftRoomTabs from '@draft/DraftRoomTabs'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoom = ({
  draftId
}: IDraftRoom) => {

  const [ activeContent, setActiveContent ] = useState('DRAFT_PICKS' as IDraftRoomActiveContent)

  return (
    <Container>
      <DraftRoomTabs
        activeContent={activeContent}
        setActiveContent={setActiveContent}/>
      <DraftRoomActiveContent
        draftId={draftId}
        activeContent={activeContent}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoom {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------
export type IDraftRoomActiveContent = 
  'DRAFT_SETTINGS' |
  'DRAFT_TEAMS' | 
  'DRAFT_PICKS'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftRoom
