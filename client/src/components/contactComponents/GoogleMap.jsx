import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 42.62229919433594, // Default latitude
    lng: 25.374454498291016, // Default longitude
  };

  const defaultOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCeQwTHYQEuWZno-_5Mu5r_Qw5PsD64d6g">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={17}
        center={defaultCenter}
        options={defaultOptions}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;