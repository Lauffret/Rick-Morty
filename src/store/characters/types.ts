export interface Character extends ApiResponse {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: string[]
  location: string
  image: string
  episode: object
  url: string
  created: string
}

export type ApiResponse = Record<string, any>

export enum CharactersActionTypes {
  FETCH_REQUEST = '@@characters/FETCH_REQUEST',
  FETCH_SUCCESS = '@@characters/FETCH_SUCCESS',
  FETCH_ERROR = '@@characters/FETCH_ERROR',
  SELECT_CHARACTER = '@@characters/SELECT_CHARACTER',
  SELECTED = '@@characters/SELECTED'
}

export interface CharactersState {
  readonly loading: boolean
  readonly data: Character[]
  readonly errors?: string
}
