export const formatDate= (timestamp) =>{
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(timestamp);
    return new Date(date).toLocaleDateString('en-US', options);
  }