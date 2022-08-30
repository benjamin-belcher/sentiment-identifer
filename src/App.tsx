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
import {Box, Stack} from '@mui/material';
import NavigationSideBar from './components/Sidebar';
import NewAnalysisPage from './pages/NewAnalysis';
import HelpPage from './pages/HelpPage';
import LogoutPage from './pages/LogoutPage';
import MiniDrawer from './components/MuiSidebar';
import ProfilePage from './pages/ProfilePage';
import CreatePassword from './components/CreatePassword';

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

  const navigate = useNavigate();

  const noUserLoggedIn = (): boolean => {
    return Object.values(currentUser).every(x => x === null || x === '');
  }

  const noLocalStorageUser = (user: IUserModel): boolean => {
    return Object.values(user).every(x => x === null || x === '');
  }

  React.useEffect(() => {
    const localStorageUser: IUserModel = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setCurrentUser(localStorageUser);
    if(noLocalStorageUser(localStorageUser) && noUserLoggedIn()) {
      navigate("/signin")
    }
    
  }, []);

  return (
    <div style={{maxWidth:"100vw", display: "flex", flexDirection:"row", alignItems: "stretch"}}>
      <header className="App-header" style={{width:"100%",}}>
        
          <UserContext.Provider value={{currentUser, setUser}}>
          <Routes>
            <Route path="/logout" element={<LogoutPage/>}/>
            <Route path="/signin" element={<SignInPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/createPassword" element={<CreatePassword/>}/>
          </Routes>
            {noUserLoggedIn() ? 
              <></>:
            <Stack direction="row" sx={{height:'100vh', width:'100%'}}>
              <MiniDrawer />
                <Routes>
                  <Route path="/" element={<Homepage/>}/>
                  <Route path="/analysis/new" element={<NewAnalysisPage/>}/>
                  <Route path="/:id" element={<ProfilePage/>}/>
                  <Route path="/help" element={<HelpPage/>}/>
                </Routes>
            </Stack>
            }
          </UserContext.Provider>
        
     </header>
    </div>
  );
}

export default App;
