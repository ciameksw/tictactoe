import { useCallback, useState } from "react";
import styled from "styled-components";
import { GameDataContext } from "../../contexts/GameDataContext";
import {
  GameDataContextType,
  GridType,
  Player,
  Players,
  RoundType,
} from "../../types";
import Grid from "../Board/Grid/Grid";
import TurnDisplay from "../TurnDisplay/TurnDisplay";
import RoundEnd from "../Modals/RoundEnd/RoundEnd";
import GameEnd from "../Modals/GameEnd/GameEnd";
import GameStart from "../Modals/GameStart/GameStart";
import Navbar from "../Navbar/Navbar";
import { useGameWinner } from "../../hooks/useGameWinner";
import { getPlayerBySymbol, useRoundWinner } from "../../hooks/useRoundWinner";

const AppContainer = styled.div`
  text-align: center;
  height: 100%;
  color: #f0ece5;
  user-select: none;
`;

const Main = styled.div`
  height: 85vh;
  background: rgb(49, 48, 77);
  background: linear-gradient(
    0deg,
    rgba(49, 48, 77, 1) 4%,
    rgba(22, 26, 48, 1) 72%
  );
`;

const TurnWrapper = styled.div`
  height: 15vh;
`;

const GameWrapper = styled.div`
  height: 40vh;

  footer {
    font-size: calc(1vh + 1.5vw);
    font-weight: bold;
  }
`;

// Number of points needed to win and the initial state of the grid.
const pointsToWin = 5;
const emptyGrid: GridType = ["", "", "", "", "", "", "", "", ""];

// Main component of the application.
// It maintains the state of the game.
const App = () => {
  // States that maintain players data, current turn and grid state.
  const [players, setPlayers] = useState<Players>([
    {
      name: "Name1",
      symbol: "x",
      points: 0,
    },
    {
      name: "Name2",
      symbol: "o",
      points: 0,
    },
  ]);
  const [turn, setTurn] = useState<Player>(players[0]);
  const [grid, setGrid] = useState<GridType>(emptyGrid);

  // States that maintain the state of the game.
  const [gameStart, setGameStart] = useState<boolean>(true);
  const [round, setRound] = useState<RoundType>({
    ended: false,
    roundWinner: null,
  });
  const [winner, setWinner] = useState<Player | null>(null);

  // Function that resets the round state and grid state.
  const resetRound = useCallback(() => {
    setRound({
      ended: false,
      roundWinner: null,
    });
    setGrid(emptyGrid);
  }, []);

  // Function that starts the game.
  const startGame = useCallback(
    (players: Players) => {
      if (players) {
        setPlayers(players);
        setTurn(players[0]);
      }
      setGameStart(false);
      resetRound();
    },
    [resetRound]
  );

  // Function that starts a new round.
  const startNewRound = useCallback(() => {
    const player1 = players[0];
    const player2 = players[1];
    if (player1 && player2) {
      // Switch the symbols of the players.
      player1.symbol = player1.symbol === "o" ? "x" : "o";
      player2.symbol = player2.symbol === "o" ? "x" : "o";
      const newPlayers: Players = [player1, player2];
      setPlayers(newPlayers);

      // Set the turn to the player with the "x" symbol.
      setTurn(getPlayerBySymbol("x", newPlayers)!);
    }

    resetRound();
  }, [resetRound, players]);

  // Function to set states on game end.
  const endGame = useCallback(() => {
    setWinner(null);
    setGameStart(true);
    resetRound();
  }, [resetRound]);

  // Custom hooks that check if the game or the round has ended.
  useGameWinner(players, pointsToWin, setWinner);
  useRoundWinner(grid, players, setRound, setPlayers);

  // Context value that is passed to the GameDataContext.Provider.
  const gameDataValue: GameDataContextType = {
    players,
    turn,
    grid,
    gameInProgress: !gameStart && !round.ended && !winner,
    changeTurn: setTurn,
    changeGrid: setGrid,
  };

  return (
    <AppContainer>
      <GameDataContext.Provider value={gameDataValue}>
        <Navbar players={players} restartHandler={endGame} />
        <Main>
          <TurnWrapper>
            {gameDataValue.gameInProgress && <TurnDisplay />}
          </TurnWrapper>
          <GameWrapper>
            <Grid />
            <footer>by ciamek</footer>
          </GameWrapper>
        </Main>
      </GameDataContext.Provider>

      {/* MODALS */}
      {gameStart && (
        <GameStart
          startHandler={startGame}
          player1={players[0].name}
          player2={players[1].name}
        />
      )}
      {round.ended && !winner && (
        <RoundEnd
          roundWinner={round.roundWinner}
          startNewRound={startNewRound}
        />
      )}
      {winner && <GameEnd winner={winner} endHandler={endGame} />}
    </AppContainer>
  );
};

export default App;
