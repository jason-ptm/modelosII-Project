import { Middleware } from '@reduxjs/toolkit'
import StudentService from '../../services/StudentService'
import paths, { studentPath } from '../../utils/constants/paths'
import {
  getCompetitionsSuccess,
  getStudentByIdError,
  getStudentByIdSuccess,
  getTeamByIdSuccess,
  joinCompetitionSuccess,
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
    } else if (type === 'student/getCompetitions') {
      try {
        // const competitions = await studentService.getCompetitions()

        store.dispatch(
          getCompetitionsSuccess([
            {
              name: 'test1',
              level: 'medium',
              id: 1,
              state: true,
            },
            {
              name: 'test2',
              level: 'medium',
              id: 2,
              state: false,
            },
            {
              name: 'test3',
              level: 'advanced',
              id: 3,
              state: false,
            },
            {
              name: 'test4',
              level: 'basic',
              id: 4,
              state: false,
            },
          ])
        )
      } catch (e: any) {
        console.log('🚀 ~ file: syncWithDatabaseMiddleware.ts:154 ~ e:', e)
      }
    } else if (type === 'student/joinCompetition') {
      try {
        // const team = await studentService.joinCompetition()
        console.log(payload)
        store.dispatch(
          joinCompetitionSuccess([
            {
              name: 'test1',
              level: 'medium',
              id: 1,
            },
            {
              name: 'test2',
              level: 'medium',
              id: 2,
            },
            {
              name: 'test3',
              level: 'advanced',
              id: 3,
            },
            {
              name: 'test4',
              level: 'basic',
              id: 4,
            },
          ])
        )
      } catch (e: any) {
        console.log('🚀 ~ file: syncWithDatabaseMiddleware.ts:160 ~ e:', e)
      }
    }
  }
