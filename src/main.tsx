import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import AutomataCelular from './projects/automata/AutomataCelular'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/Liber-Ivonis"> {/* ← importante para GitHub Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Automata" element={<AutomataCelular />} />
        {/* Puedes añadir más proyectos aquí */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
