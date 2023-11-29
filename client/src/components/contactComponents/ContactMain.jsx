import '../../assets/styles/contact.css'
import backgroundContactImage from '../../assets/images/contact.jpg'

const backgroundContact = {
    backgroundImage: `url(${backgroundContactImage})`
}

export const ContactMain = () =>{
    return(
        <div className="home">
    <div
      className="background_image"
      style={backgroundContact}
    />
    <div className="overlay" />
    <div className="home_container">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="home_content">
              <div className="home_title">Contact</div>
              <div className="home_subtitle">
                Pilates, Yoga, Fitness, Swimming &amp; more
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}