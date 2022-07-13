import {
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import React, {useState} from 'react';
import {UserContext} from './util/UserContext';
import Homepage from './pages/Homepage';
import SignInPage from './pages/SignInPage';

function App() {
  const [currentUser, setCurrentUser] = useState({
    firstname:'',
    lastname:'',
    email: '',
    profileImg: '',
  });

  const noUserLoggedIn = (): boolean => {
    return Object.values(currentUser).every(x => x === null || x === '');
  }

  return (
    <div>
      <header className="App-header">
        {noUserLoggedIn() ?
          <SignInPage/>
        :
          <UserContext.Provider value={currentUser}>
          
              <Routes>
                <Route path="/" element={<Homepage/>}/>
              </Routes>
          
          </UserContext.Provider>
        }
     </header>
    </div>
  );
}

export default App;
