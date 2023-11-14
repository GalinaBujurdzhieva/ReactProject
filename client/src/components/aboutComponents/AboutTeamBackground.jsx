import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/about.css'
import '../../assets/styles/about_responsive.css'

import teamBackgroundImage from '../../assets/images/blog.jpg'

export const AboutTeamBackground = () => {
    return(
        <div
        className="parallax_background parallax-window"
        data-parallax="scroll"
        data-speed="0.8">
            <img className="parallax_background" src={teamBackgroundImage}/>
        </div>
    )
}