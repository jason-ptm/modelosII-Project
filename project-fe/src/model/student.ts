export type gradeTypes = 'basic' | 'medium' | 'advanced' | 'hard' | ''

export interface Student {
  name: string
  id: string
  semester: number
  grade: gradeTypes
}
