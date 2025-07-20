import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Proyectos from './pages/Proyectos'
import Home from './pages/Home'
import AutomataCelular from './projects/automata/AutomataCelular'
import Snake from './projects/snake/Snake'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/Liber-Ivonis"> {/* ← importante para GitHub Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Proyectos" element={<Proyectos />} />
        <Route path="/Proyectos/Automata" element={<AutomataCelular />} />
        <Route path="/Proyectos/Snake" element={<Snake />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
