import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BlogContext } from "../../contexts/Blogs/BlogContext";
import * as blogService from "../../services/blogService";
import toastrNotificationsService from "../../services/toastrNotificationsService";
import Paths from "../../utils/Paths";

import { BlogPost } from "./BlogPost";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../assets/styles/blog.css";
import "../../assets/styles/blog_responsive.css";

export const BlogAll = () => {
  const { blogs, reloadBlogs, reloadBlogsAfterDelete, reloadBlogsAfterEdit } =
    useContext(BlogContext);
  const [newBlogs, setBlogs] = useState(blogs);
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        toastrNotificationsService.showError(
          "Something went wrong. Could not load blogs"
        );
      });
  }, [reloadBlogs, reloadBlogsAfterDelete, reloadBlogsAfterEdit]);

  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));

  const loadCreateBlogFormHandler = () => {
    navigate(Paths.BlogCreate);
  };

  return (
    <div className="blog_div">
      <div className="container">
        <div className="row blog_row">
          {blogs.map((blog) => (
            <BlogPost key={blog._id} {...blog} />
          ))}
        </div>
        {auth?.email === "admin@abv.bg" && (
          <div className="row">
            <div className="col d-flex align-items-center justify-content-center">
              <button
                onClick={() => loadCreateBlogFormHandler()}
                className="button blog_button"
              >
                Create New Blog
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
