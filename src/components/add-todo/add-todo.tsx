'use client';
import * as z from 'zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useId, useState } from 'react';
import { useTodos } from '@/store/useTodos';
import { TodoType as ValueType } from '@/types';

const formSchema = z.object({
  todoInput: z.string().min(1, {
    message: 'you should add something to the input',
  }),
});

type TodoType = z.infer<typeof formSchema>;

const AddTodoInput = () => {
  const [isMounted, setIsMounted] = useState(false);

  const addTodo = useTodos((state) => state.addTodo);
  const form = useForm<TodoType>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      todoInput: '',
    },
  });
  const onSubmit: SubmitHandler<TodoType> = (value) => {
    try {
      console.log(value);
      const data = {
        id: new Date().valueOf().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isCompleted: false,
        value: value.todoInput,
      } as ValueType;
      addTodo(data);
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
    <>
      <form
        className="flex w-full gap-2"
        onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="todoInput"
          control={form.control}
          render={({ field }) => (
            <input
              className="text-black flex-1 mt-10 p-2 rounded-md"
              {...field}
              placeholder="add todo"
            />
          )}
        />
        {/* //!can use this instead */}
        {/* <input
        className="text-black"
        placeholder="add"
        {...register('todoInput')}
      /> */}
        <button
          className="text-black mt-10 bg-slate-200 hover:bg-slate-400 transition  border border-black rounded-2xl p-2"
          type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddTodoInput;
