import { useEffect, useRef, useState } from "react";
import musicFile from "./assets/music.mp3";
import MusicPlayer from "./components/MusicPlayer";
import SectionOpener from "./components/SectionOpener";
import SectionStory from "./components/SectionStory";
import SectionDetail from "./components/SectionDetail";
import SectionGallery from "./components/SectionGallery";
import SectionRSVP from "./components/SectionRSVP";
import SectionClosing from "./components/SectionClosing";
import "./App.css";

export default function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.5;

    const tryPlay = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        document.addEventListener("click", tryPlay, { once: true });
        document.addEventListener("touchstart", tryPlay, { once: true });
      });

    return () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  return (
    <div className="app">
      <audio ref={audioRef} src={musicFile} preload="auto" />

      <SectionOpener
        audioRef={audioRef}
        isPlaying={isPlaying}
        onSectionExit={setShowPlayer}
      />
      <SectionStory />
      <SectionDetail />
      <SectionGallery />
      <SectionRSVP />
      <SectionClosing isPlaying={isPlaying} />

      <MusicPlayer
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        visible={showPlayer}
      />
    </div>
  );
}
