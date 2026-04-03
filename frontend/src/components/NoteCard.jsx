import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

export default function NoteCard({ note }) {
  const { deleteNote } = useNotes();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2 hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-gray-800 truncate">{note.title}</h2>
      <p className="text-gray-500 text-sm line-clamp-3">{note.content || "ไม่มีเนื้อหา"}</p>
      <p className="text-xs text-gray-400">
        {new Date(note.updated_at).toLocaleDateString("th-TH")}
      </p>
      <div className="flex gap-2 mt-auto pt-2">
        <button
          onClick={() => navigate(`/edit/${note.id}`)}
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-sm font-medium py-1 rounded-lg transition"
        >
          แก้ไข
        </button>
        <button
          onClick={() => { if (confirm("ลบโน้ตนี้?")) deleteNote(note.id); }}
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium py-1 rounded-lg transition"
        >
          ลบ
        </button>
      </div>
    </div>
  );
}