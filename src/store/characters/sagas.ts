import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { CharactersActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://rickandmortyapi.com/api'

function* handleFetch() {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, '/character')

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(CharactersActionTypes.FETCH_REQUEST, handleFetch)
}

function* charactersSaga() {
  yield all([fork(watchFetchRequest)])
}

export default charactersSaga
