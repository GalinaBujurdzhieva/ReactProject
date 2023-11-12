import { useState } from "react";
import "../../assets/styles/register.css";

export const CreateBlog = () => {
  const [values, setValues] = useState({
    title: '',
    imageUrl: '',
    text: '',
  });

  const [blogFormHasErrors, setBlogFormHasErrors] = useState({
    title: '',
    imageUrl: '',
    text: '',
  });

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const blogTitleAndTextErrorHandler = (e, minLength, maxLength) =>{
    setBlogFormHasErrors(state => ({
        ...state,
        [e.target.name] : values[e.target.name].length < minLength || values[e.target.name].length > maxLength
    }))
  }

  const imageUrlErrorHandler = (e) =>{ 
    setBlogFormHasErrors(state =>({
        ...state,
        [e.target.name]: values[e.target.name] === ''
    }))
  }
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="footer_container">
              <div className="footer_content ">
                <div className="newsletter_container">
                  <h2 className="register text-center">Create New Blog</h2>
                  <form
                    action="#"
                    id="newsletter_form"
                    className="newsletter_form"
                  >
                    {blogFormHasErrors.title &&
                    <span className="error_message">Title should be between 3 and 20 characters</span>
                    }
                    <input
                      type="text"
                      name="title"
                      className="newsletter_input"
                      placeholder="Title"
                      required="required"
                      value={values.title}
                      onChange={changeHandler}
                      onBlur={(e) => blogTitleAndTextErrorHandler(e, 3, 50)}
                    />
                    {blogFormHasErrors.imageUrl &&
                    <span className="error_message">Please, type image url</span>
                    }
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
                    {blogFormHasErrors.text &&
                    <span className="error_message">Text should be between 50 and 5000 characters</span>
                    }
                    <textarea
                      name="text"
                      className="newsletter_textarea"
                      placeholder="Blog Text"
                      required="required"
                      value={values.text}
                      onChange={changeHandler}
                      onBlur={(e) => blogTitleAndTextErrorHandler(e, 50, 5000)}
                    ></textarea>
                  </form>
                </div>
                <div className="d-flex justify-content-center">
                <button className="newsletter_button text-center">
                  save blog
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
