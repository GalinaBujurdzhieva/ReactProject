const baseUrl = "http://localhost:3030/jsonstore/courses";

export const getAll = async () => {
  const response = await fetch(baseUrl);
  const result = await response.json();
  return result;
};

export const getOne = async (courseId) => {
  const response = await fetch(`${baseUrl}/${courseId}`);
  const result = await response.json();
  return result;
};