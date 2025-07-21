import { useRef, useEffect, useState } from 'react'

const CELL_SIZE = 20
const WIDTH = 20
const HEIGHT = 20

type Coord = { x: number, y: number }

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<Coord[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Coord>({ x: 5, y: 5 })
  const [dir, setDir] = useState<Coord>({ x: 1, y: 0 })
  const [running, setRunning] = useState(true)
  const [paused, setPaused] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood({ x: 5, y: 5 })
    setDir({ x: 1, y: 0 })
    setRunning(true)
    setPaused(false)
    setGameOver(false)
  }

  const handleMobileMove = (direction: 'up' | 'down' | 'left' | 'right') => {
  const map: Record<string, Coord> = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  }
  setDir(map[direction])
}

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Coord> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      }

      if (e.key === ' ') {
        setPaused(p => !p)
        return
      }

      if (map[e.key]) {
        setDir(map[e.key])
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (!running || paused || gameOver) return

    const interval = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y }

        // colisiones
        const hitWall = head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT
        const hitSelf = prev.some(p => p.x === head.x && p.y === head.y)

        if (hitWall || hitSelf) {
          setGameOver(true)
          setRunning(false)
          return prev
        }

        const newSnake = [head, ...prev]

        if (head.x === food.x && head.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * WIDTH),
            y: Math.floor(Math.random() * HEIGHT),
          })
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, 150)

    return () => clearInterval(interval)
  }, [dir, running, paused, gameOver])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // comida
    ctx.fillStyle = 'red'
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)

    // snake
    ctx.fillStyle = 'green'
    for (const s of snake) {
      ctx.fillRect(s.x * CELL_SIZE, s.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    }
  }, [snake, food])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={CELL_SIZE * WIDTH}
        height={CELL_SIZE * HEIGHT}
        style={{border: '1px solid black',
                cursor: 'pointer',
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
            }}
      />
      <div className="mobile-controls">
        <div className="row">
          <button onClick={() => handleMobileMove('up')}>↑</button>
        </div>
        <div className="row">
          <button onClick={() => handleMobileMove('left')}>←</button>
          <div style={{ width: '2rem' }} />
          <button onClick={() => handleMobileMove('right')}>→</button>
        </div>
        <div className="row">
          <button onClick={() => handleMobileMove('down')}>↓</button>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        {gameOver && <p>💀 Game Over</p>}
        {!gameOver && paused && <p>⏸ Pausa</p>}
        {!gameOver && !paused && <p>▶️ Jugando</p>}
        <button onClick={resetGame} style={{ marginTop: '0.5rem' }}>
          Reiniciar
        </button>
      </div>
    </div>
  )
}
