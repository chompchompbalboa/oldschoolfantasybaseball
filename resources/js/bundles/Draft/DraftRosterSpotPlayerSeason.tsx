//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { useGetPlayerSeason } from '@/hooks'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'
import {
  IPlayerSeasonBatting,
  IPlayerSeasonPitching,
  IPositionBatting,
  IPositionPitching
} from '@/state/playerSeason/types'

import Button from '@/components/Button'
import PlayerSeason from '@/components/PlayerSeason'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRosterSpot = ({
  draftId,
  playerSeasonId,
  deleteDraftPick,
  isUsersTeam,
  position,
}: IDraftRosterSpot) => {

  const hasDraftEnded = useSelector((state: IAppState) => state.draft.allDrafts[draftId].hasDraftEnded)

  const { playerSeason } = useGetPlayerSeason(draftId, playerSeasonId)

  return (
    <Container>
      <PlayerSeason
        playerSeason={playerSeason}/>
      {isUsersTeam && !hasDraftEnded && 
        <DeleteDraftPick
          onClick={() => deleteDraftPick(position, playerSeasonId)}>
          Delete
        </DeleteDraftPick>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRosterSpot {
  draftId: IDraft['id']  
  deleteDraftPick(
    position: IPositionBatting | IPositionPitching, 
    playerSeasonId: IPlayerSeasonBatting['playerSeasonId'] | IPlayerSeasonPitching['playerSeasonId']
  ): void
  isUsersTeam: boolean
  position: IPositionBatting | IPositionPitching
  playerSeasonId: IPlayerSeasonBatting['playerSeasonId'] | IPlayerSeasonPitching['playerSeasonId'] | null
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DeleteDraftPick = styled(Button)`
  margin-left: 1rem;
  padding: 0.25rem;
`

export default DraftRosterSpot
