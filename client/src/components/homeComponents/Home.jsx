import { useContext, useEffect, useRef, useState } from "react";

import { BlogContext } from "../../contexts/Blogs/BlogContext";
import { CourseContext } from "../../contexts/Courses/CourseContext";
import { TestimonialContext } from "../../contexts/Testimonials/TestimonialContext";

import * as bestProposalsService from "../../services/bestProposalService";
import * as testimonialService from '../../services/testimonialService'
import toastrNotificationsService from "../../services/toastrNotificationsService"

import { HomeMain } from "./HomeMain";
import { HomeBestProposalsDetails } from "./HomeBestProposalsDetails";
import { HomeAboutMain } from "./HomeAboutMain";
import { HomeClassesMain } from "./HomeClassesMain";
import { CourseDetails } from "../servicesComponents/coursesComponents/CourseDetails";
import { HomeTestimonialsMainBackground } from "./testimonialComponents/HomeTestimonialsMainBackground";
import { HomeTestimonialsHeading } from "./testimonialComponents/HomeTestimonialsHeading";
import { HomeTestimonialsDetails } from "./testimonialComponents/HomeTestimonialsDetails";
import { HomeTestimonialsLinkToCreateNew } from "./testimonialComponents/HomeTestimonialsLinkToCreateNew";
import { HomeBlogMainBackground } from "./HomeBlogMainBackground";
import { HomeBlogMain } from "./HomeBlogMain";
import { BlogPost } from "../blogComponents/BlogPost";

import "../../assets/styles/bootstrap-4.1.2/bootstrap.min.css";
import "../../assets/styles/main_styles.css";
import "../../assets/styles/responsive.css";

export const Home = ({handleLinkClick}) => {
  const testimonialDivRef = useRef(null);

  useEffect(() => {
    testimonialDivRef.current.focus();
  }, []);
  
  const { blogs } = useContext(BlogContext);
  const { courses } = useContext(CourseContext);
  const {testimonials, reloadTestimonialsAfterCreate, reloadTestimonialsAfterEdit, reloadTestimonialsAfterDelete} = useContext(TestimonialContext);

  const [bestProposals, setBestProposals] = useState([]);
  useEffect(() => {
    bestProposalsService
      .getAll()
      .then((bestProposals) => {
      setBestProposals(bestProposals)})
      .catch((error) =>{
        toastrNotificationsService.showError('Something went wrong. Could not load best proposals')
      });
  }, []);

  const [newTestimonials, setTestimonials] = useState(testimonials);
  useEffect(() => {
    testimonialService.getAll()
    .then((testimonials) => setTestimonials(testimonials))
    .catch((error) =>{
      throw error;
    });
  }, [reloadTestimonialsAfterCreate, reloadTestimonialsAfterEdit, reloadTestimonialsAfterDelete]);

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
      <HomeAboutMain />
      {/* Testimonials */}
      <div className="testimonials text-center" tabIndex={0} ref={testimonialDivRef}>
        <HomeTestimonialsMainBackground />
        <div className="container">
         <HomeTestimonialsHeading />
          <div className="specific_testimonials row">
            {testimonials.map((testimonial) => (
                  <HomeTestimonialsDetails
                    key={testimonial._id}
                    {...testimonial}
                  />
                ))}
          </div>
          <HomeTestimonialsLinkToCreateNew />
        </div>
      </div>
      {/* Services */}
      <div className="services">
        <div className="container">
          <HomeClassesMain />
          <div className="row services_row" >
            { Object.values(courses).map((course) => (
              <CourseDetails handleLinkClick={handleLinkClick} key={course._id} {...course} />
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
            {blogs.slice(-3).map((blog) => (
                <BlogPost key={blog._id} {...blog} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
