import { Team } from './Team'

export type subjectTypes = 'basic' | 'medium' | 'advanced' | 'hard' | ''

export interface Student {
  name: string
  id: string
  level: number
  subject: subjectTypes
  team?: Team
}

export interface PartialStudentInterface {
  name: string
  id: string
  level: string
}
