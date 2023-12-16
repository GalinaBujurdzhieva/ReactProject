import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as blogService from "../../services/blogService";
import toastrNotificationsService from "../../services/toastrNotificationsService"
import {BlogContext} from "../../contexts/Blogs/BlogContext";

import "../../assets/styles/register.css";

export const BlogCreate = () => {
  const [values, setValues] = useState({
    title: "",
    imageUrl: "",
    text: "",
  });
  const [blogFormHasErrors, setBlogFormHasErrors] = useState({
    title: "",
    imageUrl: "",
    text: "",
  });
  const {addBlogFunc} = useContext(BlogContext);
  const navigate = useNavigate();
  const titleInputRef = useRef();

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const createBlogSubmitHandler = (e) => {
    e.preventDefault();
    try {
    const newBlog = blogService.create(values);
    addBlogFunc(newBlog);
    } catch (error) {
      toastrNotificationsService.showError('Something went wrong. Could not create blog')
    }
    navigate("/blog/all");
  };

  const blogTitleAndTextErrorHandler = (e, minLength, maxLength) => {
    setBlogFormHasErrors((state) => ({
      ...state,
      [e.target.name]:
        values[e.target.name].length < minLength ||
        values[e.target.name].length > maxLength ||
        values[e.target.name].trim().length === 0,
    }));
  };
  const imageUrlErrorHandler = (e) => {
    const regex = new RegExp("^https?://.+/");
    setBlogFormHasErrors((state) => ({
      ...state,
      [e.target.name]: !regex.test(e.target.value),
    }));
  };
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="footer_container">
              <div className="footer_content ">
                <div className="newsletter_container">
                  <h2 className="register text-center">New Blog</h2>
                  <form
                    onSubmit={createBlogSubmitHandler}
                    action="#"
                    id="newsletter_form"
                    className="newsletter_form"
                  >
                    {blogFormHasErrors.title && (
                      <span className="error_message">
                        Title should be between 3 and 100 characters
                      </span>
                    )}
                    <input
                      type="text"
                      name="title"
                      className="newsletter_input"
                      placeholder="Title"
                      required="required"
                      value={values.title}
                      onChange={changeHandler}
                      onBlur={(e) => blogTitleAndTextErrorHandler(e, 3, 50)}
                      ref={titleInputRef}
                    />
                    {blogFormHasErrors.imageUrl && (
                      <span className="error_message">
                        Please, type correct image url
                      </span>
                    )}
                    <input
                      type="text"
                      name="imageUrl"
                      className="newsletter_input"
                      placeholder="Image"
                      required="required"
                      value={values.imageUrl}
                      onChange={changeHandler}
                      onBlur={(e) => imageUrlErrorHandler(e)}
                    />
                    {blogFormHasErrors.text && (
                      <span className="error_message">
                        Text should be between 50 and 5000 characters
                      </span>
                    )}
                    <textarea
                      name="text"
                      className="newsletter_textarea"
                      placeholder="Blog Text"
                      required="required"
                      value={values.text}
                      onChange={changeHandler}
                      onBlur={(e) => blogTitleAndTextErrorHandler(e, 50, 5000)}
                    ></textarea>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        disabled={Object.values(blogFormHasErrors).some(
                          (x) => x
                        )}
                        className="newsletter_button text-center"
                      >
                        create blog
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
