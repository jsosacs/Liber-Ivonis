/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Paula Díaz Jorge
 * @since 06/03/2025
 * @desc Eight Queens problem
 * @file Represents the chess board
 */

/**
 * @class ChessBoard
 * @desc Represents the chess board where the queens are placed and the methods to solve the N-Queens
 * @property {boolean[][]} board - Represents the chess board
 * @property {number} SIZE - Represents the size of the board and the number of queens
 */
export class ChessBoard {
  private board: boolean[][];
  private readonly SIZE: number;

  /**
   * @desc Constructor of the class.
   * Initializes the board of the game.
   * @param {number} size - The size of the board and the number of queens
   */
  constructor(size: number) {
    this.board = new Array(size).fill(false).map(() => new Array(size).fill(false));
    this.SIZE = size;
  }

  /**
   * @desc Getter for the board
   * @returns The current state of the board
   */
  get getBoard(): boolean[][] {
    return this.board;
  }

  /**
   * @desc Displays the board of the game.
   */
  printBoard(): void {
    console.log(this.board.map(row => row.map(cell => cell ? 'Q' : '.').join(' ')));
  }

  /**
   * @desc Checks if a given location is safe to place a queen.
   * @param {number} row - The row of the location.
   * @param {number} column - The column of the location.
   * @returns True if the location is safe, false otherwise.
   */
  isSafe(row: number, column: number): boolean {
    for (let x = 0; x < column; ++x) { // checks if there is a queen in the same row to the left
      if (this.board[row][x]) return false;
    }
    
    for (let x = row, y = column; x >= 0 && y >= 0; x--, y--) { // checks if there is a queen in the upper left diagonal
      if (this.board[x][y]) return false;
    }

    for (let x = row, y = column; x < this.SIZE && y >= 0; x++, y--) { // checks if there is a queen in the lower left diagonal
      if (this.board[x][y]) return false;
    }

    return true;
  }

  /**
   * @desc Clears the board
   */
  clearBoard(): void {
    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        this.board[i][j] = false;
      }
    }
  }

  /**
   * @desc Shuffles an array randomly
   * @param array The array to shuffle
   * @returns The shuffled array
   */
  private shuffleArray(array: number[]): number[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * @desc Solves the N-Queens problem recursively and finds one solution with randomization
   * @param {number} column - The column to place the queen
   * @returns True if a solution is found, false otherwise
   */
  solveNQueensAndPlace(column: number = 0): boolean {
    if (column >= this.SIZE) {
      return true; // Found a solution
    }

    // Create array of row indices and shuffle them for randomness
    const rows = Array.from({ length: this.SIZE }, (_, i) => i);
    const shuffledRows = this.shuffleArray(rows);

    for (const i of shuffledRows) {
      if (this.isSafe(i, column)) {
        this.board[i][column] = true; // place the queen
        if (this.solveNQueensAndPlace(column + 1)) {
          return true; // Solution found
        }
        this.board[i][column] = false; // backtrack if placing the queen doesn't lead to a solution
      }
    }
    return false; // No solution found
  }

  /**
   * @desc Solves the N-Queens problem recursively (original method for counting solutions)
   * @param {number} column - The column to place the queen
   * @returns The number of solutions for the number of queens
   */
  solveNQueens(column: number = 0): number {
    if (column >= this.SIZE) {
      return 1;
    }

    let count = 0;
    for (let i = 0; i < this.SIZE; i++) {
      if (this.isSafe(i, column)) {
        this.board[i][column] = true; // place the queen
        count += this.solveNQueens(column + 1);
        this.board[i][column] = false; // backtrack if placing the queen doesn't lead to a solution
      }
    }
    return count;
  }
}