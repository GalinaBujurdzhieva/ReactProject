import {Link} from 'react-router-dom'

import '../../../../assets/styles/services.css'

export const WeightLossCourseLink = ({ onClick }) =>{
    return(
      <li className="item_filter_btn" data-filter=".weight_loss">
      <Link onClick={onClick}>Weight Loss </Link>
      </li>
    )
}