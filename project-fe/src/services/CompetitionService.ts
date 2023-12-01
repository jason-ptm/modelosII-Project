import { apiBaseUrl } from '../utils/constants/api'
import ApiService from './api'

export default class CompetitionService extends ApiService {
  getCompetitions = async () => {
    const { data } = await this.axios.get(`${apiBaseUrl}/competition`)
    return data
  }

  getCompetitionsByCategory = async (category: number) => {
    const { data } = await this.axios.get(
      `${apiBaseUrl}/competition/competition-category?compcategory=${category}`
    )
    return data
  }

  joinCompetition = async () => {
    const { data } = await this.axios.put(`${apiBaseUrl}/team`)
    return data
  }
}
