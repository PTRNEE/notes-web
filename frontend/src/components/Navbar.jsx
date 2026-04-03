import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-yellow-400 shadow px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-gray-800">📝 MyNotes</Link>
    </nav>
  );
}