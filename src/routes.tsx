import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Global } from '@emotion/core'

import Root from './components/layout/Root'
import Header from './components/layout/Header'
import IndexPage from './pages/index'
import CharactersPage from './pages/characters'
import TeamsPage from './pages/teams'
import normalize from './styles/normalize'
import globals from './styles/globals'

const Routes: React.SFC = () => (
  <Root>
    <Global styles={normalize} />
    <Global styles={globals} />
    <Header title="Example App" />
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route path="/characters" component={CharactersPage} />
      <Route path="/teams" component={TeamsPage} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
  </Root>
)

export default Routes
