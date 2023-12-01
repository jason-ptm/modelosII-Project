import { subjectTypes } from '../../model/student'
import { Team } from '../observer/Team'
import { Competition } from './Competition'

export abstract class CreatorCompetition {
  public abstract createCompetition: (
    id: string,
    level: subjectTypes,
    name: string,
    teams: Team[]
  ) => {}
}
