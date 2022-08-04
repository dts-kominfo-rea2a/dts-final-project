import SectionGrid from 'components/SectionGrid/SectionGrid';
import React, { Fragment, useState } from 'react';
// import useWindowSize from 'helpers/useWindowSize';
import ListingWrapper, { PostsWrapper } from './Listing.style'; //ShowMapCheckbox
import { PostPlaceholder } from 'components/ContentLoader/ContentLoader';
import useHotelApi from 'helpers/useHotelApi';
import { SINGLE_POST_PAGE } from 'common/constant';
import { useSearchParams } from 'react-router-dom';

let columnWidth = [1 / 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5];

const ListHotel = () => {
  const [params] = useSearchParams();
  const [pageNumber] = useState(0);

  // console.log(params.get('location_code'));  setPageNumber
  // const { width } = useWindowSize();
  // let url = '/data/hotels.json';
  const date_range = params.get('date_range');
  let start_date = date_range.split(',')[0];
  let end_date = date_range.split(',')[1];

  start_date = start_date.split('-').reverse().join('-');
  end_date = end_date.split('-').reverse().join('-');
  const dest_id = params.get('location_code');
  const room = params.get('room');
  const guest = params.get('guest');
  // const page_number = 3;
  const endpoint =
    '/hotels/search?checkout_date=' +
    end_date +
    '&checkin_date=' +
    start_date +
    '&units=metric&dest_id=' +
    dest_id +
    '&dest_type=city&locale=id&adults_number=' +
    guest +
    '&room_number=' +
    room +
    '&order_by=popularity&filter_by_currency=IDR&page_number=';

  const url = process.env.REACT_APP_RAPID_API_HOST + endpoint;
  const { data, loading, LoadMoreData, total, limit } = useHotelApi(
    url,
    pageNumber
  );
  // const response = useHotelApi(url);
  // const [data, setData] = useState();
  // const limit = response.limit;
  // const total = response.total;
  // const loading = response.loading;
  // console.log(response);
  // setData(response.data);

  // const useLoadMoreItem = () => {
  // setPageNumber(pageNumber + 1);
  //    const { data, loading, loadMoreData, total, limit } = useHotelApi(url);
  //console.log(endpoint);
  // };

  return (
    <>
      <ListingWrapper>
        <Fragment>
          <PostsWrapper
            className={'col-24'}
            //width > 767 ? 'col-12' : 'col-24'}
            //&& showMap
          >
            <SectionGrid
              link={SINGLE_POST_PAGE}
              columnWidth={columnWidth}
              data={data}
              totalItem={total[0]}
              loading={loading}
              limit={limit}
              handleLoadMore={LoadMoreData}
              placeholder={<PostPlaceholder />}
            />
          </PostsWrapper>

          {/* {showMap && <ListingMap />} */}
        </Fragment>
      </ListingWrapper>
    </>
  );
};

export default ListHotel;
