import '../../assets/styles/contact.css'

export const ContactForm = () =>{
  
    return(
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
    )
}