import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'

import { AuthContext } from '../../../contexts/Users/AuthContext';
import * as dateFormatter from '../../../utils/dateFormatter'

import "../../../assets/styles/main_styles.css";

export const HomeTestimonialsDetails = ({...testimonial}) =>{

 const {auth} = useContext(AuthContext);
 const navigate = useNavigate();
 const isOwnerOfTestimonial = auth._id === testimonial._ownerId;

 const loadEditTestimonialHandler = () => {
  navigate(`/testimonial/edit/${testimonial._id}`);
};

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
            {isOwnerOfTestimonial &&
              <div className="btn-group d-flex justify-content-center" role="group">
              <button 
              onClick={()=> loadEditTestimonialHandler(testimonial._id)} 
              type="button" 
              className="button test_details_button">
                Edit
                </button>
              <button 
              // onClick={(e) =>showModalHandler(e)}
              type="submit" 
              className="button test_details_button"
              data-toggle="modal" 
              data-target="#exampleModal"
              >Delete</button>
            </div>
            }

          </div>
        </div>
      </div>
    )
}