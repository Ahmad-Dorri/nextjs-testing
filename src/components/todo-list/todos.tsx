'use client';
import { useTodos } from '@/store/useTodos';
import { useEffect, useState } from 'react';

const Todos = () => {
  const [isMounted, setIsMounted] = useState(false);
  const todos = useTodos((state) => state.todos);
  const removeTodo = useTodos((state) => state.removeTodo);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col w-full">
        {todos.map((todo) => (
          <p onClick={() => removeTodo(todo)} key={todo.id}>
            {todo.value}
          </p>
        ))}
      </div>
    </>
  );
};

export default Todos;
