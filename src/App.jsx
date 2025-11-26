import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Hello, you!</h1>
      <button onClick={() => setCount(count + 1)}>
        Count is {count}
      </button>

      {/* Wave bars - outside of button */}
      <div className="wave">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
    </div>
  );
}

export default App;

