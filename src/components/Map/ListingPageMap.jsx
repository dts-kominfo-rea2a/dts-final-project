import React, { useState } from 'react';
import { Marker } from '@react-google-maps/api';
import HotelInfoWindow from './MapInfoWindow';
import MakerImage from './hotelMapMarker.png';

const HotelMapMarkerCluster = ({ location, clusterer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markerIndex, setMarkerIndex] = useState(0);
  let hotelData = [];

  const infoWindowToggle = (index) => {
    setIsOpen(!isOpen);
    setMarkerIndex(index);
  };

  location &&
    location.forEach((item) => {
      hotelData.push({
        id: item.id,
        lat: parseFloat(item.location.lat),
        lng: parseFloat(item.location.lng),
        title: item.title,
        thumbUrl: item.image.thumb_url,
        formattedAddress: item.location.formattedAddress,
        price: item.price,
        rating: item.rating,
        ratingCount: item.ratingCount,
      });
    });

  return hotelData.map((singlePostLocation, index) => {
    return (
      <Marker
        key={index}
        icon={MakerImage}
        clusterer={clusterer}
        position={singlePostLocation}
        onClick={() => infoWindowToggle(singlePostLocation.id)}
      >
        {isOpen && markerIndex === singlePostLocation.id ? (
          <HotelInfoWindow
            data={singlePostLocation}
            onCloseClick={() => infoWindowToggle(singlePostLocation.id)}
          />
        ) : (
          ''
        )}
      </Marker>
    );
  });
};

export default HotelMapMarkerCluster;
