import { useNavigate, useLocation, Link } from "react-router-dom";

const PublicHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoLoginClicked = () => navigate("/login");

  let goLoginButton = null;
  if (pathname !== "/login") {
    goLoginButton = (
      <button
        className="dash-footer__button icon button"
        title="Home"
        onClick={onGoLoginClicked}
      >
        login
      </button>
    );
  }

  const content = (
    <header className="dash-header p2">
      <Link to="/">
        <h1 className="dash-header__title">
          Welcome to gtech<span className="nowrap">.COM</span>
        </h1>
      </Link>
      {goLoginButton}
    </header>
  );
  return content;
};

export default PublicHeader;
