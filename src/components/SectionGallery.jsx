import FadeUp from "./FadeUp";
import { GALLERY_ITEMS } from "../data";

export default function SectionGallery() {
  return (
    <section className="section-gallery">
      <FadeUp>
        <div className="section-eyebrow">Artist Photos</div>
        <h2 className="section-heading">Galeri Kami</h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`gallery-item${item.large ? " large" : ""}`}
            >
              <span style={{ fontSize: item.large ? "64px" : "32px" }}>
                {item.emoji}
              </span>
              <div className="gallery-overlay" />
            </div>
          ))}
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "#535353",
            marginTop: "12px",
          }}
        >
          Ganti emoji dengan foto — tambahkan tag &lt;img&gt; di dalam
          gallery-item
        </p>
      </FadeUp>
    </section>
  );
}
