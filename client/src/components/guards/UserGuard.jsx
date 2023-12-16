import {Outlet, Navigate} from 'react-router-dom'
import Paths from '../../utils/Paths';

export const UserGuard = () =>{
    const auth = JSON.parse(localStorage.getItem('auth'));
    const isAuthenticated = !!auth?.username;
    if (!isAuthenticated) {
        return <Navigate to={Paths.Login} />
    }
    return <Outlet />;
}