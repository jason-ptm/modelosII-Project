import Axios, { AxiosInstance } from 'axios'

export default class ApiService {
  protected axios: AxiosInstance

  constructor() {
    this.axios = this.configureAxios()
  }

  private configureAxios(): AxiosInstance {
    return Axios.create()
  }
}
