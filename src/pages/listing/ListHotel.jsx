import SectionGrid from 'components/SectionGrid/SectionGrid';
import React, { Fragment } from 'react';
import useWindowSize from 'helpers/useWindowSize';
import ListingWrapper, { PostsWrapper, ShowMapCheckbox } from './Listing.style';
import { PostPlaceholder } from 'components/ContentLoader/ContentLoader';
import useDataApi from 'helpers/useDataApi';

let columnWidth = [1 / 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5];

const ListHotel = () => {
  const { width } = useWindowSize();
  let url = '/data/hotel.json';
  const { data, loading, loadMoreData, total, limit } = useDataApi(url);
  console.log(data);
  return (
    <>
      <ListingWrapper>
        <Fragment>
          <PostsWrapper
            className={width > 767 ? 'col-12' : 'col-24'}
            //&& showMap
          >
            <SectionGrid
              link={''} //SINGLE_POST_PAGE
              columnWidth={columnWidth}
              data={data}
              totalItem={total.length}
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
