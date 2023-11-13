import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showCompletedTodos, showAllTodos } from "../features/todos/todoSlice";

const Header = () => {
    const dispatch = useDispatch();
    const [showCompleted, setShowCompleted] = useState(false);

    const handleShowCompleted = () => {
        setShowCompleted(true);
        dispatch(showCompletedTodos());
    };

    const handleShowAllTodos = () => {
        setShowCompleted(false);
        dispatch(showAllTodos());
    };

    return (
        <header className="Header">
            <h1>Todo List</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="todo">Create Todo</Link></li>
                    <li>
                        <button onClick={handleShowCompleted}>Show Completed Todos</button>
                        <button onClick={handleShowAllTodos}>Show All Todos</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;