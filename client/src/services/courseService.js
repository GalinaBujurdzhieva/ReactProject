import * as toastrNotificationsService from './toastrNotificationsService'

const baseUrl = "http://localhost:3030/jsonstore/courses";

export const getAll = async () => {
 try {
  const response = await fetch(baseUrl);
  const result = await response.json();
  return result;
 } catch (error) {
  console.error('Error:', error);
  throw error;
 }
};

export const edit = async (courseId, data) => {
    try {
      const response = await fetch(`${baseUrl}/${courseId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toastrNotificationsService.showError('Something went wrong. Please try to vote later');
      }
      else{
        const result = JSON.stringify(response);
        return result;
      }
      } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }