import {Link} from 'react-router-dom'

import Paths from '../../utils/Paths'

import backgroundDiscountImage from '../../assets/images/extra_wide.jpg'

import '../../assets/styles/services.css'

const backgroundDiscount = {
    backgroundImage: `url(${backgroundDiscountImage})`
}

export const ServicesDiscount = () =>{
    return(
        <div className="extra d-flex flex-column align-items-center justify-content-center text-center">
    <div
      className="background_image"
      style={backgroundDiscount}
    />
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="extra_content d-flex flex-column align-items-center justify-content-center text-center">
            <div className="extra_title">15% Discount</div>
            <div className="extra_text">
              <p>
              Unlock exclusive savings! Register now and enjoy a limited-time discount. Be among the first to secure your spot and take advantage of this special offer. Don't miss out on the chance. Simply click the button below to complete your registration and claim your discount.
              </p>
            </div>
            <div className="button extra_button">
              <Link to={Paths.Register}>Join Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}