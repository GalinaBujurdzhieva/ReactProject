import {useRef, useEffect, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom'

import useForm from '../../../hooks/useForm'
import { TestimonialContext } from '../../../contexts/Testimonials/TestimonialContext';
import * as testimonialService from '../../../services/testimonialService'

import "../../../assets/styles/main_styles.css";


const CreateTestimonialFormKeys = {
    Name: 'name',
    Text: 'text',
    Rating: 'rating'
  }

export const TestimonialCreate = () => {
    const nameInputRef = useRef(null);
    const navigate = useNavigate();
    const {addTestimonialFunc} = useContext(TestimonialContext);
    
    const createTestimonialSubmitHandler = () => {
    try {
    const newTestimonial = testimonialService.create(values);
    addTestimonialFunc(newTestimonial);
    } catch (error) {
      toastrNotificationsService.showError('Something went wrong. Could not create testimonial')
    }
    navigate("/");
    }
  
    const {values, onChange, onSubmit} = useForm(createTestimonialSubmitHandler, {
      [CreateTestimonialFormKeys.Name] : '',
      [CreateTestimonialFormKeys.Text] : '',
      [CreateTestimonialFormKeys.Rating]: 0
    })
  
    useEffect(() => {
      nameInputRef.current.focus();
    }, []);
  
    const [testimonialFormHasErrors, setTestimonialFormHasErrors] = useState({
      [CreateTestimonialFormKeys.Name] : '',
      [CreateTestimonialFormKeys.Text] : '',
      [CreateTestimonialFormKeys.Rating]: '',
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
                    <form onSubmit={onSubmit} id="newsletter_form" className="newsletter_form text-center">
                    {testimonialFormHasErrors[CreateTestimonialFormKeys.Name] && (
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
                        name={CreateTestimonialFormKeys.Name}
                        onChange={onChange}
                        value={values[CreateTestimonialFormKeys.Name]}
                        onBlur={(e) => nameAndTextErrorHandler(e, 2, 20)}
                      />
                        {testimonialFormHasErrors[CreateTestimonialFormKeys.Text] && (
                          <span className="error_message">
                            Please enter your opinion. It has to be between 10 and 2000 characters
                          </span>
                        )} 
                      <textarea
                        type="text"
                        className="newsletter_textarea"
                        placeholder="Enter your opinion here"
                        required="required"
                        name={CreateTestimonialFormKeys.Text}
                        onChange={onChange}
                        value={values[CreateTestimonialFormKeys.Text]}
                        onBlur={(e) => nameAndTextErrorHandler(e, 10, 2000)}>
                        </textarea>
                       {testimonialFormHasErrors[CreateTestimonialFormKeys.Rating] && (
                          <span className="error_message">
                            Please, rate our fitness between 1 and 5
                          </span>
                        )} 
                      <input
                        type="number"
                        className="newsletter_input"
                        placeholder="Enter your rating between 0 and 5 here"
                        required="required"
                        name={CreateTestimonialFormKeys.Rating}
                        onChange={onChange}
                        value={values[CreateTestimonialFormKeys.Rating]}
                        onBlur={(e) => isBetweenOneAndFive(e)}
                      />
                      <button 
                      type="submit" 
                      className="register_button"
                      disabled={Object.values(testimonialFormHasErrors).some(
                        (x) => x
                      )}
                      >
                        send
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
  };