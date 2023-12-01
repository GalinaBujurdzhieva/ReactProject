import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Users/AuthContext";

export const HomeTestimonialsLinkToCreateNew = () => {
  const { auth } = useContext(AuthContext);
  const isAuthenticated = !!auth.username;

  return (
    <div className="row test_button_row">
      <div className="col text-center">
        <div className="button test_button">
          {isAuthenticated ? (
            <Link to="/testimonials/create">Create New</Link>
          ) : (
            <Link to="/testimonials/all">Read All</Link>
          )}
        </div>
      </div>
    </div>
  );
};
