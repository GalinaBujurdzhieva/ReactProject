import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/Users/AuthContext";
import Paths from "../../utils/Paths";

import "../../assets/styles/about.css";

export const NavBarHeader = () => {
  const { auth } = useContext(AuthContext);
  const isAuthenticated = !!auth?.username;

  return (
    <nav className="main_nav">
      <ul className="d-flex flex-row align-items-center justify-content-start">
        <li>
          <Link to={Paths.Home}>Home</Link>
        </li>
        <li>
          <Link to={Paths.About}>About us</Link>
        </li>
        <li>
          <Link to={Paths.Courses}>Classes &amp; Services</Link>
        </li>
        <li>
          <Link to={Paths.Blog}>Blog</Link>
        </li>
        <li>
          <Link to={Paths.Contact}>Contact</Link>
        </li>
        {isAuthenticated 
          ? 
          <li>
            <Link to={Paths.Logout}>Log out</Link>
          </li>
          :
          <>
          <li>
            <Link to={Paths.Register}>Register</Link>
          </li>
          <li>
            <Link to={Paths.Login}>Log in</Link>
          </li>
        </>
        }
      </ul>
    </nav>
  );
};
