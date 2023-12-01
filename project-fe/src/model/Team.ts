import { Student } from './student'

export interface Team {
  id: string
  name: string
  members: Student[]
  competitionInscribed: string
}

export interface SetTeamInterface {
  name: string
  member: Student
}
