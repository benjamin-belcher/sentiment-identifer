import {
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import React, {useState} from 'react';
import {UserContext} from './util/UserContext';
import Homepage from './pages/Homepage';

function App() {
  const [currentUser, setCurrentUser] = useState({
    firstname:'',
    lastname:'',
    email: '',
    profileImg: '',
  });

  return (
    <UserContext.Provider value={currentUser}>
    <div>
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Homepage/>}/>
        </Routes>
      </header>
    </div>
    </UserContext.Provider>
  );
}

export default App;
