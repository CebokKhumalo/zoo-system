import { createAction } from 'redux-actions';
import { IPersonStateContext, ILogin } from './context';

export enum PersonActionEnum {
    loginUserRequest = 'LOGIN',
    createPersonRequest = 'CREATE',
    getAllPersonRequest = 'GETALL',
}

export const loginUserRequestAction = createAction<IPersonStateContext, ILogin>(
    PersonActionEnum.loginUserRequest,
    (UserLogin) => ({ UserLogin })
);
