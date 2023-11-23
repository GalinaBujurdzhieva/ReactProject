import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/about.css'
import '../../assets/styles/about_responsive.css'

import backgroundAboutImage from '../../assets/images/about_page.jpg'

const backgroundImage ={
    backgroundImage: `url(${backgroundAboutImage})`,
}

export const AboutMain = () => {
    return(
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
                  Pilates, Yoga, Fitness, Swimming &amp; many more
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}