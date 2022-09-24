import { useEffect, useReducer, useState } from 'react';

async function SuperFetch(
  url,
  method = 'GET',
  headers = {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
  body = {}
) {
  let options = {
    method,
    headers,
  };
  if (method === 'POST' || method === 'PUT') options = { ...options, body };

  // authentication
  // we will had custom headers here.

  return fetch(url, options)
    .then((res) => {
      return Promise.resolve(res.json());
    })
    .catch((error) => Promise.reject(error));
}

function dataFetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload.result.slice(0, state.limit),
        total: action.payload.count,
        loading: false,
        error: false,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'LOAD_MORE':
      console.log(state);
      return {
        ...state,
        data: [
          ...state.data,
          ...state.total.slice(
            state.data.length,
            state.data.length + state.limit
          ),
        ],
        loading: false,
        error: false,
      };
    default:
      throw new Error();
  }
}

const useHotelApi = (initialUrl, page = 0, limit = 20, initialData = []) => {
  const [url, setUrl] = useState(initialUrl + page);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: initialData,
    total: initialData,
    limit: limit,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      // @ts-ignore
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await SuperFetch(url);
        if (!didCancel) {
          // @ts-ignore
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        }
      } catch (error) {
        if (!didCancel) {
          // @ts-ignore
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  const LoadMoreData = () => {
    // useHotelApi(url);
    // console.log(url);
    // @ts-ignore
    dispatch({ type: 'LOAD_MORE' });
  };
  const doFetch = (url) => {
    setUrl(url);
  };

  return { ...state, doFetch, LoadMoreData };
};

// const LoadMoreData = () => {
//   const [state, dispatch] = useReducer(dataFetchReducer, {
//     loading: false,
//     error: false,
//     data: initialData,
//     total: initialData,
//     limit: limit,
//   });
//   useEffect(() => {
//     let didCancel = false;

//     const fetchData = async () => {
//       // @ts-ignore
//       dispatch({ type: 'FETCH_INIT' });

//       try {
//         const result = await SuperFetch(url);
//         if (!didCancel) {
//           // @ts-ignore
//           dispatch({ type: 'FETCH_SUCCESS', payload: result });
//         }
//       } catch (error) {
//         if (!didCancel) {
//           // @ts-ignore
//           dispatch({ type: 'FETCH_FAILURE' });
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       didCancel = true;
//     };
//   }, [url]);
// };

export default useHotelApi;
