import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: number;
  name: string;
  age: number;
};

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [
    { id: 1, name: "Azim", age: 20 },
    { id: 2, name: "Ali", age: 22 },
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    editUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) state.users[index] = action.payload;
    },
  },
});

export const { addUser, deleteUser, editUser } = usersSlice.actions;
export const selectUsers = (state: { users: UsersState }) => state.users.users;
export default usersSlice.reducer;
