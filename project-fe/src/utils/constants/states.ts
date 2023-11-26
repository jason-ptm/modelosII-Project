import { ErrorInitialState } from '../../model/states'
import { Student } from '../../model/student'

export const errorInitialState: ErrorInitialState = {
  code: '',
  text: '',
}

export const studentInitialState: Student = {
  id: '',
  name: '',
  semester: 0,
  grade: '',
}
