import {Link} from 'react-router-dom'

import '../../../../assets/styles/services.css'

export const FitnessCourseLink = ({onClick}) => {
    return(
        <li className="item_filter_btn" data-filter=".fitness">
            <Link onClick={onClick}>Fitness</Link>
          </li>
    )
}