import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/Users/AuthContext";

import "../../../assets/styles/main_styles.css";

export const HomeTestimonialsLinkToCreateNew = () => {
  const { auth } = useContext(AuthContext);
  const isAuthenticated = !!auth.username;

  return (
    <div className="row test_button_row">
      <div className="col text-center">
        <div className="button test_button">
          {isAuthenticated ? (
            <Link to="/testimonial/create">Create New</Link>
          ) : (
            <Link to="/testimonial/all">Read All</Link>
          )}
        </div>
      </div>
    </div>
  );
};
