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
          console.log("User logged in successfully");
          const result = await response.json();
          return result;
        } else {
          console.log("Failed to log in user");
        }
      } catch (error) {
        console.log("Error:", error);
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
        console.log("User registered successfully");
        const result = await response.json();
        return result;
      } else {
        console.log("Failed to register user");
      }
    } catch (error) {
      console.log("Error:", error);
    }
}

export const logout = async () =>{
  try {
    
    const response = await fetch(`${baseUrl}logout`,{
      method: 'GET',
      headers
    })
    if (response.status === 204) {
      console.log("User logged out successfully");
      return {}
    }
    else{
      console.log("Failed to log out user");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}
