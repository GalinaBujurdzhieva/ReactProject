import {Link} from 'react-router-dom'

import '../../../../assets/styles/services.css'

export const AllCoursesLink = ({onClick}) =>{
    return(
        <li className="item_filter_btn" data-filter="*">
             <Link onClick={onClick}>All Courses</Link>
          </li>
    )
}