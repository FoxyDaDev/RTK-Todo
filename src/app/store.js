import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todos/todoSlice";
import usersReducer from "../features/users/authorSlice"
import searchSlice from "../features/todos/searchSlice";

export const store = configureStore({
    reducer: {
        todos: todoSlice,
        users: usersReducer,
        search: searchSlice,
    }
})