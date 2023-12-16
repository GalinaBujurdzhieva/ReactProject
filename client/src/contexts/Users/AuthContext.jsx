import {createContext} from 'react'
import {useNavigate} from 'react-router-dom'

import usePersistedState from '../../hooks/usePersistedState';

import * as authService from '../../services/userService'
import Paths from '../../utils/Paths';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
const [auth, setAuth] = usePersistedState('auth', {})

const loginSubmitHandler = async (values) =>{
    const result = await authService.login(values.email, values.password);
    setAuth(result);
    localStorage.setItem('accessToken', result.accessToken);

    navigate(Paths.Home);
}

const registerSubmitHandler = async (values) =>{
    const result = await authService.register(values.firstName, values.lastName, values.email, values.phoneNumber, values.username, values.password);
    setAuth(result);
    localStorage.setItem('accessToken', result.accessToken);
    navigate(Paths.Home);
}
const logoutSubmitHandler = () =>{
    setAuth({});
    localStorage.removeItem('accessToken');
    navigate(Paths.Home);
}

return(
    <AuthContext.Provider value={{auth, loginSubmitHandler, registerSubmitHandler, logoutSubmitHandler}}>
        {children}
    </AuthContext.Provider>
)
}
export {AuthContext, AuthProvider};