import { headersForEditAndRemove } from "../utils/headersForEditAndRemove";
import toastrNotificationsService from "./toastrNotificationsService";
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
  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = localStorage.getItem('accessToken');
  if (auth?.email !== "admin@abv.bg") {
    toastrNotificationsService.showError('You are not authorized to create new blog');
    return null;
  }
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
      toastrNotificationsService.showError('Could not create new blog');
    }
    else{
      toastrNotificationsService.showSuccess('Blog created successfully');
      const result = JSON.stringify(response);
      return result;
    }
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
      toastrNotificationsService.showError('Could not edit this blog');
    }
    else{
      toastrNotificationsService.showSuccess('Blog edited successfully!')
      const result = JSON.stringify(response);
      return result;
    }
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
      toastrNotificationsService.showSuccess('Blog deleted successfully');
    }
    else{
      toastrNotificationsService.showError('Could not delete this blog');
    }
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
