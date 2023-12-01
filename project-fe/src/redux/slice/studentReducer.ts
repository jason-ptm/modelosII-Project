import { createSlice } from '@reduxjs/toolkit'
import { Team } from '../../model/Team'
import { StudentState } from '../../model/states'
import {
  errorInitialState,
  initialTeamState,
  studentInitialState,
} from '../../utils/constants/states'

const initialState: StudentState = {
  loading: false,
  error: errorInitialState,
  selectedTeam: initialTeamState,
  selectedStudent: studentInitialState,
  competititons: [],
  urlToRedirect: {
    url: '',
    state: {
      isCreated: false,
    },
  },
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getStudentById: (state, action): StudentState => {
      const id = action.payload
      return {
        ...state,
        loading: true,
        selectedStudent: studentInitialState,
      }
    },
    getStudentByIdSuccess: (state, action): StudentState => {
      return {
        ...state,
        loading: false,
        selectedStudent: action.payload,
      }
    },
    getStudentByIdError: (state): StudentState => {
      return {
        ...state,
        loading: false,
        selectedStudent: {
          ...state.selectedStudent,
          id: '',
        },
      }
    },
    registerTeam: (state, action): StudentState => {
      return {
        ...state,
        loading: true,
        selectedStudent: {
          ...state.selectedStudent,
          team: action.payload,
        },
      }
    },
    registerTeamSuccess: (state, action): StudentState => {
      return {
        ...state,
        loading: false,
        selectedStudent: {
          ...state.selectedStudent,
          team: action.payload,
        },
      }
    },
    getTeamById: (state, _action): StudentState => {
      return {
        ...state,
        loading: true,
      }
    },
    getTeamByIdSuccess: (state, action): StudentState => {
      return {
        ...state,
        loading: false,
        selectedTeam: action.payload,
      }
    },
    registerTeamError: (state, action): StudentState => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },
    editTeam: (state, action): StudentState => {
      return {
        ...state,
        loading: true,
        selectedStudent: {
          ...state.selectedStudent,
          team: {
            ...state.selectedStudent.team,
            ...action.payload,
          },
        },
      }
    },
    editTeamSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        selectedStudent: {
          ...state.selectedStudent,
          team: action.payload,
        },
      }
    },
    editTeamError: (state, ADMIN_COMPETITIONaction) => {
      return {
        ...state,
        loading: false,
      }
    },
    getCompetitions: (state): StudentState => {
      return {
        ...state,
        loading: true,
      }
    },
    getCompetitionsSuccess: (state, action): StudentState => {
      return {
        ...state,
        loading: false,
        competititons: action.payload,
      }
    },
    getCompetitionsError: (state): StudentState => {
      return {
        ...state,
        loading: false,
      }
    },
    getCompetitionsByCategory: (state, _action): StudentState => {
      return {
        ...state,
        loading: true,
      }
    },
    getCompetitionsByCategorySuccess: (state, action): StudentState => {
      return {
        ...state,
        loading: false,
        competititons: action.payload,
      }
    },
    getCompetitionsByCategoryError: (state): StudentState => {
      return {
        ...state,
        loading: false,
      }
    },

    joinCompetition: (state, _action): StudentState => {
      return {
        ...state,
      }
    },
    joinCompetitionSuccess: (state, action): StudentState => {
      return {
        ...state,
        competititons: action.payload,
      }
    },
    resetStudent: (state): StudentState => {
      return {
        ...state,
        selectedStudent: studentInitialState,
        selectedTeam: initialTeamState,
        urlToRedirect: {
          url: '',
          state: {
            isCreated: false,
          },
        },
      }
    },
    notify: (state) => {
      return {
        ...state,
      }
    },
    redirectRoute: (state, action): StudentState => {
      return {
        ...state,
        urlToRedirect: action.payload,
      }
    },
  },
})

export default studentSlice.reducer

export const {
  getStudentById,
  getStudentByIdSuccess,
  getStudentByIdError,
  getTeamById,
  getTeamByIdSuccess,
  registerTeam,
  registerTeamSuccess,
  registerTeamError,
  editTeam,
  getCompetitions,
  getCompetitionsSuccess,
  getCompetitionsError,
  getCompetitionsByCategory,
  getCompetitionsByCategorySuccess,
  getCompetitionsByCategoryError,
  joinCompetition,
  joinCompetitionSuccess,
  resetStudent,
  notify,
  redirectRoute,
} = studentSlice.actions
