import React from 'react';
import {IUserModel} from './IUserModel';
import {UserContextType} from './UserContextType';

// export const UserContext = React.createContext({
//     firstname:'',
//     lastname:'',
//     email: '',
//     profileImg: '',
// });

export const UserContext = React.createContext<UserContextType| null>(null);