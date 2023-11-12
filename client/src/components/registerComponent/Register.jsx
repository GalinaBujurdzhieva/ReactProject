import { useEffect, useRef } from 'react';

import '../../assets/styles/register.css'

export const Register = () => {
const firstNameInputRef = useRef();

useEffect(() => {
firstNameInputRef.current.focus();
}, [])

    return (
        <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="footer_container">
              <div className="footer_content ">
                <div className="newsletter_container">
                <h2 className='register text-center'>Register</h2>
                  <form
                    action="#"
                    id="newsletter_form"
                    className="newsletter_form"
                  >
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your first name here"
                      required="required"
                      ref={firstNameInputRef}
                    />
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your last name here"
                      required="required"
                    />
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your email here"
                      required="required"
                    />
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your phone number here"
                      required="required"
                    />
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your username here"
                      required="required"
                    />
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your password here"
                      required="required"
                    />
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Confirm your password here"
                      required="required"
                    />
                  </form>
                </div >
                <button className="register_button text-center">register</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    );
}