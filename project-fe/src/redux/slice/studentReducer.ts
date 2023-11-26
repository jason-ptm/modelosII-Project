import { createSlice } from '@reduxjs/toolkit'
import { StudentState } from '../../model/states'
import {
  errorInitialState,
  studentInitialState,
} from '../../utils/constants/states'
import { Student } from '../../model/student'

const initialStudentsState: Student[] = [
  { id: '', name: '', semester: 0, grade: '' },
  { id: '', name: '', semester: 0, grade: '' },
  { id: '', name: '', semester: 0, grade: '' },
]

const initialState: StudentState = {
  loading: false,
  error: errorInitialState,
  selectedTeam: initialStudentsState,
  selectedStudent: studentInitialState,
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
        selectedStudent: {
          ...state.selectedStudent,
          id,
        },
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
    resetStudent: (state): StudentState => {
      return {
        ...state,
        selectedStudent: studentInitialState,
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
  resetStudent,
  redirectRoute,
} = studentSlice.actions
