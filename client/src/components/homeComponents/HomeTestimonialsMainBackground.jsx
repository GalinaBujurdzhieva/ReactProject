import backgroundTestimonialsImage from "../../assets/images/testimonials.jpg";

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