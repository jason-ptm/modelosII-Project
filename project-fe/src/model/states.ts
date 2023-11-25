import { Student } from './student'

export interface ErrorInitialState {
  code: string
  text: string
}

export interface StudentInitialState {
  loading: boolean
  error: ErrorInitialState
  selectedTeam: Student[]
  selectedStudent: Student
  urlToRedirect: string
}
