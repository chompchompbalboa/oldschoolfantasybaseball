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
      <Tagline>
        Fantasy baseball drafts using historical baseball seasons
      </Tagline>
      <Divider />
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

const Header = styled.h1`
  margin-bottom: 0.5rem;
`

const Divider = styled.div`
  margin-bottom: 1.5rem;
  width: 20rem;
  height: 1px;
  background-color: black;
`

const Tagline = styled.div`
  margin-bottom: 1.5rem;
`

export default Site
