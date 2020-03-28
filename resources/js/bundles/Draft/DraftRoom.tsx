//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState } from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'

import DraftRoomContent from '@draft/DraftRoomContent'
import DraftRoomTabs from '@draft/DraftRoomTabs'


//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoom = ({
  draftId
}: IDraftRoom) => {

  const [ activeContent, setActiveContent ] = useState('DRAFT_SETTINGS' as IDraftRoomActiveContent)

  return (
    <Container>
      <DraftRoomTabs
        activeContent={activeContent}
        setActiveContent={setActiveContent}/>
      <DraftRoomContent
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
