import {createContext, useState, useEffect } from 'react';
import * as trainerService from '../../services/trainerService'

const TrainerContext = createContext();

const TrainerProvider = ({children}) => {
    const [trainers, setTrainers] = useState([]);
    const [reloadTrainers, setReloadTrainers] = useState(false);
    const [reloadTrainersAfterDelete, setReloadTrainersAfterDelete] = useState(false);
    const [reloadTrainersAfterEdit, setReloadTrainersAfterEdit] = useState(false);

    useEffect(() => {
      trainerService.getAll()
      .then((trainers) => setTrainers(trainers))
      .catch((error) =>{
        throw error;
      });
    }, [reloadTrainers, reloadTrainersAfterDelete, reloadTrainersAfterEdit]);

    const addTrainerFunc = (newTrainer) => {
      const trainerListAfterCreate = [...trainers, newTrainer];
      setTrainers(trainerListAfterCreate);
      setReloadTrainers(!reloadTrainers);
    };

    const deleteTrainerFunc = (deletedTrainer) =>{
      const trainerListAfterDelete = trainers.filter(trainer => trainer._id !== deletedTrainer._id);
      setTrainers(trainerListAfterDelete);
      setReloadTrainersAfterDelete(!reloadTrainersAfterDelete);
    }
  
    const updateTrainerFunc = (updatedTrainer) => {
      const trainerListAfterUpdate = trainers.map(trainer =>
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