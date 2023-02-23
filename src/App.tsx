import React from 'react';
import store, {fetchStudents} from './store/store';
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const students = useSelector((state: any) => state.students)
  const dispatch = useDispatch<typeof store.dispatch>()

  const onClick = () => {
    dispatch(fetchStudents({searchTerm: 'student', limit: 10, skip: 5}))
  }

  return (
    <div className="App">
      {students.map((stud, idx) => <div key={idx}>{stud.name}</div>)}
      <button onClick={onClick}>Butn</button>
    </div>
  );
}

export default App;
