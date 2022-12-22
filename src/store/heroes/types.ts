export interface Hero extends ApiResponse {
  id: number
  name: string
  localized_name: string
  primary_attr: string
  attack_type: string
  roles: string[]
  img: string
  icon: string
  base_health: number
  base_health_regen: number
  base_mana: number
  base_mana_regen: number
  base_armor: number
  base_mr: number
  base_attack_min: number
  base_attack_max: number
  base_str: number
  base_agi: number
  base_int: number
  str_gain: number
  agi_gain: number
  int_gain: number
  attack_range: number
  projectile_speed: number
  attack_rate: number
  move_speed: number
  turn_rate: number
  cm_enabled: boolean
  legs: number
}

export type ApiResponse = Record<string, any>

export enum HeroesActionTypes {
  FETCH_REQUEST = '@@heroes/FETCH_REQUEST',
  FETCH_SUCCESS = '@@heroes/FETCH_SUCCESS',
  FETCH_ERROR = '@@heroes/FETCH_ERROR',
  SELECT_HERO = '@@heroes/SELECT_HERO',
  SELECTED = '@@heroes/SELECTED'
}

export interface HeroesState {
  readonly loading: boolean
  readonly data: Hero[]
  readonly errors?: string
}
