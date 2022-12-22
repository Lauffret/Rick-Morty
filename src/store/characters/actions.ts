import { action } from 'typesafe-actions'
import { CharactersActionTypes, Character } from './types'

export const fetchRequest = () => action(CharactersActionTypes.FETCH_REQUEST)

export const fetchSuccess = (data: Character[]) => action(CharactersActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(CharactersActionTypes.FETCH_ERROR, message)
