import { subjectTypes } from '../../model/student'
import { Team } from '../observer/Team'
import { Subject } from '../observer/subject'
import { Competition } from './Competition'

export class Maraton implements Competition {
  id: string
  level: subjectTypes
  name: string
  teams: Team[]
  subject: Subject = new Subject()

  constructor(id: string, level: subjectTypes, name: string, teams: Team[]) {
    this.id = id
    this.level = level
    this.name = name
    this.teams = teams
  }

  startCompetition = () => {
    this.teams.map((team) => {
      team.notificarTeam()
    })
  }

  addTeam = (team: Team) => {
    this.teams.push(team)

    this.subject.addObserver(team)
  }
}
