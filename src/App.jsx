import { useState } from 'react';
import "./App.css";
import Wave from "./components/Wave";
import Particles from "./components/Particles";
import XMBNav from "./components/XMBNav";
import TileSystem from "./components/TileSystem";

function App() {
  const [activeCategory, setActiveCategory] = useState('home');

  return (
    <div className="app-root">
      <div className="layer-base" />
      <div className="layer-waves"><Wave /></div>
      <div className="layer-particles">
        <Particles
          particleCount={100}
          particleSpread={5}
          cameraDistance={15}
          particleBaseSize={35}
          sizeRandomness={0.5}
        />
      </div>
      <div className="layer-ui">
        <h1>
          <br />
          <span style={{ fontSize: "1.5rem", color: "#6b7078" }}>
            
          </span>
        </h1>
        <XMBNav onCategoryChange={setActiveCategory} />
        <TileSystem selectedCategory={activeCategory} />
      </div>
    </div>
  );
}

export default App;