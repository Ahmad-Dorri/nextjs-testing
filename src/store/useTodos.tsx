import { TodoType } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UseTodosType = {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  removeTodo: (todo: TodoType) => void;
};

export const useTodos = create<UseTodosType>()(
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
    }),
    {
      name: 'todos store',
    }
  )
);
