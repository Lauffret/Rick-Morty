import { action } from 'typesafe-actions'
import { TeamsActionTypes, Team, TeamSelectedPayload } from './types'

export const fetchRequest = () => action(TeamsActionTypes.FETCH_REQUEST)
export const clearSelected = () => action(TeamsActionTypes.CLEAR_SELECTED)

export const fetchSuccess = (data: Team[]) => action(TeamsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(TeamsActionTypes.FETCH_ERROR, message)
export const selectTeam = (teamId: string) => action(TeamsActionTypes.SELECT_TEAM, teamId)
export const teamSelected = (team: TeamSelectedPayload) => action(TeamsActionTypes.SELECTED, team)
