import { useEffect } from "react";
import {
  GridCellType,
  GridType,
  Players,
  RoundType,
  SetPlayersFunction,
  SetRoundFunction,
  SymbolType,
} from "../types";

export const useRoundWinner = (
  grid: GridType,
  players: Players,
  setRound: SetRoundFunction,
  setPlayers: SetPlayersFunction
) => {
  useEffect(() => {
    const gameState = checkGame(grid, players);
    setRound(gameState.round);
    if (gameState.players) {
      setPlayers(gameState.players);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);
};

export const getPlayerBySymbol = (symbol: SymbolType, players: Players) => {
  const player = players.find((el) => {
    return el.symbol === symbol;
  });
  return player ? player : null;
};

const checkWin = (cells: GridCellType[]) => {
  for (let i = 0; i < 7; i = i + 3) {
    if (
      cells[0 + i] !== "" &&
      cells[0 + i] === cells[1 + i] &&
      cells[0 + i] === cells[2 + i]
    ) {
      return cells[0 + i];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      cells[0 + i] !== "" &&
      cells[0 + i] === cells[3 + i] &&
      cells[0 + i] === cells[6 + i]
    ) {
      return cells[0 + i];
    }
  }
  if (cells[0] !== "" && cells[0] === cells[4] && cells[0] === cells[8]) {
    return cells[0];
  }
  if (cells[2] !== "" && cells[2] === cells[4] && cells[2] === cells[6]) {
    return cells[2];
  }
};

const checkDraw = (cells: GridCellType[]): RoundType => {
  if (!cells.includes("")) {
    return { ended: true, roundWinner: null };
  }
  return { ended: false, roundWinner: null };
};

const checkGame = (
  cells: GridCellType[],
  players: Players
): { players: Players; round: RoundType } => {
  const symbol = checkWin(cells);
  if (symbol && symbol.length > 0) {
    const player = getPlayerBySymbol(symbol, players);
    if (player) {
      player.points += 1;
      const updatedPlayers = players.map((el) => {
        if (el.name === player.name) return player;
        return el;
      });
      return {
        players: updatedPlayers as Players,
        round: { ended: true, roundWinner: player },
      };
    }
  }
  return { players: players, round: checkDraw(cells) };
};
