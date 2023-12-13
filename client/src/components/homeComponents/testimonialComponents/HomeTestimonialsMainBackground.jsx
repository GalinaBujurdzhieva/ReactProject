import backgroundTestimonialsImage from "../../../assets/images/testimonials.jpg";
import "../../../assets/styles/main_styles.css";

export const HomeTestimonialsMainBackground = () =>{
    return(
        <div
          className="parallax_background parallax-window"
          data-parallax="scroll"
          data-speed="0.8"
        >
          <img src={backgroundTestimonialsImage} />
        </div>
    )
}