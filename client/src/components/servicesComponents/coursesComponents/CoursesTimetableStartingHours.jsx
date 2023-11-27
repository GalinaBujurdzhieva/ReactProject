import '../../../assets/styles/services.css'

export const CoursesTimetableStartingHours = () =>{
    return(
        <div className="tt_day">
        <div className="tt_title">Starts at:</div>
        <div className="tt_day_content grid">
          <div className="tt_class grid-item">
            <div className="tt_class_time">9:00</div>
          </div>
          <div className="tt_class grid-item">
            <div className="tt_class_time">10:00</div>
          </div>
          <div className="tt_class grid-item">
            <div className="tt_class_time">12:00</div>
          </div>
          <div className="tt_class grid-item">
            <div className="tt_class_time">13:00</div>
          </div>
          <div className="tt_class grid-item">
            <div className="tt_class_time">17:00</div>
          </div>
        </div>
      </div>
    )
}