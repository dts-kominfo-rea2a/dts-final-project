import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('access_token')

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ identifier, password }) => ({
        url: "/auth/local",
        method: "POST",
        // credentials: 'include',
        body: { identifier: identifier, password: password },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery  } = authService;
