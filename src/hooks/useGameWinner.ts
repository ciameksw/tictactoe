import { useEffect } from "react";
import { Player, SetWinnerFunction } from "../types";

// Custom hook that checks if either player has reached the required number of points to win the game.
// If a player has won, it calls the sets the winner.
export const useGameWinner = (
  players: Player[],
  pointsToWin: number,
  setWinner: SetWinnerFunction
) => {
  useEffect(() => {
    players.forEach(player => {
      if (player.points === pointsToWin) {
        setWinner(player);
      }
    });
  }, [players, pointsToWin, setWinner]);
};
