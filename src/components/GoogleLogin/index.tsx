import React, {useContext} from "react";
import { GoogleLoginButton } from 'ts-react-google-login-component';
import {refreshTokenSetup} from '../../util/refreshToken';
import {useState} from "react"
import {UserContext} from '../../util/UserContext';
import {UserContextType} from '../../util/UserContextType';
import {useNavigate} from 'react-router-dom';
import {IUserModel} from '../../util/IUserModel';
import {
    Button, 
    Box,
    Paper,
    Typography,
    Stack
} from '@mui/material';
import GoogleIcon from '../../assets/GoogleIcon.svg';
import './style.css';

const clientConfig = { client_id: process.env.REACT_APP_GOOGLE_CLOUD_CLIENT_ID  }

export default function GoogleLoginComponent(props: any){
    const {setUser} = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    const responseGoogle = (googleUser: any): void => {
        const id_token = googleUser.getAuthResponse(true)
        const googleId = googleUser.getId()

        console.log("user ", googleUser.getBasicProfile())
        console.log({ googleId })
        console.log({accessToken: id_token});
        let newUser: IUserModel = {
            id:googleUser.getId(),
            firstname:googleUser.getBasicProfile().getGivenName(),
            lastname:googleUser.getBasicProfile().getFamilyName(),
            email: googleUser.getBasicProfile().getEmail(),
            profileImg:googleUser.getBasicProfile().getImageUrl(),
        }
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setUser(newUser);
        navigate("/");
    }

    const preLoginTracking = (): void => {
        console.log('Attemp to login with google');
    }

    const errorHandler = (error: string): void =>{
        // handle error if login got failed...
        console.error(error)
    }

    return(
        <GoogleLoginButton
            classNames="centerGoogleBtn"
            responseHandler={responseGoogle}
            clientConfig={clientConfig}
            preLogin={preLoginTracking}
            failureHandler={errorHandler}
        >
            <Paper elevation={2} sx={{cursor:"pointer", borderRadius:4, maxWidth:"300px" }}>
                <Stack direction="row" spacing={1} sx={{padding:1, alignItems:"center"}}>
                    <Box component="img" src={GoogleIcon}/>
                    <Typography variant="h6">Continue with Google</Typography>  
                </Stack>

            </Paper>
        </GoogleLoginButton>
    )
}