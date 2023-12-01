import { createSlice } from '@reduxjs/toolkit'
import { AdminState } from '../../model/states'
import {
  competitionInitialState,
  initialTeamState,
} from '../../utils/constants/states'

const initialState: AdminState = {
  loading: false,
  teams: [initialTeamState],
  competitions: [competitionInitialState],
  urlToRedirect: {
    url: '',
    state: {
      isCreated: false,
    },
  },
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getCompetitions: (state): AdminState => {
      return {
        ...state,
        loading: true,
      }
    },
    getCompetitionsSuccess: (state, action): AdminState => {
      return {
        ...state,
        loading: false,
        competitions: action.payload,
      }
    },
    getCompetitionsError: (state, action): AdminState => {
      return {
        ...state,
        loading: false,
      }
    },
    createCompetition: (state, action): AdminState => {
      return {
        ...state,
        loading: true,
      }
    },
    createCompetitionSuccess: (state): AdminState => {
      return {
        ...state,
        loading: false,
      }
    },
    createCompetitionError: (state, action) => {
      return {
        ...state,
        loading: false,
      }
    },
    editCompetition: (state, action): AdminState => {
      return {
        ...state,
        loading: true,
      }
    },
    editCompetitionSuccess: (state, action): AdminState => {
      return {
        ...state,
        loading: false,
      }
    },
    editCompetitionError: (state, action) => {
      return {
        ...state,
        loading: false,
      }
    },
    getTeams: (state, action): AdminState => {
      return {
        ...state,
        loading: true,
      }
    },
    getTeamsSuccess: (state, action): AdminState => {
      return {
        ...state,
        loading: false,
        teams: action.payload,
      }
    },
    getTeamsError: (state, action): AdminState => {
      return {
        ...state,
        loading: false,
      }
    },
    redirectRoute: (state, action): AdminState => {
      return {
        ...state,
        urlToRedirect: action.payload,
      }
    },
  },
})

export default adminSlice.reducer

export const {
  getCompetitions,
  getCompetitionsError,
  getCompetitionsSuccess,
  getTeams,
  getTeamsError,
  getTeamsSuccess,
  createCompetition,
  createCompetitionError,
  createCompetitionSuccess,
  editCompetition,
  editCompetitionError,
  editCompetitionSuccess,
  redirectRoute,
} = adminSlice.actions
