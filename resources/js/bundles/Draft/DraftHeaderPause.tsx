//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'


import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import { updateDraft } from '@/state/draft/actions'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftHeaderPause = ({
  draftId
}: IDraftHeaderPause) => {

  // Redux
  const dispatch = useDispatch()
  const isDraftPaused = useSelector((state: IAppState) => state.draft.allDrafts[draftId].isDraftPaused)

  return (
    <Container
      onClick={() => dispatch(updateDraft(draftId, { isDraftPaused: !isDraftPaused }))}>
      {!isDraftPaused
        ? "Pause"
        : "Resume"}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftHeaderPause {
  draftId: IDraft['id']
}

const Container = styled.div`
  z-index: 10000;
  cursor: pointer;
  position: fixed;
  top: 0;
  right: 0;
  height: 4rem;
  width: 7rem;
  background-color: rgb(240, 240, 240);
  border-bottom: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
`

export default DraftHeaderPause
