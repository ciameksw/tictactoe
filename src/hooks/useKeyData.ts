import { useState, useEffect, useContext } from "react";
import { GameDataContext } from "../contexts/GameDataContext";

// Custom hook that listens for keydown events and stores the key that was pressed.
// It also resets the key data when a game is in progress.
export const useKeyData = () => {
  // State to store the key data.
  const [keyData, setKeyData] = useState("");
  // Get the gameInProgress value from the GameDataContext.
  const { gameInProgress } = useContext(GameDataContext) || {};

  // useEffect hook to add an event listener for keydown events when the component mounts.
  // When the component unmounts, the event listener is removed.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeyData(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // useEffect hook to reset the key data when a game starts.
  useEffect(() => {
    if (gameInProgress) {
      setKeyData("");
    }
  }, [gameInProgress]);

  return keyData;
};
