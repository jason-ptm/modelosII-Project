import { Middleware } from '@reduxjs/toolkit'
import StudentService from '../../services/StudentService'
import paths from '../../utils/constants/paths'
import {
  getStudentByIdError,
  getStudentByIdSuccess,
  redirectRoute,
  registerTeamError,
  registerTeamSuccess,
} from '../slice/studentReducer'

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
          store.dispatch(
            getStudentByIdSuccess({
              id: payload,
              name: student.name,
            })
          )
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
          console.log(
            '🚀 ~ file: syncWithDatabaseMiddleware.ts:42 ~ payload:',
            team
          )
          store.dispatch(registerTeamSuccess(team))
          store.dispatch(getStudentByIdSuccess(team[0]))
          store.dispatch(redirectRoute(`${paths.STUDENT_HOME.absolutePath}`))
        }
      } catch (e: any) {
        store.dispatch(
          registerTeamError({
            code: e.code,
            text: e.message,
          })
        )
        console.log(
          '🚀 ~ file: syncWithDatabaseMiddleware.ts:33 ~ e:',
          e.message
        )
      }
    }
  }
