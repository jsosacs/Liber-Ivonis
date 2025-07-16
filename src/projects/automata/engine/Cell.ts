import type { State, Rules } from '../../../common/types'

export class Cell {
  state: State
  nextState: State
  rules: Rules
  color: string

  constructor(state: State, rules: Rules, color: string) {
    this.state = state
    this.nextState = state
    this.rules = rules
    this.color = color
  }

  computeNextState(aliveNeighbors: number) {
    if (this.state === 1) {
      this.nextState = this.rules.survive.includes(aliveNeighbors) ? 1 : 0
    } else {
      this.nextState = this.rules.born.includes(aliveNeighbors) ? 1 : 0
    }
  }

  updateState() {
    this.state = this.nextState
  }
}
