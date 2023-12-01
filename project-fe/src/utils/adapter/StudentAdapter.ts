import { Student, subjectTypes } from '../../model/student'
import TeamService from '../../services/TeamService'
import { initialTeamState, studentInitialState } from '../constants/states'
import { getTeamAdapter } from './TeamAdapter'

export const getStudentGrade = (level: string): subjectTypes => {
  if (level === 'Basica') return 'basic'
  else if (level === 'Objetos') return 'medium'
  else if (level === 'Avanzada') return 'advanced'
  else return 'hard'
}

export const getStudentAdapter = async (referStudent: any) => {
  const teamService = new TeamService()

  const student = {
    id: referStudent.idNumber,
    level: referStudent.currentProgrammingClassLevel,
    name: `${referStudent.firstName} ${referStudent.firstSurname}`,
    subject: getStudentGrade(referStudent.currentProgrammingClassName),
  }

  if (referStudent.hasTeam) {
    try {
      const team = await teamService.getTeamById(student.id)
      return {
        ...student,
        team: getTeamAdapter(team),
      }
    } catch (e: any) {
      console.log('🚀 ~ file: StudentAdapter.ts:33 ~ getStudentAdapter ~ e:', e)
    }
  } else {
    return {
      ...student,
      team: {
        ...initialTeamState,
        members: [student, studentInitialState, studentInitialState],
      },
    }
  }
}

export const getStudentWithOutTeamAdapter = (referStudent: any): Student => {
  if (referStudent) {
    return {
      id: referStudent.idNumber,
      level: referStudent.currentProgrammingClassLevel,
      name: `${referStudent.firstName} ${referStudent.firstSurname}`,
      subject: getStudentGrade(referStudent.currentProgrammingClassName),
    }
  }
  return {
    id: '',
    level: 0,
    name: '',
    subject: '',
  }
}
