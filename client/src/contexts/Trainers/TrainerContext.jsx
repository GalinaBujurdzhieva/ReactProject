import {createContext} from 'react'
import React, { useState, useEffect } from 'react';
import * as trainerService from '../../services/trainerService'

const TrainerContext = createContext();

const TrainerProvider = ({children}) => {
    const [trainers, setTrainers] = useState([]);
    const [reloadTrainers, setReloadTrainers] = useState(false);
    const [reloadTrainersAfterDelete, setReloadTrainersAfterDelete] = useState(false);
    const [reloadTrainersAfterEdit, setReloadTrainersAfterEdit] = useState(false);

    useEffect(() => {
      trainerService.getAll().then((trainers) => setTrainers(trainers));
    }, [reloadTrainers, reloadTrainersAfterDelete, reloadTrainersAfterEdit]);

    const addTrainerFunc = (newTrainer) => {
      const trainerListAfterCreate = [...Object.values(trainers), newTrainer];
      setTrainers(trainerListAfterCreate);
      setReloadTrainers(!reloadTrainers);
    };

    const deleteTrainerFunc = (deletedTrainer) =>{
      const trainerListAfterDelete = Object.values(trainers).filter(trainer => trainer._id !== deletedTrainer._id);
      setTrainers(trainerListAfterDelete);
      setReloadTrainersAfterDelete(!reloadTrainersAfterDelete);
    }
  
    const updateTrainerFunc = (updatedTrainer) => {
      const trainerListAfterUpdate = Object.values(trainers).map(trainer =>
        trainer._id === updatedTrainer._id ? updatedTrainer : trainer
      );
      setTrainers(trainerListAfterUpdate);
      setReloadTrainersAfterEdit(!reloadTrainersAfterEdit);
    };

  return (
    <TrainerContext.Provider value={{trainers, addTrainerFunc, deleteTrainerFunc, updateTrainerFunc}}>
      {children}
    </TrainerContext.Provider>
  );
};
export {TrainerContext, TrainerProvider};