export const headersForEditAndRemove = () =>{
  const token = localStorage.getItem('accessToken');
  const auth = JSON.parse(localStorage.getItem('auth'));
  
  let headers = new Headers ({
    "Content-type": "application/json",
    "X-Authorization": token
  });
  if (auth?.email === "admin@abv.bg") {
    headers = {
      ...headers,
      "X-Admin": ""
    }
  }
  return headers;
}