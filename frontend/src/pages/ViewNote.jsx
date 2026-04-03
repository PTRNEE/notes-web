import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotes } from "../context/NoteContext";

const API = import.meta.env.VITE_API_URL;

export default function ViewNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteNote } = useNotes();
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 min-h-[calc(100vh-64px)] flex flex-col">
      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="text-sm text-slate-400 hover:text-slate-600 mb-6 self-start transition"
      >
        ← กลับ
      </button>

      {/* Note content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-slate-800">{note.title}</h1>
        <p className="text-xs text-slate-400">
          อัปเดตล่าสุด: {new Date(note.updated_at).toLocaleDateString("th-TH", {
            year: "numeric", month: "long", day: "numeric"
          })}
        </p>
        <hr className="border-slate-100" />
        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line flex-1">
          {note.content || <span className="text-slate-400 italic">ไม่มีเนื้อหา</span>}
        </p>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition"
          >
            ✏️ แก้ไข
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-500 font-semibold py-2 rounded-lg transition"
          >
            🗑️ ลบ
          </button>
        </div>
      </div>
    </div>
  );
}