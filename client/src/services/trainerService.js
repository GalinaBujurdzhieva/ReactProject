const baseUrl = "http://localhost:3030/jsonstore/trainers";
const baseUrlNew = "http://localhost:3030/data/trainers";

// export const getAll = async () => {
//   try{
// const response = await fetch(baseUrl);
// const result = await response.json();
// return result.trainers;
// } catch (error) {
//   console.error('Error:', error);
//   throw error;
// }
// }
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

// export const getOne = async (trainerId) => {
//   try{
//     const response = await fetch(`${baseUrl}/trainers/${trainerId}`);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }

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
    try {
      const response = await fetch(`${baseUrl}/trainers`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postData),
      });
        const result = await JSON.stringify(response);
        return result;
    } catch (error) {
      console.log("Error:", error);
      throw error;
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
        const result = JSON.stringify(response);
        return result;
    } catch (error) {
      console.log("Error:", error);
      throw error;
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
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  };