// PolygonTool.js
import React, { useEffect, useState } from 'react';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import EraserButton from './EraserButton';

const PolygonTool = () => {
  const [map, setMap] = useState(null);
  const [vectorLayer, setVectorLayer] = useState(null);

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

    const vectorLayerInstance = new VectorLayer({
      source: new VectorSource(),
    });

    mapInstance.addLayer(vectorLayerInstance);

    const draw = new Draw({
      source: vectorLayerInstance.getSource(),
      type: 'Polygon',
    });

    const modify = new Modify({ source: vectorLayerInstance.getSource() });

    const snap = new Snap({ source: vectorLayerInstance.getSource() });

    mapInstance.addInteraction(draw);
    mapInstance.addInteraction(modify);
    mapInstance.addInteraction(snap);

    setMap(mapInstance);
    setVectorLayer(vectorLayerInstance);

    return () => {
      mapInstance.removeInteraction(draw);
      mapInstance.removeInteraction(modify);
      mapInstance.removeInteraction(snap);
    };
  }, []);

  const handleEraserClick = () => {
    if (vectorLayer) {
      vectorLayer.getSource().clear();
    }
  };

  return (
    <div>
      <EraserButton onClick={handleEraserClick} />
      <div id="map" style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default PolygonTool;
