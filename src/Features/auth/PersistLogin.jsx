import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  // state values
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);

  // effectRan will be used to bypass strict mode default mounting and unmount behavior
  const effectRan = useRef(false);

  // trueSuccess will be set once credentials are set so data can be displayed in components
  const [trueSuccess, setTrueSuccess] = useState(false);

  // getting useRefreshMutation() state values
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode only runs in development

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      // if there is no token when page is refreshed and persist is true run  verifyRefreshToken() to get access to the state with a new access token
      if (!token && persist) verifyRefreshToken();
    }
    // only setting true when effectRan runs the first time
    // so effectRan stores value when component mounts and remounts
    return () => (effectRan.current = true);

    // below here we disable dependencies to avoid warnings since this function should only run once and takes not dependencies.

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <p>Loading...</p>;
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
