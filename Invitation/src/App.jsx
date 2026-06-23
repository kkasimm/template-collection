import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeddingPink from "./components/WeddingPink/WeddingPink";
import WeddingBold from "./components/WeddingBold/WeddingBold";
import Spotify from "./components/Spotify/Spotify";
import KAI from "./components/KAI/Kai";
import Passport from "./components/Passport/Passport";
import TicketPass from "./components/Passport/Ticket";
import Korean from "./components/Korean/Korean"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wedding-pink" element={<WeddingPink />} />
        <Route path="/wedding-bold" element={<WeddingBold />} />
        <Route path="/spotify" element={<Spotify />} />
        <Route path="/KAI" element={<KAI />}/>
        <Route path="/passport" element={<Passport />}/>
        <Route path="/ticket" element={<TicketPass />}/>
        <Route path="/korean" element={<Korean />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;