import { constants } from 'os'
import { Team } from '../../model/Team'
import { Student } from '../../model/student'
import { getStudentWithOutTeamAdapter } from './StudentAdapter'

export const getTeamAdapter = (team: any): Team => {
  const members: Student[] = []

  for (let i = 0; i < 3; i++) {
    members.push({
      ...getStudentWithOutTeamAdapter(team.teamMembers[i]),
    })
  }
  return {
    id: team.teamID,
    name: team.teamName,
    competitionInscribed: team.enrrolled,
    members,
  }
}
