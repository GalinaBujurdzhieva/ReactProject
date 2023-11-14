import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import * as trainerService from '../../services/trainerService'

import { AboutMain } from './AboutMain'
import { AboutWelcome } from './AboutWelcome'
import { AboutTeamBackground } from './AboutTeamBackground'
import { AboutTeamMember } from './AboutTeamMember'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/animate.css'
import '../../assets/plugins/colorbox/colorbox.css'
import '../../assets/styles/about.css'
import '../../assets/styles/about_responsive.css'

import backgroundDiscountImage from '../../assets/images/extra.jpg'

const backgroundDiscount = {
    backgroundImage: `url(${backgroundDiscountImage})`,
}

export const About = () =>{
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    trainerService.getAll()
    .then(trainers => setTrainers(trainers))
  }, [])

    return(
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
        <div className="row">
          <div className="col-lg-6">
            <div className="section_title_container">
              <div className="section_title">The Team</div>
            </div>
          </div>
        </div>
        <div className="row team_row">
          {/* Team Member */}
          {Object.values(trainers).map(trainer => 
       <AboutTeamMember 
       key= {trainer._id}
       {...trainer}
       />
       )} 
        </div>
      </div>
    </div>
    {/* Skills */}
    <div className="skills">
      <div className="container">
        <div className="row row-lg-eq-height">
          {/* Extra */}
          <div className="col-lg-6">
            <div className="extra d-flex flex-column align-items-center justify-content-center text-center">
              <div
                className="background_image"
                style={backgroundDiscount}
              />
              <div className="extra_title">15% Discount</div>
              <div className="extra_text">
                <p>
                  Morbi sed varius risus, vitae molestie lectus. Donec id
                  hendrerit velit, eu fringilla neque. Etiam id finibus sapien.
                  Donec sollicitudin luctus ex non pharetra.llus.
                </p>
              </div>
              <div className="button extra_button">
              <Link to="/register">Join Now</Link>
              </div>
            </div>
          </div>
          {/* Skills */}
          <div className="col-lg-6 skills_col">
            <div className="skills_content">
              <div className="section_title_container">
                <div className="section_subtitle">welcome to sportfit</div>
                <div className="section_title">We love sport</div>
              </div>
              <div className="skills_text">
                <p>
                  Morbi sed varius risus, vitae molestie lectus. Donec id
                  hendrerit velit, eu fringilla neque. Etiam id finibus sapien.
                  Donec sollicitudin luctus ex non pharetra. Aenean lobortis ut
                  leo vel porta. Maecenas ac vestibulum lectus. Cras nulla urna,
                  lacinia ut tempor facilisis, congue dignissim tellus. Maecenas
                  ac vestibulum lectus. Cras nulla urna, lacinia ut tempor
                  facilisis, congue dignissim tellus. Phasellus sit amet justo
                  ullamcorper, elementum ipsum nec, vulputate neque.
                </p>
              </div>
              {/* Progress Bars */}
              <ul className="progress_bar_container col_12 clearfix">
                <li className="pb_item">
                  <div
                    id="skill_1_pbar"
                    className="skill_bars"
                    data-perc={1.0}
                    data-name="skill_1_pbar"
                  />
                  <h5>Fitness</h5>
                </li>
                <li className="pb_item">
                  <div
                    id="skill_2_pbar"
                    className="skill_bars"
                    data-perc="0.70"
                    data-name="skill_2_pbar"
                  />
                  <h5>Pilates</h5>
                </li>
                <li className="pb_item">
                  <div
                    id="skill_3_pbar"
                    className="skill_bars"
                    data-perc="0.85"
                    data-name="skill_3_pbar"
                  />
                  <h5>Yoga</h5>
                </li>
                <li className="pb_item">
                  <div
                    id="skill_4_pbar"
                    className="skill_bars"
                    data-perc="0.95"
                    data-name="skill_4_pbar"
                  />
                  <h5>Aerobics</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    );

}