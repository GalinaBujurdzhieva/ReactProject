import { useState } from "react";

import { CoursesTimetableMain } from "./CoursesTimetableMain";
import { CoursesTimetableStartingHours } from "./CoursesTimetableStartingHours";
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
    setVisibleClass(className);
  };
  console.log(visibleClass);
  return (
    <div className="col">
      <CoursesTimetableMain />
      <div className="timetable_filtering">
        <ul className="d-flex flex-row align-items-start justify-content-start flex-wrap">
          <li className="active item_filter_btn" data-filter="*">
            All Classes
          </li>
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
        {/* Starting hours */}
        <CoursesTimetableStartingHours />
        {/* Monday */}
        <div className="tt_day">
          <div className="tt_title">monday</div>
          <div className="tt_day_content grid">
            {/* Class */}
            <WeightLossCourseDiv
              isVisible={visibleClass === "tt_class grid-item weight_loss"}
            />
            {/* Class */}
            <SwimmingCourseDiv
              isVisible={visibleClass === "tt_class grid-item swimming"}
            />
            {/* Class */}
            <div className="tt_class empty grid-item"></div>
            {/* Class */}
            <SwimmingCourseDiv
              isVisible={visibleClass === "tt_class grid-item swimming"}
            />
          </div>
        </div>
        {/* Tuesday */}
        <div className="tt_day">
          <div className="tt_title">tuesday</div>
          <div className="tt_day_content grid">
            {/* Class */}
            <WeightLossCourseDiv
              isVisible={visibleClass === "tt_class grid-item weight_loss"}
            />
            {/* Class */}
            <div className="tt_class empty grid-item"></div>
            {/* Class */}
            <SwimmingCourseDiv
              isVisible={visibleClass === "tt_class grid-item swimming"}
            />
            {/* Class */}
            <YogaCourseDiv
              isVisible={visibleClass === "tt_class grid-item yoga"}
            />
          </div>
        </div>
        {/* Wednesday */}
        <div className="tt_day">
          <div className="tt_title">wednesday</div>
          <div className="tt_day_content grid">
            {/* Class */}
            <FitnessCourseDiv
              isVisible={visibleClass === "tt_class grid-item fitness"}
            />
            {/* Class */}
            <SwimmingCourseDiv
              isVisible={visibleClass === "tt_class grid-item swimming"}
            />
            {/* Class */}
            <div className="tt_class empty grid-item"></div>
            {/* Class */}
            <FitnessCourseDiv
              isVisible={visibleClass === "tt_class grid-item fitness"}
            />
            {/* Class */}
            <FitnessCourseDiv
              isVisible={visibleClass === "tt_class grid-item fitness"}
            />
          </div>
        </div>
        {/* Thursday */}
        <div className="tt_day">
          <div className="tt_title">thursday</div>
          <div className="tt_day_content grid">
            {/* Class */}
            <FitnessCourseDiv
              isVisible={visibleClass === "tt_class grid-item fitness"}
            />
            {/* Class */}
            <YogaCourseDiv
              isVisible={visibleClass === "tt_class grid-item yoga"}
            />
            {/* Class */}
            <YogaCourseDiv
              isVisible={visibleClass === "tt_class grid-item yoga"}
            />
            {/* Class */}
           <PilatesCourseDiv 
             isVisible={visibleClass === "tt_class grid-item pilates"}
           />
          </div>
        </div>
        {/* Friday */}
        <div className="tt_day">
          <div className="tt_title">friday</div>
          <div className="tt_day_content grid">
            {/* Class */}
            <YogaCourseDiv
              isVisible={visibleClass === "tt_class grid-item yoga"}
            />
            {/* Class */}
            <NutritionCourseDiv 
             isVisible={visibleClass === "tt_class grid-item nutrition"}
           />
            {/* Class */}
            <div className="tt_class empty grid-item"></div>
            {/* Class */}
            <FitnessCourseDiv
              isVisible={visibleClass === "tt_class grid-item fitness"}
            />
          </div>
        </div>
        {/* Saturday */}
        <div className="tt_day">
          <div className="tt_title">Saturday</div>
          <div className="tt_day_content grid">
            {/* Class */}
            <WeightLossCourseDiv
              isVisible={visibleClass === "tt_class grid-item weight_loss"}
            />
            {/* Class */}
            <PilatesCourseDiv 
             isVisible={visibleClass === "tt_class grid-item pilates"}
           />
             {/* Class */}
             <PilatesCourseDiv 
             isVisible={visibleClass === "tt_class grid-item pilates"}
           />
            {/* Class */}
            <NutritionCourseDiv 
             isVisible={visibleClass === "tt_class grid-item nutrition"}
           />
          </div>
        </div>
        {/* Sunday */}
        <div className="tt_day">
          <div className="tt_title">Sunday</div>
          <div className="tt_day_content grid">
            {/* Class */}
           <NutritionCourseDiv 
             isVisible={visibleClass === "tt_class grid-item nutrition"}
           />
            {/* Class */}
            <WeightLossCourseDiv
              isVisible={visibleClass === "tt_class grid-item weight_loss"}
            />
            {/* Class */}
             <PilatesCourseDiv 
             isVisible={visibleClass === "tt_class grid-item pilates"}
           />
            {/* Class */}
            <div className="tt_class empty grid-item"></div>
            {/* Class */}
            <div className="tt_class empty grid-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
