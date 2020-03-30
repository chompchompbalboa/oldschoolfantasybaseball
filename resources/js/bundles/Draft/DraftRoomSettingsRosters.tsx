//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'

import { IDraft } from '@/state/draft/types'
import {
  updateDraft
} from '@/state/draft/actions'

import { 
  allDraftRosterSpotsBatting,
  allDraftRosterSpotsPitching, 
  allDraftRosterSpotNames 
} from '@/state/draft/defaults'

import DraftRoomContentTile from '@draft/DraftRoomContentTile'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomSettingsRosters = ({
  draftId
}: IDraftRoomSettingsRosters) => {

  const dispatch = useDispatch()
  const draftRoster = useSelector((state: IAppState) => state.draft.allDrafts[draftId].roster)

  return (
    <Container>
      {allDraftRosterSpotsBatting.map(rosterSpot => {
        const rosterSpotValue = draftRoster.batting[rosterSpot]
        const rosterSpotName = allDraftRosterSpotNames[rosterSpot]
        return (
          <DraftRoomContentTile
            key={rosterSpot}>
            <RosterSpotName>
              {rosterSpotName}
            </RosterSpotName>
            <RosterSpotInput
              value={rosterSpotValue}
              onChange={e => {
                if(!isNaN(Number(e.target.value))) {
                  dispatch(updateDraft(draftId, { 
                    roster: {
                      ...draftRoster,
                      batting: {
                        ...draftRoster.batting,
                        [rosterSpot]: Math.min(Number(e.target.value), 9)
                      }
                    }
                  }))
                }
              }}/>
          </DraftRoomContentTile>
        )
      })}
      {allDraftRosterSpotsPitching.map(rosterSpot => {
        const rosterSpotValue = draftRoster.pitching[rosterSpot]
        const rosterSpotName = allDraftRosterSpotNames[rosterSpot]
        return (
          <DraftRoomContentTile
            key={rosterSpot}>
            <RosterSpotName>
              {rosterSpotName}
            </RosterSpotName>
            <RosterSpotInput
              value={rosterSpotValue}
              onChange={e => {
                if(!isNaN(Number(e.target.value))) {
                  dispatch(updateDraft(draftId, { 
                    roster: {
                      ...draftRoster,
                      pitching: {
                        ...draftRoster.pitching,
                        [rosterSpot]: Math.min(Number(e.target.value), 9)
                      }
                    }
                  }))
                }
              }}/>
          </DraftRoomContentTile>
        )
      })}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomSettingsRosters {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

const RosterSpotName = styled.div`
`

const RosterSpotInput = styled.input`
  width: 1.5rem;
  padding: 0.25rem;
  border: none;
  border-bottom: 1px solid rgb(200, 200, 200);
  outline: none;
  background-color: transparent;
  text-align: center;
`

export default DraftRoomSettingsRosters
