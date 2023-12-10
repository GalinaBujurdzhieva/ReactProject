import {Outlet, Navigate} from 'react-router-dom'

export const AuthGuard = () =>{
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth?.email !== "admin@abv.bg") {
        return (<Navigate to='/login' />)
    }
    return <Outlet />;
}