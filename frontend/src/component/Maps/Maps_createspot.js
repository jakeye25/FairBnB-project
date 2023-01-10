import React, { useMemo, useState, useEffect } from 'react';
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

const Mapcreatespot = ({ apiKey, lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    // libraries: ["places"]
  });

  // const [center, setCenter] = useState({lat: parseFloat(34.0522), lng: parseFloat(-118.2437)})

  // useEffect(() => {
  //   if(!city) { setCenter({lat: parseFloat(34.0522), lng: parseFloat(-118.2437)})}
  //   if (city == 'Los Angeles') { setCenter({lat: parseFloat(34.0522), lng: parseFloat(-118.2437)})}
  //   if (city == 'San Francisco') { setCenter({lat: parseFloat(37.7749), lng: parseFloat(-122.4194)})}
  //   if (city == 'New York') { setCenter({lat: parseFloat(40.7128), lng: parseFloat(-74.0060)})}
  //   if (city == 'Dallas') { setCenter({lat: parseFloat(32.7767), lng: parseFloat(-96.7970)})}
  //   if (city == 'San Diego') { setCenter({lat: parseFloat(32.7157), lng: parseFloat(-117.1611)})}
  //   if (city == 'Oakland') { setCenter({lat: parseFloat(37.8044), lng: parseFloat(-122.2712)})}

  // }, [city])
  // const center = useMemo(
  //   () => ({ lat: parseFloat(lat), lng: parseFloat(lng) }),
  //   []
  // );
    const center = useMemo(
    () => ({ lat: parseFloat(lat), lng: parseFloat(lng)}),
    []
  );
console.log("check map city", city, center)
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

export default React.memo(Mapcreatespot);
