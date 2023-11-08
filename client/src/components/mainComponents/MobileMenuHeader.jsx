import { Link } from "react-router-dom";

export const MobileMenuHeader = () => {
    return (
        <div className="menu trans_800">
        <div className="menu_content d-flex flex-column align-items-center justify-content-center text-center">
          <ul>
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
        </div>
      </div>
    );

}