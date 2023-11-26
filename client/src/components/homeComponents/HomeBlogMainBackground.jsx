import blogImage from "../../assets/images/blog.jpg";

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