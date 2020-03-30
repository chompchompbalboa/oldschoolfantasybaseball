//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import DraftRoomDraftPicksRoundPick from '@draft/DraftRoomDraftPicksRoundPick'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomDraftPicksRound = ({
  draftId,
  round
}: IDraftRoomDraftPicksRound) => {

  const draftTeams = useSelector((state: IAppState) => state.draft.allDrafts[draftId].teams)
  const numberOfPicksPerRound = draftTeams.length

  return (
    <Container>
      {_.times(numberOfPicksPerRound, pickNumber => (
        <DraftRoomDraftPicksRoundPick
          key={pickNumber}
          draftId={draftId}
          round={round}
          pick={pickNumber + 1}
          teamId={draftTeams[pickNumber]}/>
      ))}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomDraftPicksRound {
  draftId: IDraft['id']
  round: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftRoomDraftPicksRound
