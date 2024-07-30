import styled from "styled-components";

const AddTodoButton = ({ onAddTodoClick, onPrint }) => {
  return (
    <div>
      <Button onClick={onAddTodoClick}>+ To do</Button>
    </div>
  );
};

export default AddTodoButton;

// Styled-components
const Button = styled.button`
  background: none;
  border: 2px solid #4285f4;
  border-radius: 20px;
  color: #4285f4;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #4285f4;
    color: white;
  }
`;
