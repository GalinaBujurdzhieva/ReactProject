import {Link} from 'react-router-dom'

import '../../../../assets/styles/services.css'

export const SwimmingCourseLink = ({onClick}) =>{
    return(
        <li className="item_filter_btn" data-filter=".swimming">
        <Link onClick={onClick}>Swimming</Link>
      </li>
    )
}