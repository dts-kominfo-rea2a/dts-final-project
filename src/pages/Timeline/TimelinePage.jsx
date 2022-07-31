import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Elements/Post";
import Input from "../../components/Forms/Input";
import Select from "../../components/Forms/Select";
import { useListPostQuery } from "../../services/miaowbookApiRtk";
import { selectUser } from "../../store/userStore";
import usePrevious from "../../hooks/usePrevious";
import { useNavigate, useParams } from "react-router-dom";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import InfiniteScroll from "react-infinite-scroller";
import useTitle from "../../hooks/useTitle";
import Spinner from "../../components/Elements/Spinner";

const TimelinePage = () => {
    const { timeline_type } = useParams()
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [timelineQuery, setTimelineQuery] = useState({
        cursor: null,
        timeline_type: timeline_type || 'neighbor'
    })

    useTitle('Timeline');

    const timelineQueryPrevious = usePrevious(timelineQuery);

    const { data: postsPerPage, error, isLoading, isFetching, isUninitialized } = useListPostQuery(timelineQuery)

    useEffect(() => {
        if (!isLoading && !error && !isFetching && !isUninitialized) {
            // console.log(postsPerPage)
            if (timelineQuery?.timeline_type !== timelineQueryPrevious?.timeline_type || timelineQuery?.cursor === null) {
                setPosts(postsPerPage.data.data)
            } else {
                setPosts((posts) => {
                    const existingids = posts.map(({ id }) => id);
                    return [
                        ...posts,
                        ...postsPerPage.data.data.filter(({ id }) => existingids.indexOf(id) <= -1)
                    ]
                })
            }
        }
    }, [postsPerPage, isFetching, isUninitialized, error, isLoading, timelineQuery, timelineQueryPrevious])

    useEffect(() => {
        if (timelineQuery?.timeline_type !== timelineQueryPrevious?.timeline_type && timelineQuery?.cursor === timelineQueryPrevious?.cursor) {
            if (timelineQuery?.timeline_type === 'worldwide') {
                navigate('/timeline/worldwide', {
                    replace: true
                })

                return;
            } else {
                navigate('/timeline', {
                    replace: true
                })
                return;
            }
        }
    }, [navigate, timelineQuery, timelineQueryPrevious])

    const loadMoreHandler = () => {
        if (isLoading || isFetching) {
            return;
        }
        const nextCursor = postsPerPage?.data?.next_cursor;
        if (nextCursor === null) return;
        // console.log(nextCursor);
        setTimelineQuery({
            timeline_type: timelineQuery.timeline_type,
            cursor: nextCursor
        });
    }

    // window.onscroll = () => {
    //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    //         // console.log("BOTTOM")
    //     }
    // }

    return (
        <div className="pt-4 w-full md:w-10/12 mx-auto">
            <div className="flex gap-2">
                <div className="w-full md:w-8/12">
                    {
                        !error && !isLoading && (
                            <InfiniteScroll
                                threshold={0}
                                pageStart={0}
                                loadMore={loadMoreHandler}
                                hasMore={postsPerPage?.data?.next_cursor != null}
                                loader={<div key="0" className="text-center"><Spinner size="md" /></div>}
                            >
                                {
                                    (posts.length > 0)
                                    && (
                                        posts.map(post => (
                                            <div key={post.id} className="mb-4">
                                                <Post post={post} />
                                            </div>
                                        ))
                                    )
                                }

                                {
                                    (posts.length <= 0)
                                    && (
                                        <div className="w-full flex justify-center">
                                            It looks like we dont have posts for you, check the Worldwide timeline instead!.
                                        </div>
                                    )
                                }

                            </InfiniteScroll>
                        )
                    }

                    {/* {
                        (!error && postsPerPage?.data?.next_cursor) && (
                            <div className="w-full flex justify-center">
                                <SecondaryButton type="button" onClick={loadMoreHandler} disabled={isLoading}>{isLoading || isFetching ? 'Loading...' : 'Load More'}</SecondaryButton>
                            </div>
                        )
                    } */}
                </div>
                <div className="hidden md:flex px-4 md:w-4/12 flex-col items-start relative">
                    <div className="fixed">
                        <div className="flex flex-col">
                            <div className="flex gap-4">
                                <img
                                    src={user?.profile_picture_url}
                                    alt={`${user?.name} profile`}
                                    className="w-16 h-16 object-cover rounded-full"
                                />

                                <div className="flex flex-col justify-center">
                                    <span className="font-bold">{user?.name}</span>
                                    <span className="text-gray-500 text-sm">{user?.username}</span>
                                </div>
                            </div>
                            <div className="mt-4 w-full">
                                {/* <Link to="/timeline">See from</Link> */}
                                <Select
                                    label="Timeline setting"
                                    value={timelineQuery?.timeline_type}
                                    onChange={(e) => {
                                        setTimelineQuery({
                                            timeline_type: e.target.value,
                                            cursor: null
                                        })
                                    }}
                                    options={[
                                        {
                                            value: 'worldwide',
                                            label: "Worldwide"
                                        },
                                        {
                                            value: 'neighbor',
                                            label: "Followings"
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelinePage