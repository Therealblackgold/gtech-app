import { Routes, Route } from "react-router-dom";
import DashLayout from "./components/DashLayout";
import Layout from "./components/Layout";
import Login from "./Features/auth/Login";
import Public from "./components/Public";
import Welcome from "./Features/auth/Welcome";
import NotesList from "./Features/notes/NotesList";
import UsersList from "./Features/users/UsersList";
import EditUser from "./Features/users/EditUser";
import NewUserForm from "./Features/users/NewUserForm";
import NewNote from "./Features/notes/NewNote";
import EditNote from "./Features/notes/EditNote";
import Prefetch from "./Features/auth/Prefetch";
import PersistLogin from "./Features/auth/PersistLogin";
import RequireAuth from "./Features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("gtech.COM");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* dash start */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/* dash end  */}
      </Route>
    </Routes>
  );
}

export default App;
