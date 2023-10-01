'use client';
import { TodoType } from '@/types';
import { createContext, useCallback, useContext, useReducer } from 'react';

type StateType = {
  todos: TodoType[];
};

export const initState = {
  todos: [] as TodoType[],
};

export const enum REDUCER_ACTION_TYPE {
  ADD_TODO,
  REMOVE_TODO,
  GET_ALL_TODOS,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: TodoType;
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD_TODO: {
      if (action.payload && typeof action.payload)
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };
    }
    case REDUCER_ACTION_TYPE.GET_ALL_TODOS:
      return {
        ...state,
        todos: [...state.todos],
      };
    case REDUCER_ACTION_TYPE.REMOVE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos.filter((todo) => todo.id !== action.payload?.id),
        ],
      };
    default:
      throw new Error();
  }
};

const useTodosContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const addTodo = useCallback(
    (value: TodoType) =>
      dispatch({ type: REDUCER_ACTION_TYPE.ADD_TODO, payload: value }),
    []
  );
  const getAllTodos = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.GET_ALL_TODOS,
    });
  }, []);
  const removeTodo = useCallback((todoItem: TodoType) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.REMOVE_TODO,
      payload: todoItem,
    });
  }, []);

  return {
    state,
    addTodo,
    removeTodo,
    getAllTodos,
  };
};

type UseTodosContextType = ReturnType<typeof useTodosContext>;

const initContextState: UseTodosContextType = {
  state: initState,
  addTodo: (value: TodoType) => {},
  getAllTodos: () => {},
  removeTodo: (value: TodoType) => {},
};

type ChildrenType = {
  children?: React.ReactNode | undefined;
};

export const TodosContext =
  createContext<UseTodosContextType>(initContextState);

export const TodosContextProvider = ({
  children,
  ...initState
}: ChildrenType & StateType) => {
  const value = useTodosContext(initState);
  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
