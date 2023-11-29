import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '70vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 42.62150230704702, // Default latitude
    lng: 25.381937039679805, // Default longitude
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCeQwTHYQEuWZno-_5Mu5r_Qw5PsD64d6g">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      />
    </LoadScript>
  );
};

export default MapContainer;
