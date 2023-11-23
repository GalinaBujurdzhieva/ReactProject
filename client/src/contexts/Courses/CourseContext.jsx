import {createContext} from 'react'
import { useState, useEffect } from 'react';
import * as courseService from '../../services/courseService'

const CourseContext = createContext();

const CourseProvider = ({children}) => {
    const [courses, setCourses] = useState([]);
    const [reloadCourses, setReloadCourses] = useState(false);
    const [reloadCoursesAfterDelete, setReloadCoursesAfterDelete] = useState(false);
    const [reloadCoursesAfterEdit, setReloadCoursesAfterEdit] = useState(false);

    useEffect(() => {
      courseService.getAll().then((courses) => setCourses(courses));
    }, []);

    // const addTrainerFunc = (newTrainer) => {
    //   const trainerListAfterCreate = [...Object.values(trainers), newTrainer];
    //   setTrainers(trainerListAfterCreate);
    //   setReloadTrainers(!reloadTrainers);
    // };

    // const deleteTrainerFunc = (deletedTrainer) =>{
    //   const trainerListAfterDelete = Object.values(trainers).filter(trainer => trainer._id !== deletedTrainer._id);
    //   setTrainers(trainerListAfterDelete);
    //   setReloadTrainersAfterDelete(!reloadTrainersAfterDelete);
    // }
  
    // const updateTrainerFunc = (updatedTrainer) => {
    //   const trainerListAfterUpdate = Object.values(trainers).map(trainer =>
    //     trainer._id === updatedTrainer._id ? updatedTrainer : trainer
    //   );
    //   setTrainers(trainerListAfterUpdate);
    //   setReloadTrainersAfterEdit(!reloadTrainersAfterEdit);
    // };

  return (
    <CourseContext.Provider value={{courses}}>
      {children}
    </CourseContext.Provider>
  );
};
export {CourseContext, CourseProvider};