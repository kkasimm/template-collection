import FadeUp from "./FadeUp";
import { TRACKS } from "../data";

export default function SectionStory() {
  return (
    <section className="section-story">
      <FadeUp>
        <div className="section-eyebrow">Tracklist</div>
        <h2 className="section-heading">Our Story</h2>
      </FadeUp>

      <div className="tracklist">
        {TRACKS.map((track, i) => (
          <FadeUp key={track.number} delay={i * 0.08}>
            <div className={`track-item${track.active ? " active" : ""}`}>
              <span className="track-number">
                {track.active ? "▶" : track.number}
              </span>
              <div className="track-content">
                <div className="track-title">{track.title}</div>
                <div className="track-lyric">"{track.lyric}"</div>
              </div>
              <span className="track-duration">{track.duration}</span>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
