const baseUrl = "http://localhost:3030/jsonstore/trainers";

export const getAll = async () => {
  try{
const response = await fetch(baseUrl);
const result = await response.json();
return result.trainers;
} catch (error) {
  console.error('Error:', error);
  throw error;
}
}

export const getOne = async (trainerId) => {
  try{
    const response = await fetch(`${baseUrl}/trainers/${trainerId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const create = async (postData) => {
    try {
      const response = await fetch(`${baseUrl}/trainers`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        console.log("Trainer created successfully");
        const result = await JSON.stringify(response);
        return result;
      } else {
        console.log("Failed to create new trainer");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  export const edit = async (trainerId, data) => {
    try {
      const response = await fetch(`${baseUrl}/trainers/${trainerId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Trainer edited successfully");
        const result = JSON.stringify(response);
        return result;
      } else {
        console.log("Failed to edit trainer");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  export const remove = async (trainerId) => {
    try {
      const response = await fetch(`${baseUrl}/trainers/${trainerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Trainer deleted successfully");
        const result = await response.json();
        return result;
      } else {
        console.error("Failed to delete trainer");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };