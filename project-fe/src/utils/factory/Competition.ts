import { subjectTypes } from "../../model/student"
import { Team } from "../observer/Team"

export interface Competition {
  name: string
  level: subjectTypes
  id: string
  teams: Team[]
}