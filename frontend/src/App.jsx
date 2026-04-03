import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import ViewNote from "./pages/ViewNote";

export default function App() {
  return (
    <NoteProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="/view/:id" element={<ViewNote />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteProvider>
  );
}