import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom'; //, useLocation
import { Layout as LayoutWrapper } from 'antd';
// import useWindowSize from 'helpers/useWindowSize';
import LayoutProvider from 'context/LayoutProvider';
import Header from './Header/Header';

const { Content } = LayoutWrapper;

const Layout = () => {
  // const { width } = useWindowSize();
  // const singlePageUrlFromConst = SINGLE_POST_PAGE.split('/');
  // const singlePageUrlFormLocation = location.pathname.split('/');

  return (
    <LayoutProvider>
      <Fragment>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Fragment>
    </LayoutProvider>
    // <>
    //   {/* <CssBaseline /> */}
    //   <Header />
    //   <div
    //     style={{ border: '1px solid blue', minHeight: 1400, paddingTop: 100 }}
    //   >
    //     {/* <SearchArea /> */}
    //   </div>
    // </>
  );
};

export default Layout;
