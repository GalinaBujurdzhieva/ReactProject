import { Link } from "react-router-dom";

import backgroundHomeImage from "../../assets/images/index.jpg";

import "../../assets/styles/main_styles.css";

const backgroundHome = {
    backgroundImage: `url(${backgroundHomeImage})`,
  };

export const HomeMain = () => {
    return(<div className="home">
    <div className="background_image" style={backgroundHome} />
    <div className="overlay" />
    <div className="home_container">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="home_content text-center">
              <div className="home_title">Get fit with our best proposals</div>
              <div className="home_subtitle">
                Pilates, Yoga, Fitness, Swimming &amp; more
              </div>
              <div className="button home_button ml-auto mr-auto">
                <Link to="/register">Join Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}