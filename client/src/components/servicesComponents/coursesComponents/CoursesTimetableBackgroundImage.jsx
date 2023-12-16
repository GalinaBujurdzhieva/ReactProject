import backgroundTimetableImage from '../../../assets/images/timetable.jpg'

import '../../../assets/styles/services.css'

export const CoursesTimetableBackgroundImage = () =>{
    return(
        <div
        className="parallax_background parallax-window"
        data-parallax="scroll"
        data-speed="0.8">
          <img src={backgroundTimetableImage}/>
      </div>
    )
}