import { createContext } from 'react';

export interface ILogin {
    password?: string;
    email?: string;
}

export const INITIAL_STATE: IPersonStateContext = {};

export interface IPersonStateContext {
    readonly UserLogin?: ILogin;
}

export interface IPersonActionContext {
    readonly loginUser?: (payload: ILogin) => void;
}

const PersonContext = createContext<IPersonStateContext>(INITIAL_STATE);
const PersonActionContext = createContext<IPersonActionContext | undefined>(
    undefined
);

export default { PersonContext, PersonActionContext };
