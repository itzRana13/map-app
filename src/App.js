// App.js
import React, { useState } from 'react';
import MapComponent from './components/Map';
import PointTool from './components/PointTool';
import PolygonTool from './components/PolygonTool';
import LineTool from './components/LineTool';
import './App.css'; // Import CSS file for styling

const App = () => {
  const [selectedTool, setSelectedTool] = useState('point'); // Set 'point' as the default tool

  const renderTool = () => {
    switch (selectedTool) {
      case 'point':
        return <PointTool />;
      case 'line':
        return <LineTool />;
      case 'polygon':
        return <PolygonTool />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>OpenLayers  map</h1>
      </header>
      <nav>
        <button onClick={() => setSelectedTool('point')}>Draw Point</button>
        <button onClick={() => setSelectedTool('line')}>Draw Line</button>
        <button onClick={() => setSelectedTool('polygon')}>Draw Polygon</button>
      </nav>
      <div className="map-container">{renderTool()}</div>
      <footer>
        <p>© 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default App;
