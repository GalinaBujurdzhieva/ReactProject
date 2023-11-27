import {Link} from 'react-router-dom'

import '../../../../assets/styles/services.css'

export const YogaCourseLink = ({onClick}) =>{
    return(
      <li className="item_filter_btn" data-filter=".yoga">
    <Link onClick={onClick}>Yoga</Link>
  </li>
    )
}