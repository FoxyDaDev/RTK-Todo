import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    {
        id: nanoid(),
        title: "Test Todo",
        content: "Test Todo Content",
        userId: "1",
        date: sub(new Date(), { minutes: 15 }).toISOString(),
        completed: false,
    },
    {
        id: nanoid(),
        title: "Test Todoo",
        content: "Test Todo Contentt",
        userId: "2",
        date: sub(new Date(), { minutes: 20 }).toISOString(),
        completed: false,
    },
    {
        id: nanoid(),
        title: "Test Todooo",
        content: "Test Todo Contenttt",
        userId: "3",
        date: sub(new Date(), { minutes: 25 }).toISOString(),
        completed: true,
    }
]

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        completed: false,
                    }
                }
            },
        },
        editTodo: (state, action) => {
            const { id, title, content, userId } = action.payload;
            const todo = state.find((todo) => todo.id === id);
      
            if (todo) {
              todo.title = title;
              todo.content = content;
              todo.userId = userId;
            }
        },
        removeTodo: (state, action) => {
            const { id } = action.payload;
            const filteredTodos = state.filter((todo) => todo.id !== id);
            return filteredTodos;
        },
        toggleTodoStatus: (state, action) => {
            const { id } = action.payload;
            const todo = state.find((todo) => todo.id === id);

            if (todo) {
            todo.completed = !todo.completed;
            }
        },
        showCompletedTodos: (state) => {
            return state.filter((todo) => todo.completed);
        },
        showAllTodos: (state) => [...state],
        },
    },
);


export const { addTodo, editTodo, removeTodo, toggleTodoStatus, showCompletedTodos, showAllTodos, } = todoSlice.actions;

export const selectTodos = (state) => state.todos;

export const selectTodoById = (state, id) => state.todos.find(todo => todo.id === id);

export default todoSlice.reducer;