import {useState, useEffect, useRef, useContext} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

import { TestimonialContext } from '../../../contexts/Testimonials/TestimonialContext';
import * as testimonialService from '../../../services/testimonialService'
import Paths from '../../../utils/Paths';

import "../../../assets/styles/main_styles.css";

export const TestimonialEdit = () =>{
  const nameInputRef = useRef(null);
  const { _id } = useParams();
  const navigate = useNavigate();
  const {testimonials, updateTestimonialFunc} = useContext(TestimonialContext);
  const testimonialToBeEdited = testimonials.find(x => x._id === _id);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const [values, setValues] = useState({
    _id: testimonialToBeEdited._id,
    name: testimonialToBeEdited.name,
    text : testimonialToBeEdited.text,
    rating: testimonialToBeEdited.rating
  });

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const editTestimonialSubmitHandler =() =>{
    const testimonialToBeEdited = testimonialService.edit(_id, values);
    updateTestimonialFunc(testimonialToBeEdited);
    navigate(Paths.Home);
  }

  const [testimonialFormHasErrors, setTestimonialFormHasErrors] = useState({
    name : '',
    text : '',
    rating: '',
  })

  const nameAndTextErrorHandler = (e, minLength, maxLength) => {
    setTestimonialFormHasErrors((state) => ({
      ...state,
      [e.target.name]:
        values[e.target.name].length < minLength ||
        values[e.target.name].length > maxLength,
    }));
  };

  const isBetweenOneAndFive = (e) => {
    let number = Number(e.target.value);
    setTestimonialFormHasErrors(state => ({
        ...state,
        [e.target.name] : (number < 1 || number > 5)
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
                      <h2 className="register text-center">Your opinion</h2>
                      <form 
                      onSubmit={editTestimonialSubmitHandler} 
                      id="newsletter_form" className="newsletter_form text-center">
                       {testimonialFormHasErrors.name && (
                          <span className="error_message">
                            Please enter valid name between 2 and 20 characters
                          </span>
                        )}  
                        <input
                          tabIndex={0}
                          type="text"
                          className="newsletter_input"
                          placeholder="Enter your name here"
                          required="required"
                          ref={nameInputRef}
                          name='name'
                          onChange={changeHandler}
                          value={values.name}
                          onBlur={(e) => nameAndTextErrorHandler(e, 2, 20)}
                        />
                          {testimonialFormHasErrors.text && (
                            <span className="error_message">
                              Please enter your opinion. It has to be between 10 and 2000 characters
                            </span>
                          )}  
                        <textarea
                          type="text"
                          className="newsletter_textarea"
                          placeholder="Enter your opinion here"
                          required="required"
                          name="text"
                          onChange={changeHandler}
                          value={values.text}
                          onBlur={(e) => nameAndTextErrorHandler(e, 10, 2000)}
                        > </textarea>
                         {testimonialFormHasErrors.rating && (
                            <span className="error_message">
                              Please, rate our fitness between 1 and 5
                            </span>
                          )}  
                        <input
                          type="number"
                          className="newsletter_input"
                          placeholder="Enter your rating between 0 and 5 here"
                          required="required"
                          name="rating"
                          onChange={changeHandler}
                          value={values.rating}
                          onBlur={(e) => isBetweenOneAndFive(e)}
                        />
                        <button 
                        type="submit" 
                        className="register_button"
                        disabled={Object.values(testimonialFormHasErrors).some(
                          (x) => x
                        )}
                        >
                          edit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}