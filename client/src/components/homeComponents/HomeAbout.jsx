import { Link } from "react-router-dom";

import aboutImage from "../../assets/images/a1.png";

import "../../assets/styles/main_styles.css";

export const HomeAbout = () =>{
    return(<div className="about">
    <div className="container about_container">
      <div className="row">
        <div className="col-lg-6">
          <div className="about_content">
            <div className="section_title_container">
              <div className="section_title">
                About <span>Sportfit</span>
              </div>
            </div>
            <div className="text_highlight">
            Welcome to our state-of-the-art fitness facility, where we offer a diverse range of programs and services to help you achieve your health and wellness goals. 
            </div>
            <div className="about_text_home">
            <p>
                Whether you're looking to lose weight, find inner peace through yoga, break a sweat in our spinning classes, improve your nutrition, strengthen your core with Pilates, or simply enhance your overall fitness, we've got you covered.
                <br/>
                At our fitness center, we are not just about exercise; we are about fostering a supportive and motivating community. Our team is dedicated to helping you on your fitness journey, regardless of your starting point. We believe that everyone deserves to live a healthier and happier life.
                <br/>
                Join us in pursuit of a better you. Your goals are our mission, and we are committed to helping you achieve them. Start your fitness adventure with us today!
                </p>
            </div>
            <div className="button about_button">
              <Link to="/about">Learn more</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="about_background">
      <div className="container fill_height">
        <div className="row fill_height">
          <div className="col-lg-6 offset-lg-6 fill_height">
            <div className="about_image_home">
              <img src={aboutImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}