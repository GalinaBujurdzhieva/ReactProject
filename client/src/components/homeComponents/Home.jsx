import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { BlogPost } from "../blogComponents/BlogPost";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css";
import "../../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css";
import "../../assets/plugins/OwlCarousel2-2.2.1/animate.css";
import "../../assets/plugins/colorbox/colorbox.css";
import "../../assets/styles/main_styles.css";
import "../../assets/styles/responsive.css";

import backgroundHomeImage from "../../assets/images/index.jpg";
import pilatesIcon from "../../assets/images/icon_1.png";
import swimmingPoolIcon from "../../assets/images/icon_2.png";
import healthyDietPlanIcon from "../../assets/images/icon_3.png";
import privateFitClassIcon from "../../assets/images/icon_7.png";
import nutritionClassesIcon from "../../assets/images/icon_8.png";
import pillatesClassesIcon from "../../assets/images/icon_9.png";
import aboutImage from "../../assets/images/a1.png";
import blogImage from "../../assets/images/blog.jpg";

import backgroundTestimonialsImage from "../../assets/images/testimonials.jpg";
import DianeSmithImage from "../../assets/images/test_1.jpg";
import EricRodriguezImage from "../../assets/images/test_2.jpg";
import HelenWillowImage from "../../assets/images/test_3.jpg";

import sliderImage1 from "../../assets/images/gallery_1.jpg";
import sliderImage2 from "../../assets/images/gallery_2.jpg";
import sliderImage3 from "../../assets/images/gallery_3.jpg";
import sliderImage4 from "../../assets/images/gallery_4.jpg";
import sliderImage5 from "../../assets/images/gallery_5.jpg";

import weightLossIcon from "../../assets/images/icon_4.png";
import yogaClassesIcon from "../../assets/images/icon_5.png";
import spinningClassIcon from "../../assets/images/icon_6.png";
import {BlogContext} from "../../contexts/Blog/BlogContext";

const backgroundHome = {
  backgroundImage: `url(${backgroundHomeImage})`,
};

export const Home = () => {
  const {blogs} = useContext(BlogContext)
  const navigate = useNavigate();

  return (
    <div className="super_container">
      {/* Home */}
      <div className="home">
        <div className="background_image" style={backgroundHome} />
        <div className="overlay" />
        <div className="home_container">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="home_content text-center">
                  <div className="home_title">Get fit with us</div>
                  <div className="home_subtitle">
                    Pilates, Yoga, Fitness, Spinning &amp; many more
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
      {/* Boxes */}
      <div className="boxes">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="boxes_container d-flex flex-lg-row flex-column align-items-start justify-content-start">
                {/* Box */}
                <div className="box">
                  <div className="box_icon d-flex flex-column align-items-center justify-content-center">
                    <img src={pilatesIcon} alt="" />
                  </div>
                  <div className="box_title">Pilates with trainer</div>
                  <div className="box_text">
                    <p>
                      Etiam commodo justo nec aliquam feugiat. Donec a leo eget
                      augue porttitor sollicitudin.
                    </p>
                  </div>
                  <div className="box_link_container">
                    <a href="#">
                      <div className="box_link d-flex flex-column align-items-center justify-content-center trans_200">
                        <div>+</div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* Box */}
                <div className="box">
                  <div className="box_icon d-flex flex-column align-items-center justify-content-center">
                    <img src={swimmingPoolIcon} alt="" />
                  </div>
                  <div className="box_title">Swimming Pool</div>
                  <div className="box_text">
                    <p>
                      Donec a leo eget augue porttitor sollicitudin. Morbi sed
                      varius risus, vitae molestie lectus. Donec id hendrerit.
                    </p>
                  </div>
                  <div className="box_link_container">
                    <a href="#">
                      <div className="box_link d-flex flex-column align-items-center justify-content-center trans_200">
                        <div>+</div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* Box */}
                <div className="box">
                  <div className="box_icon d-flex flex-column align-items-center justify-content-center">
                    <img src={healthyDietPlanIcon} alt="" />
                  </div>
                  <div className="box_title">Healthy diet plan</div>
                  <div className="box_text">
                    <p>
                      Morbi sed varius risus, vitae molestie lectus. Donec id
                      hendrerit velit, eu fringilla neque.
                    </p>
                  </div>
                  <div className="box_link_container">
                    <Link to="#">
                      <div className="box_link d-flex flex-column align-items-center justify-content-center trans_200">
                        <div>+</div>
                      </div>
                    </Link>
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
                    hendrerit velit, eu fringilla neque. Etiam id finibus
                    sapien. Donec sollicitudin luctus ex non pharetra. Aenean
                    lobortis ut leo vel porta. Maecenas ac vestibulum lectus.
                    Cras nulla urna, lacinia ut tempor facilisis, congue
                    dignissim tellus. Maecenas ac vestibulum lectus. Cras nulla
                    urna, lacinia ut tempor facilisis, congue dignissim tellus.
                    Phasellus sit amet justo ullamcorper, elementum ipsum nec.
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
      </div>
      {/* Testimonials */}
      <div className="testimonials">
        <div
          className="parallax_background parallax-window"
          data-parallax="scroll"
          data-speed="0.8"
        >
          <img src={backgroundTestimonialsImage} />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section_title_container">
                <div className="section_subtitle">welcome to sportfit</div>
                <div className="section_title">Testimonials</div>
              </div>
              {/* Testimonial */}
              <div className="test test_1 d-flex flex-row align-items-start justify-content-start">
                <div>
                  <div className="test_image">
                    <img src={DianeSmithImage} alt="" />
                  </div>
                </div>
                <div className="test_content">
                  <div className="test_name">
                    <div>Diane Smith</div>
                  </div>
                  <div className="test_title">client</div>
                  <div className="test_text">
                    <p>
                      Etiam nec odio vestibulum est mattis effic iturut magna.
                      Pellentesque sit amet tellus blandit. Etiam nec odio
                      vestibulum est mattis effic iturut magna. Pellentesque sit
                      am et tellus blandit. Etiam nec odio vestibul. Etiam nec
                      odio vestibulum est mat tis effic iturut magna.
                    </p>
                  </div>
                  <div className="rating rating_4 test_rating">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {/* Testimonial */}
              <div className="test d-flex flex-row align-items-start justify-content-start">
                <div>
                  <div className="test_image">
                    <img src={EricRodriguezImage} alt="" />
                  </div>
                </div>
                <div className="test_content">
                  <div className="test_name">
                    <div >Eric Rodriguez</div>
                  </div>
                  <div className="test_title">client</div>
                  <div className="test_text">
                    <p>
                      Etiam nec odio vestibulum est mattis effic iturut magna.
                      Pellentesque sit amet tellus blandit. Etiam nec odio
                      vestibulum est mattis effic iturut magna. Pellentesque sit
                      am et tellus blandit. Etiam nec odio vestibul. Etiam nec
                      odio vestibulum est mat tis effic iturut magna.
                    </p>
                  </div>
                  <div className="rating rating_4 test_rating">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
              {/* Testimonial */}
              <div className="test d-flex flex-row align-items-start justify-content-start">
                <div>
                  <div className="test_image">
                    <img src={HelenWillowImage} alt="" />
                  </div>
                </div>
                <div className="test_content">
                  <div className="test_name">
                    <div>Helen Willow </div>
                  </div>
                  <div className="test_title">client</div>
                  <div className="test_text">
                    <p>
                      Etiam nec odio vestibulum est mattis effic iturut magna.
                      Pellentesque sit amet tellus blandit. Etiam nec odio
                      vestibulum est mattis effic iturut magna. Pellentesque sit
                      am et tellus blandit. Etiam nec odio vestibul. Etiam nec
                      odio vestibulum est mat tis effic iturut magna.
                    </p>
                  </div>
                  <div className="rating rating_4 test_rating">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row test_button_row">
            <div className="col text-center">
              <div className="button test_button">
                <Link to="/testimonials">Read All</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery */}
      <div className="gallery">
        {/* Gallery Slider */}
        <div className="gallery_slider_container">
          <div className="owl-carousel owl-theme gallery_slider">
            {/* Slide */}
            <div className="owl-item">
              <img src={sliderImage1} alt="" />
            </div>
            {/* Slide */}
            <div className="owl-item">
              <img src={sliderImage2} alt="" />
            </div>
            {/* Slide */}
            <div className="owl-item">
              <img src={sliderImage3} alt="" />
            </div>
            {/* Slide */}
            <div className="owl-item">
              <img src={sliderImage4} alt="" />
            </div>
            {/* Slide */}
            <div className="owl-item">
              <img src={sliderImage5} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* Services */}
      <div className="services">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title_container">
                <div className="section_subtitle">welcome to sportfit</div>
                <div className="section_title">Our Courses</div>
              </div>
            </div>
          </div>
          <div className="row services_row">
            {/* Service */}
            <div className="col-xl-4 col-md-6 service_col">
              <div className="service">
                <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
                  <div>
                    <div className="service_icon">
                      <img src={weightLossIcon} alt="" />
                    </div>
                  </div>
                  <div className="service_title">Weight Loss Class</div>
                </div>
                <div className="service_text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec malesuada lorem maximus mauris scelerisque, at rutrum.
                  </p>
                </div>
                <div className="course_link">
                  <Link to="#">Read More</Link>
                </div>
              </div>
            </div>
            {/* Service */}
            <div className="col-xl-4 col-md-6 service_col">
              <div className="service">
                <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
                  <div>
                    <div className="service_icon">
                      <img src={yogaClassesIcon} alt="" />
                    </div>
                  </div>
                  <div className="service_title">Yoga Classes</div>
                </div>
                <div className="service_text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec malesuada lorem maximus mauris scelerisque, at rutrum.
                  </p>
                </div>
                <div className="course_link">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            {/* Service */}
            <div className="col-xl-4 col-md-6 service_col">
              <div className="service">
                <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
                  <div>
                    <div className="service_icon">
                      <img src={spinningClassIcon} alt="" />
                    </div>
                  </div>
                  <div className="service_title">Spinning Class</div>
                </div>
                <div className="service_text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec malesuada lorem maximus mauris scelerisque, at rutrum.
                  </p>
                </div>
                <div className="course_link">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            {/* Service */}
            <div className="col-xl-4 col-md-6 service_col">
              <div className="service">
                <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
                  <div>
                    <div className="service_icon">
                      <img src={privateFitClassIcon} alt="" />
                    </div>
                  </div>
                  <div className="service_title">Private Fit Class</div>
                </div>
                <div className="service_text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec malesuada lorem maximus mauris scelerisque, at rutrum.
                  </p>
                </div>
                <div className="course_link">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            {/* Service */}
            <div className="col-xl-4 col-md-6 service_col">
              <div className="service">
                <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
                  <div>
                    <div className="service_icon">
                      <img src={nutritionClassesIcon} alt="" />
                    </div>
                  </div>
                  <div className="service_title">Nutrition Classes</div>
                </div>
                <div className="service_text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec malesuada lorem maximus mauris scelerisque, at rutrum.
                  </p>
                </div>
                <div className="course_link">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            {/* Service */}
            <div className="col-xl-4 col-md-6 service_col">
              <div className="service">
                <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
                  <div>
                    <div className="service_icon">
                      <img src={pillatesClassesIcon} alt="" />
                    </div>
                  </div>
                  <div className="service_title">Pillates Class</div>
                </div>
                <div className="service_text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec malesuada lorem maximus mauris scelerisque, at rutrum.
                  </p>
                </div>
                <div className="course_link">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog */}
      <div className="blog">
        <div className="blog_overlay" />
        <div
          className="parallax_background parallax-window"
          data-parallax="scroll"
          data-speed="0.8"
        >
          <img src={blogImage} />
        </div>

        <div className="container">
          <div className="row">
            <div className="col">
              <div className=" d-flex flex-row align-items-start justify-content-start">
                <div className="section_title_container">
                  <div className="section_subtitle">welcome to sportfit</div>
                  <div className="section_title">The Blog</div>
                </div>
                <div className="all_posts_link ml-auto">
                  <Link to="/blog/all">View all blog posts</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row blog_row">
            {Object.values(blogs)
              .slice(-3)
              .map((blog) => (
                <BlogPost key={blog._id} {...blog} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
