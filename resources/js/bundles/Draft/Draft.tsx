//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { useLoadDraft } from '@/hooks'

import DraftHeader from '@draft/DraftHeader'
import DraftRoster from '@draft/DraftRoster'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const Draft = () => {

  const { 
    draftId, 
    userTeamId
  } = useLoadDraft()

  return (
    <Container>
      {draftId &&
        <>
          <DraftHeader
            draftId={draftId}
            teamId={userTeamId}/>
          <DraftRoster
            draftId={draftId}
            teamId={userTeamId}/>
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

export default Draft
