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

export enum CharatersActionTypes {
  FETCH_REQUEST = '@@heroes/FETCH_REQUEST',
  FETCH_SUCCESS = '@@heroes/FETCH_SUCCESS',
  FETCH_ERROR = '@@heroes/FETCH_ERROR',
  SELECT_HERO = '@@heroes/SELECT_HERO',
  SELECTED = '@@heroes/SELECTED'
}

export interface CharatersState {
  readonly loading: boolean
  readonly data: Charater[]
  readonly errors?: string
}
