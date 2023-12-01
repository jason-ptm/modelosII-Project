// CompetitionServiceProxy.js

import { Student } from '../../model/student'
import CompetitionService from '../../services/CompetitionService'

class CompetitionServiceProxy {
  private competitionService: CompetitionService
  private student: Student

  constructor(user: Student) {
    this.competitionService = new CompetitionService()
    this.student = user
  }

  async joinCompetition(teamName: string, competitionName: string) {
    if (this.hasPermission(this.student)) {
      return await this.competitionService.joinCompetition(
        teamName,
        competitionName
      )
    } else {
      throw new Error('No tienes permisos para unirte a la competición.')
    }
  }

  hasPermission(student: Student) {
    if (student.team) {
      return student.team.competitionInscribed
    }
    return false
  }
}

export default CompetitionServiceProxy
