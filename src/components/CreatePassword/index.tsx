import { Paper, Typography, Divider, Stack, TextField, Button, Box, ListItem } from "@mui/material"
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIEndpoint } from "../../util/constants/BaseAPIEndpoints";
import { IUserModel } from "../../util/IUserModel";
import { UserContext } from "../../util/UserContext";
import { UserContextType } from "../../util/UserContextType";

export default function CreatePassword(props: any){
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const context = useContext(UserContext) as UserContextType;

    // Errors
    const [passwordError, setPasswordError] = useState(false);
    const [password2Error, setPassword2Error] = useState(false);
    const navigate = useNavigate();

    const isValidPassword = (password: string) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password);
    }

    const doPasswordsMatch = (password: string, password2: string) => {
        return password === password2 ?  true : false;
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

    const handleCreatePassword = () => {
        if(passwordError || password2Error||password === "" || confirmPassword === "") return;
        let tempUser = JSON.parse(localStorage.getItem("tempUser")|| "");
        axios.post(APIEndpoint+"user/register", {
            "first_name": tempUser.firstname,
            "last_name": tempUser.lastname,
            "email": tempUser.email,
            "password": password,
            "password2": confirmPassword
        }).then(response => {
            if(response.status === 201){
                axios.post(`${APIEndpoint}user/get-auth-token`, { 
                    "email": tempUser.email.toLowerCase(),
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
                                id:response.data.id.toString(),
                                firstname:response.data.first_name,
                                lastname:response.data.last_name,
                                email: response.data.email,
                                profileImg:tempUser.profileImg,
                            }
                            localStorage.setItem('currentUser', JSON.stringify(newUser));
                            context.setUser(newUser);
                            navigate("/");
                        } else{
                            console.log(response);
                        } 
                    })
                })
            };
        })
        localStorage.removeItem("tempUser");
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
                    color="primary" 
                    variant="h3"
                >Add a password</Typography>

                <Divider sx={{marginTop:2, marginBottom:2}}/>

                <Stack direction="column" spacing={2} sx={{marginBottom:2}}>
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
                        () =>{handleCreatePassword()}
                    }>Create Password</Button>
                </Stack>
            </Paper>
        </Box>
    )
}
