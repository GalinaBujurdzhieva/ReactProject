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

export const create = async(postData) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    postData = {
        ...postData,
        createdAt: formattedDate,
    }
    const response = await fetch(`${baseUrl}/blogs`, {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    const result = JSON.stringify(response);
    return result;
   
}