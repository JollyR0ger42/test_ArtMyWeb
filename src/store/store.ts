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
    setUsers: (state, payload: any) => {
      state.students = payload.payload
      console.log(state.students)
    }
  }
})

export const { setUsers } = studentsSlice.actions

export const fetchStudents = createAsyncThunk('fetchUsers', async (arg, { dispatch }) => {
  const response = await api.get('/students')
  dispatch(setUsers(response.data.students))
})

const store = configureStore({
  reducer: studentsSlice.reducer
})

export default store;

// Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))

// Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented())
// {value: 1}
// store.dispatch(incremented())
// {value: 2}
// store.dispatch(decremented())
// {value: 1}