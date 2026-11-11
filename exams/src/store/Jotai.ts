import { atom } from "jotai";

export type User = {
    id: number;
    name: string;
    age: number;
};

export const dataJotai = atom<User[]>([
    { id: 1, name: "Azim", age: 20 },
    { id: 2, name: "Ali", age: 22 },
]);

export const addUser = atom(null, (get, set, user: User) => {
    set(dataJotai, [...get(dataJotai), user]);
});

export const deleteUser = atom(null, (get, set, id: number) => {
    set(dataJotai, get(dataJotai).filter((u) => u.id !== id));
});

export const editUser = atom(null, (get, set, updated: User) => {
    set(dataJotai, get(dataJotai).map((u) => (u.id === updated.id ? updated : u)));
});
