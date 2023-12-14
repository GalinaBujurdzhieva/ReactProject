import toastrNotificationsService from './toastrNotificationsService'

const baseUrl = "http://localhost:3030/data/testimonials";

export const getAll = async () => {
  try {
    const response = await fetch(baseUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const create = async (postData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    toastrNotificationsService.showError(
      "You are not authorized to write a testimonial. Please log in first"
    );
    return null;
  }
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      toastrNotificationsService.showError("Could not create new testimonial");
    } else {
      toastrNotificationsService.showSuccess("Testimonial created successfully");
      const result = JSON.stringify(response);
      return result;
    }
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
