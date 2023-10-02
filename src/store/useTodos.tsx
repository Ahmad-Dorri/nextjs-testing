import { TodoType } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  todos: TodoType[];
};
type Actions = {
  addTodo: (todo: TodoType) => void;
  removeTodo: (todo: TodoType) => void;
  toggleTodo: (todo: TodoType) => void;
};

export const useTodos = create<State & Actions>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo: TodoType) =>
        set((state) => ({
          todos: [...state.todos, todo],
        })),
      removeTodo: (todo) =>
        set((state) => ({
          todos: state.todos.filter((item) => todo.id !== item.id),
        })),
      toggleTodo: (todo) => {
        set((state) => {
          const selectedTodoIndex = state.todos.findIndex(
            (item) => item.id === todo.id
          );
          state.todos[selectedTodoIndex].isCompleted =
            !state.todos[selectedTodoIndex].isCompleted;

          return {
            todos: state.todos,
          };
        });
      },
    }),
    {
      name: 'todos store',
    }
  )
);
