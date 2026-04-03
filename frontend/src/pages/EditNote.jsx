import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotes } from "../context/NoteContext";

const API = import.meta.env.VITE_API_URL;

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateNote } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API}/notes/${id}`)
      .then((res) => { setTitle(res.data.title); setContent(res.data.content || ""); })
      .catch(() => setError("ไม่พบโน้ตนี้"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNote(Number(id), title, content);
    navigate("/");
  };

  if (loading) return <p className="text-center py-20 text-gray-400">กำลังโหลด...</p>;
  if (error) return <p className="text-center py-20 text-red-400">{error}</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">✏️ แก้ไขโน้ต</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="หัวข้อ *"
        />
        <textarea
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm h-40 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="เนื้อหา..."
        />
        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 rounded-lg transition">
            บันทึก
          </button>
          <button type="button" onClick={() => navigate("/")} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 rounded-lg transition">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}