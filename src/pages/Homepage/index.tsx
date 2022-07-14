import React, {useContext} from 'react';
import { IUserModel } from '../../util/IUserModel';
import { UserContext } from '../../util/UserContext';
import { UserContextType } from '../../util/UserContextType';
import {useNavigate} from 'react-router-dom';

export default function Homepage(props: any){
    const context = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    React.useEffect(() => {
        if(context.currentUser.id === ''){
            navigate("/signin");
        }
    })
    return(
        <h1>Hello {context.currentUser.firstname}</h1>
    )
}