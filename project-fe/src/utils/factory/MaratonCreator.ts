import { Competition } from '../../model/Competition'
import { Maraton } from './Maraton'
import { CreatorCompetition } from './Creator'
import { subjectTypes } from '../../model/student'
import { Team } from '../observer/Team'

export class MaratonCreator extends CreatorCompetition {
  public createCompetition = (
    id: string,
    level: subjectTypes,
    name: string,
    teams: Team[]
  ) => {
    return new Maraton(id, level, name, teams)
  }
}
