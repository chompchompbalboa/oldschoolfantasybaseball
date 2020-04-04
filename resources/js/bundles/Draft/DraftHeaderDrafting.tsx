//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { IDraft } from '@/state/draft/types'
import { ITeam } from '@/state/team/types'

import DraftHeaderDraftingBatting from '@/bundles/Draft/DraftHeaderDraftingBatting'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftHeaderDrafting = ({
  draftId,
  teamId
}: IDraftHeaderDrafting) => {
  return (
    <Container>
      <DraftHeaderDraftingBatting
        draftId={draftId}
        teamId={teamId}/>
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
const Container = styled.div``

export default DraftHeaderDrafting
