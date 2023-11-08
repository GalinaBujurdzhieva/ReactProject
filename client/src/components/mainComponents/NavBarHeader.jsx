import { Link} from 'react-router-dom'

export const NavBarHeader = () => {
    return (
        <nav className="main_nav">
                  <ul className="d-flex flex-row align-items-center justify-content-start">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About us</Link>
                    </li>
                    <li>
                      <Link to="/services">Classes &amp; Services</Link>
                    </li>
                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                    <li>
                      <Link to="/login">Log in</Link>
                    </li>
                  </ul>
                </nav>
    );
}