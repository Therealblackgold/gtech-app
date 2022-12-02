import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import { memo } from "react";

const Note = ({ noteId }) => {
  // Declaring note variable using useGetNotesQuery and selecting from result
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  // navigate to redirect a user
  const navigate = useNavigate();

  // how time should be displayed
  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-ZA", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(note.createdAt).toLocaleString("en-ZA", {
      day: "numeric",
      month: "long",
    });

    // onClick function to redirect to selected note by id
    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>
        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

// using memo on the created Note so the component only rerender if their are changes in the data
const memoizedNote = memo(Note);

export default memoizedNote;
