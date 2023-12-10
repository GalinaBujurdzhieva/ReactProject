import {Outlet, Navigate} from 'react-router-dom'

export const UserGuard = () =>{
    const auth = JSON.parse(localStorage.getItem('auth'));
    const isAuthenticated = !!auth?.username;
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }
    return <Outlet />;
}