import { Link } from 'react-router-dom'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/animate.css'
import '../../assets/plugins/colorbox/colorbox.css'
import '../../assets/styles/about.css'
import '../../assets/styles/about_responsive.css'

import backgroundAboutImage from '../../assets/images/about_page.jpg'
import aboutSportFitImage from '../../assets/images/a2.png'
import teamBackgroundImage from '../../assets/images/blog.jpg'
import MichaelSmithImage from '../../assets/images/team_1.jpg'
import SimoneParkerImage from '../../assets/images/team_2.jpg'
import WilliamJamesImage from '../../assets/images/team_3.jpg'
import backgroundDiscountImage from '../../assets/images/extra.jpg'

const backgroundImage ={
    backgroundImage: `url(${backgroundAboutImage})`,
}
const backgroundDiscount = {
    backgroundImage: `url(${backgroundDiscountImage})`,
}

export const About = () =>{
    return(
        <>
  <title>About us</title>
  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="description" content="SportFIT template project" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <div className="super_container">
   
    {/* Home */}
    <div className="home">
      <div
        className="background_image"
        style={backgroundImage}
      />
      <div className="overlay" />
      <div className="home_container">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="home_content">
                <div className="home_title">About us</div>
                <div className="home_subtitle">
                  Pilates, Yoga, Fitness, Spinning &amp; many more
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* About */}
    <div className="about">
      <div className="container about_container">
        <div className="row">
          <div className="col-lg-6">
            <div className="about_content">
              <div className="section_title_container">
                <div className="section_subtitle">welcome to sportfit</div>
                <div className="section_title">
                  About <span>Sportfit</span>
                </div>
              </div>
              <div className="text_highlight">
                Etiam commodo justo nec aliquam feugiat. Donec a leo eget eget
                augue porttitor sollicitudin augue porttitor sollicitudin.
              </div>
              <div className="about_text">
                <p>
                  Morbi sed varius risus, vitae molestie lectus. Donec id
                  hendrerit velit, eu fringilla neque. Etiam id finibus sapien.
                  Donec sollicitudin luctus ex non pharetra. Aenean lobortis ut
                  leo vel porta. Maecenas ac vestibulum lectus. Cras nulla urna,
                  lacinia ut tempor facilisis, congue dignissim tellus. Maecenas
                  ac vestibulum lectus. Cras nulla urna, lacinia ut tempor
                  facilisis, congue dignissim tellus. Phasellus sit amet justo
                  ullamcorper, elementum ipsum nec.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about_background">
        <div className="about_image">
          <img src={aboutSportFitImage} alt="" />
        </div>
      </div>
    </div>
    {/* Team */}
    <div className="team">
      <div
        className="parallax_background parallax-window"
        data-parallax="scroll"
        data-speed="0.8">
            <img className="parallax_background" src={teamBackgroundImage}/>
        </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section_title_container">
              <div className="section_subtitle">welcome to sportfit</div>
              <div className="section_title">The Team</div>
            </div>
          </div>
        </div>
        <div className="row team_row">
          {/* Team Member */}
          <div className="col-lg-4 team_col">
            <div className="team_item">
              <div className="team_image">
                <img src={MichaelSmithImage} alt="" />
              </div>
              <div className="team_panel d-flex flex-column align-items-center justify-content-center text-center">
                <div className="team_name">
                  <a href="#">Michael Smith</a>
                </div>
                <div className="team_title">personal trainer</div>
              </div>
            </div>
          </div>
          {/* Team Member */}
          <div className="col-lg-4 team_col">
            <div className="team_item">
              <div className="team_image">
                <img src={SimoneParkerImage} alt="" />
              </div>
              <div className="team_panel d-flex flex-column align-items-center justify-content-center text-center">
                <div className="team_name">
                  <a href="#">Simone Parker</a>
                </div>
                <div className="team_title">personal trainer</div>
              </div>
            </div>
          </div>
          {/* Team Member */}
          <div className="col-lg-4 team_col">
            <div className="team_item">
              <div className="team_image">
                <img src={WilliamJamesImage} alt="" />
              </div>
              <div className="team_panel d-flex flex-column align-items-center justify-content-center text-center">
                <div className="team_name">
                  <a href="#">William James</a>
                </div>
                <div className="team_title">personal trainer</div>
              </div>
            </div>
          </div>
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