import { useContext } from "react";
import styled from "styled-components";
import { GameDataContext } from "../../contexts/GameDataContext";

const TurnDisplayDiv = styled.div`
  font-size: calc(1vh + 2vw);
  font-weight: bold;
  padding-top: 2vh;
  text-align: center;
`;

// Styled-component that styles the span that displays the current turn.
// It changes color based on the symbol of the current player.
const TurnSpan = styled.span<{ $symbol: string | undefined }>`
  color: ${(props) =>
    props.$symbol === "x"
      ? "#AEDEFC"
      : props.$symbol === "o"
      ? "#F875AA"
      : "#F0ECE5"};
  transition: color 0.5s;
`;

// Component that displays the current turn.
// It uses the GameDataContext to get the current player.
const TurnDisplay = () => {
  const gameDataContext = useContext(GameDataContext);

  return (
    <TurnDisplayDiv>
      <TurnSpan $symbol={gameDataContext?.turn.symbol}>
        {gameDataContext?.turn.name}'s Turn ({gameDataContext?.turn.symbol}):
      </TurnSpan>
    </TurnDisplayDiv>
  );
};

export default TurnDisplay;
