type TodoItemProps = {
  value: string;
};

const TodoItem = ({ value }: TodoItemProps) => {
  return <div>{value}</div>;
};

export default TodoItem;
