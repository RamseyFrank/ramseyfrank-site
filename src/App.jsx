import { useState } from 'react';
import "./App.css";
import Wave from "./components/Wave";
import Particles from "./components/Particles";
import XMBNav from "./components/XMBNav";
import TileSystem from "./components/TileSystem";

function App() {
  const [activeCategory, setActiveCategory] = useState('home');
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollLeft);
  };

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
        <XMBNav onCategoryChange={setActiveCategory} />
        <div 
          style={{
            position: 'fixed',
            top: '400px',
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'auto',
            zIndex: 40,
          }}
        >
          <TileSystem selectedCategory={activeCategory} />
        </div>
      </div>
    </div>
  );
}

export default App;