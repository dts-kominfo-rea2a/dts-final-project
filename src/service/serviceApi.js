import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api-football-standings.azharimm.site/leagues";

export const serviceApi = createApi({
  reducePath: "doa",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    // mode: "no-cors",
    // prepareHeaders: (headers) => {
    //   headers.set('Access-Control-Allow-Origin', '*')
    //   return headers
    // },
  }),
  endpoints: (builder) => ({
    getLeagues: builder.query({
      query: () => ({
        url: ``,
      }),
    }),
    getDetailLeagues: builder.query({
      query: (id) => ({
        url: `/leagues/{id}`,
      }),
    }),
    getLeaguesStandings: builder.query({
      query: ({id, year}) => ({
        url: `/${id}/standings?season=${year}`,
      }),
    }),
  }),
});

export const { useGetLeaguesQuery, useGetDetailLeaguesQuery, useGetLeaguesStandingsQuery} =
  serviceApi;