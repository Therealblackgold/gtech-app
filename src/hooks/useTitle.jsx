import { useEffect } from "react";

// This changes the document title when user switches between pages
// takes a title param that will be passed through route
const useTitle = (title) => {
  useEffect(() => {
    //   taking the previous title from the dom
    const prevTitle = document.title;
    //   setting the dom title to the new title
    document.title = title;

    // restoring previous title when the component unmounts
    return () => (document.title = prevTitle);

    // using the title as a dependency
  }, [title]);
};

export default useTitle;
