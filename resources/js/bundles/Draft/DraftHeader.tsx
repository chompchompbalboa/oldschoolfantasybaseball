//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftHeaderStartTime from '@draft/DraftHeaderStartTime'
import DraftHeaderStats from '@draft/DraftHeaderStats'
import DraftHeaderTimeRemaining from '@draft/DraftHeaderTimeRemaining'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftHeader = ({
  draftId,
  teamId
}: IDraftHeader) => {

  // Redux
  const hasDraftStarted = useSelector((state: IAppState) => state.draft.allDrafts[draftId].hasDraftStarted)

  return (
    <Container>
      <Wrapper
        width="80%">
        <DraftHeaderStats
          draftId={draftId}
          teamId={teamId}/>
      </Wrapper>
      <Wrapper
        width="20%">
      {!hasDraftStarted 
        ? <DraftHeaderStartTime
            draftId={draftId}/>
        : <DraftHeaderTimeRemaining
            draftId={draftId}/>
      }
      </Wrapper>
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

const Wrapper = styled.div`
  width: ${ ({ width }: IWrapper ) => width };
  height: 100%;
  display: flex;
  justify-content: center;
  align-items; center;
`
interface IWrapper {
  width: string
}

export default DraftHeader
