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
  const firstNameInputRef = useRef(null);
  useEffect(() => {
    firstNameInputRef.current.focus();
  }, []);

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
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/
    setRegisterFormHasErrors((state) => ({
      ...state,
      [e.target.name]:
        values[e.target.name].length < minLength ||
        values[e.target.name].length > maxLength ||
        !nameRegex.test(e.target.value)
    }));
  };

  const emailErrorHandler = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setRegisterFormHasErrors((state) => ({
      ...state,
      [e.target.name]: !emailRegex.test(e.target.value),
    }));
  };

  const phoneErrorHandler = (e)=>{
    const phoneRegex = /^(\+\d{1,2}\s?)?(\d{3}[\s]?)?\d{3}[\s]?\d{4}$/;
    setRegisterFormHasErrors((state) =>({
      ...state,
      [e.target.name]: !phoneRegex.test(e.target.value)
    }))
  }

  const usernameAndPasswordErrorHandler = (e) =>{
    const usernameAndPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    setRegisterFormHasErrors((state) =>({
      ...state,
      [e.target.name]: !usernameAndPasswordRegex.test(e.target.value)
    }))
  }

  const confirmPasswordErrorHandler = (e) =>{
    console.log(values[RegisterFormKeys.Password]);
    setRegisterFormHasErrors((state) =>({
      ...state,
      [e.target.name]: e.target.value !== values[RegisterFormKeys.Password]
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
                  <h2 className="register text-center">Register</h2>
                  <form onSubmit={onSubmit} id="newsletter_form" className="newsletter_form text-center">
                  {registerFormHasErrors[RegisterFormKeys.FirstName] && (
                        <span className="error_message">
                          Please enter valid name with latin letters between 2 and 20 characters
                        </span>
                      )} 
                     
                    <input
                      tabIndex={0}
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your first name with latin letters here"
                      required="required"
                      ref={firstNameInputRef}
                      name={RegisterFormKeys.FirstName}
                      onChange={onChange}
                      value={values[RegisterFormKeys.FirstName]}
                      onBlur={(e) => firstAndLastNameErrorHandler(e, 2, 20)}
                    />
                   
                     {registerFormHasErrors[RegisterFormKeys.LastName] && (
                        <span className="error_message">
                          Please enter valid name with latin letters between 2 and 20 characters
                        </span>
                      )}
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your last name with latin letters here"
                      required="required"
                      name={RegisterFormKeys.LastName}
                      onChange={onChange}
                      value={values[RegisterFormKeys.LastName]}
                      onBlur={(e) => firstAndLastNameErrorHandler(e, 2, 20)}
                    />
                    {registerFormHasErrors[RegisterFormKeys.Email] && (
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
                     {registerFormHasErrors[RegisterFormKeys.PhoneNumber] && (
                        <span className="error_message">
                          Please, type correct phone number in one of the following formats: "+5 555 555 5555" or "+55 555 555 5555"
                        </span>
                      )}
                    <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your phone number here in format '+8 888 888 8888' or '+88 888 888 8888'"
                      required="required"
                      name={RegisterFormKeys.PhoneNumber}
                      onChange={onChange}
                      value={values[RegisterFormKeys.PhoneNumber]}
                      onBlur={(e) => phoneErrorHandler(e)}
                    />
                      {registerFormHasErrors[RegisterFormKeys.Username] && (
                        <span className="error_message">
                          Please, enter username with at least 1 small letter, 1 capital letter, 1 digit and 1 special symbol
                        </span>
                      )}
                     <input
                      type="text"
                      className="newsletter_input"
                      placeholder="Enter your username here - at least 1 small and 1 capital letter, as well as 1 digit and 1 special symbol"
                      required="required"
                      name={RegisterFormKeys.Username}
                      onChange={onChange}
                      value={values[RegisterFormKeys.Username]}
                      onBlur={(e) => usernameAndPasswordErrorHandler(e)}
                    />
                    {registerFormHasErrors[RegisterFormKeys.Password] && (
                        <span className="error_message">
                          Please, enter password with at least 1 small letter, 1 capital letter, 1 digit and 1 special symbol
                        </span>
                      )}
                    <input
                      type="password"
                      className="newsletter_input"
                      placeholder="Enter your password here - at least 1 small and 1 capital letter, as well as 1 digit and 1 special symbol"
                      required="required"
                      name={RegisterFormKeys.Password}
                      onChange={onChange}
                      value={values[RegisterFormKeys.Password]}
                      onBlur={(e) => usernameAndPasswordErrorHandler(e)}
                    />
                      {registerFormHasErrors[RegisterFormKeys.ConfirmPassword] && (
                        <span className="error_message">
                          Password and confirm password do not match
                        </span>
                      )}
                    <input
                      type="password"
                      className="newsletter_input"
                      placeholder="Confirm your password here"
                      required="required"
                      name={RegisterFormKeys.ConfirmPassword}
                      onChange={onChange}
                      value={values[RegisterFormKeys.ConfirmPassword]}
                      onBlur={(e) => confirmPasswordErrorHandler(e)}
                    />
                    <button 
                    type="submit" 
                    className="register_button"
                    disabled={Object.values(registerFormHasErrors).some(
                      (x) => x
                    )}
                    >
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
