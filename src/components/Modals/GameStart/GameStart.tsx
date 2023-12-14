import { useState } from "react";
import styled from "styled-components";
import StyledButton from "../../Common/StyledButton/StyledButton";
import StyledMessage from "../../Common/StyledMessage/StyledMessage";
import PlayerInput from "./PlayerInput";
import { Players } from "../../../types";

const GameStartDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Component that handles the start of each game.
// Props:
// - startHandler: a function to handle the start of the game
// - player1: the name of the first player
// - player2: the name of the second player
const GameStart = (props: {
  startHandler: (players: Players) => void;
  player1: string;
  player2: string;
}) => {
  // States variables that hold the names of the players.
  const [player1, setPlayer1] = useState<string>(props.player1);
  const [player2, setPlayer2] = useState<string>(props.player2);

  // addPlayers is a function that creates an array of player objects and calls startHandler with this array.
  // It only does this if both player1 and player2 have names.
  const addPlayers = () => {
    if (player1 && player2) {
      props.startHandler([
        {
          name: player1,
          symbol: "x",
          points: 0,
        },
        {
          name: player2,
          symbol: "o",
          points: 0,
        },
      ]);
    }
  };

  return (
    <GameStartDiv>
      <StyledMessage>
        <p>Players' names:</p>
        <PlayerInput
          id="1"
          value={player1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPlayer1(e.target.value)
          }
        />
        <PlayerInput
          id="2"
          value={player2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPlayer2(e.target.value)
          }
        />
        <div>
          <StyledButton disabled={!(player1 && player2)} onClick={addPlayers}>
            Start game
          </StyledButton>
        </div>
      </StyledMessage>
    </GameStartDiv>
  );
};

export default GameStart;
