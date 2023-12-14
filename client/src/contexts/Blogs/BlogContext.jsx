import {createContext} from 'react'
import { useState, useEffect } from 'react';
import * as blogService from '../../services/blogService'

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [reloadBlogs, setReloadBlogs] = useState(false);
    const [reloadBlogsAfterDelete, setReloadBlogsAfterDelete] = useState(false);
    const [reloadBlogsAfterEdit, setReloadBlogsAfterEdit] = useState(false);

    useEffect(() => {
      blogService.getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) =>{
        throw error;
      });
    }, [reloadBlogs, reloadBlogsAfterDelete, reloadBlogsAfterEdit]);

    const addBlogFunc = (newBlog) => {
      const blogListAfterCreate = [...blogs, newBlog];
      setBlogs(blogListAfterCreate);
      setReloadBlogs(!reloadBlogs);
    };

    const deleteBlogFunc = (deletedBlog) =>{
      const blogListAfterDelete = blogs.filter(blog => blog._id !== deletedBlog._id);
      setBlogs(blogListAfterDelete);
      setReloadBlogsAfterDelete(!reloadBlogsAfterDelete);
    }
  
    const updateBlogFunc = (updatedBlog) => {
      const blogListAfterUpdate = blogs.map(blog =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      );
      setBlogs(blogListAfterUpdate);
      setReloadBlogsAfterEdit(!reloadBlogsAfterEdit);
    };

  return (
    <BlogContext.Provider value={{ blogs, addBlogFunc, updateBlogFunc, deleteBlogFunc }}>
      {children}
    </BlogContext.Provider>
  );
};
export {BlogContext, BlogProvider};