import styled from "styled-components";

// Styled-component that styles the div used for displaying modal messages.
const StyledButton = styled.button`
  background-color: #31304d;
  color: #f0ece5;
  font-size: calc(1vh + 2vw);
  border-radius: 1vh;
  box-shadow: 0vh 0vh 2vh 1vh rgba(0, 0, 0, 0.75);
  padding: 1vh;
  cursor: pointer;
  border: 0.25vh solid #38374d;
  transition: box-shadow 0.25s, transform 0.25s;

  &:hover {
    box-shadow: 0 0.5em 0.5em -0.4em black;
    transform: translateY(-0.25em) scale(1.05);
  }

  &:disabled {
    box-shadow: none;
    transform: none;
    cursor: auto;
    opacity: 0.6;
  }
`;

export default StyledButton;
