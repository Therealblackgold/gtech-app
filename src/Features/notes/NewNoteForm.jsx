import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewNoteForm = ({ users }) => {
  // destructuring values from useAddNewNoteMutation
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  // navigate to redirect a user
  const navigate = useNavigate();

  // declaring state for inputs
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      // reset inputs state
      setTitle("");
      setText("");
      setUserId("");
      // redirect to notes
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  // handle change functions for form inputs
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  // making sure all fields have values before allowing user to save button
  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  // save handler
  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    // checking if canSave is true
    if (canSave) {
      await addNewNote({ user: userId, title, text });
    }
  };

  // select options
  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  // dynamic classes
  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  // declaring content variable to hold component jsx
  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <div className="form-wrapper">
        <form className="form" onSubmit={onSaveNoteClicked}>
          <div className="form__title-row">
            <h2>New Note</h2>
            <div className="form__action-buttons">
              <button className="icon-button" title="Save" disabled={!canSave}>
                <FontAwesomeIcon icon={faSave} />
              </button>
            </div>
          </div>
          <label className="form__label" htmlFor="title">
            Title:
          </label>
          <input
            className={`form__input ${validTitleClass}`}
            id="title"
            name="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
          />

          <label className="form__label" htmlFor="text">
            Text:
          </label>
          <textarea
            className={`form__input form__input--text ${validTextClass}`}
            id="text"
            name="text"
            value={text}
            onChange={onTextChanged}
          />

          <label
            className="form__label form__checkbox-container"
            htmlFor="username"
          >
            ASSIGNED TO:
          </label>
          <select
            id="username"
            name="username"
            className="form__select"
            value={userId}
            onChange={onUserIdChanged}
          >
            {options}
          </select>
        </form>
      </div>
    </>
  );

  return content;
};

export default NewNoteForm;
