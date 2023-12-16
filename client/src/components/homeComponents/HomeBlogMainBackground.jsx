import blogImage from "../../assets/images/blog.jpg";

import "../../assets/styles/main_styles.css";

export const HomeBlogMainBackground = () => {
    return(
        <div
          className="parallax_background parallax-window"
          data-parallax="scroll"
          data-speed="0.8"
        >
          <img src={blogImage} />
        </div>
    )
}