import { Reducer } from 'redux'
import { CharactersState, CharactersActionTypes } from './types'

export const initialState: CharactersState = {
  data: [],
  errors: undefined,
  loading: false
}

const reducer: Reducer<CharactersState> = (state = initialState, action) => {
  switch (action.type) {
    case CharactersActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case CharactersActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case CharactersActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as charactersReducer }
