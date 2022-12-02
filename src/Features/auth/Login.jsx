import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";
import PublicHeader from "../../components/PublicHeader";
import PublicFooter from "../../components/PublicFooter";
import PulseLoader from "react-spinners/PulseLoader";

const Login = () => {
  // page title
  useTitle("gtech.COM: Login");

  // useeRef to set focus on user input
  const userRef = useRef();

  // errRef to set focus on any errors
  const errRef = useRef();

  // state for username,password, error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // persist custom hook to keep user logged in if page reloads
  const [persist, setPersist] = usePersist();

  // navigate to useNavigate()
  const navigate = useNavigate();

  // dispatch to useDispatch()
  const dispatch = useDispatch();

  // getting login mutation with loading state
  const [login, { isLoading }] = useLoginMutation();

  //
  useEffect(() => {
    // setting focus on username field
    userRef.current.focus();
  }, []);

  useEffect(() => {
    // clearing error message state when username and password state changes
    setErrMsg("");
  }, [username, password]);

  // error css class
  const errClass = errMsg ? "errMsg" : "offscreen";

  // if loading
  if (isLoading) return <PulseLoader color={"#FFF"} />;

  // onChange handlers
  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = (e) => {
    setPersist((prev) => !prev);
    console.log(persist);
  };

  // onClick to submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // since this inst using RTK methods have to use unwrap to to handle errors
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      // clear inputs state
      setUsername("");
      setPassword("");
      // redirect
      navigate("/dash");
    } catch (error) {
      // error handling
      if (!error.status) {
        setErrMsg("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Wrong Username or Password");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(error.data?.message);
      }
      errRef.current.focus();
    }
  };

  const content = (
    <>
      <PublicHeader />
      <main className="login">
        {/* error message */}
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <div className="form-wrapper">
          {/* form start */}
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              className="form__input"
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              className="form__input"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />
            <button className="form__submit-button">Sign In</button>
            <label htmlFor="persist" className="form__persist">
              <input
                type="checkbox"
                className="form__checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              Trust this device
            </label>
          </form>
          {/* form end */}
        </div>
      </main>
      <PublicFooter />
    </>
  );

  return content;
};

export default Login;
