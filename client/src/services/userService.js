import toastrNotificationsService from "./toastrNotificationsService";
const baseUrl = 'http://localhost:3030/users/';

let headers = new Headers ({
  "Content-type": "application/json"
});

export const login = async (email, password) =>{
  if (email === 'admin@abv.bg' && password === 'admin') {
    headers = {
      ...headers,
      "X-Admin": ""
    }
  }
    try {
        const response = await fetch(`${baseUrl}login`, {
          method: "POST",
          headers,
          body: JSON.stringify({email, password}),
        });
        if (response.ok) {
          toastrNotificationsService.showSuccess('User logged in successfully');
          const result = await response.json();
          return result;
        } else {
          toastrNotificationsService.showError('Failed to log in user');
        }
      } catch (error) {
        throw error;
      }
}

export const register = async (firstName, lastName, email, phoneNumber, username, password) =>{
  try {
      const response = await fetch(`${baseUrl}register`, {
        method: "POST",
        headers,
        body: JSON.stringify({firstName, lastName, email, phoneNumber, username, password}),
      });
      if (response.ok) {
        toastrNotificationsService.showSuccess('User registered successfully');
        const result = await response.json();
        return result;
      } else {
        toastrNotificationsService.showError('Failed to register user');
      }
    } catch (error) {
      throw error;
    }
}
