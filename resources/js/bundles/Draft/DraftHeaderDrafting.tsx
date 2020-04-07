//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftHeaderStatsBatting from '@/bundles/Draft/DraftHeaderStatsBatting'
import DraftHeaderStatsPitching from '@/bundles/Draft/DraftHeaderStatsPitching'
import DraftHeaderDraftingTimeRemaining from '@/bundles/Draft/DraftHeaderDraftingTimeRemaining'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftHeaderDrafting = ({
  draftId,
  teamId
}: IDraftHeaderDrafting) => {
  return (
    <Container>
      <Stats>
        <DraftHeaderStatsBatting
          draftId={draftId}
          teamId={teamId}/>
        <DraftHeaderStatsPitching
          draftId={draftId}
          teamId={teamId}/>
      </Stats>
      <Status>
        <DraftHeaderDraftingTimeRemaining
          draftId={draftId}/>
      </Status>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftHeaderDrafting {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
`

const Stats = styled.div`
`

const Status = styled.div`
  display: flex;
  align-items: center;
`

export default DraftHeaderDrafting
