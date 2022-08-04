import SectionGrid from 'components/SectionGrid/SectionGrid';
import React, { Fragment } from 'react';
// import useWindowSize from 'helpers/useWindowSize';
import ListingWrapper, { PostsWrapper } from './Listing.style'; //ShowMapCheckbox
import { PostPlaceholder } from 'components/ContentLoader/ContentLoader';
import useHotelApi from 'helpers/useHotelApi';
import { SINGLE_POST_PAGE } from 'common/constant';

let columnWidth = [1 / 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5];

const ListHotel = () => {
  // const { width } = useWindowSize();
  let url = '/data/hotels.json';
  const { data, loading, loadMoreData, total, limit } = useHotelApi(url);
  console.log(total);
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
              totalItem={total}
              loading={loading}
              limit={limit}
              handleLoadMore={loadMoreData}
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
