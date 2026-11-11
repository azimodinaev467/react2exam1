import { create } from "zustand";

export type User = {
  id: number;
  name: string;
  age: number;
};

interface ZustandStore {
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (id: number) => void;
  editUser: (updated: User) => void;
}

const useZustandStore = create<ZustandStore>((set) => ({
  users: [
    { id: 1, name: "Azim", age: 20 },
    { id: 2, name: "Ali", age: 22 },
  ],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  deleteUser: (id) => set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
  editUser: (updated) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === updated.id ? updated : u)),
    })),
}));

export default useZustandStore;
