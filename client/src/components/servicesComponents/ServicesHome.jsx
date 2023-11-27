import backgroundServicesImage from '../../assets/images/services.jpg'

const backgroundServices = {
    backgroundImage: `url(${backgroundServicesImage})`
}

export const ServicesHome = () => {
    return (
        <div className="home">
    <div
      className="background_image"
      style={backgroundServices}
    />
    <div className="overlay" />
    <div className="home_container">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="home_content">
              <div className="home_title">Services</div>
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