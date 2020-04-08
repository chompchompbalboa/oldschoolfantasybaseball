//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftHeaderStatsBatting from '@/bundles/Draft/DraftHeaderStatsBatting'
import DraftHeaderStatsPitching from '@/bundles/Draft/DraftHeaderStatsPitching'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftSoloHeaderPostDraft = ({
  draftId,
  teamId
}: IDraftSoloHeaderPostDraft) => (
  <Container>
    <DraftHeaderStatsBatting
      draftId={draftId}
      teamId={teamId}/>
    <DraftHeaderStatsPitching
      draftId={draftId}
      teamId={teamId}/>
  </Container>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftSoloHeaderPostDraft {
  draftId: IDraft['id']
  teamId: ITeam['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default DraftSoloHeaderPostDraft
