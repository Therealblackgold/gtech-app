import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const PublicFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/");
  const onGoLoginClicked = () => navigate("/login");

  let goHomeButton = null;
  if (pathname !== "/") {
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
  if (pathname === "/") {
    goHomeButton = (
      <button
        className="dash-footer__button icon button"
        title="Home"
        onClick={onGoLoginClicked}
      >
        login
      </button>
    );
  }
  const content = <footer className="dash-footer">{goHomeButton}</footer>;
  return content;
};

export default PublicFooter;
