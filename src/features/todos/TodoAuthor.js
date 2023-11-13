import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/authorSlice";

const TodoAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers)

    const author = users.find(user => user.id === userId);

    return (
        <span>
          by {author ? <span>{author.name}</span> : "Unknown author "}
        </span>
    );
}
export default TodoAuthor