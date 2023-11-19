const baseUrl = "http://localhost:3030/jsonstore/trainers";

export const getAll = async () => {
const response = await fetch(baseUrl);
const result = await response.json();
return result.trainers;
}

export const getOne = async (trainerId) => {
    const response = await fetch(`${baseUrl}/trainers/${trainerId}`);
    console.log(`${baseUrl}/trainers/${trainerId}`);
    const result = await response.json();
    return result;
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
        const result = JSON.stringify(response);
        return result;
      } else {
        console.log("Failed to create new trainer");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };