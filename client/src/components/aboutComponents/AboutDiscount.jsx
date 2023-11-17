import { Link } from 'react-router-dom'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/about.css'
import '../../assets/styles/about_responsive.css'

import backgroundDiscountImage from '../../assets/images/extra.jpg'

const backgroundDiscount = {
    backgroundImage: `url(${backgroundDiscountImage})`,
}

export const AboutDiscount = ()=>{
    return (
        <div className="col-lg-6">
        <div className="extra d-flex flex-column align-items-center justify-content-center text-center">
          <div
            className="background_image"
            style={backgroundDiscount}
          />
          <div className="extra_title">15% Discount</div>
          <div className="extra_text">
            <p>
            Unlock exclusive savings! Register now and enjoy a limited-time discount. Be among the first to secure your spot and take advantage of this special offer. Don't miss out on the chance. Simply click the button below to complete your registration and claim your discount.
            </p>
          </div>
          <div className="button extra_button">
          <Link to="/register">Join Now</Link>
          </div>
        </div>
      </div>
    )
}