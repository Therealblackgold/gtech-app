import NewNoteForm from "./NewNoteForm";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useTitle from "../../hooks/useTitle";

const NewNote = () => {
  // using useTitle custom hook to set a page title
  useTitle("gtech.COM: New Note");

  // getting users from useGetUsersQuery
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  // loading state
  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  // returning ui
  const content = <NewNoteForm users={users} />;

  return content;
};

export default NewNote;
