import React, {useContext} from 'react';
import { IUserModel } from '../../util/IUserModel';
import { UserContext } from '../../util/UserContext';
import { UserContextType } from '../../util/UserContextType';
import {useNavigate} from 'react-router-dom';
import NavigationSideBar from '../../components/Sidebar';
import {
    Box, Button
} from '@mui/material';
import axios from 'axios';
import {localBackendAPI} from '../../util/constants/BaseAPIEndpoints';

export default function Homepage(props: any){
    
    const context = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    const testAPI = () => {
        axios.post(localBackendAPI, {
            "data":[
                {
                    "text":"testing the model is easy and simple",
                },
                {
                    "text":"I HATE fast food, its terrible!",
                }
            ]
        })
        .then(res => {
            console.log(res);
        })
    }
    return(
        <Box>
            <h1>Hello {context.currentUser.firstname}</h1>
            <Button onClick={() => {testAPI()}}>Test API</Button>
        </Box>
        
    )
}