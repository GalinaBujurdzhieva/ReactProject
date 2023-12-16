import {useRef, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import {TestimonialContext} from '../../../contexts/Testimonials/TestimonialContext'
import * as testimonialService from '../../../services/testimonialService'
import Paths from '../../../utils/Paths';

import * as styles from './TestimonialDeleteConfirmation.module.css'

export const TestimonialDeleteConfirmation = ({onClose, _id}) =>{
    const myDivRef = useRef(null);
    const {testimonials, deleteTestimonialFunc } = useContext(TestimonialContext);
    
    useEffect(() => {
      myDivRef.current.focus();
    }, [_id]);
  
    const currentTestimonial = testimonials.find((testimonial) => testimonial._id === _id);
    const navigate = useNavigate();
    const deleteTestimonialHandler = (e, testimonialId) => {
      e.preventDefault();
      testimonialService.remove(testimonialId);
      deleteTestimonialFunc(currentTestimonial);
      navigate(Paths.Home);
    };
  
    return (
      <>
        <div className={styles.mainContainer} tabIndex={0} ref={myDivRef}>
          <div className={styles.container}>
            <h4 className={styles.confirmation}>
              Really want to delete your testimonial?
            </h4>
            <button
              className={styles.testimonialButton}
              type="submit"
              onClick={(e) => deleteTestimonialHandler(e, _id)}
            >
              Yes
            </button>
            <button className={styles.testimonialButton} onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </>
    )
}