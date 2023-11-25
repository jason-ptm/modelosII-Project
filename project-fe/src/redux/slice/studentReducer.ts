import { createSlice } from '@reduxjs/toolkit'
import { StudentInitialState } from '../../model/states'
import {
  errorInitialState,
  studentInitialState,
} from '../../utils/constants/states'

const initialState: StudentInitialState = {
  loading: false,
  error: errorInitialState,
  selectedTeam: [],
  selectedStudent: studentInitialState,
  urlToRedirect: '',
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getStudentById: (state, action): StudentInitialState => {
      const id = action.payload
      return {
        ...state,
        loading: true,
        selectedStudent: {
          ...state.selectedStudent,
          id,
        },
      }
    },
    getStudentByIdSuccess: (state, action): StudentInitialState => {
      return {
        ...state,
        loading: false,
        selectedStudent: action.payload,
      }
    },
    getStudentByIdError: (state): StudentInitialState => {
      return {
        ...state,
        loading: false,
        selectedStudent: {
          ...state.selectedStudent,
          id: '',
        },
      }
    },
    registerTeam: (state, action): StudentInitialState => {
      return {
        ...state,
        loading: true,
        selectedTeam: action.payload,
      }
    },
    registerTeamSuccess: (state, action): StudentInitialState => {
      return {
        ...state,
        loading: false,
        selectedTeam: action.payload,
      }
    },
    registerTeamError: (state, action): StudentInitialState => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },
    resetLoading: (state): StudentInitialState => {
      return {
        ...state,
        loading: false,
      }
    },
    redirectRoute: (state, action): StudentInitialState => {
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
  registerTeam,
  registerTeamSuccess,
  registerTeamError,
  resetLoading,
  redirectRoute,
} = studentSlice.actions
