import { useContext } from "react";
import styled from "styled-components";
import { GameDataContext } from "../../../contexts/GameDataContext";
import Cell from "../Cell/Cell";

const GridDiv = styled.div`
  aspect-ratio: 1 / 1;
  width: 40vh;
  background-color: #161a30;
  margin: 4vh auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 1vh;
  column-gap: 1vh;
  box-shadow: 0vh 0vh 3vh 2vh rgba(0, 0, 0, 0.75);
`;


// Component that displays a grid of cells.
// It uses the GameDataContext to get the current grid.
const Grid = () => {
  const gameDataContext = useContext(GameDataContext);

  return (
    <GridDiv>
      {gameDataContext?.grid.map((cell, i) => {
        return (
          <Cell key={i} index={i} cellValue={cell} />
        );
      })}
    </GridDiv>
  );
};

export default Grid;
