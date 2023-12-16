import { Link } from "react-router-dom";
import Paths from "../../../utils/Paths";

import "../../../assets/styles/about.css";
import "../../../assets/styles/about_responsive.css";

export const AboutTeamMemberCreateLink = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
    return(
        <div className="row d-flex align-items-center">
              <div className="col-lg-6">
                <div className="section_title_container">
                  <div className="section_title">The Team</div>
                </div>
              </div>
              {auth?.email === "admin@abv.bg" &&
              <div className="col-lg-6 ">
              <div className="add_new_team_member_link text-align-right">
                <Link to={Paths.AboutTrainersCreate}>Add new trainer</Link>
              </div>
            </div>
              }
            </div>
    )
}