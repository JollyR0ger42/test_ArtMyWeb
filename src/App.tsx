import React, {useEffect} from 'react';
import api from './api/students'

function App() {
  useEffect(() => {
    api.get('/students', {params: {searchTerm: 'student 1', limit: 20, skip: 0}})
      .then(response => console.log(response.data.students))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
