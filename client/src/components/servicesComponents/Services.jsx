import {Link} from 'react-router-dom'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/animate.css'
import '../../assets/plugins/colorbox/colorbox.css'
import '../../assets/styles/services.css'
import '../../assets/styles/services_responsive.css'

import backgroundServicesImage from '../../assets/images/services.jpg'
import weightLossIcon from '../../assets/images/icon_4.png'
import yogaClassesIcon from '../../assets/images/icon_5.png'
import spinningClassIcon from '../../assets/images/icon_6.png'
import privateClassIcon from '../../assets/images/icon_7.png'
import nutritionClassesIcon from '../../assets/images/icon_8.png'
import pillatesClassIcon from '../../assets/images/icon_9.png'
import backgroundTimetableImage from '../../assets/images/timetable.jpg'
import backgroundDiscountImage from '../../assets/images/extra_wide.jpg'

const backgroundServices = {
    backgroundImage: `url(${backgroundServicesImage})`
}

const backgroundDiscount = {
    backgroundImage: `url(${backgroundDiscountImage})`
}

export const Services = () => {
    return (
        <div className="super_container">

  {/* Home */}
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
                Pilates, Yoga, Fitness, Spinning &amp; many more
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Services */}
  <div className="services">
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="section_title_container">
            <div className="section_subtitle">welcome to sportfit</div>
            <div className="section_title">Our Courses</div>
          </div>
        </div>
      </div>
      <div className="row services_row">
        {/* Service */}
        <div className="col-xl-4 col-md-6 service_col">
          <div className="service">
            <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
              <div>
                <div className="service_icon">
                  <img src={weightLossIcon} alt="" />
                </div>
              </div>
              <div className="service_title">Weight Loss Class</div>
            </div>
            <div className="service_text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                malesuada lorem maximus mauris scelerisque, at rutrum.
              </p>
            </div>
          </div>
        </div>
        {/* Service */}
        <div className="col-xl-4 col-md-6 service_col">
          <div className="service">
            <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
              <div>
                <div className="service_icon">
                  <img src={yogaClassesIcon} alt="" />
                </div>
              </div>
              <div className="service_title">Yoga Classes</div>
            </div>
            <div className="service_text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                malesuada lorem maximus mauris scelerisque, at rutrum.
              </p>
            </div>
          </div>
        </div>
        {/* Service */}
        <div className="col-xl-4 col-md-6 service_col">
          <div className="service">
            <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
              <div>
                <div className="service_icon">
                  <img src={spinningClassIcon} alt="" />
                </div>
              </div>
              <div className="service_title">Spinning Class</div>
            </div>
            <div className="service_text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                malesuada lorem maximus mauris scelerisque, at rutrum.
              </p>
            </div>
          </div>
        </div>
        {/* Service */}
        <div className="col-xl-4 col-md-6 service_col">
          <div className="service">
            <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
              <div>
                <div className="service_icon">
                  <img src={privateClassIcon} alt="" />
                </div>
              </div>
              <div className="service_title">Private Fit Class</div>
            </div>
            <div className="service_text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                malesuada lorem maximus mauris scelerisque, at rutrum.
              </p>
            </div>
          </div>
        </div>
        {/* Service */}
        <div className="col-xl-4 col-md-6 service_col">
          <div className="service">
            <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
              <div>
                <div className="service_icon">
                  <img src={nutritionClassesIcon} alt="" />
                </div>
              </div>
              <div className="service_title">Nutrition Classes</div>
            </div>
            <div className="service_text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                malesuada lorem maximus mauris scelerisque, at rutrum.
              </p>
            </div>
          </div>
        </div>
        {/* Service */}
        <div className="col-xl-4 col-md-6 service_col">
          <div className="service">
            <div className="service_title_container d-flex flex-row align-items-center justify-content-start">
              <div>
                <div className="service_icon">
                  <img src={pillatesClassIcon} alt="" />
                </div>
              </div>
              <div className="service_title">Pillates Class</div>
            </div>
            <div className="service_text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                malesuada lorem maximus mauris scelerisque, at rutrum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Timetable */}
  <div className="timetable">
    <div
      className="parallax_background parallax-window"
      data-parallax="scroll"
      data-speed="0.8">
        <img src={backgroundTimetableImage}/>
      </div>
    
    <div className="tt_overlay" />
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="section_title_container">
            <div className="section_subtitle">welcome to sportfit</div>
            <div className="section_title">Classes Timetable</div>
          </div>
          <div className="timetable_filtering">
            <ul className="d-flex flex-row align-items-start justify-content-start flex-wrap">
              <li className="active item_filter_btn" data-filter="*">
                All Classes
              </li>
              <li className="item_filter_btn" data-filter=".weight_loss">
                Weight Loss
              </li>
              <li className="item_filter_btn" data-filter=".aerobics">
                Aerobics
              </li>
              <li className="item_filter_btn" data-filter=".crossfit">
                Crossfit
              </li>
              <li className="item_filter_btn" data-filter=".fitness">
                Fitness
              </li>
              <li className="item_filter_btn" data-filter=".yoga">
                Yoga
              </li>
              <li className="item_filter_btn" data-filter=".pilates">
                Pilates
              </li>
              <li className="item_filter_btn" data-filter=".stretching">
                Stretching
              </li>
            </ul>
          </div>
          <div className="timetable_container d-flex flex-sm-row flex-column align-items-start justify-content-sm-between justify-content-start">
            {/* Monday */}
            <div className="tt_day">
              <div className="tt_title">monday</div>
              <div className="tt_day_content grid">
                {/* Class */}
                <div className="tt_class grid-item weight_loss">
                  <div className="tt_class_title">Weight Loss</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">9:00</div>
                </div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">10:00</div>
                </div>
                {/* Class */}
                <div className="tt_class empty grid-item"></div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">13:00</div>
                </div>
              </div>
            </div>
            {/* Tuesday */}
            <div className="tt_day">
              <div className="tt_title">tuesday</div>
              <div className="tt_day_content grid">
                {/* Class */}
                <div className="tt_class grid-item weight_loss">
                  <div className="tt_class_title">Weight Loss</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">8:00</div>
                </div>
                {/* Class */}
                <div className="tt_class empty grid-item"></div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">12:00</div>
                </div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">13:00</div>
                </div>
              </div>
            </div>
            {/* Wednesday */}
            <div className="tt_day">
              <div className="tt_title">wednesday</div>
              <div className="tt_day_content grid">
                {/* Class */}
                <div className="tt_class grid-item crossfit">
                  <div className="tt_class_title">Crossfit</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">9:00</div>
                </div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">10:00</div>
                </div>
                {/* Class */}
                <div className="tt_class empty grid-item"></div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">13:00</div>
                </div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">17:00</div>
                </div>
              </div>
            </div>
            {/* Thursday */}
            <div className="tt_day">
              <div className="tt_title">thursday</div>
              <div className="tt_day_content grid">
                {/* Class */}
                <div className="tt_class grid-item fitness">
                  <div className="tt_class_title">Fitness</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">9:00</div>
                </div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">10:00</div>
                </div>
                {/* Class */}
                <div className="tt_class grid-item yoga">
                  <div className="tt_class_title">Yoga</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">12:00</div>
                </div>
                {/* Class */}
                <div className="tt_class grid-item pilates">
                  <div className="tt_class_title">Pilates</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">13:00</div>
                </div>
              </div>
            </div>
            {/* Friday */}
            <div className="tt_day">
              <div className="tt_title">friday</div>
              <div className="tt_day_content grid">
                {/* Class */}
                <div className="tt_class grid-item yoga">
                  <div className="tt_class_title">Yoga</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">9:00</div>
                </div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">10:00</div>
                </div>
                {/* Class */}
                <div className="tt_class empty grid-item"></div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">13:00</div>
                </div>
              </div>
            </div>
            {/* Saturday */}
            <div className="tt_day">
              <div className="tt_title">Saturday</div>
              <div className="tt_day_content grid">
                {/* Class */}
                <div className="tt_class grid-item weight_loss">
                  <div className="tt_class_title">Weight Loss</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">9:00</div>
                </div>
                {/* Class */}
                <div className="tt_class grid-item pilates">
                  <div className="tt_class_title">Pilates</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">10:00</div>
                </div>
                {/* Class */}
                <div className="tt_class empty grid-item"></div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">13:00</div>
                </div>
              </div>
            </div>
            {/* Sunday */}
            <div className="tt_day">
              <div className="tt_title">Sunday</div>
              <div className="tt_day_content grid">
                {/* Class */}
                <div className="tt_class grid-item stretching">
                  <div className="tt_class_title">Stretching</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">9:00</div>
                </div>
                {/* Class */}
                <div className="tt_class grid-item aerobics">
                  <div className="tt_class_title">Aerobics</div>
                  <div className="tt_class_instructor">Jessica Smith</div>
                  <div className="tt_class_time">10:00</div>
                </div>
                {/* Class */}
                <div className="tt_class empty grid-item"></div>
                {/* Class */}
                <div className="tt_class empty grid-item"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Extra */}
  <div className="extra d-flex flex-column align-items-center justify-content-center text-center">
    <div
      className="background_image"
      style={backgroundDiscount}
    />
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="extra_content d-flex flex-column align-items-center justify-content-center text-center">
            <div className="extra_title">15% Discount</div>
            <div className="extra_text">
              <p>
                Morbi sed varius risus, vitae molestie lectus. Donec id
                hendrerit velit, eu fringilla neque. Etiam id finibus sapien.
                Donec sollicitudin luctus ex non pharetra.llus.
              </p>
            </div>
            <div className="button extra_button">
              <Link to="/register">Join Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}