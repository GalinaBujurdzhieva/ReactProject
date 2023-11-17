import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

import * as trainerService from "../../services/trainerService";

import { AboutMain } from "./AboutMain";
import { AboutWelcome } from "./AboutWelcome";
import { AboutTeamBackground } from "./AboutTeamBackground";
import { AboutTeamMember } from "./AboutTeamMember";
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

export const About = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    trainerService.getAll().then((trainers) => setTrainers(trainers));
  }, []);

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
        <div className="team">
          <AboutTeamBackground />
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-lg-6">
                <div className="section_title_container">
                  <div className="section_title">The Team</div>
                </div>
              </div>
              <div className="col-lg-6 ">
              <div className="add_new_team_member_link text-align-right">
                  <Link to="/blog/all">Add new team member</Link>
                </div>
              </div>
            </div>
            <div className="row team_row">
              {/* Team Member */}
              {Object.values(trainers).map((trainer) => (
                <AboutTeamMember key={trainer._id} {...trainer} />
              ))}
            </div>
          </div>
        </div>
        {/* Skills */}
        <div className="skills">
          <div className="container">
            <div className="row row-lg-eq-height">
              {/* Discount */}
              <AboutDiscount />
              <AboutSkills/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
