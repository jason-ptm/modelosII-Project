import { apiBaseUrl } from '../utils/constants/api'
import ApiService from './api'

export default class StudentService extends ApiService {
  getStudentById = async (id: string) => {
    const { data } = await this.axios.get(`${apiBaseUrl}/user`, {
      params: {
        memberid: Number(id),
      },
    })

    return data
  }
}
