import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {BlogContext} from "../../contexts/Blogs/BlogContext";
import * as bestProposalsService from '../../services/bestProposalService'

import { HomeAbout } from "./HomeAbout";
import { HomeMain } from "./HomeMain";
import { HomeClassesMain } from "./HomeClassesMain";
import { BlogPost } from "../blogComponents/BlogPost";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
// import "../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css";
// import "../../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css";
// import "../../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css";
// import "../../assets/plugins/OwlCarousel2-2.2.1/animate.css";
// import "../../assets/plugins/colorbox/colorbox.css";
import "../../assets/styles/main_styles.css";
import "../../assets/styles/responsive.css";

import blogImage from "../../assets/images/blog.jpg";

import backgroundTestimonialsImage from "../../assets/images/testimonials.jpg";
import DianeSmithImage from "../../assets/images/test_1.jpg";
import EricRodriguezImage from "../../assets/images/test_2.jpg";
import HelenWillowImage from "../../assets/images/test_3.jpg";
import { CourseContext } from "../../contexts/Courses/CourseContext";
import { CourseDetails } from "../servicesComponents/coursesComponents/CourseDetails";
import { HomeBestProposalsDetails } from "./HomeBestProposalsDetails";

export const Home = () => {
  const {blogs} = useContext(BlogContext);
  const {courses} = useContext(CourseContext);

  const [bestProposals, setBestProposals] = useState([]);
  useEffect(()=>{
    bestProposalsService.getAll().then(bestProposals =>
      setBestProposals(bestProposals));
  },[])

  const navigate = useNavigate();

  return (
    <div className="super_container">
      {/* Home */}
      <HomeMain />
      {/* Boxes */}
      <div className="boxes">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="boxes_container d-flex flex-lg-row flex-column align-items-start justify-content-start">
                {/* Box */}
               {Object.values(bestProposals).map((bestProposal) => <HomeBestProposalsDetails 
               key={bestProposal._id}
               {...bestProposal}
               />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About */}
      <HomeAbout />
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
      {/* Services */}
      <div className="services">
        <div className="container">
          <HomeClassesMain />
          <div className="row services_row">
          {Object.values(courses)
              .map((course) => (
                <CourseDetails key={course._id} {...course} />
              ))}
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
