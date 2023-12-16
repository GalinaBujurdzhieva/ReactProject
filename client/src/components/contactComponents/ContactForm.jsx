import { useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import useForm from '../../hooks/useForm'
import * as inquiryService from '../../services/inquiryService'
import Paths from '../../utils/Paths'

import '../../assets/styles/contact.css'

const InquiryFormKeys ={
  'Name': 'name',
  'Email': 'email',
  'Message': 'message'
} 

export const ContactForm = () =>{
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  useEffect(()=>{
    nameInputRef.current.focus()
  }, []);

  const inquirySubmitHandler = async (values) =>{
    await inquiryService.create({'From': values[InquiryFormKeys.Name], 'Email': values[InquiryFormKeys.Email], 'Message': values[InquiryFormKeys.Message]});
    navigate(Paths.Home);
  }

  const {values, onChange, onSubmit} = useForm(inquirySubmitHandler, {
    [InquiryFormKeys.Name] : '',
    [InquiryFormKeys.Email] : '',
    [InquiryFormKeys.Message] : ''
  })

  const [inquiryFormHasErrors, setInquiryFormHasErrors] = useState({
    [InquiryFormKeys.Name] : '',
    [InquiryFormKeys.Email] : '',
    [InquiryFormKeys.Message] : ''
  })
  const emailErrorHandler = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setInquiryFormHasErrors((state) => ({
      ...state,
      [e.target.name]: !emailRegex.test(e.target.value) ||
      values[e.target.name].trim() === '@.',
    }));
  };

  const nameAndMessageErrorHandler = (e, minLength, maxLength) => {
    setInquiryFormHasErrors((state) => ({
      ...state,
      [e.target.name]:
        values[e.target.name].length < minLength ||
        values[e.target.name].length > maxLength ||
        values[e.target.name].trim().length === 0,
    }));
  };
  
    return(
        <div className="col-lg-8 contact_col">
        <div className="contact_title">Get in touch</div>
        <div className="contact_form_container">
          <form onSubmit={onSubmit} id="contact_form" className="contact_form">
            <div className="row">
              <div className="col-lg-6">
                <div className="input_item">
                {inquiryFormHasErrors[InquiryFormKeys.Name] && (
                        <span className="error_message">
                          Please enter valid name between 2 and 20 characters
                        </span>
                      )} 
                  <input
                    type="text"
                    className="contact_input trans_200"
                    placeholder="Name - between 2 and 20 characters"
                    required="required"
                    ref={nameInputRef}
                    name={InquiryFormKeys.Name}
                    value={values[InquiryFormKeys.Name]}
                    onChange={onChange}
                    onBlur={(e) => nameAndMessageErrorHandler(e, 2, 20)}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="input_item">
                {inquiryFormHasErrors[InquiryFormKeys.Email] && (
                        <span className="error_message">
                          In order to receive our answer, please type correct e-mail address.
                        </span>
                      )} 
                  <input
                    type="email"
                    className="contact_input trans_200"
                    placeholder="E-mail"
                    required="required"
                    name={InquiryFormKeys.Email}
                    value={values[InquiryFormKeys.Email]}
                    onChange={onChange}
                    onBlur={(e) => emailErrorHandler(e)}
                  />
                </div>
              </div>
            </div>
            <div className="input_item">
            {inquiryFormHasErrors[InquiryFormKeys.Message] && (
                        <span className="error_message">
                          Please enter message between 10 and 1000 characters
                        </span>
                      )}
              <textarea
                className="contact_input contact_textarea trans_200"
                placeholder="Message - between 10 and 1000 characters"
                required="required"
                name={InquiryFormKeys.Message}
                value={values[InquiryFormKeys.Message]}
                onChange={onChange}
                onBlur={(e) => nameAndMessageErrorHandler(e, 10, 1000)}
              />
            </div>
            <button type="submit" className="contact_button button" disabled={Object.values(inquiryFormHasErrors).some(
                      (x) => x
                    )}>
              Send
              <span />
            </button>
          </form>
        </div>
      </div>
    )
}