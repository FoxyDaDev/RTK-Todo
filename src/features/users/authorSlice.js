import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "1", name: "Ahmad da guy "},
    { id: "2", name: "Ahmad la guy "},
    { id: "3", name: "Ahmad the guy "},
]

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer