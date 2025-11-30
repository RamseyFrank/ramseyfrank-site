import "./App.css";
import Wave from "./components/Wave";
import Particles from "./components/Particles";

function App() {
  return (
    <div className="app-root">

      <div className="layer-base" />                     {/* Background */}
      <div className="layer-waves"><Wave /></div>       {/* Waves */}
      <div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none", // lets UI clicks pass through
    zIndex: 2, // above waves, below UI
    
  }}
>
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={20}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>
 {/* Particles */}
      <div className="layer-ui">                        {/* UI */}
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
