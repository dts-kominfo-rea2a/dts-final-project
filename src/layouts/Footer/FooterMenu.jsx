import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  PRIVACY_PAGE,
  PRICING_PLAN_PAGE,
  AGENT_PROFILE_PAGE,
} from 'common/constant';

const FooterMenu = () => {
  return (
    <Menu>
      <Menu.Item key="0">
        <NavLink to={`${HOME_PAGE}`}>Hotels</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to={`${LISTING_POSTS_PAGE}`}>Listing</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to={`${PRICING_PLAN_PAGE}`}>Pricing</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to={`${PRIVACY_PAGE}`}>Privacy</NavLink>
      </Menu.Item>
      <Menu.Item key="4">
        <NavLink to={`${AGENT_PROFILE_PAGE}`}>Agent</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default FooterMenu;
