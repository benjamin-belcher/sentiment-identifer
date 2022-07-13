import React from 'react';
import { UserContext } from '../../util/UserContext';

export default function Homepage(props: any){
    return(
        <UserContext.Consumer>
            {value => <h1>Hello {value.firstname}</h1>} 
        </UserContext.Consumer>
    )
}