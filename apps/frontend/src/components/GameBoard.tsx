import {
  BOARD_SIZE,
  createInitialGameState,
  type GameState,
  isBoardFull,
  processTurn,
} from "@game/shared";
import React, { useState } from "react";

export const GameBoard: React.FC = () => {
  // Initialize the game state using the shared utility engine
  const [gameState, setGameState] = useState<GameState>(
    createInitialGameState(),
  );

  const handleCellClick = (row: number, col: number) => {
    // Prevent moves if the space is occupied or the game has ended
    if (gameState.board[row][col] !== null || gameState.status === "ended") {
      return;
    }

    const activePlayer = gameState.turn;

    // 1. Process the human player's placement and check for captures
    const { newBoard, pointsGained } = processTurn(
      gameState.board,
      row,
      col,
      activePlayer,
    );

    // Update player scores
    const updatedPlayers = { ...gameState.players };
    updatedPlayers[activePlayer].score += pointsGained;

    // Check game end conditions
    const boardFinished = isBoardFull(newBoard);
    let newStatus: GameState["status"] = gameState.status;
    let finalWinner: GameState["winner"] = gameState.winner;

    if (boardFinished) {
      newStatus = "ended";
      const p1Score = updatedPlayers.player1.score;
      const p2Score = updatedPlayers.player2.score;
      if (p1Score > p2Score) finalWinner = "player1";
      else if (p2Score > p1Score) finalWinner = "player2";
      else finalWinner = "draw";
    }

    // Determine the next turn (toggle active player)
    const nextTurn = activePlayer === "player1" ? "player2" : "player1";

    setGameState({
      ...gameState,
      board: newBoard,
      turn: nextTurn,
      players: updatedPlayers,
      status: newStatus,
      winner: finalWinner,
    });

    // TODO: Trigger CPU move here if nextTurn === 'player2'
  };

  const resetGame = () => {
    setGameState(createInitialGameState());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      {/* Header & Scoreboard */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wider mb-4 text-emerald-400">
          Tactical Matrix
        </h1>
        <div className="flex gap-8 bg-slate-800 px-6 py-3 rounded-xl border border-slate-700 shadow-lg">
          <div
            className={`flex flex-col items-center ${gameState.turn === "player1" ? "text-blue-400 font-bold scale-105 transition-all" : "opacity-60"}`}
          >
            <span>{gameState.players.player1.name} (Blue)</span>
            <span className="text-2xl">{gameState.players.player1.score}</span>
          </div>
          <div className="w-px bg-slate-700 self-stretch"></div>
          <div
            className={`flex flex-col items-center ${gameState.turn === "player2" ? "text-rose-400 font-bold scale-105 transition-all" : "opacity-60"}`}
          >
            <span>{gameState.players.player2.name} (Red)</span>
            <span className="text-2xl">{gameState.players.player2.score}</span>
          </div>
        </div>
      </header>

      {/* Game Over Modal Banner */}
      {gameState.status === "ended" && (
        <div className="mb-6 px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-lg shadow-md animate-bounce">
          {gameState.winner === "draw"
            ? "It's a Draw!"
            : `🎉 ${gameState.players[gameState.winner!].name} Wins!`}
        </div>
      )}

      {/* 12x12 Game Board Grid Wrapper */}
      <div
        className="grid gap-1 p-2 bg-slate-950 rounded-xl shadow-2xl border-4 border-slate-800"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
          width: "min(90vw, 550px)",
          height: "min(90vw, 550px)",
        }}
      >
        {gameState.board.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => {
            const owner =
              cellValue === null || typeof cellValue === "object"
                ? (cellValue?.owner ?? null)
                : cellValue;
            const isCaptured =
              typeof cellValue === "object" &&
              cellValue !== null &&
              cellValue.isCaptured;

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                disabled={gameState.status === "ended"}
                className="relative aspect-square w-full h-full bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded flex items-center justify-center transition-colors shadow-inner group"
              >
                {/* Coordinate Label Hint for hover state */}
                {cellValue === null && gameState.status === "playing" && (
                  <span className="absolute text-[8px] opacity-0 group-hover:opacity-30 text-slate-400 pointer-events-none">
                    {rowIndex},{colIndex}
                  </span>
                )}

                {/* Visual Piece Tokens */}
                {cellValue !== null && (
                  <div
                    className={`relative w-4/5 h-4/5 rounded-full shadow-md animate-scaleUp border ${
                      isCaptured
                        ? owner === "player1"
                          ? "bg-blue-500/20 border-dashed border-blue-300 opacity-75"
                          : "bg-rose-500/20 border-dashed border-rose-300 opacity-75"
                        : owner === "player1"
                          ? "bg-gradient-to-br from-blue-400 to-blue-600 border border-blue-300"
                          : "bg-gradient-to-br from-rose-400 to-rose-600 border border-rose-300"
                    }`}
                  >
                    {isCaptured && (
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black tracking-[0.2em] text-slate-100/90">
                        C
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          }),
        )}
      </div>

      {/* Control Buttons */}
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-sm font-medium transition-colors shadow-md"
      >
        Reset Match
      </button>
    </div>
  );
};
