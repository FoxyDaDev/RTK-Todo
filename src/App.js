import { Routes, Route } from 'react-router-dom';

import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import TodoList from "./features/todos/Todo";
import AddTodoForm from "./features/todos/AddTodo";
import SingleTodoPage from './features/todos/SingleTodoPage';
import EditTodo from './features/todos/EditTodo';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<TodoList />} />

          <Route path="todo">
              <Route index element={<AddTodoForm />} />
              <Route path=":todoId" element={<SingleTodoPage />} />
              <Route path="edit/:todoId" element={<EditTodo />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;