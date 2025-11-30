import "./App.css";
import Wave from "./components/Wave";
import Particles from "./components/Particles";

function App() {
  return (
    <div className="app-root">
      <div className="layer-base" />
      <div className="layer-waves"><Wave /></div>
      <div className="layer-particles">
      <Particles
  particleCount={200}
  particleSpread={5}        // Try reducing this
  cameraDistance={15}       // Try reducing this
  particleBaseSize={50}     // Try reducing this
  sizeRandomness={0.5}
/>
      </div>
      <div className="layer-ui">
        <h1>
          <br />
          <span style={{ fontSize: "1.5rem", color: "#6b7078" }}>
            
          </span>
        </h1>
      </div>
    </div>
  );
}

export default App;