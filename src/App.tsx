import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import './App.css';
import React, {useState, useMemo} from 'react';
import {UserContext} from './util/UserContext';
import Homepage from './pages/Homepage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import {IUserModel} from './util/IUserModel';

function App() {
  const [currentUser, setCurrentUser] = useState<IUserModel>({
        id:'',
        firstname:'',
        lastname:'',
        email: '',
        profileImg: '',
  });
  
  const setUser = (user: IUserModel): void => {
    setCurrentUser(user);
  }
  // const providerValue: any = useMemo(() => ({currentUser, setCurrentUser}), [currentUser, setCurrentUser]);
  const navigate = useNavigate();

  const noUserLoggedIn = (): boolean => {
    return Object.values(currentUser).every(x => x === null || x === '');
  }

  React.useEffect(() => {
    if(noUserLoggedIn()) {
      navigate("/signin")
    }
  }, [])

  return (
    <div>
      <header className="App-header">
          <UserContext.Provider value={{currentUser, setUser}}>
              <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/signin" element={<SignInPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
              </Routes>
          </UserContext.Provider>
     </header>
    </div>
  );
}

export default App;
