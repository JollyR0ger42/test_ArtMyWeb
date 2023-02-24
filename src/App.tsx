import React, {useEffect, useState} from 'react';
import store, {fetchStudents, State, AppDispatch, dropStudents, setSearch} from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import StudentCard from './components/StudentCard';
import SearchBar from './components/SearchBar';
import PopupDialog from './components/PopupDialog';
import {Student} from './types'

function App() {
  const students = useSelector((state: State) => state.students);
  const search = useSelector((state: State) => state.searchTerm);
  const dispatch = useDispatch<AppDispatch>();
  const [showPopup, setShowPopup] = useState(false);
  const [activeStudent, setActiveStudent] = useState({});

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

  const onSearch = (payload: string) => {
    if (payload !== search) {
      dispatch(dropStudents());
      dispatch(setSearch({searchTerm: payload}));
      fetchNext(20);
    }
  }

  const closePopup = () => {setShowPopup(false)}

  const selectStudent = (idx: number) => {
    setActiveStudent(students[idx])
    setShowPopup(true)
  }

  return (
    <div className="App">
      <SearchBar onSearch={onSearch} />
      <PopupDialog open={showPopup} student={activeStudent as Student} onClose={closePopup} />
      {students.map((stud, idx) =>
        <StudentCard onClick={() => selectStudent(idx)} key={idx} student={stud} />
      )}
    </div>
  );
}

export default App;
