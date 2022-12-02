import useAuth from "../../hooks/useAuth";
import Note from "./Note";
import { useGetNotesQuery } from "./notesApiSlice";
import useTitle from "../../hooks/useTitle";

const NotesList = () => {
  // page title
  useTitle("gtech.COM: Notes");
  const { username, isManager, isAdmin } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    /*These added fields refetch data so 
    the user is always looking at fresh data 
    if any changes are made on another device  
    pollingInterval: 15000 = every 15 seconds
    refetchOnfocus = when focus is on another window and come back to the app,
    refetchOnMountOrArgChange = fetching data on re mount */
    pollingInterval: 15000,
    refetchOnfocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  // Loading state
  if (isLoading) content = <p>Loading...</p>;

  // Error state
  if (isError) {
    content = <p className="errmsg">{error?.data.message}</p>;
  }

  // Success state
  if (isSuccess) {
    // using data:notes that was renamed in useGetNoteQuery
    const { ids, entities } = notes;

    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />);

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Username
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default NotesList;
