//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { IDraft } from '@/state/draft/types'

import DraftRoomDraftPicksRound from '@draft/DraftRoomDraftPicksRound'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomDraftPicks = ({
  draftId,
  numberOfRounds
}: IDraftRoomDraftPicks) => {
  return (
    <Container>
      {_.times(numberOfRounds, round => (
        <DraftRoomDraftPicksRound
          key={round}
          draftId={draftId}
          round={round + 1}/>
      ))}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomDraftPicks {
  draftId: IDraft['id']
  numberOfRounds: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftRoomDraftPicks
