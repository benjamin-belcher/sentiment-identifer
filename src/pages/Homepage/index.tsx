import React, {useContext} from 'react';
import { IUserModel } from '../../util/IUserModel';
import { UserContext } from '../../util/UserContext';
import { UserContextType } from '../../util/UserContextType';
import {useNavigate} from 'react-router-dom';
import NavigationSideBar from '../../components/Sidebar';
import {
    Box
} from '@mui/material';

export default function Homepage(props: any){
    const context = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    // Redirect to signin page if there is no user
    // React.useEffect(() => {
    //     if(context.currentUser.id === ''){
    //         navigate("/signin");
    //     }
    // })
    return(
        <Box>
            <h1>Hello {context.currentUser.firstname}</h1>
        </Box>
        
    )
}