//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { useLoadDraft } from '@/hooks'

import DraftRoom from '@draft/DraftRoom'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftLive = () => {

  const { draftId } = useLoadDraft('LIVE')

  return (
    <Container>
      {draftId && 
        <DraftRoom
          draftId={draftId}/>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftLive
