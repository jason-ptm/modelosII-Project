import { Competition } from '../../model/Competition'
import { Team } from '../../model/Team'
import { ErrorInitialState } from '../../model/states'
import { Student } from '../../model/student'

export const errorInitialState: ErrorInitialState = {
  code: '',
  text: '',
}

export const initialTeamState: Team = {
  id: '',
  name: '',
  members: [
    { id: '', name: '', level: 0, subject: '' },
    { id: '', name: '', level: 0, subject: '' },
    { id: '', name: '', level: 0, subject: '' },
  ],
  competitionInscribed: '',
}

export const studentInitialState: Student = {
  id: '',
  name: '',
  level: 0,
  subject: '',
}

export const competitionInitialState: Competition = {
  id: '',
  level: 'basic',
  name: '',
  teams: [],
}

export type roleTypes = 'admin' | 'student'
