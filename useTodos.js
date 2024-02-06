import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
}; //intenta parsear todo lo que esta en localStorga

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "add Todo",
      payload: todo,
    };
    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    //lo voy a escribir diferente a como esta el NewTodo
    console.log({ id });

    dispatch({
      type: "remove Todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: "toggle Todo",
      payload: id,
    });
  };

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodosCount: todos.filter((todo) => !todo.done).length,
  };
};
