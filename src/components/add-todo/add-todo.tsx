'use client';
import * as z from 'zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';

const formSchema = z.object({
  todoInput: z.string().min(1, {
    message: 'you should add something to the input',
  }),
});

type TodoType = z.infer<typeof formSchema>;

const AddTodoInput = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { getLocalStorage, setLocalStorage, removeLocalStorage } =
    useLocalStorage('todos');
  const form = useForm<TodoType>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      todoInput: '',
    },
  });
  const onSubmit: SubmitHandler<TodoType> = (value) => {
    try {
      setLocalStorage(value.todoInput);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="todoInput"
        control={form.control}
        render={({ field }) => (
          <input className="text-black" {...field} placeholder="add todo" />
        )}
      />
      {/* //!can use this instead */}
      {/* <input
        className="text-black"
        placeholder="add"
        {...register('todoInput')}
      /> */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTodoInput;
