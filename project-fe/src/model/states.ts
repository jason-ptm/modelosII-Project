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
  selectedTeam: Student[]
  selectedStudent: Student
  urlToRedirect: RouteRedirectInterface
}
