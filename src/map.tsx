import React, { useState, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const LocationMap = ({ currentLocation, mapZoom, onZoomChange }) => {
  const [viewState, setViewState] = useState({
    longitude: currentLocation.lng,
    latitude: currentLocation.lat,
    zoom: mapZoom,
  });

  // Update viewState when props change
  useEffect(() => {
    setViewState({
      longitude: currentLocation.lng,
      latitude: currentLocation.lat,
      zoom: mapZoom,
    });
  }, [currentLocation.lng, currentLocation.lat, mapZoom]);

  // Update parent component when user interacts with map
  const handleViewStateChange = (newViewState) => {
    setViewState(newViewState);
    if (onZoomChange) {
      onZoomChange(newViewState.zoom);
    }
  };

  return (
    <div className="w-full h-80 rounded-md overflow-hidden">
      <Map
        {...viewState}
        mapboxAccessToken="pk.eyJ1Ijoic2Vhbndlc3NtaXRoIiwiYSI6ImNqaTNhOGc4ZjE0N2Qza3BpdGd6Mm40eWwifQ.bkp78fK7a_EX87as1ydi2Q"
        onMove={(evt) => handleViewStateChange(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          longitude={currentLocation.lng}
          latitude={currentLocation.lat}
          color="red"
          anchor="bottom"
        />
        <NavigationControl position="bottom-right" />
      </Map>
    </div>
  );
};

export default LocationMap;
