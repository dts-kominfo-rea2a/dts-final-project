import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { loggedOut, setUser } from '../store/userStore'
import { toast } from '../utils/tools'
import { convertObjectToFormData, convertToSelectOptions } from '../utils/utils'
import { API_URL } from './miaowbookApi'

const tenSecondKey = () => {
    return Math.round((new Date()).getTime() / (1000 * 10))
}

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().userStore.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        headers.set('Accept', 'application/json')

        return headers
    },
    mode: 'cors'
})

const globalExceptionEndpoints = ['login']

export const miaowbookApi = createApi({
    reducerPath: 'miaowbook-api',
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions)

        if (!globalExceptionEndpoints.includes(api.endpoint)) {
            if (result?.error && result?.error?.status === 401) {
                toast({ title: "Your session is expired", icon: "error" })
                api.dispatch(loggedOut())
            }
        }


        return result;
    },
    tagTypes: ['Posts', 'Users', 'PostComments'],
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
            }),
            provideTags: (result, error, arg) => {
                return [{ type: "Users", id: 'ME' }]
            }
        }),
        findUserByUsername: builder.query({
            query: ({ username }) => ({
                url: `/profile/u/${username}`,
                method: "GET"
            }),
            providesTags: (result, error, page) => {
                const tag = result ? [{ type: 'Users', id: result.id }] : []
                return tag;
            },
            transformResponse: (response) => {
                return response.data
            }
        }),
        listUserPost: builder.query({
            query: ({ user_id, ...params }) => ({
                url: `/profile/${user_id}/posts`,
                method: "GET",
                params
            }),
            providesTags: (result, error, arg) => {
                const tag = result
                    ? [
                        ...result.data.data.map(({ id }) => ({ type: 'Posts', id })),
                        { type: 'Posts', id: `PARTIAL-LIST-${arg.user_id}` },
                    ]
                    : [{ type: 'Posts', id: `PARTIAL-LIST-${arg.user_id}` }];

                return tag
            }
        }),
        updateProfilePicture: builder.mutation({
            query: (body) => {
                return {
                    url: '/profile/update-profile-picture',
                    method: "POST",
                    body: convertObjectToFormData(body)
                }
            },
            invalidatesTags: (result, error, arg) => {
                const tags = [
                    { type: 'Users', id: 'ME' },
                ]

                if (result?.data?.id) {
                    tags.push({ type: 'Users', id: result?.data?.id })
                }
                console.log(tags, result)
                return tags
            },
            async onCacheEntryAdded(
                arg,
                {
                    dispatch,
                    cacheDataLoaded,
                }
            ) {
                (cacheDataLoaded.then(({ data }) => {
                    const { status, data: user } = data
                    console.log(data, status, user);
                    if (status === 'success') {
                        dispatch(setUser({
                            user
                        }))
                    }
                }))
            }
        }),
        updateUserProfile: builder.mutation({
            query: (body) => {
                return {
                    url: '/profile/update',
                    method: "POST",
                    body
                }
            },
            invalidatesTags: (result, error, arg) => {
                const tags = [
                    { type: 'Users', id: 'ME' },
                ]

                if (result?.data?.id) {
                    tags.push({ type: 'Users', id: result?.data?.id })
                }
                console.log(tags, result)
                return tags
            },
            // async onCacheEntryAdded(
            //     arg,
            //     {
            //         dispatch,
            //         cacheDataLoaded,
            //     }
            // ) {
            //     (cacheDataLoaded.then(({ data }) => {
            //         const { status, data: user } = data
            //         console.log(data, status, user);
            //         if (status === 'success') {
            //             dispatch(setUser({
            //                 user
            //             }))
            //         }
            //     }))
            // }
        }),
        //end profile

        //profile interaction
        followUser: builder.mutation({
            query: ({ user_id }) => ({
                url: `/profile/${user_id}/follow`,
                method: "POST"
            }),
            invalidatesTags: (result, error, { user_id }) => [
                { type: 'Users', id: user_id },
            ],
        }),
        unfollowUser: builder.mutation({
            query: ({ user_id }) => ({
                url: `/profile/${user_id}/unfollow`,
                method: "POST"
            }),
            invalidatesTags: (result, error, { user_id }) => [
                { type: 'Users', id: user_id },
            ],
        }),
        searchUser: builder.query({
            query: (params) => ({
                url: `/profile/search`,
                method: "GET",
                params
            })
        }),
        //end profile interaction

        //post
        createPost: builder.mutation({
            query: (body) => ({
                url: "/post",
                method: "POST",
                body: convertObjectToFormData(body)
            }),
            invalidatesTags: (result) => {
                const tags = []
                if (result) {
                    tags.push({ type: 'Users', id: result?.data?.user?.id })
                    tags.push({ type: 'Posts', id: `PARTIAL-LIST-${result.data.user.id}` })
                    tags.push({ type: 'Posts', id: `PARTIAL-LIST` })
                }
                return tags
            }
        }),
        listPost: builder.query({
            query: (params) => ({
                url: "/post",
                params: {
                    ...params
                }
            }),
            providesTags: (result, error, page) => {
                const tag = result
                    ? [
                        ...result.data.data.map(({ id }) => ({ type: 'Posts', id })),
                        { type: 'Posts', id: 'PARTIAL-LIST' },
                    ]
                    : [{ type: 'Posts', id: 'PARTIAL-LIST' }];

                return tag
            },
        }),
        detailPost: builder.query({
            query: ({ post_id }) => ({
                url: `/post/${post_id}`,
                method: "GET"
            }),
            providesTags: (result, error, page) => (
                result
                    ? [{ type: "Posts", id: result?.data?.id }] : []
            )
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
        deletePost: builder.mutation({
            query: ({ user_id, ...params }) => ({
                url: `/post/${params.id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, { id, user_id }) => [
                { type: 'Posts', id },
                { type: 'Users', id: user_id },
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
        listPostComment: builder.query({
            query: ({ post_id, ...params }) => ({
                url: `/post/${post_id}/comments`,
                method: "GET",
                params
            }),
            providesTags: (result, error, arg) => {
                const tag = result ? [{ type: 'PostComments', id: arg.post_id }] : []
                console.log(tag);
                return tag;
            },
        }),
        commentPost: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/post/${id}/comment`,
                method: "POST",
                body
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Posts', id },
                { type: 'PostComments', id },
                { type: 'Posts', id: 'PARTIAL-LIST' },
                { type: 'Posts', id: `PARTIAL-LIST-${id}` },
            ],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: "POST"
            })
        })
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
    useFollowUserMutation,
    useUnfollowUserMutation,
    useUnlikePostMutation,
    useFindUserByUsernameQuery,
    useListUserPostQuery,
    useDetailPostQuery,
    useCommentPostMutation,
    useListPostCommentQuery,
    useUpdateProfilePictureMutation,
    useCreatePostMutation,
    useDeletePostMutation,
    useLogoutMutation,
    useSearchUserQuery,
    useUpdateUserProfileMutation,
} = miaowbookApi