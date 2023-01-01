import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import Map from './Googlemap';


const containerStyle = {
  width: '600px',
  height: '600px',
};

const center = {
  lat: 34.0522,
  lng: -118.2437,
};

const Maps = ({ apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries:["places"]
  });

  if(!isLoaded)
  return(
    <div>Loading...</div>
  )
  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        />
        // <Map />
      )}
    </>
  );
};

export default React.memo(Maps);
