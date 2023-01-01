import { useState, useMemo, useCallback, useRef } from "react";
import { Circle, DirectionsRenderer, GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import './Googlemap.css'
import Places from "./places";
// GoogleMap.maps.LatLngLiteral
// let LatLngLiteral = window.google.maps.LatLngLiteral
// window.google.maps.LatLng

export default function Map() {
    const [office, setOffice] = useState()
    const mapRef = useRef()
    const center = useMemo(() => ({ lat: 34.0522, lng: -118.2437 }), [])
    const options = useMemo(() => ({
        clickableIcons: false
    }), [])

    const onLoad = useCallback(map=> (mapRef.current = map),[])

    return (
        <div>
            <h1>testing</h1>
            <h1>testing</h1>
            <h1>testing</h1>
            <h1>testing</h1>
            <h1>testing</h1>

            {/* <div>
                <GoogleMap
                zoom={11}
                center={center}
                mapContainerClassName='map-container'
                options={options}
                onLoad={onLoad}
                ></GoogleMap>
            </div> */}
            <Places
            setOffice={(position) => {
                setOffice(position);
                mapRef.current?.panTo(position)
            }}
            />
        </div>
    )
}
