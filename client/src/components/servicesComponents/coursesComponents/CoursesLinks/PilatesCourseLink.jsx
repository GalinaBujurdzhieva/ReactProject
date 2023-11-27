import {Link} from 'react-router-dom'

import '../../../../assets/styles/services.css'

export const PilatesCourseLink = ({onClick}) =>{
    return(
        <li className="item_filter_btn" data-filter=".pilates">
            <Link onClick={onClick}>Pilates</Link>
          </li>
    )
}