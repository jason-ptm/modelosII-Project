import { useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import StudentService from './StudentService'
import { getStudentByIdSuccess } from '../redux/slice/studentReducer'
import { Student } from '../model/student'

export const actionHandler = async (type: string, payload: RootState) => {
  const studentService = new StudentService()

  const actionsHandlers: any = {
    'student/getStudentById': {
      method: studentService.getStudentById,
      successMethod: (dispatch: any, result: Student) => {
        dispatch(getStudentByIdSuccess(result))
      },
    },
  }
  const actionHandler = actionsHandlers[type]
  if (actionHandler) {
    try {
      const result = await actionHandler.method(payload)
      return result
    } catch (e) {
      return null
    }
  }
  return null
}
