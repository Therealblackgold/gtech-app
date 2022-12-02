import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

// getting useUpdateUserMutation
const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  // getting useDeleteUserMutation
  const [
    // since useUpdateUserMutation and useDeleteUserMutation reaming delete mutations so both can be used inside this component
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  // navigate to redirect to another page on success
  const navigate = useNavigate();

  // state values
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  // form validations
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    // here we check which mutation is successful
    if (isSuccess || isDelSuccess) {
      // reset state
      setUsername("");
      setPassword("");
      setRoles([]);
      // redirect to users list
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // onChange handlers for the form
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

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    // checking if theres a password since the password won't be changed in most cases
    if (password) {
      // calling update user with a password
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      // calling update user without a password
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  // handleClick for delete that gets the users id and calls deleteUser mutation
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  // roles options
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  // canSave function that checks all fields are completed
  let canSave;

  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  // Validation css classes
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  // error handling
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <div className="form-wrapper">
        {/* form start */}
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__title-row">
            <h2>Edit User</h2>
            <div className="form__action-buttons">
              <button
                className="icon-button"
                title="Save"
                onClick={onSaveUserClicked}
                disabled={!canSave}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteUserClicked}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
          <label className="form__label" htmlFor="username">
            Username: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input ${validUserClass}`}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />

          <label className="form__label" htmlFor="password">
            Password: <span className="nowrap">[empty = no change]</span>{" "}
            <span className="nowrap">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
            className={`form__input ${validPwdClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
          />

          <label
            className="form__label form__checkbox-container"
            htmlFor="user-active"
          >
            ACTIVE:
            <input
              className="form__checkbox"
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
            />
          </label>

          <label className="form__label" htmlFor="roles">
            ASSIGNED ROLES:
          </label>
          <select
            id="roles"
            name="roles"
            className={`form__select ${validRolesClass}`}
            multiple={true}
            size="3"
            value={roles}
            onChange={onRolesChanged}
          >
            {options}
          </select>
        </form>
        {/* form end */}
      </div>
    </>
  );

  return content;
};
export default EditUserForm;
