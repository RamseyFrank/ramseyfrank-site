import { useState } from 'react';
import "./App.css";
import XMBIntro from "./components/XmbIntro";
import Wave from "./components/Wave";
import Particles from "./components/Particles";
import XMBNav from "./components/XMBNav";
import TileSystem from "./components/TileSystem";

function App() {
  const [activeCategory, setActiveCategory] = useState('home');
  const [lightMode, setLightMode] = useState(false);
  const [skillSelected, setSkillSelected] = useState(false);

  return (
    <div className="app-root" style={{ background: lightMode ? 'linear-gradient(135deg, #f8f6f3 0%, #faf8f5 25%, #f5f3f0 75%, #f8f6f3 100%)' : 'linear-gradient(135deg, #000000 0%, #0d0d0d 25%, #1a1a1a 50%, #0d0d0d 75%, #000000 100%)' }}>
      <XMBIntro lightMode={lightMode} />
      <div className="layer-base" />
      <div className="layer-waves"><Wave lightMode={lightMode} /></div>
      <div className="layer-particles">
        <Particles
          particleCount={100}
          particleSpread={5}
          cameraDistance={15}
          particleBaseSize={35}
          sizeRandomness={0.5}
          lightMode={lightMode}
        />
      </div>
      <div className="layer-ui">
        <XMBNav 
          onCategoryChange={setActiveCategory}
          currentCategory={activeCategory}
          skillSelected={skillSelected}
          onThemeChange={setLightMode}
        />
        <TileSystem 
          selectedCategory={activeCategory}
          lightMode={lightMode}
          onSkillSelect={setSkillSelected}
        />
      </div>
    </div>
  );
}

export default App;