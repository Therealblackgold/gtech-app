import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

export const UsersList = () => {
  // using useTitle custom hook to set a page title
  useTitle("gtech.COM: Users");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    // refetch data every 1 minute if data is changed from another device
    pollingInterval: 60000,
    //if window focus is changed and then refocused refetch data
    refetchOnFocus: true,
    // refetch data on remount
    refetchOnMountOrArgChange: true,
  });

  let content;

  // if loading
  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  // if error
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  // if success
  if (isSuccess) {
    const { ids } = users;

    // mapping user data to User component and storing it in a variable tableContent
    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
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
export default UsersList;
