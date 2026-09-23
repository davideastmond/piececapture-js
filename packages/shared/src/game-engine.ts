import { getNeighbors } from "./board-utils";
import type { CellValue, GamePiece, PlayerId } from "./types";

function getCellOwner(cell: CellValue): PlayerId | null {
  if (cell === null) return null;
  if (typeof cell === "string") return cell;
  return cell.owner;
}

function isCellCaptured(cell: CellValue): boolean {
  return typeof cell === "object" && cell !== null && cell.isCaptured;
}

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
  return neighbors.every(
    (n) =>
      getCellOwner(board[n.row][n.col]) === opponentId &&
      !isCellCaptured(board[n.row][n.col]),
  );
}

export function processTurn(
  currentBoard: CellValue[][],
  placedRow: number,
  placedCol: number,
  activePlayer: PlayerId,
): { newBoard: CellValue[][]; pointsGained: number } {
  const newBoard = currentBoard.map((row) =>
    row.map((cell) =>
      typeof cell === "object" && cell !== null ? { ...cell } : cell,
    ),
  );
  newBoard[placedRow][placedCol] = activePlayer;

  let pointsGained = 0;
  const opponentId: PlayerId =
    activePlayer === "player1" ? "player2" : "player1";
  const adjacentNeighbors = getNeighbors(placedRow, placedCol);

  adjacentNeighbors.forEach((n) => {
    const neighbor = newBoard[n.row][n.col];
    if (getCellOwner(neighbor) === opponentId && !isCellCaptured(neighbor)) {
      if (isPieceCaptured(newBoard, n.row, n.col, opponentId)) {
        newBoard[n.row][n.col] = {
          owner: opponentId,
          isCaptured: true,
        } as GamePiece;
        pointsGained += 1;
      }
    }
  });

  return { newBoard, pointsGained };
}
