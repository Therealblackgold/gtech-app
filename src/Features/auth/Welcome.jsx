import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
// icons
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Welcome() {
  // destructuring values from useAuth custom hook
  const { username, isManager, isAdmin } = useAuth();

  // creating values to define date format
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  // creating a variable to hold content that will be displayed on the ui
  const content = (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome {username}</h1>
      <div className="welcome-links">
        <div className="welcome-links-link">
          <FontAwesomeIcon icon={faFilePen} />
          <p>
            <Link to="/dash/notes">View Notes</Link>
          </p>
        </div>
        <div className="welcome-links-link">
          <FontAwesomeIcon icon={faFileCirclePlus} />
          <p>
            <Link to="/dash/notes/new">Add New Note</Link>
          </p>
        </div>
        {/* rendering users info and add new user for isManger || isAdmin only */}
        {(isManager || isAdmin) && (
          <div className="welcome-links-link">
            <FontAwesomeIcon icon={faUserGear} />
            <p>
              <Link to="/dash/users">View User Settings</Link>
            </p>
          </div>
        )}
        {(isManager || isAdmin) && (
          <div className="welcome-links-link">
            <FontAwesomeIcon icon={faUserPlus} />
            <p>
              <Link to="/dash/users/new">Add New User</Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
  return content;
}

export default Welcome;
