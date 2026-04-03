import { useState } from "react";
import { useNotes } from "../context/NoteContext";

export default function NoteForm() {
  const { createNote } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await createNote(title, content);
    setTitle("");
    setContent("");
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3">
      <h2 className="text-lg font-bold text-gray-700">➕ เพิ่มโน้ตใหม่</h2>
      <input
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="หัวข้อ *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="เนื้อหา..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        disabled={saving}
        className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-gray-800 font-semibold py-2 rounded-lg transition"
      >
        {saving ? "กำลังบันทึก..." : "บันทึก"}
      </button>
    </form>
  );
}