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
      {isAuthenticated &&
        <div className="button test_button">
            <Link to="/testimonial/create">Create New</Link>
        </div>
        }
      </div>
    </div>
  );
};
