import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/contact.css'
import '../../assets/styles/contact_responsive.css'

import dotLogo from '../../assets/images/dot.png'
import backgroundContactImage from '../../assets/images/contact.jpg'

const backgroundContact = {
    backgroundImage: `url(${backgroundContactImage})`
}

export const Contact = () => {
    return (
        <div className="super_container">
  {/* Home */}
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
                Pilates, Yoga, Fitness, Spinning &amp; many more
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Contact */}
  <div className="contact">
    <div className="container">
      <div className="row">
        {/* Contact Content */}
        <div className="col-lg-4">
          <div className="contact_content">
            <div className="contact_logo">
              <div className="logo d-flex flex-row align-items-center justify-content-start">
                <img src={dotLogo} alt="" />
                <div>
                  Sport<span>fit</span>
                </div>
              </div>
            </div>
            <div className="contact_text">
              <p>
                Etiam nec odio vestibulum est mattis effic iturut magna.
                Pellentesque sit amet tellus blandit. Odio vestibulum est mattis
                effic iturut.
              </p>
            </div>
            <div className="contact_list">
              <ul>
                <li className="d-flex flex-row align-items-start justify-content-start">
                  <div>
                    <div>A:</div>
                  </div>
                  <div>1481 Creekside Lane Avila Beach, CA 931</div>
                </li>
                <li className="d-flex flex-row align-items-start justify-content-start">
                  <div>
                    <div>P:</div>
                  </div>
                  <div>+53 345 7953 32453</div>
                </li>
                <li className="d-flex flex-row align-items-start justify-content-start">
                  <div>
                    <div>M:</div>
                  </div>
                  <div>yourmail@gmail.com</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div className="col-lg-8 contact_col">
          <div className="contact_title">Get in touch</div>
          <div className="contact_form_container">
            <form action="#" id="contact_form" className="contact_form">
              <div className="row">
                <div className="col-lg-6">
                  <div className="input_item">
                    <input
                      type="text"
                      className="contact_input trans_200"
                      placeholder="Name"
                      required="required"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input_item">
                    <input
                      type="email"
                      className="contact_input trans_200"
                      placeholder="E-mail"
                      required="required"
                    />
                  </div>
                </div>
              </div>
              <div className="input_item">
                <textarea
                  className="contact_input contact_textarea trans_200"
                  placeholder="Message"
                  required="required"
                  defaultValue={""}
                />
              </div>
              <button className="contact_button button">
                Send
                <span />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="row google_map_row">
        <div className="col">
          {/* Contact Map */}
          <div className="contact_map">
            {/* Google Map */}
            {/*<div className="map">
              <div id="google_map" className="google_map">
                <div className="map_container">
                  <div id="map" />
                </div>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}