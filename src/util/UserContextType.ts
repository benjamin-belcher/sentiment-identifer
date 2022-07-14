import {IUserModel} from './IUserModel';

export type UserContextType = {
    currentUser: IUserModel;
    setUser: (newUser: IUserModel) => void;
}