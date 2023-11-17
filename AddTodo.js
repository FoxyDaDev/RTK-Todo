import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./todoSlice";
import { useNavigate } from "react-router-dom";

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);

  const onSaveTodoClicked = (e) => {
    e.preventDefault();

    const title = e.target.elements.todoTitle.value;
    const content = e.target.elements.todoContent.value;
    const userId = e.target.elements.todoAuthor.value;

    if (title && content) {
      dispatch(addTodo(title, content, userId));
      e.target.reset();
      navigate("/");
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <>
      <section>
        <h3>Add new todo:</h3>
        <form onSubmit={onSaveTodoClicked}>
          <label htmlFor="todoTitle">Todo Title:</label>
          <input type="text" id="todoTitle" name="todoTitle" />

          <label htmlFor="todoAuthor">Author:</label>
          <select id="todoAuthor" name="todoAuthor">
            <option value=""></option>
            {usersOptions}
          </select>

          <label htmlFor="todoContent">Content:</label>
          <textarea id="todoContent" name="todoContent" />
          <button type="submit">
            Save Todo
          </button>
        </form>
      </section>
    </>
  );
};

export default AddTodoForm;