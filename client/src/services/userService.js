const baseUrl = 'http://localhost:3030/users/';

export const login = async (email, password) =>{

    try {
        const response = await fetch(`${baseUrl}login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
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
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({firstName, lastName, email, phoneNumber, username, password}),
      });
      if (response.ok) {
        console.log("User registered successfully");
        const result = await response.json();
        console.log(result);
        return result;
      } else {
        console.log("Failed to register user");
      }
    } catch (error) {
      console.log("Error:", error);
    }
}