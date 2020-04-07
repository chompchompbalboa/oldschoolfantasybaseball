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

  return (
    <Container>
      {isDraftStarting 
        ? "Draft Is Starting..."
        : <DraftHeaderTime
            initialTime={initialTimeUntilDraftStarts}
            onTimeEnd={() => setIsDraftStarting(true)}
            textBefore="Draft is starting in "
            textAfter=" seconds"/>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftHeaderStartTime {
  draftId: IDraft['id']
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftHeaderStartTime
