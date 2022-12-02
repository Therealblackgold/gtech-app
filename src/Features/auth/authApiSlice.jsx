import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

// On this file we extend the apiSlice creating endpoints

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      // credentials are the username and password that is sent with the query to "/auth" route
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        // spreading credentials to the body object
        body: { ...credentials },
      }),
    }),
    // LOGOUT
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      // using RTK QUERY onQueryStarted function to dispatch and verify the query has been fulfilled
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          // calling logOut from authSlice
          dispatch(logOut());
          setTimeout(() => {
            // reset state
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    // REFRESHING TOKEN
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      // just like the logout we just send a request to the backend end point so just need to make sure its fulfilled.
      // using RTK QUERY onQueryStarted function to dispatch and verify the query has been fulfilled
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          // this use of dispatch will setCredentials instead of importing dispatch on every component that uses the useRefreshMutation
          dispatch(setCredentials({ accessToken }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

// exporting mutations
export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
