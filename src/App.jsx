import { useState } from 'react';
import "./App.css";
import XMBIntro from "./components/XmbIntro";
import Wave from "./components/Wave";
import Particles from "./components/Particles";
import XMBNav from "./components/XMBNav";
import TileSystem from "./components/TileSystem";

function App() {
  const [activeCategory, setActiveCategory] = useState('home');

  return (
    <div className="app-root">
      <XMBIntro />
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
        <XMBNav onCategoryChange={setActiveCategory} />
        <TileSystem selectedCategory={activeCategory} />
      </div>
    </div>
  );
}

export default App;