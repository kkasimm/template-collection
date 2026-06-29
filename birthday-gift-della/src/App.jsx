import { Routes, Route } from "react-router-dom";
import Grey from "./grey/Grey";

export default function App() {
  return (
    <Routes>
      <Route path="/grey" element={<Grey />} />
    </Routes>
  );
}