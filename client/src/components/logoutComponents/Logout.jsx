import { useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/Users/AuthContext';
import toastrNotificationsService from '../../services/toastrNotificationsService';

export const Logout = () =>{
    const { logoutSubmitHandler } = useContext(AuthContext);
    const token = localStorage.getItem('accessToken');
    const baseUrl = 'http://localhost:3030/users/';

    let headers = new Headers ({
        "Content-type": "application/json",
        "X-Authorization": token
      });

    useEffect(() => {
       fetch(`${baseUrl}logout`,{
        method: 'GET',
        headers
      })
      .then(response => {
        if (response.status === 204) {
          toastrNotificationsService.showSuccess('User logged out successfully');
          return {}
        }
        else{
          toastrNotificationsService.showError('Failed to log out user');
        }
      })
       .then(() => logoutSubmitHandler())
       .catch(err =>{
        console.log(err);
       })
    },[])
    return null;
}