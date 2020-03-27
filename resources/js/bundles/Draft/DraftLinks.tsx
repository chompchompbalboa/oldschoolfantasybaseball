//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const DraftLinks = () => {
  return (
    <Container>
      <StyledLink to="/draft/solo">
        Solo Draft
      </StyledLink>
      <StyledLink to="/draft/live">
        Live Draft
      </StyledLink>
      <StyledLink to="/draft/online">
        Online Draft
      </StyledLink>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledLink = styled(Link)`
  margin: 0.5rem;
  width: 15rem;
  padding: 1rem;
  color: black;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default DraftLinks
