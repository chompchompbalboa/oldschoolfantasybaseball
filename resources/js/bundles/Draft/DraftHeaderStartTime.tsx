//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import { updateDraft } from '@/state/draft/actions'

import DraftHeaderTime from '@draft/DraftHeaderTime'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftHeaderStartTime = ({
  draftId
}: IDraftHeaderStartTime) => {

  // Redux
  const dispatch = useDispatch()
  const draftStartTime = useSelector((state: IAppState) => state.draft.allDrafts[draftId].startTime)

  // Local Variables
  const initialTimeUntilDraftStarts = draftStartTime.diff(moment(), 's')
  
  // State
  const [ isDraftStarting, setIsDraftStarting ] = useState(false)

  // Start the draft
  useEffect(() => {
    if(isDraftStarting) {
      setTimeout(() => {
        dispatch(updateDraft(draftId, {
          hasDraftStarted: true
        }))
      }, 1000)
    }
  }, [ isDraftStarting ])

  return isDraftStarting 
    ? <StartMessage>-</StartMessage>
    : <DraftHeaderTime
        initialTime={initialTimeUntilDraftStarts}
        onTimeEnd={() => setIsDraftStarting(true)}/>
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftHeaderStartTime {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
const StartMessage = styled.div`
  font-size: 2.25rem;
  font-weight: bold;
  letter-spacing: 0.125rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default DraftHeaderStartTime
