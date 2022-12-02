import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditNote = () => {
  useTitle("gtech.COM: Edit Note");
  const { id } = useParams();

  // destructuring username and roles from useAuth
  const { username, isManager, isAdmin } = useAuth();

  // getting notes from useGetNotesQuery
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  // getting users from useGetUsersQuery
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  // Loading state
  if (!note || !users?.length) return <PulseLoader color={"#FFF"} />;

  // checking if user has access
  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  // ui content
  const content = <EditNoteForm note={note} users={users} />;

  return content;
};
export default EditNote;
