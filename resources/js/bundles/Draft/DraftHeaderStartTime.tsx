//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { useInterval } from '@/hooks'

import { IAppState } from '@/state'
import { IDraft } from '@/state/draft/types'

import { updateDraft } from '@/state/draft/actions'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftSoloHeaderStartTime = ({
  draftId
}: IDraftSoloHeaderStartTime) => {

  // Redux
  const dispatch = useDispatch()
  const draftStartTime = useSelector((state: IAppState) => state.draft.allDrafts[draftId].startTime)

  // Local Variables
  const initialTimeUntilDraftStarts = draftStartTime.diff(moment(), 's')
  
  // State
  const [ isDraftStarting, setIsDraftStarting ] = useState(false)
  const [ timeUntilDraftStarts, setTimeUntilDraftStarts ] = useState(initialTimeUntilDraftStarts)
  
  // Update timeUntilDraftStarts every second
  useInterval(() => {
    const nextTime = timeUntilDraftStarts - 1
    setTimeUntilDraftStarts(nextTime)
  }, 1000)

  // Start the draft
  useEffect(() => {
    if(timeUntilDraftStarts === 0) {
      setIsDraftStarting(true)
      setTimeout(() => {
        dispatch(updateDraft(draftId, {
          hasDraftStarted: true
        }))
      }, 1000)
    }
  }, [ timeUntilDraftStarts ])

  return (
    <Container>
      {isDraftStarting 
        ? "Draft Is Starting..."
        : "Draft Starts In " + timeUntilDraftStarts + " seconds"
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftSoloHeaderStartTime {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftSoloHeaderStartTime
