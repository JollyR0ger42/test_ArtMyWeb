import { createSlice, configureStore, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../api/students'
import { Student, FetchStudentsParams } from '../types'

export interface State {
  students: Student[]
}

const initialState: State = {
  students: []
}


const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudents: (state, payload: PayloadAction<State>) => {
      Object.assign(state.students, [...state.students, ...payload.payload.students])
    },
    dropStudents: (state) => {
      Object.assign(state.students, [])
    }
  }
})

export const { addStudents } = studentsSlice.actions

export const fetchStudents = createAsyncThunk(
  'fetchStudents',
  async (params: FetchStudentsParams, { dispatch }) => {
    try {
      const response = await api.get('/students', { params: params })
      dispatch(addStudents({students: response.data.students}))
    } catch (e) {
      console.error(e)
    }
  }
)

const store = configureStore({
  reducer: studentsSlice.reducer
})

export type AppDispatch = typeof store.dispatch

export default store;
