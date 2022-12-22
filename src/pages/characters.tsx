import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'

import CharactersIndexPage from './characters/index'
import ShowCharactersPage from './characters/show'

import { ApplicationState } from '../store'
import { Character } from '../store/characters/types'

interface PropsFromState {
  loading: boolean
  data: Character[]
  errors?: string
}

type AllProps = PropsFromState & RouteComponentProps

const CharactersPage: React.FC<AllProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/`} component={CharactersIndexPage} />
      <Route path={`${match.path}/:name`} component={ShowCharactersPage} />
    </Switch>
  )
}

const mapStateToProps = ({ characters }: ApplicationState) => ({
  loading: characters.loading,
  errors: characters.errors,
  data: characters.data
})

export default connect(mapStateToProps)(CharactersPage)
