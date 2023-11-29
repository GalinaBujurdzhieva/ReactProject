import '../../../assets/styles/services.css'
import backgroundTimetableImage from '../../../assets/images/timetable.jpg'

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