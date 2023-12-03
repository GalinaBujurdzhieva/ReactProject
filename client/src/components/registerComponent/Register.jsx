import { useEffect, useRef, useContext, useState } from "react";

import useForm from "../../hooks/useForm";
import { AuthContext } from "../../contexts/Users/AuthContext";

import "../../assets/styles/register.css";


const RegisterFormKeys = {
  FirstName: 'firstName',
  LastName: 'lastName',
  Email: 'email',
  PhoneNumber: 'phoneNumber',
  Username: 'username',
  Password: 'password',
  ConfirmPassword: 'confirmPassword'
}

export const Register = () => {
  const firstNameInputRef = useRef();
  const {registerSubmitHandler} = useContext(AuthContext);

  const {values, onChange, onSubmit} = useForm(registerSubmitHandler, {
    [RegisterFormKeys.FirstName] : '',
    [RegisterFormKeys.LastName] : '',
    [RegisterFormKeys.Email]: '',
    [RegisterFormKeys.PhoneNumber]: '',
    [RegisterFormKeys.Username]: '',
    [RegisterFormKeys.Password]: '',
    [RegisterFormKeys.ConfirmPassword]: ''
  })

  useEffect(() => {
    firstNameInputRef.current.focus();
  }, []);

  const [registerFormHasErrors, setRegisterFormHasErrors] = useState({
    [RegisterFormKeys.FirstName] : '',
    [RegisterFormKeys.LastName] : '',
    [RegisterFormKeys.Email]: '',
    [RegisterFormKeys.PhoneNumber]: '',
    [RegisterFormKeys.Username]: '',
    [RegisterFormKeys.Password]: '',
    [RegisterFormKeys.ConfirmPassword]: ''
  })

  const firstAndLastNameErrorHandler = (e, minLength, maxLength) => {
    const regex = /^[A-Z][a-z]+$/
    setRegisterFormHasErrors((state) => ({
      ...state,
      [e.target.name]:
        values[e.target.name].length < minLength ||
        values[e.target.name].length > maxLength ||
        !regex.test(e.target.value)
    }));
  };

  const emailErrorHandler = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setRegisterFormHasErrors((state) => ({
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
                  <h2 className="register text-center">Register</h2>
                  <form onSubmit={onSubmit} id="newsletter_form" className="newsletter_form">
                  {registerFormHasErrors.firstName && (
                        <span className="error_message">
                          Please enter valid name with first capital letter between 2 and 20 characters
                        </span>
                      )} 
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your first name here"
                      required="required"
                      ref={firstNameInputRef}
                      name={RegisterFormKeys.FirstName}
                      onChange={onChange}
                      value={values[RegisterFormKeys.FirstName]}
                      onBlur={(e) => firstAndLastNameErrorHandler(e, 2, 20)}
                    />
                     {registerFormHasErrors.lastName && (
                        <span className="error_message">
                          Please enter valid name with first capital letter between 2 and 20 characters
                        </span>
                      )}
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your last name here"
                      required="required"
                      name={RegisterFormKeys.LastName}
                      onChange={onChange}
                      value={values[RegisterFormKeys.LastName]}
                      onBlur={(e) => firstAndLastNameErrorHandler(e, 2, 20)}
                    />
                    {registerFormHasErrors.email && (
                        <span className="error_message">
                          Please, type correct e-mail
                        </span>
                      )}
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your email here"
                      required="required"
                      name={RegisterFormKeys.Email}
                      onChange={onChange}
                      value={values[RegisterFormKeys.Email]}
                      onBlur={(e) => emailErrorHandler(e)}
                    />
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your phone number here"
                      required="required"
                      name={RegisterFormKeys.PhoneNumber}
                      onChange={onChange}
                      value={values[RegisterFormKeys.PhoneNumber]}
                    />
                     <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your username here"
                      required="required"
                      name={RegisterFormKeys.Username}
                      onChange={onChange}
                      value={values[RegisterFormKeys.Username]}
                    />
                    <input
                      type="password"
                      className="newsletter_input"
                      placeholder="Enter your password here"
                      required="required"
                      name={RegisterFormKeys.Password}
                      onChange={onChange}
                      value={values[RegisterFormKeys.Password]}
                    />
                    <input
                      type="password"
                      className="newsletter_input"
                      placeholder="Confirm your password here"
                      required="required"
                      name={RegisterFormKeys.ConfirmPassword}
                      onChange={onChange}
                      value={values[RegisterFormKeys.ConfirmPassword]}
                    />
                    <button type="submit" className="register_button text-center">
                      register
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
