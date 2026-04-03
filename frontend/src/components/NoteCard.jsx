import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

export default function NoteCard({ note }) {
  const { deleteNote, pinnedIds, togglePin } = useNotes();
  const navigate = useNavigate();
  const isPinned = pinnedIds.includes(note.id);

  const formatDateTime = (dateStr) =>
    new Date(dateStr).toLocaleString("th-TH", {
      month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col gap-2 hover:shadow-md transition cursor-pointer"
      onClick={() => navigate(`/view/${note.id}`)}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-800 line-clamp-2 flex-1">
          {note.title}
        </h2>
        <button
          onClick={(e) => { e.stopPropagation(); togglePin(note.id); }}
          className={`text-base shrink-0 transition ${isPinned ? "text-indigo-500" : "text-slate-200 hover:text-indigo-400"}`}
        >
          📌
        </button>
      </div>

      {note.content && (
        <p className="text-slate-500 text-sm whitespace-pre-line line-clamp-6 leading-relaxed">
          {note.content}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
        <span className="text-xs text-slate-400">{formatDateTime(note.updated_at)}</span>
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/edit/${note.id}`)}
            className="text-xs px-2 py-1 hover:bg-indigo-50 text-slate-400 hover:text-indigo-500 rounded-lg transition"
          >
            แก้ไข
          </button>
          <button
            onClick={() => { if (confirm("ลบโน้ตนี้?")) deleteNote(note.id); }}
            className="text-xs px-2 py-1 hover:bg-red-50 text-slate-400 hover:text-red-400 rounded-lg transition"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
}