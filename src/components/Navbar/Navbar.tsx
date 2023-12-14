import styled from "styled-components";
import { Players } from "../../types";
import StyledButton from "../Common/StyledButton/StyledButton";

const NavbarContainer = styled.div`
  background-color: #161a30;
  height: 15vh;
`;

const DisplayX = styled.div`
  float: left;
  font-size: calc(1vh + 2vw);
  padding-top: 4vh;
  font-weight: bold;
  height: 15vh;
  width: 30%;
`;

const DisplayO = styled.div`
  float: left;
  font-size: calc(1vh + 2vw);
  padding-top: 4vh;
  font-weight: bold;
  height: 15vh;
  width: 30%;
`;

const Center = styled.div`
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  width: 40%;
`;

// Component that displays the names and points of the players and a restart button.
// Props:
// - players: an array of player objects
// - restartHandler: a function to restart the game
const Navbar = (props: { players: Players; restartHandler: () => void }) => {
  return (
    <NavbarContainer>
      <DisplayX>
        <span>
          {props.players[0].name}: {props.players[0].points}
        </span>
      </DisplayX>
      <Center>
        <StyledButton onClick={props.restartHandler}>Restart game</StyledButton>
      </Center>
      <DisplayO>
        <span>
          {props.players[1].name}: {props.players[1].points}
        </span>
      </DisplayO>
    </NavbarContainer>
  );
};

export default Navbar;
