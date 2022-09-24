import React from 'react';
// import isEmpty from 'lodash/isEmpty';
// import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
// import MapAutoComplete from 'components/Map/MapAutoComplete';
// import { setStateToUrl, getStateFromUrl } from 'helpers/url_handler';
// import { mapDataHelper } from 'components/Map/mapDataHelper';
// import { LISTING_POSTS_PAGE } from 'common/constant';
import { NavbarSearchWrapper } from './Header.style';

export default function NavbarSearch() {
  // let navigate = useNavigate();
  // let location = useLocation();

  // const updateValueFunc = (value) => {
  //   const { searchedPlaceAPIData } = value;
  //   let tempLocation = [];
  //   const mapData = !isEmpty(searchedPlaceAPIData)
  //     ? mapDataHelper(searchedPlaceAPIData)
  //     : [];
  //   if (!isEmpty(mapData) && mapData.length !== 0) {
  //     mapData.forEach((singleMapData) =>
  //       tempLocation.push({
  //         lat: singleMapData ? singleMapData.lat.toFixed(3) : null,
  //         lng: singleMapData ? singleMapData.lng.toFixed(3) : null,
  //       })
  //     );
  //   }

  //   const searchLocation = tempLocation ? tempLocation[0] : {};
  //   if (!isEmpty(searchLocation)) {
  //     const state = getStateFromUrl(location);
  //     const query = {
  //       ...state,
  //       location: searchLocation,
  //     };
  //     const search = setStateToUrl(query);
  //     navigate(LISTING_POSTS_PAGE, { replace: true, state: search });
  //   }
  // };

  return (
    <NavbarSearchWrapper className="navbar_search">
      {/* <MapAutoComplete updateValue={(value) => updateValueFunc(value)} /> */}
      <FiSearch />
    </NavbarSearchWrapper>
  );
}
