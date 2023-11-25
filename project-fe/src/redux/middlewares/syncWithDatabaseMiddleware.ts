import { Middleware } from '@reduxjs/toolkit'
import StudentService from '../../services/StudentService'
import {
  getStudentByIdError,
  getStudentByIdSuccess,
  redirectRoute,
  registerTeamSuccess,
  resetLoading,
} from '../slice/studentReducer'
import paths from '../../utils/constants/paths'

export const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const { type, payload } = action
    const studentService = new StudentService()
    // const navigate = useNavigate()
    next(action)

    if (type === 'student/getStudentById') {
      try {
        const student = await studentService.getStudentById(payload)

        if (student) {
          store.dispatch(getStudentByIdSuccess(student))
          store.dispatch(redirectRoute(`${paths.STUDENT_HOME.absolutePath}`))
        }
      } catch (e: any) {
        store.dispatch(getStudentByIdError())
        store.dispatch(
          redirectRoute(`${paths.STUDENT_REGISTER_FORM.absolutePath}`)
        )
        console.log(
          '🚀 ~ file: syncWithDatabaseMiddleware.ts:27 ~ e:',
          e.message
        )
      }
    }
    if (type === 'student/registerTeam') {
      try {
        const team = await await studentService.registerTeam(payload)

        if (team) {
          store.dispatch(registerTeamSuccess(team))
        } else store.dispatch(resetLoading())
      } catch (e) {
        store.dispatch(resetLoading())
        console.log('🚀 ~ file: syncWithDatabaseMiddleware.ts:33 ~ e:', e)
      }
    }
  }
