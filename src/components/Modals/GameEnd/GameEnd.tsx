import styled, { keyframes } from "styled-components";
import StyledButton from "../../Common/StyledButton/StyledButton";
import StyledMessage from "../../Common/StyledMessage/StyledMessage";
import { Player } from "../../../types";

const GameEndDiv = styled.div`
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

// Keyframes animation that changes the color of the text.
const colorCycle = keyframes`
  0% { color: #AEDEFC; }
  50% { color: #F875AA; }
  100% { color: #AEDEFC; }
`;

const StyledMessageWinner = styled.div`
  animation: ${colorCycle} 2s linear infinite;
  margin-bottom: 3vh;
`;

// Component that displaysthe winner and a button to play again.
// Props:
// - winner: the player who won the game
// - endHandler: a function to handle the end of the game
const GameEnd = (props: { winner: Player; endHandler: () => void }) => {
  return (
    <GameEndDiv>
      <StyledMessage>
        <StyledMessageWinner>
          {props.winner.name + " won the game!"}
        </StyledMessageWinner>
        <StyledButton onClick={props.endHandler}>Play again</StyledButton>
      </StyledMessage>
    </GameEndDiv>
  );
};

export default GameEnd;
