const baseUrl = "http://localhost:3030/jsonstore/blogs";
const baseUrlNew = "http://localhost:3030/data/blogs";

// export const getAll = async () => {
//   try {
//   const response = await fetch(baseUrl);
//   const result = await response.json();
//   return result.blogs;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };
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

// export const getOne = async (blogId) => {
//   try{
//   const response = await fetch(`${baseUrl}/blogs/${blogId}`);
//   const result = await response.json();
//   return result;
// } catch (error) {
//   console.error('Error:', error);
//   throw error;
// }
// };
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
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  postData = {
    ...postData,
    createdAt: formattedDate,
  };
  try {
    const response = await fetch(`${baseUrl}/blogs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = JSON.stringify(response);
    return result;
    
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const edit = async (blogId, data) => {
  try {
    const response = await fetch(`${baseUrl}/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
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

export const remove = async (blogId) => {
  try {
    const response = await fetch(`${baseUrl}/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Blog deleted successfully");
    }
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
