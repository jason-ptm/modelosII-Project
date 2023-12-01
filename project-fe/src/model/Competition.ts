import { Team } from './Team'
import { subjectTypes } from './student'

export interface Competition {
  name: string
  level: subjectTypes
  id: string
  teams: Team[]
}
