import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NoteContext = createContext();
const API = import.meta.env.VITE_API_URL;

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API}/notes`);
      setNotes(res.data);
    } catch {
      setError("โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (title, content) => {
    const res = await axios.post(`${API}/notes`, { title, content });
    setNotes((prev) => [res.data, ...prev]);
  };

  const updateNote = async (id, title, content) => {
    const res = await axios.put(`${API}/notes/${id}`, { title, content });
    setNotes((prev) => prev.map((n) => (n.id === id ? res.data : n)));
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Pin จัดการใน localStorage
  const [pinnedIds, setPinnedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pinnedIds") || "[]");
    } catch { return []; }
  });

  const togglePin = (id) => {
    setPinnedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("pinnedIds", JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => { fetchNotes(); }, []);

  return (
    <NoteContext.Provider value={{
      notes, loading, error,
      createNote, updateNote, deleteNote,
      pinnedIds, togglePin
    }}>
      {children}
    </NoteContext.Provider>
  );
}

export const useNotes = () => useContext(NoteContext);