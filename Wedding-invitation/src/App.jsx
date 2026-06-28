import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpotifyInvitation from "./spotify/SpotifyInvitation";
import TinderInvitation from "./tinder/TinderInvitation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/spotify" element={<SpotifyInvitation />} />
        <Route path="/tinder" element={<TinderInvitation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;