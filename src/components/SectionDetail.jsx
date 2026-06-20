import FadeUp from "./FadeUp";

export default function SectionDetail() {
  return (
    <section className="section-detail">
      <FadeUp>
        <div className="section-eyebrow">Album Info</div>
        <h2 className="section-heading">Detail Acara</h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="album-meta-card">
          <div className="meta-row">
            <div className="meta-icon">📅</div>
            <div>
              <div className="meta-label">Release Date</div>
              <div className="meta-value">Sabtu, 14 Juni 2025</div>
              <div className="meta-sub">
                Akad: 08.00 WIB · Resepsi: 11.00 WIB
              </div>
            </div>
          </div>
          <div className="meta-row">
            <div className="meta-icon">📍</div>
            <div>
              <div className="meta-label">Venue</div>
              <div className="meta-value">Gedung Serbaguna Harmoni</div>
              <div className="meta-sub">Jl. Sudirman No. 88, Jakarta Pusat</div>
            </div>
          </div>
          <div className="meta-row">
            <div className="meta-icon">👔</div>
            <div>
              <div className="meta-label">Dress Code</div>
              <div className="meta-value">Sage Green & Dusty Rose</div>
              <div className="meta-sub">Formal attire preferred</div>
            </div>
          </div>
          <div className="meta-row">
            <div className="meta-icon">🎵</div>
            <div>
              <div className="meta-label">Featured Artists</div>
              <div className="meta-value">Rizki Pratama & Aulia Zahra</div>
              <div className="meta-sub">
                Produced by: Keluarga Besar Kedua Mempelai
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
