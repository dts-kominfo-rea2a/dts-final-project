import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsService = createApi({
  reducerPath: "postsService",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
    }),
    getPostsByID: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllPostsQuery, useGetPostsByIDQuery } = postsService;
