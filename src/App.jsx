import { useState } from "react";
import "./App.css";
import Wave from "./components/Wave";


function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Wave />   {/* 👈 This makes it appear */}

      <h1 style={{ position: "relative", zIndex: 10 }}>
        Ramsey Frank's Personal Website <br />
        <span style={{ fontSize: "1.5rem", color: "#6b7078" }}>
          A place to learn about me and my work
        </span>
      </h1>
    </div>
  );
}


export default App;