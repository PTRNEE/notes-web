import NoteCard from "../components/NoteCard";
import { useNotes } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { notes, loading, error, pinnedIds } = useNotes();
  const navigate = useNavigate();

  const pinned = notes.filter((n) => pinnedIds.includes(n.id));
  const others = notes.filter((n) => !pinnedIds.includes(n.id));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {loading && <p className="text-center text-slate-400 py-20">กำลังโหลด...</p>}
      {error && <p className="text-center text-red-400 py-20">{error}</p>}

      {!loading && !error && notes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 mb-4">ยังไม่มีโน้ต เพิ่มสักอันสิ!</p>
          <button
            onClick={() => navigate("/create")}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition"
          >
            + เพิ่มโน้ตแรก
          </button>
        </div>
      )}

      {/* Pinned */}
      {pinned.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            📌 ปักหมุดไว้
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinned.map((note) => <NoteCard key={note.id} note={note} />)}
          </div>
        </section>
      )}

      {/* All notes */}
      {others.length > 0 && (
        <section>
          {pinned.length > 0 && (
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              📄 โน้ตทั้งหมด
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((note) => <NoteCard key={note.id} note={note} />)}
          </div>
        </section>
      )}
    </div>
  );
}