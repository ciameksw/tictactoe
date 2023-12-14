// Type definitions for the whole project.

// Types of symbols for tic tac toe game.
export type SymbolType = "x" | "o";

// Grid related types.
export type GridCellType = SymbolType | "";
export type GridType = [
  GridCellType,
  GridCellType,
  GridCellType,
  GridCellType,
  GridCellType,
  GridCellType,
  GridCellType,
  GridCellType,
  GridCellType
];

// Players related types.
export type Players = [Player, Player];

export type Player = {
  name: string;
  symbol: SymbolType;
  points: number;
};

// Round related types.
export type RoundType = {
  ended: boolean;
  roundWinner: Player | null;
};

// Game data context type.
export type GameDataContextType = {
  players: Players;
  turn: Player;
  grid: GridType;
  gameInProgress: boolean;
  changeTurn: React.Dispatch<React.SetStateAction<Player>>;
  changeGrid: React.Dispatch<React.SetStateAction<GridType>>;
};

// Functions for setting state.
export type SetRoundFunction = (round: RoundType) => void;
export type SetPlayersFunction = (players: Players) => void;
export type SetWinnerFunction = (player: Player | null) => void;