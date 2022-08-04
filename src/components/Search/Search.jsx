// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'components/Heading/Heading';
import Text from 'components/Text/Text';
import Container from 'components/Container/Container';
import GlideCarousel, {
  GlideSlide,
} from 'components/GlideCarousel/GlideCarousel';
import SearchForm from './SearchForm';
import BannerWrapper, { SearchWrapper } from './Search.style';
// import { Container } from '@material-ui/core';

const SearchArea = ({ searchTitleStyle, searchDescriptionStyle }) => {
  return (
    <BannerWrapper>
      <GlideCarousel
        controls={false}
        options={{ gap: 0, autoplay: 5000, animationDuration: 1000 }}
        bullets={true}
        numberOfBullets={3}
      >
        <>
          <GlideSlide>
            <img src="/images/banner/1.jpg" alt="Banner 1" />
          </GlideSlide>
          <GlideSlide>
            <img src="/images/banner/2.jpg" alt="Banner 2" />
          </GlideSlide>
          <GlideSlide>
            <img src="/images/banner/3.jpg" alt="Banner 3" />
          </GlideSlide>
        </>
      </GlideCarousel>

      <Container>
        <SearchWrapper>
          <Heading
            {...searchTitleStyle}
            content="Tempat terbaik dengan harga terbaik"
          />
          <Text
            {...searchDescriptionStyle}
            content="Temukan akomodasi terbaik untuk perjalanan Anda."
          />
          <SearchForm />
        </SearchWrapper>
      </Container>
    </BannerWrapper>
  );
};

SearchArea.propTypes = {
  searchTitleStyle: PropTypes.object,
  searchDescriptionStyle: PropTypes.object,
};

SearchArea.defaultProps = {
  searchTitleStyle: {
    color: '#2C2C2C',
    fontSize: ['20px', '24px', '28px'],
    lineHeight: ['28px', '30px', '30px'],
    mb: '9px',
  },
  searchDescriptionStyle: {
    color: '#2C2C2C',
    fontSize: '15px',
    lineHeight: ['25px', '25px', '18px'],
    mb: '30px',
  },
};

export default SearchArea;
