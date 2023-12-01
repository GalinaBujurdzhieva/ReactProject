import { useContext, useEffect, useRef} from 'react'

import useForm from '../../hooks/useForm'
import { AuthContext } from '../../contexts/Users/AuthContext'

import '../../assets/styles/login.css'
import footerImage from '../../assets/images/footer.png'

const LoginFormKeys = {
  Email: 'email',
  Password: 'password'
}

export const Login = () => {
  const emailInputRef = useRef();
  const {loginSubmitHandler} = useContext(AuthContext);

  const {values, onChange, onSubmit} = useForm(loginSubmitHandler, {
    [LoginFormKeys.Email]: '',
    [LoginFormKeys.Password]: ''
  })
  
  useEffect(() => {
    emailInputRef.current.focus();
  }, [])
  return(<div className="footer">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="footer_container">
            <div className="footer_content ">
              <div className="newsletter_container">
              <h2 className='login text-center'>Login</h2>
                <form
                  id="newsletter_form"
                  className="newsletter_form"
                  onSubmit={onSubmit}
                >
                  <input
                    type="text"
                    className="newsletter_input"
                    placeholder="Enter your email here"
                    required="required"
                    ref={emailInputRef}
                    name={LoginFormKeys.Email}
                    value={values[LoginFormKeys.Email]}
                    onChange={onChange}
                  />
                  <input
                    type="password"
                    className="newsletter_input"
                    placeholder="Enter your password here"
                    required="required"
                    name={LoginFormKeys.Password}
                    value={values[LoginFormKeys.Password]}
                    onChange={onChange}
                  />
                  <button type="submit" className="login_button text-center">login</button>
                </form>
              </div >
            </div>
          </div>
          <div className="footer_image_woman text-center">
                <img src={footerImage} alt="" />
              </div>
        </div>
      </div>
    </div>
  </div>
    )
}