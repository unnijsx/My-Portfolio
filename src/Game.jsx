// src/components/ChessGame.js
import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessGame = () => {
  // 'game' holds the complete game state and logic.
  const [game, setGame] = useState(new Chess());
  // 'gameStatus' will hold messages like "Checkmate!", "Stalemate!", etc.
  const [gameStatus, setGameStatus] = useState('');

  // This function is called whenever the 'game' state changes.
  // It's used to trigger the AI's move after the player's move.
  useEffect(() => {
    // Exit early if the game is over
    if (game.isGameOver()) {
      handleGameOver();
      return;
    }

    // If it's the AI's turn (black), make a move
    if (game.turn() === 'b') {
      // Use a timeout to simulate "thinking"
      setTimeout(makeAIMove, 1000);
    }
  }, [game]); // The effect depends on the 'game' state

  // --- Game State and Logic ---

  // Function to update the game state with a new move
  function makeMove(move) {
    const gameCopy = new Chess(game.fen()); // Create a new instance from the current position
    const result = gameCopy.move(move);
    if (result) {
      setGame(gameCopy); // Update the game state
    }
    return result; // Can be null if the move is illegal
  }

  // Handle the game over condition
  function handleGameOver() {
    let status = '';
    if (game.isCheckmate()) {
      status = `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`;
    } else if (game.isDraw()) {
      status = "It's a draw!";
    } else if (game.isStalemate()) {
      status = 'Stalemate!';
    } else if (game.isThreefoldRepetition()) {
      status = 'Draw by threefold repetition!';
    } else if (game.isInsufficientMaterial()) {
      status = 'Draw by insufficient material!';
    }
    setGameStatus(status);
  }

  // --- Player Interaction ---

  // Function to handle when a piece is dropped on the board
  function onDrop(sourceSquare, targetSquare) {
    // Prevent player from moving when it's not their turn
    if (game.turn() !== 'w') return false;

    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Always promote to a queen for simplicity
    });

    // If the move is illegal, 'makeMove' will return null
    if (move === null) {
      return false; // This will snap the piece back to its original square
    }

    return true;
  }

  // --- AI Logic ---

  // The AI makes a move
  function makeAIMove() {
    const bestMove = findBestMove();
    if (bestMove) {
      makeMove(bestMove);
    }
  }

  // Simple AI to find the best move (one-ply lookahead)
  function findBestMove() {
    const possibleMoves = game.moves();
    // If there are no moves, the game is over
    if (possibleMoves.length === 0) return null;

    let bestMove = null;
    let bestValue = -Infinity;

    // Iterate through all possible moves
    for (const move of possibleMoves) {
      const gameCopy = new Chess(game.fen());
      gameCopy.move(move);
      // Evaluate the board state after the move
      const boardValue = -evaluateBoard(gameCopy); // Negative because it's opponent's turn
      if (boardValue > bestValue) {
        bestValue = boardValue;
        bestMove = move;
      }
    }

    return bestMove;
  }

  // A simple evaluation function that sums up the value of pieces
  function evaluateBoard(board) {
    let totalEvaluation = 0;
    const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
    
    board.board().forEach(row => {
      row.forEach(piece => {
        if (piece) {
          const value = pieceValues[piece.type];
          totalEvaluation += piece.color === 'w' ? value : -value;
        }
      });
    });
    return totalEvaluation;
  }

  // --- UI and Rendering ---

  // Function to reset the game to its initial state
  function resetGame() {
    setGame(new Chess());
    setGameStatus('');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Play Chess Against a Simple AI</h2>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        boardWidth={400}
        // Prevent player from moving AI's pieces
        arePiecesDraggable={!game.isGameOver() && game.turn() === 'w'}
      />
      {gameStatus && <h3 style={{ color: 'blue' }}>{gameStatus}</h3>}
      <button 
        onClick={resetGame} 
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Reset Game
      </button>
    </div>
  );
};

export default ChessGame;