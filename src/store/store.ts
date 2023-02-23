import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/students'
import { Student } from '../types'

interface State {
  students: Student[]
}

const initialState: State = {
  students: []
}


const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addUsers: (state, payload: any) => {
      Object.assign(state.students, [...state.students, ...payload.payload])
    }
  }
})

export const { addUsers } = studentsSlice.actions

export const fetchStudents = createAsyncThunk(
  'fetchUsers',
  async (arg: any, { dispatch }) => {
    const response = await api.get('/students', { params: arg })
    dispatch(addUsers(response.data.students))
  }
)

const store = configureStore({
  reducer: studentsSlice.reducer
})

export default store;
