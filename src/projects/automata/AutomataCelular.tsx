import { useState, useEffect } from 'react'
import { Grid } from './engine/Grid'
import AutomataCanvas from './components/AutomataCanvas'
import type { Rules } from '../../common/types'
import AppLayout from '../../components/AppLayout'
import '../../index.css'

const WIDTH = 50
const HEIGHT = 50
const CELL_SIZE = 15

const rulesBlack: Rules = { survive: [2, 3], born: [3] }
const colorBlack = '#000'

export default function AutomataCelular() {
  const [grid] = useState(() => new Grid(WIDTH, HEIGHT, rulesBlack, colorBlack))
  const [running, setRunning] = useState(false)
  const [tick, setTick] = useState(0)
  const [speed, setSpeed] = useState(200)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      grid.step()
      setTick(t => t + 1)
    }, speed)
    return () => clearInterval(interval)
  }, [running, grid, speed])

  function handleCellToggle(x: number, y: number, newState?: 0 | 1) {
    if (newState !== undefined) {
      grid.cells[y][x].state = newState
    } else {
      grid.toggleCell(x, y)
    }
    setTick(t => t + 1)
  }

  function resetGrid() {
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        grid.cells[y][x].state = 0
      }
    }
    setTick(t => t + 1)
    setRunning(false)
  }

  return (
    <AppLayout>
      <h2>Autómata Celular</h2>
      <div style={{ width: '100%', overflowX: 'auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          <AutomataCanvas
            grid={grid}
            cellSize={CELL_SIZE}
            onCellToggle={handleCellToggle}
            tick={tick}
          />
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setRunning(!running)}>{running ? 'Pausar' : 'Iniciar'}</button>
        <button onClick={resetGrid} style={{ marginLeft: '1rem' }}>Reiniciar</button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="speedRange">Velocidad: {speed} ms</label><br />
        <input
          id="speedRange"
          type="range"
          min={50}
          max={1000}
          step={10}
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          disabled={!running}
        />
      </div>
    </AppLayout>
  )
}
