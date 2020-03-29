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

import DraftRoomContentTile from '@draft/DraftRoomContentTile'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftRoomSettingsTimePeriod = ({
  draftId
}: IDraftRoomSettingsTimePeriod) => {

  const dispatch = useDispatch()
  const startYear = useSelector((state: IAppState) => state.draft.allDrafts[draftId].timePeriod.startYear)
  const endYear = useSelector((state: IAppState) => state.draft.allDrafts[draftId].timePeriod.endYear)

  return (
    <Container>
      <DraftRoomContentTile>
        <TimePeriod>
          Start Year:
        </TimePeriod>
        <TimePeriodInput
          value={startYear}
          onChange={e => {
            if(!isNaN(Number(e.target.value))) {
              dispatch(updateDraft(draftId, {
                timePeriod: {
                  startYear: Number(e.target.value),
                  endYear: endYear
                }
              }))
            }
          }}/>
      </DraftRoomContentTile>
      <DraftRoomContentTile>
        <TimePeriod>
          End Year:
        </TimePeriod>
        <TimePeriodInput
          value={endYear}
          onChange={e => {
            if(!isNaN(Number(e.target.value))) {
              dispatch(updateDraft(draftId, {
                timePeriod: {
                  startYear: startYear,
                  endYear: Number(e.target.value)
                }
              }))
            }
          }}/>
      </DraftRoomContentTile>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftRoomSettingsTimePeriod {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

const TimePeriod = styled.div``

const TimePeriodInput = styled.input`
  width: 2.5rem;
  padding: 0.25rem;
  border: none;
  border-bottom: 1px solid rgb(200, 200, 200);
  outline: none;
  background-color: transparent;
  text-align: center;
`

export default DraftRoomSettingsTimePeriod
