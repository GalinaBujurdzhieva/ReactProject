import React, { useState, useEffect } from 'react';
import BlogContext from './BlogContext';

import * as blogService from '../../services/blogService'

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);

    const addBlog = newBlog => {
      setBlogs([...Object.values(blogs), newBlog]);
    };

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
      }, []);

  return (
    <BlogContext.Provider value={{ blogs, addBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

