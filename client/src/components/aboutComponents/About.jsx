import { useContext, useState, useEffect, useRef } from "react";

import * as trainerService from "../../services/trainerService";
import { TrainerContext } from "../../contexts/Trainers/TrainerContext";

import { AboutMain } from "./AboutMain";
import { AboutWelcome } from "./AboutWelcome";
import { AboutTeamBackground } from "./teamComponents/AboutTeamBackground";
import { AboutTeamMember } from "./teamComponents/AboutTeamMember";
import { AboutDiscount } from "./AboutDiscount";
import { AboutSkills } from "./AboutSkills";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css";
import "../../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css";
import "../../assets/plugins/OwlCarousel2-2.2.1/animate.css";
import "../../assets/plugins/colorbox/colorbox.css";
import "../../assets/styles/about.css";
import "../../assets/styles/about_responsive.css";
import { AboutTeamMemberCreateLink } from "./teamComponents/AboutTeamMemberCreateLink";

export const About = ({ shouldFocus }) => {
  const myDivRef = useRef(null);
  const {trainers, reloadTrainers, reloadTrainersAfterDelete, reloadTrainersAfterEdit} = useContext(TrainerContext);
  const [newTrainers, setTrainers] = useState(trainers);
  useEffect(() => {
    trainerService.getAll().then((trainers) => setTrainers(trainers));
  }, [reloadTrainers, reloadTrainersAfterDelete, reloadTrainersAfterEdit]);

  useEffect(() => {
    if (shouldFocus) {
      myDivRef.current.scrollIntoView({ behavior: 'smooth' });
      myDivRef.current.focus();
    }
  }, [shouldFocus]);

  return (
    <>
      <title>About us</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content="SportFIT template project" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <div className="super_container">
        {/* Home */}
        <AboutMain />
        {/* About */}
        <AboutWelcome />
        {/* Team */}
        <div className="team" tabIndex="0" ref={myDivRef}>
          <AboutTeamBackground />
          <div className="container">
            <AboutTeamMemberCreateLink />
            <div className="container">
              <div className="row team_row">
                {/* Team Member */}
                {Object.values(trainers).map((trainer) => (
                  <AboutTeamMember key={trainer._id} {...trainer} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Skills */}
        <div className="skills">
          <div className="container">
            <div className="row row-lg-eq-height">
              {/* Discount */}
              <AboutDiscount />
              <AboutSkills />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
