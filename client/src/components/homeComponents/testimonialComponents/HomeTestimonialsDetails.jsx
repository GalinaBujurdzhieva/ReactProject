import * as dateFormatter from '../../../utils/dateFormatter'

import "../../../assets/styles/main_styles.css";

export const HomeTestimonialsDetails = ({...testimonial}) =>{
    return(
        <div className="col-lg-4">
        <div className="test d-flex-row align-items-start justify-content-start">
          <div className="test_content">
            <div className="test_name">
              <div>{testimonial.name}</div>
            </div>
            <div className="test_title">{dateFormatter.formatDate(testimonial._createdOn)}</div>
            <div className="test_text">
              <p>
                {testimonial.text}
              </p>
            </div>
            <div className={`rating rating_${testimonial.rating} test_rating`}>
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    )
}