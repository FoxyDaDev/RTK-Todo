import { useSelector, useDispatch } from "react-redux";
import { selectTodos, toggleTodoStatus } from "./todoSlice";
import TodoAuthor from "./TodoAuthor";
import GetTime from "./GetTime";
import { Link } from "react-router-dom";
import { changeValue } from "./searchSlice";
import { useState } from "react";

const TodoList = () => {
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();

    const handleToggleTodo = (id) => {
        dispatch(toggleTodoStatus({ id }));
    }

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        dispatch(changeValue(e.target.value));
    };

    const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const orderedTodos = filteredTodos.slice().sort((a, b) => b.date.localeCompare(a.date));

    const renderedTodos = orderedTodos.map(todo => (
        <article key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.content.substring(0, 100)}</p>
            <p className="todoCredit">
                <Link to={`todo/${todo.id}`}>View Todo </Link>
                <TodoAuthor userId={todo.userId} />
                <GetTime timer={todo.date} />
            </p>
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
            />
        </article>
    ))
    
    return (
        <section>
            <h2>Todos</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search by title..."
            />
            {renderedTodos}
        </section>
    )
}

export default TodoList;