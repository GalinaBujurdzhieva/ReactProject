const baseUrl = "http://localhost:3030/jsonstore/bestProposals";

export const getAll = async () => {
  const response = await fetch(baseUrl);
  const result = await response.json();
  return result;
};