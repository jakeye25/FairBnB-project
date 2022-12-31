import { useState, useMemo, useCallback, useRef } from "react";
import { Circle, DirectionsRenderer, GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";

import './Googlemap.css'
// GoogleMap.maps.LatLngLiteral
let LatLngLiteral = google.maps.LatLngLiteral


export default function Map() {
    const center = useMemo(() => ({ lat: 34.0522, lng: -118.2437 }), [])
    const options = useMemo(() => ({
        clickableIcons: false
    }), [])


    return (
        <div>
            <h1>testing</h1>
            <div>
                <GoogleMap
                zoom={10}
                center={center}
                mapContainerClassName='map-container'
                options={options}></GoogleMap>
            </div>
        </div>
    )
}
