import {createContext} from 'react'
import { useState, useEffect } from 'react';
import * as courseService from '../../services/courseService'

const CourseContext = createContext();

const CourseProvider = ({children}) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      courseService.getAll().then((courses) => setCourses(courses));
    }, []);

  return (
    <CourseContext.Provider value={{courses}}>
      {children}
    </CourseContext.Provider>
  );
};
export {CourseContext, CourseProvider};