import { Cell } from './Cell'
import type { Rules } from '../../../common/types'

export class Grid {
  width: number
  height: number
  cells: Cell[][]

  constructor(width: number, height: number, defaultRules: Rules, defaultColor: string) {
    this.width = width
    this.height = height
    this.cells = []

    for (let y = 0; y < height; y++) {
      this.cells[y] = []
      for (let x = 0; x < width; x++) {
        this.cells[y][x] = new Cell(0, defaultRules, defaultColor)
      }
    }
  }

  countNeighbors(x: number, y: number): number {
    let count = 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue
        const nx = x + dx
        const ny = y + dy
        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
          if (this.cells[ny][nx].state === 1) count++
        }
      }
    }
    return count
  }

  step() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const aliveNeighbors = this.countNeighbors(x, y)
        this.cells[y][x].computeNextState(aliveNeighbors)
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.cells[y][x].updateState()
      }
    }
  }

  toggleCell(x: number, y: number) {
    const cell = this.cells[y][x]
    cell.state = cell.state === 1 ? 0 : 1
  }
}
