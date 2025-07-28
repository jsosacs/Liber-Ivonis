import React from 'react';
import { ChessBoard } from '../engine/queens';

interface QueensCanvasProps {
  n: number
  regenerate?: number // Para forzar regeneración
  maxWidth?: number // Ancho máximo disponible
}

const QueenCanvas: React.FC<QueensCanvasProps> = ({ n, regenerate, maxWidth = 400 }) => {
  // Calcular tamaño de casilla basado en el ancho disponible
  const size = Math.min(maxWidth / n, 60); // Máximo 60px por casilla
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [chessBoard, setChessBoard] = React.useState<ChessBoard | null>(null);
  const [queenImage, setQueenImage] = React.useState<HTMLImageElement | null>(null);

  // Cargar imagen de la reina
  React.useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Para evitar problemas de CORS
    img.onload = () => setQueenImage(img);
    img.onerror = () => {
      console.warn('No se pudo cargar la imagen de la reina, usando fallback SVG');
      // Fallback: crear SVG de reina como respaldo
      const svgQueen = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="queenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
            </linearGradient>
          </defs>
          <!-- Crown -->
          <path d="M20 30 L25 20 L30 25 L35 15 L40 25 L45 18 L50 25 L55 18 L60 25 L65 15 L70 25 L75 20 L80 30 Z" 
                fill="url(#queenGradient)" stroke="#B8860B" stroke-width="1"/>
          <!-- Head -->
          <circle cx="50" cy="45" r="12" fill="url(#queenGradient)" stroke="#B8860B" stroke-width="1"/>
          <!-- Body -->
          <path d="M35 55 L65 55 L70 85 L30 85 Z" 
                fill="url(#queenGradient)" stroke="#B8860B" stroke-width="1"/>
          <!-- Base -->
          <rect x="25" y="85" width="50" height="8" 
                fill="url(#queenGradient)" stroke="#B8860B" stroke-width="1"/>
          <!-- Decorative dots -->
          <circle cx="45" cy="65" r="2" fill="#B8860B"/>
          <circle cx="50" cy="70" r="2" fill="#B8860B"/>
          <circle cx="55" cy="65" r="2" fill="#B8860B"/>
        </svg>
      `;
      
      const svgBlob = new Blob([svgQueen], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        setQueenImage(fallbackImg);
        URL.revokeObjectURL(url);
      };
      fallbackImg.src = url;
    };
    
    // Cargar la imagen específica de la reina blanca
    img.src = 'https://static.stands4.com/images/symbol/1/3405_white-queen.png';
  }, []);

  // Crear y resolver el tablero cuando n cambie o se regenere
  React.useEffect(() => {
    const board = new ChessBoard(n);
    board.clearBoard(); // Limpiar el tablero antes de resolver
    board.solveNQueensAndPlace(); // Resuelve y coloca una solución
    setChessBoard(board);
  }, [n, regenerate]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !chessBoard) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the chessboard with realistic colors
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        // Colores de tablero de ajedrez realistas
        ctx.fillStyle = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
        ctx.fillRect(col * size, row * size, size, size);
        
        // Añadir borde sutil a cada casilla
        ctx.strokeStyle = '#8b7355';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(col * size, row * size, size, size);
      }
    }

    // Draw the queens
    chessBoard.getBoard.forEach((row: boolean[], r: number) => {
      row.forEach((cell: boolean, c: number) => {
        if (cell) {
          if (queenImage) {
            // Dibujar imagen de reina con suavizado
            const padding = size * 0.1; // 10% de padding
            const imageSize = size - (padding * 2);
            
            // Habilitar suavizado para mejor calidad
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            ctx.drawImage(
              queenImage,
              c * size + padding,
              r * size + padding,
              imageSize,
              imageSize
            );
          } else {
            // Fallback mejorado: usar emoji estilizado
            ctx.font = `${size * 0.7}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#2c2c2c';
            ctx.fillText(
              '♛',
              c * size + size / 2,
              r * size + size / 2
            );
          }
        }
      });
    });
  }, [chessBoard, n, size, queenImage, maxWidth]);

  return <canvas 
    ref={canvasRef} 
    width={n * size} 
    height={n * size}
    style={{
      border: '1px solid black',
      maxWidth: '100%',
      maxHeight: '80vh', // Máximo 80% de la altura de la ventana
      width: 'auto',
      height: 'auto',
      display: 'block',
      margin: '0 auto',
      objectFit: 'contain' // Mantener proporciones
    }}
  />;

};

export default QueenCanvas;
