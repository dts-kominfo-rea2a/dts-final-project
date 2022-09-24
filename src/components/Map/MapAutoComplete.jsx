// @ts-nocheck
import React, { useState } from 'react';
import { Input } from 'antd';

import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const SearchInput = (props) => {
  const [searchBox, setSearchBox] = useState();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });
  const { getInputValue } = props;
  const [locationInput, setLocationInput] = useState({
    searchedLocation: '',
    searchedPlaceAPIData: [],
  });
  const handleOnChange = (event) => {
    if (event.which === '13') {
      event.preventDefault();
      event.stopPropagation();
    }
    setLocationInput({
      searchedLocation: event.target.value,
    });
  };

  const onLoad = (ref) => setSearchBox(ref);

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    setLocationInput({
      searchedLocation: places && places[0] && places[0].formatted_address,
      searchedPlaceAPIData: places ? places : [],
    });
    getInputValue({
      searchedLocation: places && places[0] && places[0].formatted_address,
      searchedPlaceAPIData: places ? places : [],
    });
  };

  const handleOnPressEnter = (event) => {
    if (event.which === '13') {
      event.preventDefault();
      event.stopPropagation();
    }
    setLocationInput({ searchedLocation: event.target.value });
    getInputValue(locationInput);
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return (
    <div className="map_autocomplete">
      {isLoaded && (
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <Input
            type="text"
            defaultValue=""
            value={locationInput.searchedLocation || ''}
            placeholder="Search “Thailand, Asia”"
            size="large"
            onChange={handleOnChange}
            onPressEnter={handleOnPressEnter}
          />
        </StandaloneSearchBox>
      )}
    </div>
  );
};

const MapAutoComplete = (props) => {
  const { updateValue } = props;
  return <SearchInput getInputValue={updateValue} />;
};

export default MapAutoComplete;
