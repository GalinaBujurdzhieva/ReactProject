const baseUrl = "http://localhost:3030/jsonstore/blogs";

export const getAll = async () => {
const response = await fetch(baseUrl);
const result = await response.json();
return result.blogs;
}

export const getOne = async (blogId) => {
    const response = await fetch(`${baseUrl}/blogs/${blogId}`);
    const result = await response.json();
    return result;
}