import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpotifyInvitation from "./spotify/SpotifyInvitation";
import TinderInvitation from "./tinder/TinderInvitation";
import LockscreenInvitation from "./lockscreen/LockscreenInvitation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/spotify" element={<SpotifyInvitation />} />
        <Route path="/tinder" element={<TinderInvitation />} />
        <Route path="/lockscreen" element={<LockscreenInvitation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;