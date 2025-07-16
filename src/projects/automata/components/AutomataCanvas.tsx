import React from 'react'
import type { Grid } from '../engine/Grid'

interface AutomataCanvasProps {
  grid: Grid
  cellSize: number
  onCellToggle: (x: number, y: number, newState: 0 | 1) => void
  tick: number
}

const AutomataCanvas: React.FC<AutomataCanvasProps> = ({ grid, cellSize, onCellToggle, tick }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [isMouseDown, setIsMouseDown] = React.useState(false)
  const [drawMode, setDrawMode] = React.useState<0 | 1 | null>(null)


  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    for (let y = 0; y < grid.height; y++) {
      for (let x = 0; x < grid.width; x++) {
        const cell = grid.cells[y][x]
        ctx.fillStyle = cell.state === 1 ? cell.color : '#eee'
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        ctx.strokeStyle = '#ccc'
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
      }
    }
  }, [tick, grid, cellSize])

  function onCellSet(x: number, y: number, newState: 0 | 1) {
    const cell = grid.cells[y][x]
    if (cell.state !== newState) {
      cell.state = newState
      onCellToggle(x, y, newState) // Usamos esto para notificar que algo cambió
    }
  }


  function getMouseCoords(event: React.MouseEvent): [number, number] | [null, null] {
    const canvas = canvasRef.current
    if (!canvas) return [null, null]
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / cellSize)
    const y = Math.floor((event.clientY - rect.top) / cellSize)
    if (x < 0 || x >= grid.width || y < 0 || y >= grid.height) return [null, null]
    return [x, y]
  }

  return (
    <canvas
      ref={canvasRef}
      width={grid.width * cellSize}
      height={grid.height * cellSize}
      style={{ border: '1px solid black', cursor: 'pointer' }}
      onMouseDown={e => {
        const [x, y] = getMouseCoords(e)
        if (x === null || y === null) return
        const currentState = grid.cells[y][x].state
        const newState: 0 | 1 = currentState === 1 ? 0 : 1
        setDrawMode(newState)
        setIsMouseDown(true)
        onCellSet(x, y, newState)
      }}
      onMouseUp={() => {
        setIsMouseDown(false)
        setDrawMode(null)
      }}
      onMouseLeave={() => {
        setIsMouseDown(false)
        setDrawMode(null)
      }}
      onMouseMove={e => {
        if (!isMouseDown || drawMode === null) return
        const [x, y] = getMouseCoords(e)
        if (x !== null && y !== null) {
          onCellSet(x, y, drawMode)
        }
      }}
    />

  )
}

export default AutomataCanvas
