import { createSlice, configureStore, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../api/students'
import { Student, FetchStudentsParams } from '../types'

export interface State {
  students: Student[],
  searchTerm: string,
  loading: boolean,
}

const initialState: State = {
  students: [],
  searchTerm: '',
  loading: false,
}


const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudents: (state, payload: PayloadAction<{ students: Student[] }>) => {
      Object.assign(state.students, [...state.students, ...payload.payload.students])
    },
    dropStudents: (state) => {
      state.students = []
    },
    setSearch: (state, payload: PayloadAction<{ searchTerm: string }>) => {
      state.searchTerm = payload.payload.searchTerm
    },
    setLoading: (state, payload: PayloadAction<{ loading: boolean }>) => {
      state.loading = payload.payload.loading
    }
  }
})

export const { addStudents, dropStudents, setSearch, setLoading } = studentsSlice.actions

export const fetchStudents = createAsyncThunk(
  'fetchStudents',
  async (params: FetchStudentsParams, thunkAPI) => {
    const state = thunkAPI.getState() as State
    if (state.loading) return
    try {
      const searchTerm = state.searchTerm
      thunkAPI.dispatch(setLoading({ loading: true }))
      const response = await api.get('/students', { params: { ...params, searchTerm } })
      thunkAPI.dispatch(setLoading({ loading: false }))
      thunkAPI.dispatch(addStudents({ students: response.data.students }))
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
