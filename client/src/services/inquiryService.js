const baseUrl = "http://localhost:3030/jsonstore/inquiries";

import toastrNotificationsService from "./toastrNotificationsService";

export const create = async (postData) => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        toastrNotificationsService.showError('Could not send your inquiry. Please try again later');
      }
      else{
        toastrNotificationsService.showSuccess('Your inquiry is successfully sent');
        const result = JSON.stringify(response);
        return result;
      }
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  };