//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import Button from '@/components/Button'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const Site = () => (
  <Container>
    <SiteTile>
      <Header>
        Old School Fantasy Baseball
      </Header>
      <Button
        onClick={() => window.location.href='/draft'}>
        Join a Draft
      </Button>
    </SiteTile>
  </Container>
)

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

const SiteTile = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled.h1``

export default Site
