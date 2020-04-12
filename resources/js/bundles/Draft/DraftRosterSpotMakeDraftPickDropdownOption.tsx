//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { useGetPlayerSeason } from '@/hooks'

import { IDraft } from '@/state/draft/types' 
import {
  IPlayerSeasonBatting,
  IPlayerSeasonPitching,
} from '@/state/playerSeason/types'

import PlayerSeason from '@/components/PlayerSeason'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRosterSpotMakeDraftPick = ({ 
  draftId,
  playerSeasonId,
  isActive,
  onClick,
  onMouseEnter
}: IDraftRosterSpotMakeDraftPick) => {

  // Refs
  const { playerSeason } = useGetPlayerSeason(draftId, playerSeasonId)

  return (
    <DraftPickDropdownOption 
      key={playerSeason.name + playerSeason.year}
      isActive={isActive}
      onClick={onClick}
      onMouseEnter={onMouseEnter}>
      <PlayerSeason
        isStatsVisible={false}
        playerSeason={playerSeason}/>
    </DraftPickDropdownOption>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRosterSpotMakeDraftPick {
  draftId: IDraft['id']
  playerSeasonId: IPlayerSeasonBatting['playerSeasonId'] | IPlayerSeasonPitching['playerSeasonId'] | null
  isActive: boolean
  onClick(): void
  onMouseEnter(): void
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const DraftPickDropdownOption = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  background-color: ${ ({ isActive }: IDraftPickDropdownOption) => isActive ? 'rgb(240, 240, 240)'  : 'transparent' };
`

interface IDraftPickDropdownOption {
  isActive: boolean
}

export default DraftRosterSpotMakeDraftPick
