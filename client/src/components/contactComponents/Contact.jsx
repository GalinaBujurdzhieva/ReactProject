
import { ContactMain } from './ContactMain'
import { ContactAddressInfo } from './ContactAddressInfo'
import { ContactForm } from './ContactForm'
import MapContainer from './GoogleMap'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/contact.css'
import '../../assets/styles/contact_responsive.css'

export const Contact = () => {
    return (
        <div className="super_container">
  {/* Home */}
  <ContactMain />
  {/* Contact */}
  <div className="contact">
    <div className="container">
      <div className="row">
        {/* Contact Content */}
        <ContactAddressInfo />
        {/* Contact Form */}
       <ContactForm />
      </div>
      <div className="row google_map_row">
        <div className="col">
          {/* Contact Map */}
          <div className="contact_map">
            {/* Google Map */}
            <MapContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}