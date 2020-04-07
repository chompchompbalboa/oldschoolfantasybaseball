//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useInterval } from '@/hooks'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftHeaderTime = ({
  initialTime,
  onTimeEnd,
  textAfter = "",
  textBefore = ""
}: IDraftHeaderTime) => {
  
  // State
  const [ timeRemaining, setTimeRemaining ] = useState(initialTime)
  
  // Update timeRemaining every second
  useInterval(() => {
    const nextTime = timeRemaining - 1
    setTimeRemaining(nextTime)
  }, 1000)

  // Start the draft
  useEffect(() => {
    if(timeRemaining === 0) {
      onTimeEnd()
    }
  }, [ timeRemaining ])

  return (
    <Container>
      {textBefore + timeRemaining + textAfter}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
export interface IDraftHeaderTime {
  initialTime: number
  onTimeEnd(...args: any): void
  textAfter?: string
  textBefore?: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftHeaderTime
