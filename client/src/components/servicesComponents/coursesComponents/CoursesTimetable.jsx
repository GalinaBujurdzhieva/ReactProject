import { useState } from "react";

import { CoursesTimetableMain } from "./CoursesTimetableMain";
import { CoursesTimetableStartingHours } from "./CoursesTimetableStartingHours";

import { AllCoursesLink } from "./CoursesLinks/AllCoursesLink";
import { WeightLossCourseLink } from "./CoursesLinks/WeightLossCourseLink";
import { SwimmingCourseLink } from "./CoursesLinks/SwimmingCourseLink";
import { FitnessCourseLink } from "./CoursesLinks/FitnessCourseLink";
import { YogaCourseLink } from "./CoursesLinks/YogaCourseLink";
import { PilatesCourseLink } from "./CoursesLinks/PilatesCourseLink";
import { NutritionCourseLink } from "./CoursesLinks/NutritionCourseLink";

import { WeightLossCourseDiv } from "./CoursesDivs/WeightLossCourseDiv";
import { SwimmingCourseDiv } from "./CoursesDivs/SwimmingCourseDiv";
import { FitnessCourseDiv } from "./CoursesDivs/FitnessCourseDiv";
import { YogaCourseDiv } from "./CoursesDivs/YogaCourseDiv";
import { PilatesCourseDiv } from "./CoursesDivs/PilatesCourseDiv";
import { NutritionCourseDiv } from "./CoursesDivs/NutritionCourseDiv";

import "../../../assets/styles/services.css";

export const CoursesTimetable = () => {
  const [visibleClass, setVisibleClass] = useState(null);
  const visibleDivsHandler = (className) => {
    setVisibleClass((prevVisibleClass) => (prevVisibleClass === className ? null : className));
  };
  return (
    <div className="col">
      <CoursesTimetableMain />
      <div className="timetable_filtering">
        <ul className="d-flex flex-row align-items-start justify-content-start flex-wrap">
          <AllCoursesLink 
          onClick={() => visibleDivsHandler(null)}
          />
          <WeightLossCourseLink
            onClick={() => visibleDivsHandler("tt_class grid-item weight_loss")}
          />
          <SwimmingCourseLink
            onClick={() => visibleDivsHandler("tt_class grid-item swimming")}
          />
          <FitnessCourseLink
            onClick={() => visibleDivsHandler("tt_class grid-item fitness")}
          />
          <YogaCourseLink
            onClick={() => visibleDivsHandler("tt_class grid-item yoga")}
          />
          <PilatesCourseLink
            onClick={() => visibleDivsHandler("tt_class grid-item pilates")}
          />
          <NutritionCourseLink
            onClick={() => visibleDivsHandler("tt_class grid-item nutrition")}
          />
        </ul>
      </div>
      <div className="timetable_container d-flex flex-sm-row flex-column align-items-start justify-content-sm-between justify-content-start">
        <CoursesTimetableStartingHours />
        {/* Monday */}
        <div className="tt_day">
          <div className="tt_title">monday</div>
          <div className="tt_day_content grid">
            <WeightLossCourseDiv
              isVisible={visibleClass === "tt_class grid-item weight_loss" || visibleClass === null}
            />
            <SwimmingCourseDiv
              isVisible={visibleClass === "tt_class grid-item swimming" || visibleClass === null}
            />
            <div className="tt_class empty grid-item"></div>
            <SwimmingCourseDiv
              isVisible={visibleClass === "tt_class grid-item swimming" || visibleClass === null}
            />
            <SwimmingCourseDiv
              isVisible={visibleClass === "tt_class grid-item swimming" || visibleClass === null}
            />
          </div>
          
        </div>
        {/* Tuesday */}
        <div className="tt_day">
          <div className="tt_title">tuesday</div>
          <div className="tt_day_content grid">
            <WeightLossCourseDiv
              isVisible={visibleClass === "tt_class grid-item weight_loss" || visibleClass === null}
            />
            <div className="tt_class empty grid-item"></div>
            <SwimmingCourseDiv
              isVisible={visibleClass === "tt_class grid-item swimming" || visibleClass === null}
            />
            <YogaCourseDiv
              isVisible={visibleClass === "tt_class grid-item yoga" || visibleClass === null}
            />
            <div className="tt_class empty grid-item"></div>
          </div>
        </div>
        {/* Wednesday */}
        <div className="tt_day">
          <div className="tt_title">wednesday</div>
          <div className="tt_day_content grid">
            <FitnessCourseDiv
              isVisible={visibleClass === "tt_class grid-item fitness" || visibleClass === null}
            />
            <SwimmingCourseDiv
              isVisible={visibleClass === "tt_class grid-item swimming" || visibleClass === null}
            />
            <div className="tt_class empty grid-item"></div>
            <FitnessCourseDiv
              isVisible={visibleClass === "tt_class grid-item fitness" || visibleClass === null}
            />
            <FitnessCourseDiv
              isVisible={visibleClass === "tt_class grid-item fitness" || visibleClass === null}
            />
          </div>
        </div>
        {/* Thursday */}
        <div className="tt_day">
          <div className="tt_title">thursday</div>
          <div className="tt_day_content grid">
            <FitnessCourseDiv
              isVisible={visibleClass === "tt_class grid-item fitness" || visibleClass === null}
            />
            <YogaCourseDiv
              isVisible={visibleClass === "tt_class grid-item yoga" || visibleClass === null}
            />
            <YogaCourseDiv
              isVisible={visibleClass === "tt_class grid-item yoga" || visibleClass === null}
            />
           <PilatesCourseDiv 
             isVisible={visibleClass === "tt_class grid-item pilates" || visibleClass === null}
           />
           <div className="tt_class empty grid-item"></div>
          </div>
        </div>
        {/* Friday */}
        <div className="tt_day">
          <div className="tt_title">friday</div>
          <div className="tt_day_content grid">
            <YogaCourseDiv
              isVisible={visibleClass === "tt_class grid-item yoga" || visibleClass === null}
            />
            <NutritionCourseDiv 
             isVisible={visibleClass === "tt_class grid-item nutrition" || visibleClass === null}
           />
            <div className="tt_class empty grid-item"></div>
            <FitnessCourseDiv
              isVisible={visibleClass === "tt_class grid-item fitness" || visibleClass === null}
            />
            <PilatesCourseDiv 
             isVisible={visibleClass === "tt_class grid-item pilates" || visibleClass === null}
           />
          </div>
        </div>
        {/* Saturday */}
        <div className="tt_day">
          <div className="tt_title">Saturday</div>
          <div className="tt_day_content grid">
            <WeightLossCourseDiv
              isVisible={visibleClass === "tt_class grid-item weight_loss" || visibleClass === null}
            />
            <PilatesCourseDiv 
             isVisible={visibleClass === "tt_class grid-item pilates" || visibleClass === null}
           />
             <PilatesCourseDiv 
             isVisible={visibleClass === "tt_class grid-item pilates" || visibleClass === null}
           />
            <NutritionCourseDiv 
             isVisible={visibleClass === "tt_class grid-item nutrition" || visibleClass === null}
           />
           <YogaCourseDiv
              isVisible={visibleClass === "tt_class grid-item yoga" || visibleClass === null}
            />
          </div>
        </div>
        {/* Sunday */}
        <div className="tt_day">
          <div className="tt_title">Sunday</div>
          <div className="tt_day_content grid">
           <NutritionCourseDiv 
             isVisible={visibleClass === "tt_class grid-item nutrition" || visibleClass === null}
           />
            <WeightLossCourseDiv
              isVisible={visibleClass === "tt_class grid-item weight_loss" || visibleClass === null}
            />
             <PilatesCourseDiv 
             isVisible={visibleClass === "tt_class grid-item pilates" || visibleClass === null}
           />
            <div className="tt_class empty grid-item"></div>
            <div className="tt_class empty grid-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
