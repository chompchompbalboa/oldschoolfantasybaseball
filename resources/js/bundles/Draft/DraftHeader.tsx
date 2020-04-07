//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftHeaderDrafting from '@draft/DraftHeaderDrafting'
import DraftHeaderPostDraft from '@draft/DraftHeaderPostDraft'
import DraftHeaderPreDraft from '@draft/DraftHeaderPreDraft'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftHeader = ({
  draftId,
  teamId
}: IDraftHeader) => {

  // Redux
  const hasDraftStarted = useSelector((state: IAppState) => state.draft.allDrafts[draftId].hasDraftStarted)
  const hasDraftEnded = useSelector((state: IAppState) => state.draft.allDrafts[draftId].hasDraftEnded)

  return (
    <Container>
      {hasDraftStarted 
        ? hasDraftEnded
          ? <DraftHeaderPostDraft 
              draftId={draftId}
              teamId={teamId}/>
          : <DraftHeaderDrafting 
              draftId={draftId}
              teamId={teamId}/>
        : <DraftHeaderPreDraft 
            draftId={draftId}/>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftHeader {
  draftId: IDraft['id']
  teamId: ITeam['id']
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

export default DraftHeader
