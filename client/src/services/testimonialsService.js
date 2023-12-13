const baseUrl = "http://localhost:3030/data/testimonials";

export const getAll = async () => {
    try{
  const response = await fetch(baseUrl);
  const result = await response.json();
  return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
  }