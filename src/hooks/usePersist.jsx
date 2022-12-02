import { useState, useEffect } from "react";

// This component just sets persist to true or false in local storage so we can create a state for PersistLogin.jsx to keep a user logged in when page is refreshed

const usePersist = () => {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};
export default usePersist;
