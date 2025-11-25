// All imports go at the top
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Threads from './Threads'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      
      {/* Threads Background */}
      <Threads
        amplitude={1}
        distance={0}
        enableMouseInteraction={true}
      />

      {/* Your UI on top of threads */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1>Code Slayer for Life</h1>

        <div className="card">
          <button onClick={() => setCount(count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>

    </div>
  )
}

export default App
