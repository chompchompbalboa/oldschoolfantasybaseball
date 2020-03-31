//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import {
  allDraftRosterSpotsBatting,
  allDraftRosterSpotsPitching
} from '@/state/draft/defaults'

import DraftSoloRosterGroup from '@draft/DraftSoloRosterGroup'
import DraftSoloRosterSpot from '@draft/DraftSoloRosterSpot'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftSoloRoster = ({
  draftId
}: IDraftSoloRoster) => {

  const draftRosterSpots = useSelector((state: IAppState) => state.draft.allDrafts[draftId].roster)

  const rosterSpotsBatting: ReactElement[] = []
  allDraftRosterSpotsBatting.forEach(rosterSpot => {
    const rosterSpotCount = draftRosterSpots.batting[rosterSpot]
    for(let i = 0; i < rosterSpotCount; i++) {
      rosterSpotsBatting.push(
        <DraftSoloRosterSpot
          key={rosterSpot + i}
          rosterSpot={rosterSpot}/>
      )
    }
  })

  const rosterSpotsPitching: ReactElement[] = []
  allDraftRosterSpotsPitching.forEach(rosterSpot => {
    const rosterSpotCount = draftRosterSpots.pitching[rosterSpot]
    for(let i = 0; i < rosterSpotCount; i++) {
      rosterSpotsPitching.push(
        <DraftSoloRosterSpot
          key={rosterSpot + i}
          rosterSpot={rosterSpot}/>
      )
    }
  })

  return (
    <Container>
      <DraftSoloRosterGroup
        header="Batting"
        rosterSpots={rosterSpotsBatting}/>
      <DraftSoloRosterGroup
        header="Pitching"
        rosterSpots={rosterSpotsPitching}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftSoloRoster {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;
  top: 4rem;
`

export default DraftSoloRoster
