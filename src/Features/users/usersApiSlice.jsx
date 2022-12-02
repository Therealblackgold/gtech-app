import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// LEARN MORE ABOUT createEntityAdapter/ using ids to get data from entities
const userAdapter = createEntityAdapter({});
const initialSate = userAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL USERS
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        // validating status
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      //   since using mongoDB have to set id to use createEntityAdapter
      //   so the data can be stored as ids and entities
      transformResponse: (responseData) => {
        const loadUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return userAdapter.setAll(initialSate, loadUsers);
      },
      // Referencing the tags they can be invalidated when mutations to data take place
      providesTags: (result, error, args) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "user", id: "LIST" }];
      },
    }),
    // ADD NEW USER
    addNewUser: builder.mutation({
      // takes user data param
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // invalidatesTags to update the state/cache when objects below change.
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    // UPDATE USER
    updateUser: builder.mutation({
      // takes user data param
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      // invalidatesTags arg param to get the id and use it to invalid only the user id
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    // DELETE USER
    deleteUser: builder.mutation({
      // takes id object
      query: ({ id }) => ({
        url: `users`,
        method: "DELETE",
        body: { id },
      }),
      // invalidatesTags uses arg param to get the id and use it to invalid only the user id
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

// Exporting endpoints
export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

// Returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Create normalized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (userResult) => userResult.data // normalized state object with ids and entities
);

// getSelectors create these selectors and we rename the with alias
// using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialSate);
