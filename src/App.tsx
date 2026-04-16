import { Routes, Route, Navigate } from "react-router";
import { BoardPage } from "./pages/BoardPage";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

export function App() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex flex-col flex-1 min-w-0 bg-surface">
        <Header />
        <Routes>
          <Route path="/board" element={<BoardPage />} />
          <Route path="*" element={<Navigate to="/board" replace />} />
        </Routes>
      </main>
    </div>
  );
}
