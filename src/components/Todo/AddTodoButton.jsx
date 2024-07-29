const AddTodoButton = ({ onAddTodoClick }) => {
  return (
    <div>
      <button onClick={onAddTodoClick}>+ To do</button>
    </div>
  );
};

export default AddTodoButton;
