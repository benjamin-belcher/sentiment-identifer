import {Link, useNavigate} from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Paper,
    Stack,
    Typography,
    Divider,
    Alert,
    Snackbar,
} from '@mui/material';
import {useContext, useState} from 'react';
import GoogleLoginComponent from '../../components/GoogleLogin';
import axios from "axios";
import {APIEndpoint} from '../../util/constants/BaseAPIEndpoints';
import { IUserModel } from '../../util/IUserModel';
import { UserContext } from '../../util/UserContext';
import { UserContextType } from '../../util/UserContextType';

const clientConfig = { client_id: '945406263981-q6r8d575nd6orns70p25s95l92odtrrq.apps.googleusercontent.com' }

export default function SignInPage(props: any){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorState, setErrorState] = useState(false);

    const {setUser} = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
      };

    const onloginBtnPressed = () => {
        axios.post(`${APIEndpoint}user/get-auth-token`, { 
            "email": email.toLowerCase(),
            "password": password
        }).then(response => {
            // Doing another get request to get user object. Could always just store token but already implimented using full object in local storage
            axios.get(`${APIEndpoint}user/get-details`,{
                headers:{
                    Authorization:`Token ${response.data.token}`
                }
            }).then(response => {
                if(response.status === 200){
                    let newUser: IUserModel = {
                        id:response.data.id,
                        firstname:response.data.first_name,
                        lastname:response.data.last_name,
                        email: response.data.email,
                        profileImg:"",
                    }
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                    setUser(newUser);
                    navigate("/");
                } else{
                    console.log(response);
                    setErrorState(true);
                } 
            })
        }).catch((err) => {
            console.log(err);
            setErrorState(true);
        })
    }

    return(
        <Box 
            sx={{
                margin:2, 
                padding:2,
                display:"flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth:"200px",
                
            }}>
            <Paper
                elevation={2}
                sx={{
                        padding:6, 
                        borderRadius:4,
                        width:"25%",
                        minWidth:"250px",
                        color:"#2F4051",
                    }}>
                <Typography color="secondary" variant="h2">Login</Typography>
                <Divider sx={{marginTop:2, marginBottom:2}}/>
                <Stack direction="column" spacing={2}>
                    <TextField 
                        variant='outlined' 
                        label="Email" 
                        value={email} 
                        error={errorState} 
                        helperText={errorState?"Enter a valid email": ""}
                        onChange={
                            (e) => {
                                setEmail(e.target.value); 
                                setErrorState(false)
                            }
                        }/>
                    <TextField 
                        variant='outlined' 
                        label="Password" 
                        type="password" 
                        error={errorState} 
                        value={password} 
                        onKeyDown={(e) => e.key === "Enter" ? onloginBtnPressed(): null}
                        helperText={errorState?"Enter a valid password": ""}
                        onChange={
                            (e) => {
                                setPassword(e.target.value); 
                                setErrorState(false)
                            }
                        }/>
                    <Button 
                        variant="contained" 
                        sx={{padding:1}} 
                        onClick={
                            () => {onloginBtnPressed()}
                        }>Login</Button>
                </Stack>
                <Divider sx={{marginTop:2, marginBottom:2}}>or</Divider>
                <GoogleLoginComponent/>
                <Typography><Link to="/signup">New Here?</Link></Typography>
            </Paper>

            {/* Error Message Snackbar */}
            <Snackbar open={errorState} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: '100%' }}>
                Oops! Something went wrong 😔
                </Alert>
            </Snackbar>
        </Box>
    )
}