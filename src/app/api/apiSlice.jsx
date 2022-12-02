import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../Features/auth/authSlice";

// creating a baseQuery and setting headers
const baseQuery = fetchBaseQuery({
  // backend base url
  baseUrl: "https://gtech-api.onrender.com",
  // including credentials for httpOnly cookie
  credentials: "include",
  // passing headers and deconstructing getSate to get current state of the application
  prepareHeaders: (headers, { getState }) => {
    // getting auth.token from current state
    const token = getState().auth.token;

    if (token) {
      // if token set authorization headers using Bearer format
      headers.set("authorization", `Bearer ${token}`);
    }
    // returning headers so this can be applied to every request
    return headers;
  },
});

// BaseQueryWithReAuth will be used to get a refresh token
const BaseQueryWithReAuth = async (args, api, extraOptions) => {
  // getting result/access token from baseQuery function above
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access
    // args here is a new route "/auth/refresh"
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. ";
      }
      return refreshResult;
    }
  }

  // result that returns token if nothing goes wrong
  return result;
};

export const apiSlice = createApi({
  // using baseQuery as BaseQueryWithReAuth
  baseQuery: BaseQueryWithReAuth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
