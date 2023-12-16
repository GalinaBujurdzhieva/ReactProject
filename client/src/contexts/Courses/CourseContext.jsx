import {createContext, useState, useEffect } from 'react';
import * as courseService from '../../services/courseService'

const CourseContext = createContext();

const CourseProvider = ({children}) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      courseService.getAll()
      .then((courses) => setCourses(courses))
      .catch((error) =>{
        throw error;
      });
    }, []);

  return (
    <CourseContext.Provider value={{courses}}>
      {children}
    </CourseContext.Provider>
  );
};
export {CourseContext, CourseProvider};