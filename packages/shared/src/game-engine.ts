import { getNeighbors } from "./board-utils";
import type { CellValue, PlayerId } from "./types";

export function isPieceCaptured(
  board: CellValue[][],
  targetRow: number,
  targetCol: number,
  targetOwner: PlayerId,
): boolean {
  const neighbors = getNeighbors(targetRow, targetCol);
  const opponentId: PlayerId =
    targetOwner === "player1" ? "player2" : "player1";

  if (neighbors.length === 0) return false;
  return neighbors.every((n) => board[n.row][n.col] === opponentId);
}

export function processTurn(
  currentBoard: CellValue[][],
  placedRow: number,
  placedCol: number,
  activePlayer: PlayerId,
): { newBoard: CellValue[][]; pointsGained: number } {
  const newBoard = currentBoard.map((row) => [...row]);
  newBoard[placedRow][placedCol] = activePlayer;

  let pointsGained = 0;
  const opponentId: PlayerId =
    activePlayer === "player1" ? "player2" : "player1";
  const adjacentNeighbors = getNeighbors(placedRow, placedCol);

  adjacentNeighbors.forEach((n) => {
    if (newBoard[n.row][n.col] === opponentId) {
      if (isPieceCaptured(newBoard, n.row, n.col, opponentId)) {
        newBoard[n.row][n.col] = null;
        pointsGained += 1;
      }
    }
  });

  return { newBoard, pointsGained };
}
