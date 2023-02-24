import React, {useEffect} from 'react';
import store, {fetchStudents, State, AppDispatch } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import StudentCard from './components/StudentCard'
import SearchBar from './components/SearchBar'

function App() {
  const students = useSelector((state: State) => state.students)
  const dispatch = useDispatch<AppDispatch>();

  const fetchNext = (limit: number) => {
    dispatch(fetchStudents({limit, skip: store.getState()?.students.length}));
  }

  useEffect(() => {
    fetchNext(20)
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        fetchNext(20);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const onSearch = (payload: any) => {
    console.log('onSearch', payload);
  }

  return (
    <div className="App">
      <SearchBar onSearch={onSearch} />
      {students.map((stud, idx) => <StudentCard key={idx} student={stud} />)}
    </div>
  );
}

export default App;
