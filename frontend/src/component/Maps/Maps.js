import React, { useMemo } from 'react';
import { Circle, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import Map from './Googlemap';
import './Googlemap.css'

const containerStyle = {
  width: '100%',
  // width: '600px',
  height: '600px',
};

// const center = {
//   lat: 34.0522,
//   lng: -118.2437,
// };
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
// let google = this.props.google
// const icon = {
//   url: "https://iconarchive.com/download/i104059/blackvariant/button-ui-system-folders-alt/Home.ico", // url
//   scaledSize: new window.google.maps.Size(40, 40), // scaled size
//   origin: new window.google.maps.Point(0, 0), // origin
//   anchor: new window.google.maps.Point(0, 0) // anchor
// };

const Maps = ({ apiKey, lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    // libraries: ["places"]
  });
  console.log("checking apikey", apiKey, lat, lng)

  const center = useMemo(
    () => ({ lat: parseFloat(lat), lng: parseFloat(lng) }),
    []
  );

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  if (!isLoaded)
    return (
      <div>Loading...</div>
    )
  return (
    <>
      {isLoaded && (
        <>
          {/* <div>{apiKey}</div> */}
          <GoogleMap
            mapContainerStyle={containerStyle}
            mapContainerClassName="map-container"
            center={center}
            zoom={14}
            options={options}
          >
            {center &&
              <>

                <Marker
                  title='Exact address will be shown after booking'
                  position={center}
                  icon="https://img.icons8.com/bubbles/100/null/home.png"

                />
                {/* <Circle center={center} radius={1000} options={closeOptions} /> */}
              </>}
          </GoogleMap>
        </>
        // <Map />
      )}
    </>
  );
};

export default React.memo(Maps);
