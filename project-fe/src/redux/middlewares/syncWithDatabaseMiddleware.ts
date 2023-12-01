import { Middleware } from '@reduxjs/toolkit'
import StudentService from '../../services/StudentService'
import TeamService from '../../services/TeamService'
import { getStudentAdapter } from '../../utils/adapter'
import paths, { studentPath } from '../../utils/constants/paths'
import {
  getCompetitionsSuccess,
  getStudentByIdSuccess,
  joinCompetitionSuccess,
  redirectRoute,
  registerTeam,
  registerTeamError,
  registerTeamSuccess,
} from '../slice/studentReducer'
import { getTeamAdapter } from '../../utils/adapter/TeamAdapter'
import CompetitionServiceProxy from '../../utils/proxy/CompetitionServiceProxy'

export const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const { type, payload } = action
    const studentService = new StudentService()
    const teamService = new TeamService()

    next(action)

    if (type === 'student/getStudentById') {
      try {
        let student = await studentService.getStudentById(payload)
        student = await getStudentAdapter(student)

        store.dispatch(getStudentByIdSuccess(student))
        store.dispatch(
          redirectRoute({
            url: `${studentPath}/${student.id}/home`,
            state: {
              isCreated: false,
            },
          })
        )
      } catch (e: any) {
        store.dispatch(
          redirectRoute({
            url: paths.STUDENT_FORM.absolutePath,
            state: {
              isCreated: true,
            },
          })
        )
      }
    } else if (type === 'student/registerTeam') {
      try {
        const team = await teamService.registerTeam({
          name: payload.name,
          member: payload.members[0],
        })

        const finalTeam = await teamService.addMembersToTeam(
          team.teamID,
          payload.members[1].id,
          payload.members[2].id
        )

        store.dispatch(registerTeamSuccess(getTeamAdapter(finalTeam)))
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
    } else if (type === 'student/editTeam') {
      try {
        const team = store.getState().student.selectedStudent.team

        await teamService.deleteTeamById(team.id)

        store.dispatch(
          registerTeam({
            name: team.name,
            members: team.members,
          })
        )
      } catch (e: any) {
        console.log('🚀 ~ file: syncWithDatabaseMiddleware.ts:105 ~ e:', e)
      }
    } else if (type === 'student/getCompetitionsByCategory') {
      try {
        console.log(
          '🚀 ~ file: syncWithDatabaseMiddleware.ts:90 ~ type:',
          payload
        )
      } catch (e: any) {
        console.log('🚀 ~ file: syncWithDatabaseMiddleware.ts:154 ~ e:', e)
      }
    } else if (type === 'student/joinCompetition') {
      try {
        const competitionService = new CompetitionServiceProxy(
          store.getState().student.selectedStudent
        )

        competitionService.joinCompetition()
      } catch (e: any) {
        console.log('🚀 ~ file: syncWithDatabaseMiddleware.ts:160 ~ e:', e)
      }
    }
  }
