import { CssBaseline } from '@material-ui/core';
// import SearchForm from 'components/Search/SearchForm'; Container,
// import SearchArea from 'components/Search/Search';
import React from 'react';
import Header from './Header/Header';

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <div
        style={{ border: '1px solid blue', minHeight: 1400, paddingTop: 100 }}
      >
        {/* <SearchArea /> */}
      </div>
    </>
  );
};

export default Layout;
