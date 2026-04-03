import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <Link to="/" className="text-xl font-bold text-slate-700 tracking-tight">
        📝 MyNotes
      </Link>
      <button
        onClick={() => navigate("/create")}
        className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
      >
        + เพิ่มโน้ต
      </button>
    </nav>
  );
}