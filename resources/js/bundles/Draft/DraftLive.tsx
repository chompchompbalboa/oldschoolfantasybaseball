//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftLive = () => {

  // State
  const [ activeDraftId ] = useState(null)

  // Create a new draft if there is no active draft
  useEffect(() => {
    if(activeDraftId === null) {

    }
  }, [ activeDraftId ])

  return (
    <Container>
      Live Draft
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default DraftLive
