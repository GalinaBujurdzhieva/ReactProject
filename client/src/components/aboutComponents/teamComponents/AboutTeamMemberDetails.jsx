import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as trainerService from "../../../services/trainerService";
import * as imageHelper from "../../../utils/getImageByKey";
import toastrNotificationsService from "../../../services/toastrNotificationsService";

import { AboutTeamMemberDeleteConfirmation } from "./AboutTeamMemberDeleteConfirmation";

import "../../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../assets/styles/about.css";
import "../../../assets/styles/about_responsive.css";

export const AboutTeamMemberDetails = () => {
  const { _id } = useParams();
  const [currentTrainer, setCurrentTrainer] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    trainerService
      .getOne(_id)
      .then((result) => setCurrentTrainer(result))
      .catch((error) => {
        toastrNotificationsService.showError(
          "Something went wrong. Could not show this trainer "
        );
      });
  }, [_id]);

  const auth = JSON.parse(localStorage.getItem("auth"));

  const showModalHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };

  const loadEditTrainerHandler = () => {
    navigate(`/about/trainers/edit/${currentTrainer._id}`);
  };

  return (
    <>
      {showModal && <AboutTeamMemberDeleteConfirmation onClose={onClose} />}
      <div className="row team_row team-details d-flex align-items-center justify-content-center">
        <div className="col-lg-6 team_col">
          <div className="team_item d-flex flex-column align-items-center justify-content-center text-center">
            <div className="team_image">
              {
                <img
                  src={
                    imageHelper.getImage(currentTrainer.name) !== undefined
                      ? imageHelper.getImage(currentTrainer.name)
                      : currentTrainer.imageUrl
                  }
                  alt={currentTrainer.name}
                />
              }
            </div>
            <div className="team_panel_details">
              <div className="team_name">
                <p>{currentTrainer.name}</p>
              </div>
              <div className="team_title">personal trainer</div>
              <div className="team_courses">
                Courses:{" "}
                {currentTrainer.courses !== undefined
                  ? currentTrainer.courses.join(", ")
                  : ""}
              </div>
              <div className="team_courses">Age: {currentTrainer.age}</div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 team_col d-flex flex-column align-items-center">
          <p className="col-lg-9 team_description">
            {currentTrainer.description}
          </p>
          {auth?.email === "admin@abv.bg" && (
            <div
              className="team_group_button btn-group justify-content-center"
              role="group"
              aria-label="Basic example"
            >
              <button
                onClick={() => loadEditTrainerHandler(currentTrainer._id)}
                type="button"
                className="team_button btn btn-secondary"
              >
                Edit info
              </button>
              <button
                onClick={(e) => showModalHandler(e)}
                type="submit"
                className="team_button btn btn-secondary"
              >
                Remove trainer
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
