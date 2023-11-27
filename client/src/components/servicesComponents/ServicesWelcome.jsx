import '../../assets/styles/services.css'

export const ServicesWelcome = ({myDivRef}) => {
    return(
        <div className="row">
        <div className="col">
          <div className="section_title_container">
            <div className="section_title" ref={myDivRef}>Our Courses</div>
          </div>
        </div>
      </div>
    )
}