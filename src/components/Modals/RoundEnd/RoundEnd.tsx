import styled from "styled-components";
import StyledButton from "../../Common/StyledButton/StyledButton";
import StyledMessage from "../../Common/StyledMessage/StyledMessage";
import { Player } from "../../../types";

const RoundEndDiv = styled.div`
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

// Component that displays a message when a round ends and a button to start a new round.
// Props:
// - roundWinner: the player who won the round, or null if the round was a draw
// - startNewRound: a function to start a new round
const RoundEnd = (props: {
  roundWinner: Player | null;
  startNewRound: () => void;
}) => {
  return (
    <RoundEndDiv>
      <StyledMessage>
        <p>
          {props.roundWinner === null
            ? "Draw"
            : props.roundWinner.name + " won the round!"}
        </p>
        <StyledButton onClick={props.startNewRound}>Next round</StyledButton>
      </StyledMessage>
    </RoundEndDiv>
  );
};

export default RoundEnd;
