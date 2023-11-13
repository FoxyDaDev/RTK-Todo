import { useSelector } from "react-redux";

import { selectTodoById } from "./todoSlice";
import TodoAuthor from "./TodoAuthor";
import GetTime from "./GetTime";

import { useParams, Link } from "react-router-dom";

const SingleTodoPage = () => {
    const { todoId } = useParams();

    const todo = useSelector((state) => selectTodoById(state, todoId))

    if (!todo) {
        return (
            <section>
                <h1>todo not found</h1>
            </section>
        )
    }

    return (
        <article key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.content.substring(0, 100)}</p>
            <p className="todoCredit">
                <Link to={`/todo/edit/${todo.id}`}>Edit Todo </Link>
                <TodoAuthor userId={todo.userId} />
                <GetTime timer={todo.date} />
            </p>
        </article>
    )
}

export default SingleTodoPage