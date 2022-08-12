import {Link} from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Paper,
    Stack,
    Typography,
    Divider,
    ListItem,
} from '@mui/material';
import {useState} from 'react';
import axios from 'axios';
import {APIEndpoint} from '../../util/constants/BaseAPIEndpoints';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage(props: any){
    // Values
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Errors
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [password2Error, setPassword2Error] = useState(false);

    const navigate = useNavigate();

    const isValidEmail = (email: string) => {  
        return  /\S+@\S+\.\S+/.test(email);
    }

    const isValidPassword = (password: string) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password);
    }

    const doPasswordsMatch = (password: string, password2: string) => {
        return password === password2 ?  true : false;
    }

    const handleSignUp = () => {
        if(emailError || passwordError || password2Error || firstname === "" || lastname === ""|| email === "" ||password === "" || confirmPassword === "") return;
        axios.post(APIEndpoint+"user/register", {
            "first_name": firstname,
            "last_name": lastname,
            "email": email,
            "password": password,
            "password2": confirmPassword
        }).then(response => {
            if(response.status === 201){
                navigate("/signin");
            };
        })
    }

    const passwordHelperText = () => {
        return(
            <>
                <Typography variant="body2">Password Must Include:</Typography>
                <Box sx={{marginLeft:3}}>
                    <ListItem sx={{display: 'list-item', padding:0}}>
                    At least 8 characters
                </ListItem>
                <ListItem sx={{display: 'list-item', padding:0}}>
                    At least 1 upper case character
                </ListItem>
                <ListItem sx={{display: 'list-item', padding:0}}>
                    At least 1 number
                </ListItem>
                <ListItem sx={{display: 'list-item', padding:0}}>
                    At least 1 special character
                </ListItem>
                </Box>
                
            </>
        )
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
                    }}>
                <Typography 
                    color="secondary" 
                    variant="h2"
                >Sign Up</Typography>

                <Divider sx={{marginTop:2, marginBottom:2}}/>

                <Stack direction="column" spacing={2} sx={{marginBottom:2}}>
                    <TextField 
                        variant='outlined' 
                        label="Firstname" 
                        value={firstname} 
                        onChange={
                            (e) => {setFirstname(e.target.value)}
                        } />
                    <TextField 
                        variant='outlined' 
                        label="Lastname" 
                        value={lastname} 
                        onChange={
                            (e) => {setLastname(e.target.value)}
                        }/>
                    <TextField 
                        variant='outlined' 
                        label="Email" 
                        required 
                        helperText={emailError? "Enter a valid email address": ""}
                        error={emailError} 
                        value={email} 
                        onChange={
                            (e) => {
                                setEmail(e.target.value); 
                                setEmailError(!isValidEmail(e.target.value))
                            }
                        }/>
                    <TextField 
                        variant='outlined' 
                        label="Password" 
                        required 
                        type="password" 
                        helperText={passwordError? passwordHelperText(): ""}
                        value={password} 
                        error={passwordError}
                        onChange={
                            (e) => {
                                setPassword(e.target.value);
                                setPasswordError(!isValidPassword(e.target.value));
                                setPassword2Error(!doPasswordsMatch(confirmPassword, e.target.value))
                            }
                        }/>
                    <TextField 
                        variant='outlined' 
                        label="Confirm Password" 
                        required 
                        type="password" 
                        value={confirmPassword}
                        error={password2Error} 
                        helperText={password2Error ? "Passwords do not match": ""}
                        onChange={
                            (e) => {
                                setConfirmPassword(e.target.value)
                                setPassword2Error(!doPasswordsMatch(password, e.target.value))
                            }
                        }/>
                    <Button 
                        variant='contained' 
                        onClick={
                            () =>{handleSignUp()}
                        }>Sign Up</Button>
                </Stack>
                <Typography><Link to="/signin">Already have an account?</Link></Typography>
            </Paper>
        </Box>
    )
}