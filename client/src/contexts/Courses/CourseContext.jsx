import {createContext, useState, useEffect } from 'react';
import * as courseService from '../../services/courseService'

const CourseContext = createContext();

const CourseProvider = ({children}) => {
    const [courses, setCourses] = useState([]);
    const [reloadCoursesAfterEdit, setReloadCoursesAfterEdit] = useState(false);

    useEffect(() => {
      courseService.getAll()
      .then((courses) => setCourses(courses))
      .catch((error) =>{
        throw error;
      });
    }, [reloadCoursesAfterEdit]);

    const updateCourseFunc = (updatedCourse) => {
      const courseListAfterUpdate = Object.values(courses).map(course =>
        course._id === updatedCourse._id ? updatedCourse : course
      );
      setCourses(courseListAfterUpdate);
      setReloadCoursesAfterEdit(!reloadCoursesAfterEdit);
    };

  return (
    <CourseContext.Provider value={{courses, updateCourseFunc}}>
      {children}
    </CourseContext.Provider>
  );
};
export {CourseContext, CourseProvider};