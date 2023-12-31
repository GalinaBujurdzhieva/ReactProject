import {Link} from 'react-router-dom'

import Paths from '../../utils/Paths'

import '../../assets/styles/error.css'

export const ErrorPage = () =>{
    return(
        <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>Oops!</h1>
				<h2>Our server is on a break between sets</h2>
			</div>
			<Link to={Paths.Home}>Go TO Homepage</Link>
		</div>
	</div>
    )
}