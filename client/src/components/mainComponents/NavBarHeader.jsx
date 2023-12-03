import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/Users/AuthContext";

import "../../assets/styles/about.css";

export const NavBarHeader = () => {
  const { auth } = useContext(AuthContext);
  const isAuthenticated = !!auth.username;

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
          <Link to="/courses">Classes &amp; Services</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {isAuthenticated 
          ? 
          <li>
            <Link to="/logout">Log out</Link>
          </li>
          :
          <>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </>
        }
      </ul>
    </nav>
  );
};
