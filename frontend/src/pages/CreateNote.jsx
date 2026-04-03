import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

export default function CreateNote() {
  const { createNote } = useNotes();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await createNote(title, content);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-700 mb-6">📝 โน้ตใหม่</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4">
        <input
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="หัวข้อ *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm min-h-60 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="เนื้อหา..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || !title.trim()}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
          >
            {saving ? "กำลังบันทึก..." : "บันทึก"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 rounded-lg transition"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}