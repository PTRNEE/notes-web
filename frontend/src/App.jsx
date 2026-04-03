import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EditNote from "./pages/EditNote";

export default function App() {
  return (
    <NoteProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
    </NoteProvider>
  );
}