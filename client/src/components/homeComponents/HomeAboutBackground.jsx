import aboutImage from "../../assets/images/a1.png";

import "../../assets/styles/main_styles.css";

export const HomeAboutBackground = () => {
    return(
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
    )
}