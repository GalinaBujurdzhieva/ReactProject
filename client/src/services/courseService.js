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

export const getOne = async (courseId) => {
 try {
  const response = await fetch(`${baseUrl}/${courseId}`);
  const result = await response.json();
  return result;
 } catch (error) {
  console.error('Error:', error);
  throw error;
 }
};