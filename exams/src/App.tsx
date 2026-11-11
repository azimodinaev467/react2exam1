import { useAtom } from "jotai";
import { useSelector, useDispatch } from "react-redux";
import { dataJotai, deleteUser as deleteJotaiAtom } from "./store/Jotai";
import useZustandStore from "./store/zustand";
import { selectUsers, deleteUser as deleteReduxUser } from "./store/Redux";
import type { AppDispatch } from "./store/store";
import { Button } from "./components/ui/button";
import Ad from "./A/Ad";
import { useState } from "react";
export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  // Jotai
  const [jotaiUsers] = useAtom(dataJotai);
  const [, deleteJotai] = useAtom(deleteJotaiAtom);


  // Zustand
  const zustandUsers = useZustandStore((state) => state.users);
  const deleteZustand = useZustandStore((state) => state.deleteUser);

  // Redux
  const reduxUsers = useSelector(selectUsers);




  const [search, setSearch] = useState("");

  const searchJotai = jotaiUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const searchZustand = zustandUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const searchRedux = reduxUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const data = searchJotai.map((el) => {
    const r = searchZustand.find((item) => item.id === el.id);
    const t = searchRedux.find((item) => item.id === el.id);
    return { ...el, ...r, ...t };
  });

  const handleDelete = (id: number) => {
    deleteJotai(id);
    deleteZustand(id);
    dispatch(deleteReduxUser(id));
  };



  return (
    <div style={{ padding: "20px" }}>
<input
  type="text"
  placeholder="Search "
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>  
  <Ad />
      <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
        {stores.map((store) => (
          <div
            key={store.name}
            style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", minWidth: "150px" }}
          >
            <h3 style={store.color ? { color: store.color } : undefined}>{store.name}</h3>
            {store.data.map((u) => (
              <div key={u.id} style={{ marginBottom: "10px" }}>
                <span>{u.name}  {u.age}</span>
                <Button onClick={() => store.onDelete(u.id)} style={{ marginLeft: "10px" }}>
                  delete
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
