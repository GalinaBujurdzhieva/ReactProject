import {Link} from 'react-router-dom'

import '../../../../assets/styles/services.css'

export const NutritionCourseLink = ({onClick}) =>{
    return(
        <li className="item_filter_btn" data-filter=".nutrition">
        <Link onClick={onClick}>Nutrition</Link>
      </li>
    )
}