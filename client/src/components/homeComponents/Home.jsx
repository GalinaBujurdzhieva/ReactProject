import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../contexts/Blogs/BlogContext";
import { CourseContext } from "../../contexts/Courses/CourseContext";

import * as bestProposalsService from "../../services/bestProposalService";

import { HomeMain } from "./HomeMain";
import { HomeBestProposalsDetails } from "./HomeBestProposalsDetails";
import { HomeAbout } from "./HomeAbout";
import { HomeClassesMain } from "./HomeClassesMain";
import { CourseDetails } from "../servicesComponents/coursesComponents/CourseDetails";
import { HomeTestimonialsMainBackground } from "./HomeTestimonialsMainBackground";
import { HomeBlogMainBackground } from "./HomeBlogMainBackground";
import { HomeBlogMain } from "./HomeBlogMain";
import { BlogPost } from "../blogComponents/BlogPost";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/styles/main_styles.css";
import "../../assets/styles/responsive.css";

import DianeSmithImage from "../../assets/images/test_1.jpg";
import EricRodriguezImage from "../../assets/images/test_2.jpg";
import HelenWillowImage from "../../assets/images/test_3.jpg";
import { HomeTestimonialsLinkToAll } from "./HomeTestimonialsLinkToAll";

export const Home = ({handleLinkClick}) => {
  const { blogs } = useContext(BlogContext);
  const { courses } = useContext(CourseContext);

  const [bestProposals, setBestProposals] = useState([]);
  useEffect(() => {
    bestProposalsService
      .getAll()
      .then((bestProposals) => setBestProposals(bestProposals));
  }, []);

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
                {Object.values(bestProposals).map((bestProposal) => (
                  <HomeBestProposalsDetails
                    key={bestProposal._id}
                    {...bestProposal}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About */}
      <HomeAbout />
      {/* Testimonials */}
      <div className="testimonials">
        <HomeTestimonialsMainBackground />
        <div className="container">
          <div className="section_title_container">
            <div className="section_subtitle">
              check what our clients think about us
            </div>
            <div className="section_title">Testimonials</div>
          </div>
          <div className="row">
            {/* Testimonial */}
            <div className="col-lg-4">
              <div className="test d-flex-row align-items-start justify-content-start">
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
            {/* Testimonial */}
            <div className="col-lg-4">
              <div className="test d-flex flex-row align-items-start justify-content-start">
                <div>
                  <div className="test_image">
                    <img src={EricRodriguezImage} alt="" />
                  </div>
                </div>
                <div className="test_content">
                  <div className="test_name">
                    <div>Eric Rodriguez</div>
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
            {/* Testimonial */}
            <div className="col-lg-4">
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
          <HomeTestimonialsLinkToAll />
        </div>
      </div>
      {/* Services */}
      <div className="services">
        <div className="container">
          <HomeClassesMain />
          <div className="row services_row">
            {Object.values(courses).map((course) => (
              <CourseDetails handleLinkClick = {handleLinkClick} key={course._id} {...course} />
            ))}
          </div>
        </div>
      </div>
      {/* Blog */}
      <div className="blog">
        <div className="blog_overlay" />
        <HomeBlogMainBackground />
        <div className="container">
          <HomeBlogMain />
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
