import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/about.css'
import '../../assets/styles/about_responsive.css'

import aboutSportFitImage from '../../assets/images/a2.png'

export const AboutWelcome = () =>{
    return(
        <div className="about">
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
              <div className="about_text">
                <p>
                Whether you're looking to lose weight, find inner peace through yoga, break a sweat in our spinning classes, improve your nutrition, strengthen your core with Pilates, or simply enhance your overall fitness, we've got you covered.
                <br/>
                At our fitness center, we are not just about exercise; we are about fostering a supportive and motivating community. Our team is dedicated to helping you on your fitness journey, regardless of your starting point. We believe that everyone deserves to live a healthier and happier life.
                <br/>
                Join us in pursuit of a better you. Your goals are our mission, and we are committed to helping you achieve them. Start your fitness adventure with us today!
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
    )
}