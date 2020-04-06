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

import DraftHeader from '@draft/DraftHeader'
import DraftRoster from '@draft/DraftRoster'

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
              ? <DraftRoster
                  draftId={draftId}
                  teamId={userTeamId}/>
              : <>
                  <DraftRosterOverlay
                    preventClicks={!hasDraftStarted || hasDraftEnded}>
                    The draft is starting soon...
                  </DraftRosterOverlay>
                  <DraftRoster
                    draftId={draftId}
                    teamId={userTeamId}/>
                </>
            : <DraftRosterOverlay
                preventClicks={!hasDraftStarted || hasDraftEnded}>
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
  display: ${ ({ preventClicks }: IDraftRosterOverlay ) => preventClicks ? 'block' : 'none' };
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`
interface IDraftRosterOverlay {
  preventClicks: boolean
}

export default Draft
