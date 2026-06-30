import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpotifyInvitation from "./spotify/SpotifyInvitation";
import TinderInvitation from "./tinder/TinderInvitation";
import IOSInvitation from "./ios/IOSInvitation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/spotify" element={<SpotifyInvitation />} />
        <Route path="/tinder" element={<TinderInvitation />} />
        <Route path="/ios" element={<IOSInvitation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;