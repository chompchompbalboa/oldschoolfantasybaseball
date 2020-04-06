//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import {
  IDraft
} from '@/state/draft/types'
import {
  IAllPlayerSeasonsBatting,
  IAllPlayerSeasonsPitching,
  IPositionBatting,
  IPositionPitching,
  IPlayerSeasonBatting,
  IPlayerSeasonPitching,
} from '@/state/playerSeason/types'

import DraftRosterSpotMakeDraftPick from '@draft/DraftRosterSpotMakeDraftPick'
import DraftRosterSpotPlayerSeason from '@draft/DraftRosterSpotPlayerSeason'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRosterSpot = ({ 
  draftId,
  draftPickId,
  deleteDraftPick,
  eligiblePlayerSeasons,
  makeDraftPick,
  position,
  positionNames,
  playerSeasons,
  rosterSpotIndex
}: IDraftRosterSpot) => {
  return (
    <Container>
      <RosterSpot>
        {positionNames[position]}
      </RosterSpot>
      <DraftPickContainer>
        {draftPickId !== null
          ? <DraftRosterSpotPlayerSeason 
              draftId={draftId}
              playerSeasonId={draftPickId}
              deleteDraftPick={deleteDraftPick}
              position={position}/>
          : <DraftRosterSpotMakeDraftPick
              draftId={draftId}
              draftPickId={draftPickId}
              eligiblePlayerSeasons={eligiblePlayerSeasons}
              makeDraftPick={makeDraftPick}
              position={position}
              playerSeasons={playerSeasons}
              rosterSpotIndex={rosterSpotIndex}/>
        }
      </DraftPickContainer>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRosterSpot {
  draftId: IDraft['id']
  draftPickId: IPlayerSeasonBatting['playerSeasonId'] | IPlayerSeasonPitching['playerSeasonId'] | null
  deleteDraftPick(
    position: IPositionBatting | IPositionPitching, 
    playerSeason: IPlayerSeasonBatting['playerSeasonId'] | IPlayerSeasonPitching['playerSeasonId']
  ): void
  eligiblePlayerSeasons: IPlayerSeasonBatting['playerSeasonId'][] | IPlayerSeasonPitching['playerSeasonId'][]
  makeDraftPick(
    position: IPositionBatting | IPositionPitching,
    rosterSpotIndex: number,
    playerSeason: IPlayerSeasonBatting | IPlayerSeasonPitching
  ): void
  position: IPositionBatting | IPositionPitching
  positionNames: {
    [position: string]: string
  }
  playerSeasons: IAllPlayerSeasonsBatting | IAllPlayerSeasonsPitching
  rosterSpotIndex: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid rgb(240, 240, 240);
  display: flex;
  align-items: center;
  overflow-y: visible
`

const RosterSpot = styled.div`
  padding: 0.5rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgb(240, 240, 240);
`

const DraftPickContainer = styled.div`
  width: 100%;
  height: 100%;
`

export default DraftRosterSpot
