import {useContext} from 'react';
import { UserContext } from '../../util/UserContext';
import { UserContextType } from '../../util/UserContextType';
import {useNavigate} from 'react-router-dom';
import {
    Box, Button
} from '@mui/material';

export default function Homepage(props: any){
    
    const context = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();
    return(
        <Box>
            <h1>Hello {context.currentUser.firstname}</h1>
        </Box>
        
    )
}