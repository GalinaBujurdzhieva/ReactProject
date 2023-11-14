import { useEffect, useState } from "react";

import * as blogService from "../../services/blogService";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../assets/styles/blog.css";
import "../../assets/styles/blog_responsive.css";

import { BlogPost } from "./BlogPost";

export const BlogAll = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div className="blog_div">
      <div className="container">
        <div className="row blog_row">
          {Object.values(blogs).map((blog) => (
            <BlogPost key={blog._id} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
};
