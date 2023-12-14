import { useCallback, useContext, useEffect } from "react";
import styled from "styled-components";
import { GameDataContext } from "../../../contexts/GameDataContext";
import { useKeyData } from "../../../hooks/useKeyData";
import { GridCellType, GridType } from "../../../types";

const CellDiv = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
`;

const CellButton = styled.button`
  background-color: #31304d;
  width: 100%;
  height: 100%;
  border: 0;
  font-size: 12vh;
  font-weight: bold;
  color: ${(props) =>
    props.children === "x"
      ? "#AEDEFC"
      : props.children === "o"
      ? "#F875AA"
      : "#F0ECE5"};
  margin: 0;
  padding: 0;
  line-height: 100%;
  cursor: ${(props) =>
    props.children === "x"
      ? "auto"
      : props.children === "o"
      ? "auto"
      : "pointer"};
  user-select: none;

  &:focus {
    outline: none;
  }
`;

const numPad = [7, 8, 9, 4, 5, 6, 1, 2, 3];

// Component that displays a single cell within the grid.
// It uses the GameDataContext to get the current grid and turn and useKeyData to get the key pressed.
// - index: index of the cell
// - value: value of the cell
const Cell = (props: { index: number; cellValue: string }) => {
  const gameDataContext = useContext(GameDataContext);
  const keyData = useKeyData();

  // Update the cell when the corresponding numPad key is pressed.
  useEffect(() => {
    if (
      keyData === numPad[props.index].toString() &&
      gameDataContext?.gameInProgress
    ) {
      handleUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyData]);

  // function to update the grid.
  const updateGrid = useCallback(
    (index: number, value: string) => {
      // Create a new array of cells by mapping over the current grid.
      // If the index of the current cell matches the index passed to the function, replace the cell with the new value.
      const newCells = gameDataContext?.grid.map((c, i) => {
        if (i === index) return value;
        return c;
      }) as Array<GridCellType>;
      gameDataContext?.changeGrid(newCells as GridType);
    },
    [gameDataContext]
  );

  // Function to switch the turn.
  const switchTurn = useCallback(() => {
    // If the current turn is the first player's turn, switch to the second player.
    // Otherwise, switch to the first player.
    if (gameDataContext?.turn.symbol === gameDataContext?.players[0].symbol) {
      gameDataContext?.changeTurn(gameDataContext?.players[1]);
    } else {
      gameDataContext?.changeTurn(gameDataContext?.players[0]);
    }
  }, [gameDataContext]);

  // Function to handle updates.
  const handleUpdate = useCallback(() => {
    // If the cell is empty, update the grid with the current turn's symbol and switch the turn.
    if (props.cellValue === "") {
      updateGrid(props.index, gameDataContext?.turn.symbol!);
      switchTurn();
    }
  }, [gameDataContext, props, updateGrid, switchTurn]);

  return (
    <CellDiv>
      <CellButton onClick={handleUpdate}>{props.cellValue}</CellButton>
    </CellDiv>
  );
};

export default Cell;
