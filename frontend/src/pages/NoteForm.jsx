import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotes } from "../context/NoteContext";

const API = import.meta.env.VITE_API_URL;

export default function NoteForm() {
  const { id } = useParams();         // มี id = edit, ไม่มี = create
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { createNote, updateNote } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    axios.get(`${API}/notes/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content || "");
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    if (isEdit) {
      await updateNote(Number(id), title, content);
    } else {
      await createNote(title, content);
    }
    navigate("/");
  };

  if (loading) return <p className="text-center py-20 text-slate-400">กำลังโหลด...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-slate-400 hover:text-slate-600 transition"
        >
          ←
        </button>
        <h1 className="text-xl font-bold text-slate-700">
          {isEdit ? "แก้ไขโน้ต" : "โน้ตใหม่"}
        </h1>
      </div>

      {/* Card เหมือนหน้าแรก */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4">
        <input
          className="text-lg font-semibold text-slate-800 placeholder-slate-300 border-0 border-b border-slate-100 pb-3 focus:outline-none focus:border-indigo-300 transition"
          placeholder="หัวข้อโน้ต..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="text-sm text-slate-600 placeholder-slate-300 border-0 resize-none focus:outline-none min-h-64"
          placeholder="เขียนอะไรบางอย่าง..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !title.trim()}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-lg transition"
          >
            {saving ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>
    </div>
  );
}