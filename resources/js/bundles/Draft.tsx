//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import { appReducer, IAppState } from '@/state'

import Draft from '@/bundles/Draft/Draft'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export const Root = () => {

  const store = createStore(appReducer, applyMiddleware(thunkMiddleware as ThunkMiddleware<IAppState>))

  return (
    <ReduxProvider store={store}>
      <Router>
        <Route path="/draft">
          <Draft />
        </Route>
      </Router>
    </ReduxProvider>
  )
}

//-----------------------------------------------------------------------------
// Mount to DOM
//-----------------------------------------------------------------------------
if (document.getElementById('react-container')) {
	ReactDOM.render(<Root />, document.getElementById('react-container'))
}
