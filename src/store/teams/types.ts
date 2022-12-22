export interface Team {
  team_id: number
  rating: number
  wins: number
  losses: number
  last_match_time: number
  name: string
  tag?: string
  logo_url?: string
}

export interface Player {
  account_id: number
  name: string
  games_played: number
  wins: number
  is_current_team_member: boolean
}

export interface TeamSelectedPayload {
  detail: Team
  players: Player[]
}

export enum TeamsActionTypes {
  FETCH_REQUEST = '@@teams/FETCH_REQUEST',
  FETCH_SUCCESS = '@@teams/FETCH_SUCCESS',
  FETCH_ERROR = '@@teams/FETCH_ERROR',
  SELECT_TEAM = '@@teams/SELECT_TEAM',
  SELECTED = '@@teams/SELECTED',
  CLEAR_SELECTED = '@@teams/CLEAR_SELECTED'
}

export interface TeamsState {
  readonly loading: boolean
  readonly data: Team[]
  readonly selected?: TeamSelectedPayload
  readonly errors?: string
}
