import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoById, editTodo, removeTodo } from "./todoSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/authorSlice";

const EditTodo = () => {
    const { todoId } = useParams();
    const navigate = useNavigate();

    const todo = useSelector((state) => selectTodoById(state, todoId))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(todo?.title)
    const [content, setContent] = useState(todo?.content)
    const [userId, setUserId] = useState(todo?.userId)

    const dispatch = useDispatch()

    if (!todo) {
        return (
            <section>
                <h1>todo not found!</h1>
            </section>
        )
    }

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(Number(e.target.value))
    
    const canSave = [title, content, userId].every(Boolean)

    const onSaveTodo = () => {
        if (canSave) {
            try {
                dispatch(editTodo({ id: todo.id, title, content, userId: Number(userId) }))

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/todo/${todoId}`)
            } catch (err) {
                console.log(`edit error found ${err}`)
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    const onDeletePost = () => {    
        try {
            dispatch(removeTodo({ id: todo.id }));

            setTitle('');
            setContent('');
            setUserId('');
            navigate('/');
        } catch (err) {
            console.log(`remove error found ${err}`)
        }
    }

    return (
        <section>
            <h2>Edit Todo:</h2>
            <form>
                <label htmlFor="todoTitle">Todo Title:</label>
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
                    onClick={onSaveTodo}
                    disabled={!canSave}
                >
                    Save Todo
                </button>
                <button className="deleteButton"
                    type="button"
                    onClick={onDeletePost}
                >
                    Delete Todo
                </button>
            </form>
        </section>
    )
}

export default EditTodo;