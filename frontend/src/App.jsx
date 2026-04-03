import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NoteForm from "./pages/NoteForm";
import ViewNote from "./pages/ViewNote";

export default function App() {
  return (
    <NoteProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<NoteForm />} />
            <Route path="/edit/:id" element={<NoteForm />} />
            <Route path="/view/:id" element={<ViewNote />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteProvider>
  );
}