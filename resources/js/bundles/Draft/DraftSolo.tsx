//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { useLoadDraft } from '@/hooks'

import DraftSoloHeader from '@draft/DraftSoloHeader'
import DraftSoloRoster from '@draft/DraftSoloRoster'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftSolo = () => {

  const { draftId } = useLoadDraft('SOLO')

  return (
    <Container>
      {draftId &&
        <>
          <DraftSoloHeader
            draftId={draftId}/>
          <DraftSoloRoster
            draftId={draftId}/>
        </>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftSolo
