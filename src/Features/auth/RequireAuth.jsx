import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  // location for useLocation
  const location = useLocation();

  // destructuring values from useAuth custom hook
  const { roles } = useAuth();

  // content variable that will only be displayed if current user roles array includes allowed roles
  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    // if no allowedRoles redirect the user to login
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
