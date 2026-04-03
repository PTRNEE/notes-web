import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../context/NoteContext";

export default function Home() {
  const { notes, loading, error } = useNotes();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <NoteForm />
      </div>

      {loading && <p className="text-center text-gray-400">กำลังโหลด...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && notes.length === 0 && (
        <p className="text-center text-gray-400">ยังไม่มีโน้ต เพิ่มสักอันสิ!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}