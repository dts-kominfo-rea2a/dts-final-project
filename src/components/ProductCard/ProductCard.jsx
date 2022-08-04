import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import GridCard from '../GridCard/GridCard';
import Favorite from 'components/Favorite/Favorite';
import Rating from 'components/Rating/Rating';
import TextLink from 'components/TextLink/TextLink';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const PostGrid = ({
  hotel_name_trans,
  review_score,
  address_trans,
  min_total_price,
  review_nr,
  max_photo_url,
  slug,
  link,
}) => {
  return (
    <GridCard
      isCarousel={true}
      favorite={
        <Favorite
          onClick={(event) => {
            console.log(event);
          }}
        />
      }
      location={address_trans}
      // @ts-ignore
      title={<TextLink link={`${link}/${slug}`} content={hotel_name_trans} />}
      price={`Rp ${min_total_price}/Night - Free Cancellation`} //
      rating={
        <Rating rating={review_score} ratingCount={review_nr} type="bulk" />
      }
      viewDetailsBtn={
        <TextLink
          link={`${link}/${slug}`}
          icon={<FiExternalLink />}
          content="View Details"
        />
      }
    >
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        renderDotsOutside={false}
        responsive={responsive}
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
      >
        {/* {[main_photo_url].map(({ url, title }, index) => ( */}
        <img
          src={max_photo_url}
          alt={hotel_name_trans}
          // key={index}
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'relative',
          }}
        />
        {/* ))} */}
      </Carousel>
    </GridCard>
  );
};

export default PostGrid;
