import { headersForEditAndRemove } from "../utils/headersForEditAndRemove";
const baseUrlNew = "http://localhost:3030/data/trainers";

export const getAll = async () => {
  try{
const response = await fetch(baseUrlNew);
const result = await response.json();
return result;
} catch (error) {
  console.error('Error:', error);
  throw error;
}
}

export const getOne = async (trainerId) => {
  try{
    const response = await fetch(`${baseUrlNew}/${trainerId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const create = async (postData) => {
  const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(baseUrlNew, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-Authorization": token
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error();
      }
        const result = await JSON.stringify(response);
        return result;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  };

  export const edit = async (trainerId, data) => {
    const headers = headersForEditAndRemove();
    console.log(headers);
    try {
      const response = await fetch(`${baseUrlNew}/${trainerId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error();
      }
        const result = JSON.stringify(response);
        return result;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  };

  export const remove = async (trainerId) => {
    const headers = headersForEditAndRemove();
    try {
      const response = await fetch(`${baseUrlNew}/${trainerId}`, {
        method: "DELETE",
        headers,
      });
      if (response.ok) {
        console.log("Trainer deleted successfully");
      }
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  };