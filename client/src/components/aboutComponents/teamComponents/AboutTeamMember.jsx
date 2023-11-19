import { Link } from "react-router-dom"
import * as imageHelper from '../../../utils/getImageByKey'

export const AboutTeamMember = ({
    ...trainer
}) => {
return(
    
<div className="col-lg-4 team_col">
            <div className="team_item">
              <div className="team_image">
              <Link to={`/about/trainers/${trainer._id}`}>{<img src={imageHelper.getImage(trainer.name)} alt={trainer.name} /> }</Link>
              </div>
              <div className="team_panel d-flex flex-column align-items-center justify-content-center text-center">
                <div className="team_name">
                  <Link to={`/about/trainers/${trainer._id}`}>{trainer.name}</Link>
                </div>
                <div className="team_title">personal trainer</div>
                <div className="team_courses">Courses: {trainer.courses.join(', ')}</div>
              </div>
            </div>
    </div>
)
}