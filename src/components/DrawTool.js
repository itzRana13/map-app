// DrawTool.js
import React, { useEffect, useState } from 'react';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const DrawTool = ({ tool }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
    });

    map.addLayer(vectorLayer);

    let draw, modify, snap;

    switch (tool) {
      case 'point':
        draw = new Draw({
          source: vectorLayer.getSource(),
          type: 'Point',
        });
        break;
      case 'line':
        draw = new Draw({
          source: vectorLayer.getSource(),
          type: 'LineString',
        });
        break;
      case 'polygon':
        draw = new Draw({
          source: vectorLayer.getSource(),
          type: 'Polygon',
        });
        break;
      default:
        return; // No tool selected
    }

    modify = new Modify({ source: vectorLayer.getSource() });
    snap = new Snap({ source: vectorLayer.getSource() });

    map.addInteraction(draw);
    map.addInteraction(modify);
    map.addInteraction(snap);

    return () => {
      map.removeInteraction(draw);
      map.removeInteraction(modify);
      map.removeInteraction(snap);
    };
  }, [map, tool]);

  useEffect(() => {
    const mapInstance = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    setMap(mapInstance);

    return () => {
      mapInstance.setTarget(null);
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default DrawTool;
