import React, { useRef, useEffect, useState, useContext } from "react";

import { SocketContext } from "../contexts/SocketContext";

import { useMap } from "../hooks/useMap";

const initialPoint = {
  lng: -122.4,
  lat: 37.78,
  zoom: 13,
};

export default function MapPage() {
  const mapRef = useRef();

  const { socket } = useContext(SocketContext);

  const { point, createMarker, updateMarker, moveMarker$, newMarker$ } = useMap(
    mapRef,
    initialPoint
  );

  useEffect(() => {
    socket.on("actives", (markers) => {
      Object.values(markers).forEach(({ id, lng, lat }) => {
        createMarker(lng, lat, id);
      });
    });
  }, [socket, createMarker]);

  useEffect(() => {
    socket.on("new", ({ id, lng, lat }) => {
      createMarker(lng, lat, id);
    });
  }, [socket, createMarker]);

  useEffect(() => {
    socket.on("update", ({ id, lng, lat }) => {
      updateMarker(lng, lat, id);
    });
  }, [socket, updateMarker]);

  useEffect(() => {
    newMarker$.subscribe((marker) => {
      socket.emit("new", marker);
    });
  }, [newMarker$, socket]);

  useEffect(() => {
    moveMarker$.subscribe((marker) => {
      socket.emit("update", marker);
    });
  }, [moveMarker$, socket]);

  return (
    <>
      <div className="info">
        Longitud: {point.lng} | Latitud: {point.lat} | Zoom: {point.zoom}
      </div>
      <div ref={mapRef} className="map-container" />
    </>
  );
}
