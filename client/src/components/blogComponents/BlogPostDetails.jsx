import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as func from "../../utils/dateFormatter";
import * as blogService from "../../services/blogService";
import toastrNotificationsService from "../../services/toastrNotificationsService"

import { BlogDeleteConfirmation } from "./BlogDeleteConfirmation";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../assets/styles/blog.css";
import "../../assets/styles/blog_responsive.css";

export const BlogPostDetails = () => {
  const { _id } = useParams();
  const [currentBlog, setCurrentBlog] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    blogService.getOne(_id)
    .then((result) => setCurrentBlog(result))
    .catch((error) =>{
      toastrNotificationsService.showError('Something went wrong. Could not show this blog')
    });
  }, [_id]);

  const auth = JSON.parse(localStorage.getItem("auth"));

  const loadEditBlogHandler = () => {
    navigate(`/blog/edit/${currentBlog._id}`);
  }
  const showModalHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  }
  const onClose = ()=>{
    setShowModal(false)
  }

  return (
    <>{showModal &&
      <BlogDeleteConfirmation
      onClose={onClose}
      />}
      
    <div className="col-xl-10 offset-xl-1 col-md-12 align-items-center blog_col_details">
      <div className="blog_post">
        <div className="blog_post_image_all d-flex justify-content-center">
          <img src={currentBlog.imageUrl} alt={currentBlog.title} />
        </div>
        <div className="blog_post_title d-flex justify-content-center align-items-center">
          {currentBlog.title}
        </div>
        <div className="blog_post_date d-flex justify-content-center align-items-center">
          {func.formatDate(currentBlog._createdOn)}
        </div>
        <div className="blog_post_text_all">
          <p>{currentBlog.text}</p>
        </div>
        {auth?.email === "admin@abv.bg" &&
        <div className="btn-group d-flex justify-content-center" role="group">
          <button onClick={()=> loadEditBlogHandler(currentBlog._id)} type="button" className="button blog_button">Edit Blog</button>
          <button 
          onClick={(e) =>showModalHandler(e)}
          type="submit" 
          className="button blog_button"
          data-toggle="modal" 
          data-target="#exampleModal"
          >Delete Blog</button>
        </div>
        }
      </div>
    </div>
    </>
  );
};
