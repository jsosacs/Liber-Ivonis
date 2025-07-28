import AppLayout from '../../components/AppLayout'
import QueenCanvas from './components/QueenCanvas'
import React from 'react';

export default function NQueens() {
  const [n, setN] = React.useState(8); // Número de reinas por defecto
  const [key, setKey] = React.useState(0); // Para forzar re-render
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(400);

  const handleNewSolution = () => {
    setKey(prev => prev + 1); // Fuerza una nueva solución
  };

  // Detectar cambios de tamaño del contenedor
  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width - 40); // Restar padding/márgenes
      }
    };

    updateWidth(); // Inicial
    window.addEventListener('resize', updateWidth);
    
    // También actualizar cuando cambie N
    const timeout = setTimeout(updateWidth, 100);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timeout);
    };
  }, [n]);

  return (
    <AppLayout>
      <h2>N-Queens Problem</h2>
      <p>Encuentra una disposición válida de {n} reinas en un tablero de {n}×{n} donde ninguna ataque a otra.</p>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button onClick={handleNewSolution} style={{ marginRight: '1rem', fontSize: '1.2rem'}}>
          Nueva Solución
        </button>
      </div>
      
      <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '1.8rem' }}>
        <label htmlFor="N-Queens">Número de reinas: {n}</label><br />
        <input
          id="N-Queens"
          type="range"
          min={4}
          max={27}
          step={1}
          value={n}
          onChange={e => setN(Number(e.target.value))}
        />
      </div>
      
      <div ref={containerRef} style={{ width: '100%', overflowX: 'auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          <QueenCanvas n={n} regenerate={key} maxWidth={containerWidth} />
        </div>
      </div>
      

    </AppLayout>
  )
}
