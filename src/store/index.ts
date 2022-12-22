import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { LayoutState, layoutReducer } from './layout'

import CharactersSaga from './characters/sagas'
import { charactersReducer } from './characters/reducer'
import { CharactersState } from './characters/types'
import teamsSaga from './teams/sagas'
import { TeamsState } from './teams/types'
import { teamsReducer } from './teams/reducer'

export interface ApplicationState {
  layout: LayoutState
  characters: CharactersState
  teams: TeamsState
  router: RouterState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    layout: layoutReducer,
    characters: charactersReducer,
    teams: teamsReducer,
    router: connectRouter(history)
  })

export function* rootSaga() {
  yield all([fork(CharactersSaga), fork(teamsSaga)])
}
