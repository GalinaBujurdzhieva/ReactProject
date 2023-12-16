import { useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { BlogContext } from "../../contexts/Blogs/BlogContext";
import * as blogService from "../../services/blogService";
import Paths from "../../utils/Paths";

import styles from "./BlogDeleteConfirmation.module.css";

export const BlogDeleteConfirmation = ({ onClose }) => {
  const myDivRef = useRef(null);
  const { _id } = useParams();
  const { blogs, deleteBlogFunc } = useContext(BlogContext);
  useEffect(() => {
    myDivRef.current.focus();
  }, []);

  const currentBlog = Object.values(blogs).find((blog) => blog._id === _id);
  const navigate = useNavigate();
  const deleteBlogHandler = (e, blogId) => {
    e.preventDefault();
    blogService.remove(blogId);
    deleteBlogFunc(currentBlog);
    navigate(Paths.BlogAll);
  };

  return (
    <>
      <div className={styles.mainContainer} tabIndex={0} ref={myDivRef}>
        <div className={styles.container}>
          <h4 className={styles.confirmation}>
            Are you sure you want to delete this blog?
          </h4>
          <button
            className={styles.blogButton}
            type="submit"
            onClick={(e) => deleteBlogHandler(e, _id)}
          >
            Yes
          </button>
          <button className={styles.blogButton} onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </>
  );
};
