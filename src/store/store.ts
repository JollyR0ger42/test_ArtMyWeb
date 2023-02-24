import { createSlice, configureStore, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../api/students'
import { Student, FetchStudentsParams } from '../types'

export interface State {
  students: Student[],
  searchTerm?: string,
}

const initialState: State = {
  students: [],
  searchTerm: '',
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
    }
  }
})

export const { addStudents, dropStudents, setSearch } = studentsSlice.actions

export const fetchStudents = createAsyncThunk(
  'fetchStudents',
  async (params: FetchStudentsParams, thunkAPI) => {
    try {
      const searchTerm = (thunkAPI.getState() as State).searchTerm
      const response = await api.get('/students', { params: { ...params, searchTerm } })
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
