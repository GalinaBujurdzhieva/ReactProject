import { Link } from "react-router-dom";

import * as func from "../../utils/dateFormatter";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../assets/styles/blog.css";
import "../../assets/styles/blog_responsive.css";

export const BlogPost = ({ ...blog }) => {
  return (
    <div className="col-xl-4 col-md-6 blog_col">
      <div className="blog_post">
        <div className="blog_post_image">
          <img src={blog.imageUrl} alt={blog.title} />
        </div>
        <Link to={`/blog/${blog._id}`}>
          <div className="blog_post_title">{blog.title}</div>
        </Link>
        <div className="blog_post_date">{func.formatDate(blog.createdAt)}</div>
        <div className="blog_post_text">
          <p>{blog.text}</p>
        </div>
        <div className="blog_post_link">
          <Link to={`/blog/${blog._id}`}>Read More</Link>
        </div>
      </div>
    </div>
  );
};
