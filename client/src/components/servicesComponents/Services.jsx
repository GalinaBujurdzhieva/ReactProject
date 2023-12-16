import { useContext, useEffect, useRef } from 'react'

import { CourseContext } from '../../contexts/Courses/CourseContext'
import { AuthContext } from '../../contexts/Users/AuthContext'
import toastrNotificationsService from "../../services/toastrNotificationsService"

import { ServicesHome } from './ServicesHome'
import { ServicesWelcome } from './ServicesWelcome'
import { CourseDetails } from './coursesComponents/CourseDetails'
import {CoursesTimetableBackgroundImage} from './coursesComponents/CoursesTimetableBackgroundImage'
import { CoursesTimetable } from './coursesComponents/CoursesTimetable'
import { ServicesDiscount } from './ServicesDiscount'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/animate.css'
import '../../assets/plugins/colorbox/colorbox.css'
import '../../assets/styles/services.css'
import '../../assets/styles/services_responsive.css'

export const Services = ({setFocus}) => {
  const {courses} = useContext(CourseContext);
  console.log(Object.values(courses).length);
  const myDivRef = useRef(null);
  useEffect(()=> {
    if (setFocus) {
      myDivRef.current.scrollIntoView({ behavior: 'smooth' });
      myDivRef.current.focus();
    }
  }, [setFocus]);
  const { auth } = useContext(AuthContext);
  const isAuthenticated = !!auth.username;

    return (
        <div className="super_container">

  {/* Home */}
  <ServicesHome />
  {/* Services */}
  <div className="services" >
    <div className="container">
      <ServicesWelcome myDivRef = {myDivRef}/>
      <div className="row services_row_details" >
      { Object.values(courses).length === 0
      ? toastrNotificationsService.showError('Something went wrong. Could not load courses')
      : Object.values(courses)
              .map((course) => (
                <CourseDetails key={course._id} {...course} />
              ))}
      </div>
    </div>
  </div>
  {/* Timetable */}
  <div className="timetable">
    <CoursesTimetableBackgroundImage />
    <div className="tt_overlay" />
    <div className="container">
      <div className="row" >
        {Object.values(courses).length > 0 &&
        <CoursesTimetable />}
      </div>
    </div>
  </div>
  {/* Discount */}
  {!isAuthenticated && <ServicesDiscount />}
</div>
    );
}