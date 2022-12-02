import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import useTitle from "../../hooks/useTitle";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{6,12}$/;

const NewUserForm = () => {
  // page title
  useTitle("gtech.COM: New User");

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  // validate username
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  // validate password
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    // if successful
    if (isSuccess) {
      // reset form state
      setUsername("");
      setPassword("");
      setRoles([]);
      // redirect to users list
      navigate("/dash/users");
    }
    // dependencies
  }, [isSuccess, navigate]);

  // onChange handlers
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    // making an array of selected options
    // storing the array as values
    // so a user can have more than one role
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  // canSave function that checks all fields are completed
  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  // onSaveUserClicked saves the user when clicked
  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      // calling addNewUser mutation
      await addNewUser({ username, password, roles });
    }
  };

  // select options
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  // Validation css classes
  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <div className="form-wrapper">
        <form action="" className="form" onSubmit={onSaveUserClicked}>
          <div className="form__title-row">
            <h2>New User</h2>
            <div className="form__actions-buttons">
              <button className="icon-button" title="Save" disabled={!canSave}>
                <FontAwesomeIcon icon={faSave} />
              </button>
            </div>
          </div>
          <label htmlFor="username" className="form__label">
            Username: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input ${validUserClass}`}
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />
          <label htmlFor="password" className="form__label">
            Password: <span className="nowrap">[6-12 chars incl. !@#$%]</span>
          </label>
          <input
            className={`form__input ${validPwdClass}`}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onPasswordChanged}
          />
          <label htmlFor="password" className="form__label">
            ASSIGNED ROLES:
          </label>
          <select
            className={`form__input ${validRolesClass}`}
            name="roles"
            id="roles"
            multiple={true}
            size="3"
            value={roles}
            onChange={onRolesChanged}
          >
            {options}
          </select>
        </form>
      </div>
    </>
  );

  return content;
};

export default NewUserForm;
