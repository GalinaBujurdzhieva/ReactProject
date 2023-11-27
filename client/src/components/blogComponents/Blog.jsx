import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {BlogContext} from '../../contexts/Blogs/BlogContext'

import { BlogMain } from "./BlogMain";
import { BlogWelcome } from "./BlogWelcome";
import { BlogPost } from "./BlogPost";
import { BlogLinkToAll } from "./BlogLinkToAll";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../assets/styles/blog.css";
import "../../assets/styles/blog_responsive.css";

export const Blog = () => {
  const {blogs} = useContext(BlogContext)
  const navigate = useNavigate();

  const loadAllBlogsHandler = () => {
    navigate("/blog/all");
  };

  return (
    <div className="super_container">
      {/* Blog  main part */}
      <BlogMain />
      {/* Blog */}
      <div className="blog_div">
        <div className="container">
         <BlogWelcome />
          <div className="row blog_row">
            {Object.values(blogs)
              .slice(-3)
              .map((blog) => (
                <BlogPost key={blog._id} {...blog} />
              ))}
          </div>
          <BlogLinkToAll loadAllBlogsHandler = {loadAllBlogsHandler}/> 
        </div>
      </div>
    </div>
  );
};
