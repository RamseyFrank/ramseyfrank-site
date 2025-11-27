import { useState } from "react";
import "./App.css";
import Wave from "./components/Wave";


function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Wave />   {/* 👈 This makes it appear */}

      <h1 style={{ position: "relative", zIndex: 10 }}>
        Hello, you!
      </h1>
    </div>
  );
}


export default App;