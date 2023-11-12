import { useEffect, useRef } from 'react'

import '../../assets/styles/login.css'

import footerImage from '../../assets/images/footer.png'

export const Login = () => {
  const usernameInputRef = useRef();
  
  useEffect(() => {
usernameInputRef.current.focus();
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
                  action="#"
                  id="newsletter_form"
                  className="newsletter_form"
                >
                  <input
                    type="text"
                    className="newsletter_input"
                    placeholder="Enter your username here"
                    required="required"
                    ref={usernameInputRef}
                  />
                  <input
                    type="text"
                    className="newsletter_input"
                    placeholder="Enter your password here"
                    required="required"
                  />
                </form>
              </div >
              <button className="login_button text-center">login</button>
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