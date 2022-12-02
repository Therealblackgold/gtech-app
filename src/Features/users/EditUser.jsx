import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
  // using useTitle custom hook to set a page title
  useTitle("gtech.COM: Update User");

  // getting id from useParams
  const { id } = useParams();

  // destructuring from  useGetUsersQuery
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  // if theres no user return PulseLoader
  if (!user) return <PulseLoader color={"#fff"} />;

  // declaring content which holds the EditUserForm
  const content = <EditUserForm user={user} />;

  // returning content to be displayed
  return content;
};
export default EditUser;
