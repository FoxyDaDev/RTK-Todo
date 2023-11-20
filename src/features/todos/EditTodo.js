import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoById, editTodo, removeTodo } from "./todoSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditTodo = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();

  const todo = useSelector((state) => selectTodoById(state, todoId));
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  if (!todo) {
    return (
      <section>
        <h1>Todo not found!</h1>
      </section>
    );
  }

  const onSaveTodo = (e) => {
    e.preventDefault();

    const { title, content, userId } = e.target.elements;

    if (title.value && content.value) {
      try {
        dispatch(editTodo({
          id: todo.id,
          title: title.value,
          content: content.value,
          userId: Number(userId.value)
        }));

        title.value = "";
        content.value = "";

        navigate(`/todo/${todoId}`);
      } catch (err) {
        console.log(`Edit error found: ${err}`);
      }
    }
  };

  const onDeletePost = () => {
    try {
      dispatch(removeTodo({ id: todo.id }));

      navigate('/');
    } catch (err) {
      console.log(`Remove error found: ${err}`);
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Todo:</h2>
      <form onSubmit={onSaveTodo}>
        <label htmlFor="todoTitle">Todo Title:</label>
        <input
          type="text"
          id="todoTitle"
          name="title"
          defaultValue={todo.title}
        />
        <label htmlFor="todoAuthor">Author:</label>
        <select
          id="todoAuthor"
          name="userId"
          defaultValue={todo.userId}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="todoContent">Content:</label>
        <textarea
          id="todoContent"
          name="content"
          defaultValue={todo.content}
        />
        <button type="submit">
          Save Todo
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={onDeletePost}
        >
          Delete Todo
        </button>
      </form>
    </section>
  );
};

export default EditTodo;
