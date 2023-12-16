import { useLocation, Link } from "react-router-dom";

import Paths from "../../../utils/Paths";
import * as iconHelper from "../../../utils/getCourseIconByKey";

import "../../../assets/styles/services.css";

export const CourseDetails = ({ handleLinkClick, ...course }) => {
  const location = useLocation();

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
          <div className="service_text">
            <p>{course.description}</p>
          </div>
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
