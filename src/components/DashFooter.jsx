import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  // destructuring values from useAuth custom hook
  const { username, status } = useAuth();

  // navigate for useNavigation
  const navigate = useNavigate();

  // destructuring pathname from useLocation
  const { pathname } = useLocation();

  // onClick handler to redirect to dash
  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;

  // here we dynamically display the home button based on pathname
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  return (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User: {username}</p>
      <p>Status: {status}</p>
    </footer>
  );
};

export default DashFooter;
