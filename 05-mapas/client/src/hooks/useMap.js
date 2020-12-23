import { useRef, useEffect, useState, useCallback } from "react";
import { v4 as uuid } from "uuid";
import mapboxgl from "mapbox-gl";
import { Subject } from "rxjs";

mapboxgl.accessToken =
  "pk.eyJ1IjoibGF1dGFyb2FuZHJlc3NhZXoiLCJhIjoiY2tpdzNuOWI1MDl5MjJwbXlndHg4cGlwbCJ9.h8Y3rmPm0hDAfdfepQJ7Dw";

export const useMap = (mapRef, initialPoint) => {
  const map = useRef();

  //observables

  const moveMarker = useRef(new Subject());
  const newMarker = useRef(new Subject());

  const markers = useRef({})

  const [point, setPoint] = useState(initialPoint);


  const createMarker = useCallback((lng, lat, id) => {
    const marker = new mapboxgl.Marker();

    marker.id = id ? id : uuid();

    marker.setLngLat([lng, lat]).addTo(map.current).setDraggable(true);

    markers.current[ marker.id ] = marker

    //Si el marcador tiene id no emitir

    if (!id) {
      newMarker.current.next( {
        id: marker.id,
        lng,
        lat,
      } );
    }

    //escuchar movimientos del marcador

    marker.on("drag", ({ target }) => {
      const { id } = target;
      const { lng, lat } = target.getLngLat();

      //Todo: Emitir los cambios del marcador
      moveMarker.current.next({
        id,
        lat,
        lng,
      });
    });
  }, []);

  const updateMarker = useCallback((lng, lat, id) => {
    markers.current[id].setLngLat([lng, lat])
  }, []);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [point.lng, point.lat],
      zoom: point.zoom,
    });
  }, []);

  useEffect(() => {
    map.current.on("move", () => {
      const { lng, lat } = map.current.getCenter();
      const zoom = map.current.getZoom();
      setPoint({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: zoom.toFixed(2),
      });
    });

    return () => map.current.off("move");
  }, []);

  //agregar un marcador cuando hago click

  useEffect(() => {
    map.current?.on("click", ({ lngLat: { lng, lat } }) =>
      createMarker(lng, lat)
    );

    return () => map.current.off("click");
  }, [createMarker]);

  return {
    createMarker,
    updateMarker,
    point,
    newMarker$: newMarker.current,
    moveMarker$: moveMarker.current,
    markers,
  };
};
