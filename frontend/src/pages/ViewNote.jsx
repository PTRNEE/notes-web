import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotes } from "../context/NoteContext";

const API = import.meta.env.VITE_API_URL;

export default function ViewNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteNote, pinnedIds, togglePin } = useNotes();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/notes/${id}`)
      .then((res) => setNote(res.data))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (confirm("ลบโน้ตนี้?")) {
      await deleteNote(Number(id));
      navigate("/");
    }
  };

  if (loading) return <p className="text-center py-20 text-slate-400">กำลังโหลด...</p>;
  if (!note) return null;

  const isPinned = pinnedIds.includes(note.id);

  const formatDateTime = (dateStr) =>
    new Date(dateStr).toLocaleString("th-TH", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            ←
          </button>
          <span className="text-sm text-slate-400">โน้ต</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => togglePin(note.id)}
            className={`text-xl transition ${isPinned ? "text-indigo-500" : "text-slate-300 hover:text-indigo-400"}`}
            title={isPinned ? "ถอนปักหมุด" : "ปักหมุด"}
          >
            📌
          </button>
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="text-sm px-3 py-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 rounded-lg transition"
          >
            แก้ไข
          </button>
          <button
            onClick={handleDelete}
            className="text-sm px-3 py-1.5 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-500 rounded-lg transition"
          >
            ลบ
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4 min-h-[70vh]">
        <h1 className="text-2xl font-bold text-slate-800">{note.title}</h1>
        <p className="text-xs text-slate-400">
          แก้ไขล่าสุด {formatDateTime(note.updated_at)}
        </p>
        <hr className="border-slate-100" />
        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line flex-1">
          {note.content || <span className="italic text-slate-300">ไม่มีเนื้อหา</span>}
        </p>
      </div>
    </div>
  );
}