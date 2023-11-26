import { Student } from '../model/student'
import ApiService from './api'

const studentBaseApiUrl = 'https://rickandmortyapi.com/api/character'

export default class StudentService extends ApiService {
  getStudentById = async (id: string) => {
    const { data } = await this.axios.get(`${studentBaseApiUrl}/${id}`)
    return data
  }
  registerTeam = async (team: Student[]) => {
    // const { data } = await this.axios.put('', team)
    // return data
    return team
  }

  getTeamById = async (id: string) => {
    const { data } = await this.axios.get('')
    return data
  }

  editTeamById = async (id: string) => {
    const { data } = await this.axios.put('')
    return data
  }
}
