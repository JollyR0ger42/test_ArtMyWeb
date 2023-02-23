import React, {useEffect} from 'react';
import store, {fetchStudents} from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import StudentCard from './components/StudentCard'

function App() {
  const students = useSelector((state: any) => state.students)
  const dispatch = useDispatch<typeof store.dispatch>()

  useEffect(() => {
    fetchNext(20)
    window.addEventListener('scroll', function() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        fetchNext(20)
      }
   });
  }, [])

  const fetchNext = (limit) => {
    dispatch(fetchStudents({limit, skip: store.getState()?.students.length}))
  }

  return (
    <div className="App">
      {students.map((stud, idx) => <StudentCard key={idx} student={stud} />)}
    </div>
  );
}

export default App;
