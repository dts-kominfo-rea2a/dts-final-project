import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { convertToSelectOptions } from '../utils/utils'
import { API_URL } from './miaowbookApi'

const tenSecondKey = () => {
    return Math.round((new Date()).getTime() / (1000 * 10))
}

export const miaowbookApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().userStore.token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            headers.set('Accept', 'application/json')

            return headers
        },
    }),
    tagTypes: ['Posts', 'Users'],
    endpoints: (builder) => ({
        //attributes
        registerAttributes: builder.query({
            query: () => ({
                url: "/attributes/register"
            }),
            transformResponse: (response, meta, arg) => {
                return {
                    accountTypes: convertToSelectOptions(response.data.user_types, 'id', (item) => `${item.emoji} - ${item.name}`)
                }
            }
        }),
        //end attributes

        //auth
        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body
            })
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body
            })
        }),
        //end auth

        //profile
        me: builder.query({
            query: (body) => ({
                url: "/profile/me",
                method: "GET"
            })
        }),
        findUserByUsername: builder.query({
            query: ({ username }) => ({
                url: `/profile/u/${username}`,
                method: "GET"
            }),
            providesTags: (result, error, page) => (
                result ? [{ type: 'Users', id: result?.data?.id }] : []
            ),
            transformResponse: (response) => {
                return response.data
            }
        }),
        listUserPost: builder.query({
            query: ({ user_id, ...params }) => ({
                url: `/profile/${user_id}/posts`,
                method: "GET",
                params
            })
        }),
        //end profile

        //post
        listPost: builder.query({
            query: (params) => ({
                url: "/post",
                params: {
                    ...params
                }
            }),
            providesTags: (result, error, page) => (
                result
                    ? [
                        ...result.data.data.map(({ id }) => ({ type: 'Posts', id })),
                        { type: 'Posts', id: 'PARTIAL-LIST' },
                    ]
                    : [{ type: 'Posts', id: 'PARTIAL-LIST' }]
            ),
        }),

        detailPost: builder.query({

        }),
        likePost: builder.mutation({
            query: (params) => ({
                url: `/post/${params.id}/like`,
                method: "POST"
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Posts', id },
                { type: 'Posts', id: 'PARTIAL-LIST' },
            ],
        }),
        unlikePost: builder.mutation({
            query: (params) => ({
                url: `/post/${params.id}/unlike`,
                method: "POST"
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Posts', id },
                { type: 'Posts', id: 'PARTIAL-LIST' },
            ],
        }),
        //end post
    })
})

export const {
    useRegisterAttributesQuery,
    useRegisterMutation,
    useLoginMutation,
    useMeQuery,
    useListPostQuery,
    useLikePostMutation,
    useUnlikePostMutation,
    useFindUserByUsernameQuery,
    useListUserPostQuery
} = miaowbookApi