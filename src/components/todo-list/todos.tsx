'use client';
import { cn } from '@/lib/utils';
import { useTodos } from '@/store/useTodos';
import { useEffect, useState } from 'react';

const Todos = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCheckClicked, setIsCheckClicked] = useState(0);
  console.log(isCheckClicked);
  const todos = useTodos((state) => state.todos);
  const removeTodo = useTodos((state) => state.removeTodo);
  const toggleTodo = useTodos((state) => state.toggleTodo);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col w-full p-8">
        {todos.map((todo) => (
          <div className="flex justify-between" key={todo.id}>
            <p
              key={isCheckClicked}
              className={cn(
                'text-gray-700 ',
                todo.isCompleted && 'line-through'
              )}>
              {todo.value}
            </p>
            <div>
              <input
                defaultChecked={todo.isCompleted}
                type="checkbox"
                onClick={() => {
                  setIsCheckClicked((prev) => prev + 1);
                  toggleTodo(todo);
                }}
              />
              <button
                className="text-rose-600"
                onClick={() => removeTodo(todo)}>
                Delete todo
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;
