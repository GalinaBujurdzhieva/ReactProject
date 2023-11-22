import { Link } from "react-router-dom";

import "../../../assets/styles/about.css";
import "../../../assets/styles/about_responsive.css";

export const AboutTeamMemberCreateLink = () => {
    return(
        <div className="row d-flex align-items-center">
              <div className="col-lg-6">
                <div className="section_title_container">
                  <div className="section_title">The Team</div>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="add_new_team_member_link text-align-right">
                  <Link to="/about/trainers/create">Add new trainer</Link>
                </div>
              </div>
            </div>
    )
}