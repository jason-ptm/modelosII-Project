import { Middleware } from '@reduxjs/toolkit'
import StudentService from '../../services/StudentService'
import paths, { studentPath } from '../../utils/constants/paths'
import {
  getStudentByIdError,
  getStudentByIdSuccess,
  getTeamByIdSuccess,
  redirectRoute,
  registerTeamError,
  registerTeamSuccess,
} from '../slice/studentReducer'

export const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const { type, payload } = action
    const studentService = new StudentService()
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
          store.dispatch(
            redirectRoute({
              url: `${studentPath}/${payload}/home`,
              state: {
                isCreated: false,
              },
            })
          )
        }
      } catch (e: any) {
        store.dispatch(getStudentByIdError())
        store.dispatch(
          redirectRoute({
            url: paths.STUDENT_REGISTER_FORM.absolutePath,
            state: {
              isCreated: true,
            },
          })
        )
      }
    } else if (type === 'student/getTeamById') {
      try {
        // const team = await studentService.getTeamById(payload)

        store.dispatch(
          getTeamByIdSuccess([
            {
              id: payload,
              name: 'test',
            },
            {
              id: payload,
              name: 'test',
            },
            {
              id: payload,
              name: 'test',
            },
          ])
        )
      } catch (e: any) {
        console.log('🚀 ~ file: syncWithDatabaseMiddleware.ts:68 ~ e:', e)
      }
    } else if (type === 'student/registerTeam') {
      try {
        const team = await studentService.registerTeam(payload)

        if (team) {
          store.dispatch(registerTeamSuccess())
          store.dispatch(getStudentByIdSuccess(team[0]))
          store.dispatch(
            redirectRoute({
              url: `${studentPath}/${team[0].id}/home`,
              state: {
                isCreated: false,
              },
            })
          )
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
    } else if (type === 'student/editTeamById') {
      try {
        // const newTeam = await studentService.editTeamById(payload)

        store.dispatch(
          getTeamByIdSuccess([
            {
              id: payload,
              name: 'test',
            },
            {
              id: payload,
              name: 'test',
            },
            {
              id: payload,
              name: 'test',
            },
          ])
        )
      } catch (e: any) {
        console.log('🚀 ~ file: syncWithDatabaseMiddleware.ts:105 ~ e:', e)
      }
    }
  }
