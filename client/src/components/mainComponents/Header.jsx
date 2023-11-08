import { Link} from 'react-router-dom'

import { NavBarHeader } from './NavBarHeader'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.carousel.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/owl.theme.default.css'
import '../../assets/plugins/OwlCarousel2-2.2.1/animate.css'
import '../../assets/plugins/colorbox/colorbox.css'
import '../../assets/styles/about.css'
import '../../assets/styles/about_responsive.css'

import dotLogo from '../../assets/images/dot.png'
import { HamburgerHeader } from './HamburgerHeader'
import { MobileMenuHeader } from './MobileMenuHeader'


export const Header = () => {
    return(
        <header className="header">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="header_content d-flex flex-row align-items-center justify-content-start trans_400">
                <Link to="/">
                  <div className="logo d-flex flex-row align-items-center justify-content-start">
                    <img src={dotLogo} alt="Spot Fitness Logo" />
                    <div>
                      Sport<span>fit</span>
                    </div>
                  </div>
                </Link>
                <NavBarHeader />
                <HamburgerHeader />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
}