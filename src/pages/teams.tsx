import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'

import TeamsIndexPage from './teams/index'
import ShowTeamsPage from './teams/show'

import { ApplicationState } from '../store'

interface PropsFromState {
  loading: boolean
  errors?: string
}

type AllProps = PropsFromState & RouteComponentProps

const TeamsPage: React.FC<AllProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/`} component={TeamsIndexPage} />
      <Route path={`${match.path}/:id`} component={ShowTeamsPage} />
    </Switch>
  )
}

const mapStateToProps = ({ teams }: ApplicationState) => ({
  loading: teams.loading,
  errors: teams.errors
})

export default connect(mapStateToProps)(TeamsPage)
