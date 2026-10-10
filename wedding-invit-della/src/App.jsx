import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeddingPink from "./components/WeddingPink/WeddingPink";
import WeddingBold from "./components/WeddingBold/WeddingBold";
import Spotify from "./components/Spotify/Spotify";
import KAI from "./components/KAI/Kai";
import Passport from "./components/Passport/Passport";
import TicketPass from "./components/Passport/Ticket";
import Korean from "./components/Korean/Korean"
import DoodlePink from "./components/New/DoodlePink";
import Airline from "./components/New/Airline";
import Floral from "./components/New/Floral";
import RedCute from "./components/New/RedCute";
import OldMoney from "./components/New/OldMoney";
import Romantic from "./components/New/Romantic";

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
        <Route path="/doodle-pink" element={<DoodlePink />}/>
        <Route path="/airline" element={<Airline />}/>
        <Route path="/floral" element={<Floral />}/>
        <Route path="/red-cute" element={<RedCute />}/>
        <Route path="/old-money" element={<OldMoney />}/>
        <Route path="/romantic" element={<Romantic />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;