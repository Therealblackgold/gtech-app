import { useSelector } from "react-redux";
import { selectCurrentToken } from "../Features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  // getting token from electCurrentToken
  const token = useSelector(selectCurrentToken);
  // state values
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  // if user has a token
  if (token) {
    // decode the token
    const decoded = jwtDecode(token);

    // destructure username and roles stored inside the access token stored as UserInfo in the backend
    const { username, roles } = decoded.UserInfo;

    // set values that can be used to confirm user roles
    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    // using values above to verify user roles
    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    // then returning values so they can be used inside components
    return { username, roles, status, isManager, isAdmin };
  }

  // return if theres no token
  return { username: "", roles: [], isManager, isAdmin, status };
};
export default useAuth;
