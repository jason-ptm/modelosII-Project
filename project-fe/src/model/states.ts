import { Competition } from './Competition'
import { Team } from './Team'
import { Student } from './student'

export interface ErrorInitialState {
  code: string
  text: string
}

interface StateRouteInterface {
  isCreated: boolean
}

export interface RouteRedirectInterface {
  url: string
  state: StateRouteInterface
}

export interface StudentState {
  loading: boolean
  error: ErrorInitialState
  selectedTeam: Team
  selectedStudent: Student
  competititons: Competition[]
  urlToRedirect: RouteRedirectInterface
}

export interface AdminState {
  loading: boolean
  competitions: Competition[]
  teams: Team[]
  urlToRedirect: RouteRedirectInterface
}
