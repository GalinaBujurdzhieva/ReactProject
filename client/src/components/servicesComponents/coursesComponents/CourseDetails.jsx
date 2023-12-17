import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";

import { CourseContext } from "../../../contexts/Courses/CourseContext";
import { AuthContext } from "../../../contexts/Users/AuthContext";
import Paths from "../../../utils/Paths";
import * as courseService from '../../../services/courseService'
import toastrNotificationsService from "../../../services/toastrNotificationsService";
import * as iconHelper from "../../../utils/getCourseIconByKey";

import "../../../assets/styles/services.css";

export const CourseDetails = ({ handleLinkClick, ...course }) => {
  const location = useLocation();
  const {updateCourseFunc} = useContext(CourseContext);
  const { auth } = useContext(AuthContext);
  const isAuthenticated = !!auth.username;

  const likesHandler = () =>{
    const courseWithUpdatedLikes = {
      ...course,
      likes: course.likes + 1
    }
    if (isAuthenticated) {
      const editedCourse = courseService.edit(course._id, courseWithUpdatedLikes);
    updateCourseFunc(editedCourse);
    }
    else{
      toastrNotificationsService.showError('Only registered users can vote. Please log in your account')
    }
  }

  const dislikesHandler = () =>{
    const courseWithUpdatedDislikes = {
      ...course,
      dislikes: course.dislikes + 1
    }
    if (isAuthenticated) {
      const editedCourse = courseService.edit(course._id, courseWithUpdatedDislikes);
      updateCourseFunc(editedCourse);
    } else{
      toastrNotificationsService.showError('Only registered users can vote. Please log in your account')
    }
  }

  return (
    <div className="col-xl-4 col-md-6 service_col">
      <div className="service">
        <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
          <div>
            <div className="service_icon">
              <img
                src={
                  iconHelper.getIcon(course.name) !== undefined
                    ? iconHelper.getIcon(course.name)
                    : course.imageUrl
                }
                alt={course.name}
              />
            </div>
          </div>
          <div className="service_title">{course.name} Class</div>
        </div>
        {location.pathname === "/" ? (
          <div className="service_text_part">
            <p>{course.description}</p>
          </div>
        ) : (
         <>
          <div className="service_text">
            <p>{course.description}</p>
          </div>
          <div className="container"> 
          <div className="row justify-content-center">
            <button 
            onClick={() => likesHandler()}
            className="like_dislike_btn"><i className="fa fa-3x fa-thumbs-up" aria-hidden="true"></i></button>
            <span className="likes_dislikes">{course.likes}</span>
            <button 
            onClick={() => dislikesHandler()}
            className="like_dislike_btn"><i className="fa fa-3x fa-thumbs-down" aria-hidden="true"></i></button>
            <span className="likes_dislikes">{course.dislikes}</span>
            </div>
          </div>
         </>
        )}
        {location.pathname === "/" && (
          <div className="course_link">
            <Link to={Paths.Courses} onClick={handleLinkClick}>Read More</Link>
          </div>
        )}
      </div>
    </div>
  );
};
