// @ts-nocheck
import React from 'react';
import { MarkerClusterer } from '@react-google-maps/api';
import MapWrapper from './MapWrapper';
import HotelMapMarkerCluster from './ListingPageMap';
import HotelMapMarkerSingle from './SinglePageMap';

const Map = (props) => {
  const { multiple, location } = props;
  const handleClustererClick = (data) => {
    const markerClusterer = data.getMarkers();
    console.log(`Current clicked markers length: ${markerClusterer.length}`);
    console.log(markerClusterer);
  };
  return (
    <>
      {multiple ? (
        <MapWrapper
          id="map-multiple-location"
          zoom={7}
          center={{
            lat: 41.8858,
            lng: -75.7223,
          }}
        >
          <MarkerClusterer
            gridSize={60}
            averageCenter
            enableRetinaIcons={true}
            onClick={handleClustererClick}
          >
            {(clusterer) => (
              <HotelMapMarkerCluster
                location={location}
                clusterer={clusterer}
              />
            )}
          </MarkerClusterer>
        </MapWrapper>
      ) : (
        <MapWrapper
          id="map-single-location"
          mapContainerStyle={{
            height: '400px',
            width: '100%',
          }}
          zoom={8}
          center={{
            lat: 40.706877,
            lng: -74.011265,
          }}
        >
          <HotelMapMarkerSingle location={location} />
        </MapWrapper>
      )}
    </>
  );
};

export default Map;
