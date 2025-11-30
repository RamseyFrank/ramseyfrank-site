import "./App.css";
import Wave from "./components/Wave";
import Particles from "./components/Particles";

function App() {
  return (
    <div className="app-root">

      <div className="layer-base" />                     {/* Background */}
      <div className="layer-waves"><Wave /></div>       {/* Waves */}
      <div className="layer-particles"><Particles /></div> {/* Particles */}
      <div className="layer-ui">                        {/* UI */}
        <h1>
          Ramsey Frank's Personal Website <br />
          <span style={{ fontSize: "1.5rem", color: "#6b7078" }}>
            A place to learn about me and my work
          </span>
        </h1>
      </div>

    </div>
  );
}

export default App;
