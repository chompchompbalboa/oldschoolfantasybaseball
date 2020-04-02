//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import DraftSoloHeaderDrafting from '@draft/DraftSoloHeaderDrafting'
import DraftSoloHeaderPostDraft from '@draft/DraftSoloHeaderPostDraft'
import DraftSoloHeaderPreDraft from '@draft/DraftSoloHeaderPreDraft'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftSoloHeader = ({
  draftId
}: IDraftSoloHeader) => {

  // Redux
  const hasDraftStarted = useSelector((state: IAppState) => state.draft.allDrafts[draftId].hasDraftStarted)
  const hasDraftEnded = useSelector((state: IAppState) => state.draft.allDrafts[draftId].hasDraftEnded)

  return (
    <Container>
      {hasDraftStarted 
        ? hasDraftEnded
          ? <DraftSoloHeaderPostDraft draftId={draftId}/>
          : <DraftSoloHeaderDrafting draftId={draftId}/>
        : <DraftSoloHeaderPreDraft draftId={draftId}/>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftSoloHeader {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 4rem;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid black;
`

export default DraftSoloHeader
