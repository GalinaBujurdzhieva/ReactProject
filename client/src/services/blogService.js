import { headersForEditAndRemove } from "../utils/headersForEditAndRemove";
const baseUrlNew = "http://localhost:3030/data/blogs";

export const getAll = async () => {
  try {
  const response = await fetch(baseUrlNew);
  const result = await response.json();
  return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getOne = async (blogId) => {
  try{
  const response = await fetch(`${baseUrlNew}/${blogId}`);
  const result = await response.json();
  return result;
} catch (error) {
  console.error('Error:', error);
  throw error;
}
};

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
    const result = JSON.stringify(response);
    return result;
    
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const edit = async (blogId, data) => {
  const headers = headersForEditAndRemove();
  try {
    const response = await fetch(`${baseUrlNew}/${blogId}`, {
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
}

export const remove = async (blogId) => {
  const headers = headersForEditAndRemove();
  try {
    const response = await fetch(`${baseUrlNew}/${blogId}`, {
      method: "DELETE",
      headers,
    });
    if (response.ok) {
      console.log("Blog deleted successfully");
    }
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
