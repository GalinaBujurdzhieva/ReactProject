import {useParams} from 'react-router-dom'

import * as trainerService from '../../services/trainerService'
import * as imageHelper from '../../utils/getImageByKey'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/about.css'
import '../../assets/styles/about_responsive.css'
import { useEffect, useState } from 'react'

export const AboutTeamMemberDetails = () =>{
    const { _id } = useParams();
    const [currentTrainer, setCurrentTrainer] = useState({});

    useEffect(() => {
        trainerService.getOne(_id)
        .then(result => setCurrentTrainer(result))
    }, []);

    return(
        <div className="col-lg-4 team_col">
            <div className="team_item">
              <div className="team_image">
                {<img src={imageHelper.getImage(currentTrainer.name)} alt="" /> }
              </div>
              <div className="team_panel d-flex flex-column align-items-center justify-content-center text-center">
                <div className="team_name">
                  <p>{currentTrainer.name}</p>
                </div>
                <div className="team_title">personal trainer</div>
                {/* {console.log(currentTrainer.courses.join(', '))} */}
                <div className="team_courses">Courses: {currentTrainer.courses !== undefined ? currentTrainer.courses.join(', ') : ''}</div>
              </div>
            </div>
        </div>
    )
}