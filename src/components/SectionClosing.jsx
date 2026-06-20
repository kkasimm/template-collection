import FadeUp from "./FadeUp";

export default function SectionClosing({ isPlaying }) {
  return (
    <section className="section-closing">
      <FadeUp>
        <div className={`closing-vinyl${isPlaying ? " vinyl-spinning" : ""}`} />
      </FadeUp>

      <FadeUp delay={0.1}>
        <p className="closing-quote">
          "Setiap lagu punya akhir,
          <br />
          tapi album kita baru saja dimulai."
        </p>
      </FadeUp>

      <FadeUp delay={0.15}>
        <h2 className="closing-title">Sampai Jumpa di Hari Bahagia Kami</h2>
        <div className="closing-date">14 · 06 · 2027</div>
      </FadeUp>

      <FadeUp delay={0.2}>
        <div className="closing-footer">
          <div className="closing-footer-logo">♫ Rapsodi JKT48 ♫</div>
        </div>
      </FadeUp>
    </section>
  );
}
