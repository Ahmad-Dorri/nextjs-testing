import AddTodo from '@/components/add-todo/add-todo';
import Todos from './todos';

const TodoList = () => {
  return (
    <div className="bg-zinc-300 h-full w-1/2 flex px-4 justify-start items-center flex-col mx-auto">
      <AddTodo />
      <Todos />
    </div>
  );
};

export default TodoList;
