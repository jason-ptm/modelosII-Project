import { gradeTypes } from "./student"

export interface Competitions {
  name: string
  level: gradeTypes
  id: string
  state: boolean
}