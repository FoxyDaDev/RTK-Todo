    import { useState } from "react";
    import { useDispatch, useSelector } from "react-redux";

    import { addTodo } from "./todoSlice";
    import { selectAllUsers } from "../users/authorSlice";

    import { useNavigate } from "react-router-dom";

    const AddTodoForm = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");
        const [userId, setUserId] = useState("");

        const users = useSelector(selectAllUsers);

        const onTitleChanged = (e) => setTitle(e.target.value);
        const onContentChanged = (e) => setContent(e.target.value);
        const onAuthorChanged = (e) => setUserId(e.target.value);

        const onSaveTodoClicked = () => {
            if (title && content) {
                dispatch(
                    addTodo(title, content, userId)
                )
                setTitle("");
                setContent("");
                setUserId("");
                navigate("/");
            }
        }

        const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

        const usersOptions = users.map((user) => (
            <option key={user.id} value={user.id}>
            {user.name}
            </option>
        ));

        return (
            <>
            <section>
                <h3>Add new todo:</h3>
                <form>
                <label
                htmlFor="todoTitle">Todo Title:</label>
                <input
                type="text"
                id="todoTitle"
                name="todoTitle"
                value={title}
                onChange={onTitleChanged}
                />
                <label htmlFor="todoAuthor">Author:</label>
                <select id="todoAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="todoContent">Content:</label>
                <textarea
                    id="todoContent"
                    name="todoContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSaveTodoClicked}
                    disabled={!canSave}
                >
                    Save Todo
                </button>
                </form>
            </section>
            </>
    );
    };

    export default AddTodoForm;