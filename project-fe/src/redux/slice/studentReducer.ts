import { createSlice } from '@reduxjs/toolkit'
import { StudentState } from '../../model/states'
import {
  errorInitialState,
  studentInitialState,
} from '../../utils/constants/states'
import { Student } from '../../model/student'

const initialTeamState: Student[] = [
  { id: '', name: '', semester: 0, grade: '' },
  { id: '', name: '', semester: 0, grade: '' },
  { id: '', name: '', semester: 0, grade: '' },
]

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
        selectedTeam: action.payload,
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
    registerTeamSuccess: (state): StudentState => {
      return {
        ...state,
        loading: false,
      }
    },
    registerTeamError: (state, action): StudentState => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },
    editTeamById: (state, _action): StudentState => {
      return {
        ...state,
        loading: true,
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
        competititons: action.payload,
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
  getCompetitions,
  getCompetitionsSuccess,
  joinCompetition,
  joinCompetitionSuccess,
  resetStudent,
  redirectRoute,
} = studentSlice.actions
