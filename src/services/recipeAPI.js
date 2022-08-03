import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const apiKey = "692c96d7a033ab16f5656de5da81ba23";

export const recipeAPI = createApi({
  reducerPath: "recipeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://masak-apa-tomorisakura.vercel.app",
  }),

  endpoints: (builder) => ({
    recipe: builder.query({
      query: () => `/api/recipes`,
    }),

    // trendingAll: builder.query({
    //   query: () => `/trending/all/day?api_key=${apiKey}`,
    // }),
    // movieById: builder.query({
    //   query: (id) => ``,
    // }),
  }),
});

export const { useRecipeQuery } = recipeAPI;
