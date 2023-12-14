import styled from "styled-components";

const StyledInput = styled.input`
  font-size: calc(1vh + 2vw);
  margin-left: 2vw;
  margin-bottom: 3vh;
  background-color: #f0ece5;
  color: #161a30;
`;

// Component that renders a label and an input field for a player's name.
// Props:
// - id: a unique identifier for the input field
// - value: the current value of the input field
// - onChange: a function to handle changes to the input field
const PlayerInput = (props: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label htmlFor={props.id}>Player {props.id}:</label>
      <StyledInput
        id={props.id}
        type="text"
        value={props.value}
        onChange={props.onChange}
        maxLength={12}
      ></StyledInput>
    </div>
  );
};

export default PlayerInput;
