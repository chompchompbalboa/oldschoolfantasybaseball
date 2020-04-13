//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { 
  useLoadDraft,
  useLoadPlayerSeasons
} from '@/hooks'

import { IAppState } from '@/state'

import DraftComputerPicks from '@draft/DraftComputerPicks'
import DraftHeader from '@draft/DraftHeader'
import DraftRoster from '@draft/DraftRoster'
import DraftOverview from '@draft/DraftOverview'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const Draft = () => {

  const { 
    draftId, 
    userTeamId
  } = useLoadDraft()

  const { 
    havePlayerSeasonsLoaded
  } = useLoadPlayerSeasons()

  const hasDraftEnded = useSelector((state: IAppState) => draftId ? state.draft.allDrafts[draftId].hasDraftEnded : false)
  const hasDraftStarted = useSelector((state: IAppState) => draftId ? state.draft.allDrafts[draftId].hasDraftStarted : false)

  return (
    <Container>
      {draftId &&
        <>
          <DraftHeader
            draftId={draftId}
            teamId={userTeamId}/>
          {havePlayerSeasonsLoaded 
            ? hasDraftStarted && !hasDraftEnded
              ? <>
                  <DraftComputerPicks
                    draftId={draftId}
                    usersTeamId={userTeamId}/>
                  <DraftRoster
                    draftId={draftId}
                    teamId={userTeamId}/>
                  <DraftOverview
                    draftId={draftId}
                    teamId={userTeamId}/>
                </>
              : <>
                  <DraftRosterOverlay
                    isVisible
                    preventClicks={!hasDraftStarted}>
                    {!hasDraftStarted
                      ? "The draft is starting soon..."
                      : ""
                    }
                  </DraftRosterOverlay>
                  <DraftRoster
                    draftId={draftId}
                    teamId={userTeamId}/>
                  <DraftOverview
                    draftId={draftId}
                    teamId={userTeamId}/>
                </>
            : <DraftRosterOverlay
                isVisible
                preventClicks>
                The draft is starting soon...
              </DraftRosterOverlay>
          }
        </>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

const DraftRosterOverlay = styled.div`
  display: ${ ({ isVisible }: IDraftRosterOverlay ) => isVisible ? 'block' : 'none' };
  pointer-events: ${ ({ preventClicks }: IDraftRosterOverlay ) => preventClicks ? 'auto' : 'none' };
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${ ({ preventClicks }: IDraftRosterOverlay ) => preventClicks ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.35)' };
  display: flex;
  justify-content: center;
  align-items: center;
`
interface IDraftRosterOverlay {
  isVisible: boolean
  preventClicks: boolean
}

export default Draft
