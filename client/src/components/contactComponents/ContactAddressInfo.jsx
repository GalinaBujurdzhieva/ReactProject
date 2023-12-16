import dotLogo from '../../assets/images/dot.png'

import '../../assets/styles/contact.css'

export const ContactAddressInfo = () =>{
    return(
        <div className="col-lg-4">
          <div className="contact_content">
            <div className="contact_logo">
              <div className="logo d-flex flex-row align-items-center justify-content-start">
                <img src={dotLogo} alt="" />
                <div>
                  Sport<span>fit</span>
                </div>
              </div>
            </div>
            <div className="contact_text">
              <p>
              Have a question or want to get in touch? Fill out the form below, and we'll get back to you as soon as possible.
              </p>
            </div>
            <div className="contact_list">
              <ul>
                <li className="d-flex flex-row align-items-start justify-content-start">
                  <div>
                    <div>A:</div>
                  </div>
                  <div> q. Vasil Levski bloc 26, Kazanlak 1431, Bulgaria</div>
                </li>
                <li className="d-flex flex-row align-items-start justify-content-start">
                  <div>
                    <div>P:</div>
                  </div>
                  <div>+359 898 464437</div>
                </li>
                <li className="d-flex flex-row align-items-start justify-content-start">
                  <div>
                    <div>M:</div>
                  </div>
                  <div>sportFIT@gmail.com</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
    )
}