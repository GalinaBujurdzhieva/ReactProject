import {Outlet, Navigate} from 'react-router-dom'

import Paths from '../../utils/Paths';

export const AuthGuard = () =>{
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth?.email !== "admin@abv.bg") {
        return (<Navigate to={Paths.Login} />)
    }
    return <Outlet />;
}