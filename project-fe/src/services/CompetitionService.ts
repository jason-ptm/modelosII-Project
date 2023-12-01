import { apiBaseUrl } from '../utils/constants/api'
import ApiService from './api'

export default class CompetitionService extends ApiService {
  createCompetition = async (name: string, category: number) => {
    const { data } = await this.axios.post(
      `${apiBaseUrl}/competition?compname=${name}&compcategory=${category}`
    )
    return data
  }

  getCompetitions = async () => {
    const { data } = await this.axios.get(
      `${apiBaseUrl}/competition/competition-all`
    )
    return data
  }

  getCompetitionsByCategory = async (category: number) => {
    const { data } = await this.axios.get(
      `${apiBaseUrl}/competition/competition-category?compcategory=${category}`
    )
    return data
  }

  joinCompetition = async (teamName: string, competitionName: string) => {
    const { data } = await this.axios.put(
      `${apiBaseUrl}/competition?teamname=${teamName}&compname=${competitionName}`
    )
    return data
  }
}
