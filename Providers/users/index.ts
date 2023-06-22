import {
    PersonContext,
    PersonActionContext,
} from '../../Providers/users/context';
import React, {
    FC,
    PropsWithChildren,
    useReducer,
    useContext,
    useEffect,
    useState,
} from 'react';
import { PersonReducer } from './reducer';
import { INITIAL_STATE, ILogin } from './context';

import {
    loginUserRequestAction,
} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

const PersonProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(PersonReducer, INITIAL_STATE);
    const [user, setUser] = useState<ILogin | null>(null);
    const [emailOrEmail, setEmailOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const loginUser = async (emailOrEmail: string, password: string) => {
        try {
            dispatch(loginUserRequestAction(user));
            const response = await axios.get(
                `https://localhost:44311/api/services/app/Person/GetAsyncByUsenameOrEmailAndPassword?userNameOrEmail=${emailOrEmail}&password=${password}}`
            );
            const userData = response.data.result;
            dispatch(fetchUserSuccess(userData));
            setUser(userData);
        } catch (error) {
            dispatch(fetchUserFailure(error.message));
        }
    };

    const fetchUser = async (id: string) => {
        try {
            const response = await axios.get(
                `https://localhost:44311/api/services/app/Person/Get?id=${id}`
            );
            setUser(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            fetchUser(storedUserId);
        }
    }, []);

    return (
        <PersonContext.Provider value={state}>
            <PersonActionContext.Provider value={{ loginUser, fetchUser }}>
                {children}
            </PersonActionContext.Provider>
        </PersonContext.Provider>
    );
};

export { PersonProvider };
