import { SetTeamInterface, Team } from '../model/Team'
import { apiBaseUrl } from '../utils/constants/api'
import ApiService from './api'

export default class TeamService extends ApiService {
  registerTeam = async (team: SetTeamInterface) => {
    const { data } = await this.axios.post(
      `${apiBaseUrl}/team?teamname=${team.name}&studentid=${team.member.id}`
    )
    return data
  }

  addMembersToTeam = async (
    teamId: string,
    firstStudentId: string,
    secondStudentId: string
  ) => {
    const { data } = await this.axios.put(
      `${apiBaseUrl}/team/add-members?teamid=${teamId}&studentid1=${firstStudentId}&studentid2=${secondStudentId}`
    )
    return data
  }

  getTeamById = async (id: string) => {
    const { data } = await this.axios.get(`${apiBaseUrl}/team/team-by-member`, {
      params: {
        studentid: id,
      },
    })
    return data
  }

  editTeamById = async (id: string) => {
    const { data } = await this.axios.put('')
    return data
  }

  deleteTeamById = async (id: string) => {
    await this.axios.delete(`${apiBaseUrl}/team?teamid=${id}`)
  }
}
