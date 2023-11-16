import {createContext} from 'react'
import React, { useState, useEffect } from 'react';
import * as blogService from '../../services/blogService'

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [reloadBlogsWhenCreate, setReloadBlogsWhenCreate] = useState(false);
    const [reloadBlogsWhenDelete, setReloadBlogsWhenDelete] = useState(false);
    const [reloadBlogsWhenEdit, setReloadBlogsWhenEdit] = useState(false);

    useEffect(() => {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }, [reloadBlogsWhenCreate, reloadBlogsWhenDelete, reloadBlogsWhenEdit]);

    const addBlogFunc = (newBlog) => {
      const newBlogAfterCreate = [...Object.values(blogs), newBlog];
      setBlogs(newBlogAfterCreate);
      setReloadBlogsWhenCreate(!reloadBlogsWhenCreate);
    };

    const deleteBlogFunc = (deletedBlog) =>{
      const newBlogListAfterDelete = Object.values(blogs).filter(blog => blog._id !== deletedBlog._id);
      setBlogs(newBlogListAfterDelete);
      setReloadBlogsWhenCreate(!reloadBlogsWhenCreate);
    }
  
    const updateBlogFunc = (updatedBlog) => {
      const updatedBlogs = Object.values(blogs).map(blog =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      );
      setBlogs(updatedBlogs);
      setReloadBlogsWhenEdit(!reloadBlogsWhenEdit)
    };

  return (
    <BlogContext.Provider value={{ blogs, addBlogFunc, updateBlogFunc, deleteBlogFunc }}>
      {children}
    </BlogContext.Provider>
  );
};
export {BlogContext, BlogProvider};