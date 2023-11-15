import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../assets/styles/blog.css";
import "../../assets/styles/blog_responsive.css";

import { BlogPost } from "./BlogPost";
import BlogContext from "../../contexts/Blog/BlogContext";

export const BlogAll = () => {
  const { blogs } = useContext(BlogContext);
  const navigate = useNavigate();

  const loadCreateBlogFormHandler = () => {
    navigate("/blog/create");
  };

  return (
    <div className="blog_div">
      <div className="container">
        <div className="row blog_row">
          {Object.values(blogs).map((blog) => (
            <BlogPost key={blog._id} {...blog} />
          ))}
        </div>
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
      </div>
    </div>
  );
};