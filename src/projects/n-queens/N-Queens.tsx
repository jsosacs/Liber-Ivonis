import AppLayout from '../../components/AppLayout'
import QueenCanvas from './components/QueenCanvas'
import React from 'react';

export default function NQueens() {
  const [n, setN] = React.useState(8); // Número de reinas por defecto
  const [key, setKey] = React.useState(0); // Para forzar re-render

  const handleNewSolution = () => {
    setKey(prev => prev + 1); // Fuerza una nueva solución
  };

  return (
    <AppLayout>
      <h2>N-Queens Problem</h2>
      <p>Encuentra una disposición válida de {n} reinas en un tablero de {n}×{n} donde ninguna ataque a otra.</p>
      
      <div style={{ width: '100%', overflowX: 'auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          <QueenCanvas n={n} regenerate={key} />
        </div>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleNewSolution} style={{ marginRight: '1rem' }}>
          Nueva Solución
        </button>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="N-Queens">Número de reinas: {n}</label><br />
        <input
          id="N-Queens"
          type="range"
          min={1}
          max={15}
          step={1}
          value={n}
          onChange={e => setN(Number(e.target.value))}
        />
      </div>
    </AppLayout>
  )
}
