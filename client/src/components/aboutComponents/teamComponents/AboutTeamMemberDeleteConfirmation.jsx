import { useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TrainerContext } from "../../../contexts/Trainers/TrainerContext"; 
import * as trainerService from "../../../services/trainerService";
import styles from "./AboutTeamMemberDeleteConfirmation.module.css";

export const AboutTeamMemberDeleteConfirmation = ({ onClose }) => {
  const myDivRef = useRef(null);
  const { _id } = useParams();
  const { trainers, deleteTrainerFunc } = useContext(TrainerContext);
  useEffect(() => {
    myDivRef.current.focus();
  }, [_id]);

  const currentTrainer = Object.values(trainers).find((trainer) => trainer._id === _id);
  const navigate = useNavigate();
  const deleteTrainerHandler = (e, trainerId) => {
    e.preventDefault();
    trainerService.remove(trainerId);
    deleteTrainerFunc(currentTrainer);
    navigate('/about');
  };

  return (
    <>
      <div className={styles.mainContainer} tabIndex={0} ref={myDivRef}>
        <div className={styles.container}>
          <h4 className={styles.confirmation}>
            Are you sure you want to remove this trainer?
          </h4>
          <button
            className={styles.blogButton}
            type="submit"
            onClick={(e) => deleteTrainerHandler(e, _id)}
          >
            Yes
          </button>
          <button className={styles.blogButton} onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </>
  );
};
