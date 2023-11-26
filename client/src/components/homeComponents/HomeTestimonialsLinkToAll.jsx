import {Link} from 'react-router-dom'

export const HomeTestimonialsLinkToAll = () =>{
    return(
        <div className="row test_button_row">
            <div className="col text-center">
              <div className="button test_button">
                <Link to="/testimonials">Read All</Link>
              </div>
            </div>
          </div>
    )
}