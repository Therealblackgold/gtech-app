import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    // creating a manual subscription to control how long to keep unused data.
    //  which also helps keeping data when page is refreshed before saving.
    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", "noteList", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "userList", { force: true })
    );

    // takes no dependencies so it only runs on mount
  }, []);

  return <Outlet />;
};

export default Prefetch;
