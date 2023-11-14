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