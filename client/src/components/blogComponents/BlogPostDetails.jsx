import { useParams } from "react-router-dom";

import * as func from "../../utils/dateFormatter";
import * as blogService from "../../services/blogService";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../assets/styles/blog.css";
import "../../assets/styles/blog_responsive.css";
import { useEffect, useState } from "react";

export const BlogPostDetails = () => {
  const { _id } = useParams();
  const [currentBlog, setCurrentBlog] = useState({});

  useEffect(() => {
    blogService.getOne(_id).then((result) => setCurrentBlog(result));
  }, [_id]);

  return (
    <div className="col-xl-10 offset-xl-1 col-md-12 align-items-center blog_col">
      <div className="blog_post">
        <div className="blog_post_image_all d-flex justify-content-center">
          <img src={currentBlog.imageUrl} alt={currentBlog.title} />
        </div>
        <div className="blog_post_title d-flex justify-content-center align-items-center">
          {currentBlog.title}
        </div>
        <div className="blog_post_date d-flex justify-content-center align-items-center">
          {func.formatDate(currentBlog.createdAt)}
        </div>
        <div className="blog_post_text_all">
          <p>{currentBlog.text}</p>
        </div>
        <div class="btn-group d-flex justify-content-center" role="group">
          <button className="button blog_button">Edit Blog</button>
          <button type="button" className="button blog_button">
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  );
};
