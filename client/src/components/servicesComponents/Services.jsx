import { useContext, useEffect, useRef } from 'react'
import {Link} from 'react-router-dom'

import { CourseContext } from '../../contexts/Courses/CourseContext'

import { CourseDetails } from './coursesComponents/CourseDetails'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/animate.css'
import '../../assets/plugins/colorbox/colorbox.css'
import '../../assets/styles/services.css'
import '../../assets/styles/services_responsive.css'

import backgroundTimetableImage from '../../assets/images/timetable.jpg'
import backgroundDiscountImage from '../../assets/images/extra_wide.jpg'
import { ServicesHome } from './ServicesHome'
import { ServicesWelcome } from './ServicesWelcome'
import { CoursesTimetable } from './coursesComponents/CoursesTimetable'

const backgroundDiscount = {
    backgroundImage: `url(${backgroundDiscountImage})`
}

export const Services = ({setFocus}) => {

  const {courses} = useContext(CourseContext);
  const myDivRef = useRef(null);
  console.log(setFocus);
  useEffect(()=> {
    if (setFocus) {
      myDivRef.current.scrollIntoView({ behavior: 'smooth' });
      myDivRef.current.focus();
    }
  }, [setFocus])

    return (
        <div className="super_container">

  {/* Home */}
  <ServicesHome />
  {/* Services */}
  <div className="services" >
    <div className="container">
      <ServicesWelcome myDivRef = {myDivRef}/>
      <div className="row services_row_details" >
      {Object.values(courses)
              .map((course) => (
                <CourseDetails key={course._id} {...course} />
              ))}
      </div>
    </div>
  </div>
  {/* Timetable */}
  <div className="timetable">
    <div
      className="parallax_background parallax-window"
      data-parallax="scroll"
      data-speed="0.8">
        <img src={backgroundTimetableImage}/>
      </div>
    
    <div className="tt_overlay" />
    <div className="container">
      <div className="row">
        <CoursesTimetable />
      </div>
    </div>
  </div>
  {/* Extra */}
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
                Morbi sed varius risus, vitae molestie lectus. Donec id
                hendrerit velit, eu fringilla neque. Etiam id finibus sapien.
                Donec sollicitudin luctus ex non pharetra.llus.
              </p>
            </div>
            <div className="button extra_button">
              <Link to="/register">Join Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}