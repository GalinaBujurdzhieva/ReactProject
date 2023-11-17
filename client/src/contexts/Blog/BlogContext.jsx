import {createContext} from 'react'
import React, { useState, useEffect } from 'react';
import * as blogService from '../../services/blogService'

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [reloadBlogs, setReloadBlogs] = useState(false);

    useEffect(() => {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }, [reloadBlogs]);

    const addBlogFunc = (newBlog) => {
      const newBlogAfterCreate = [...Object.values(blogs), newBlog];
      setBlogs(newBlogAfterCreate);
      setReloadBlogs(!reloadBlogs);
    };

    const deleteBlogFunc = (deletedBlog) =>{
      const newBlogListAfterDelete = Object.values(blogs).filter(blog => blog._id !== deletedBlog._id);
      setBlogs(newBlogListAfterDelete);
      setReloadBlogs(!reloadBlogs);
    }
  
    const updateBlogFunc = (updatedBlog) => {
      const updatedBlogs = Object.values(blogs).map(blog =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      );
      setBlogs(updatedBlogs);
      setReloadBlogs(!reloadBlogs);
    };

  return (
    <BlogContext.Provider value={{ blogs, addBlogFunc, updateBlogFunc, deleteBlogFunc }}>
      {children}
    </BlogContext.Provider>
  );
};
export {BlogContext, BlogProvider};