import React, { useState } from "react";
import { useAtom } from "jotai";
import { useDispatch } from "react-redux";
import { Button } from "../components/ui/button";
import { addUser as addJotaiAtom } from "../store/Jotai";
import useZustandStore from "../store/zustand";
import { addUser as addReduxUser } from "../store/Redux";
import type { AppDispatch } from "../store/store";

export default function Ad() {
  const dispatch = useDispatch<AppDispatch>();

  const [, addJotai] = useAtom(addJotaiAtom);

  const addZustand = useZustandStore((state) => state.addUser);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleAdd = () => {
    if (!name || !age) return;
    const newUser = { id: Date.now(), name, age: Number(age) };

    addJotai(newUser);
    addZustand(newUser);
    dispatch(addReduxUser(newUser));

    setName("");
    setAge("");
  };

  return (
    <div style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Add User</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <input
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <Button onClick={handleAdd}>add</Button>
    </div>
  );
}
