import { useState, useEffect, useRef } from "react";

// ─── DUMMY DATA ───────────────────────────────────────────────────────────────
const IMAGES = {
  cover:   "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  couple1: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
  couple2: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
  couple:  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",

  bride:    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
  gallery1: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400&q=80",
  gallery2: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",

  groom:    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  gallery3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  gallery4: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",

  memory1: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80",
  memory2: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&q=80",
  memory3: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
  memory4: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80",
  memory5: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&q=80",
  memory6: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80",
};
const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const WEDDING_DATE = new Date("2025-09-20T10:00:00");

// ─── MINIMAL CUSTOM CSS ───────────────────────────────────────────────────────
// Layout, spacing, grid and breakpoints below all use plain Tailwind utility
// classes. This block only carries what Tailwind's default palette can't:
// the brand color tokens, the two custom fonts, a couple of hover/focus
// states tied to those brand colors, and the small keyframe animations.
const themeStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');

  .wed-theme {
    --c-primary: #6b8fa3;
    --c-primary-dark: #5a7d92;
    --c-deep: #5d8299;
    --c-ink: #2d4a56;
    --c-muted: #8aa5b3;
    --c-muted-2: #9bafba;
    --c-accent: #c4a0b4;
    --c-accent-dark: #b58aa0;
    --c-slate: #a9b7c1;
    --c-page: #f4f7f9;
  }

  .font-display { font-family: 'Playfair Display', Georgia, serif; }
  .wed-theme, .wed-theme input, .wed-theme select, .wed-theme textarea, .wed-theme button {
    font-family: 'Lato', sans-serif;
  }

  .bg-brand { background-color: var(--c-primary); }
  .bg-brand-deep { background-color: var(--c-deep); }
  .bg-brand-accent { background-color: var(--c-accent); }
  .bg-brand-slate { background-color: var(--c-slate); }
  .bg-brand-page { background-color: var(--c-page); }
  .text-brand { color: var(--c-primary); }
  .text-brand-ink { color: var(--c-ink); }
  .text-brand-muted { color: var(--c-muted); }
  .text-brand-muted-2 { color: var(--c-muted-2); }
  .text-brand-accent { color: var(--c-accent); }

  .btn-primary { background-color: var(--c-primary); }
  .btn-primary:hover { background-color: var(--c-primary-dark); }
  .btn-accent { background-color: var(--c-accent); }
  .btn-accent:hover { background-color: var(--c-accent-dark); }

  .btn-outline-cover { border: 1.5px solid rgba(255,255,255,0.6); color: #fff; background: transparent; }
  .btn-outline-cover:hover { background: #fff; color: var(--c-primary-dark); }

  .field-input { border: 1.5px solid #e5eaed; background: #fafbfc; }
  .field-input:focus { border-color: var(--c-primary); outline: none; }

  .reveal-el { transition: opacity 0.7s ease, transform 0.7s ease; }
  .memory-img { transition: transform 0.5s ease; }
  .memory-img:hover { transform: scale(1.08); }

  @keyframes fadeDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:none; } }
  @keyframes fadeUp   { from { opacity:0; transform:translateY(16px); }  to { opacity:1; transform:none; } }
  @keyframes zoomIn   { from { opacity:0; transform:scale(1.06); }        to { opacity:1; transform:scale(1); } }
  @keyframes modalIn  { from { opacity:0; transform:translateY(20px) scale(0.96); } to { opacity:1; transform:none; } }
  .anim-fade-down { animation: fadeDown 0.9s ease both; }
  .anim-fade-up   { animation: fadeUp 0.9s ease 0.2s both; }
  .anim-zoom-in   { animation: zoomIn 1.1s ease both; }
  .anim-modal-in  { animation: modalIn 0.28s ease both; }
`;

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
function useCountdown(target) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

// ─── USE REVEAL ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── REVEAL WRAPPER ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, visible] = useReveal();
  const hiddenClass = {
    up: "opacity-0 translate-y-9",
    left: "opacity-0 -translate-x-9",
    right: "opacity-0 translate-x-9",
    scale: "opacity-0 scale-95",
  }[direction] || "opacity-0 translate-y-9";
  return (
    <div
      ref={ref}
      className={`reveal-el ${className} ${visible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hiddenClass}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// ─── ORNAMENT DIVIDER ─────────────────────────────────────────────────────────
function Ornament() {
  return (
    <div className="mx-auto mb-8 flex w-fit items-center gap-3">
      <span className="block h-px w-10 bg-slate-300" />
      <span className="bg-brand block h-1.5 w-1.5 rounded-full" />
      <span className="bg-brand block h-1.5 w-1.5 rounded-full opacity-40" />
      <span className="bg-brand block h-1.5 w-1.5 rounded-full opacity-20" />
      <span className="block h-px w-10 bg-slate-300" />
    </div>
  );
}

// ─── QR CODE ─────────────────────────────────────────────────────────────────
function QRCode({ name }) {
  return (
    <svg viewBox="0 0 100 100" className="mx-auto block h-32 w-32" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="white" />
      {[0,1,2,3,4,5,6].map(r =>
        [0,1,2,3,4,5,6].map(c => {
          const val = (r * 7 + c + (name.charCodeAt(0) || 0)) % 2;
          return val ? <rect key={`${r}-${c}`} x={c*10+15} y={r*10+15} width="9" height="9" fill="#374151" /> : null;
        })
      )}
      <rect x="5" y="5" width="30" height="30" fill="none" stroke="#374151" strokeWidth="4" />
      <rect x="65" y="5" width="30" height="30" fill="none" stroke="#374151" strokeWidth="4" />
      <rect x="5" y="65" width="30" height="30" fill="none" stroke="#374151" strokeWidth="4" />
      <rect x="10" y="10" width="20" height="20" fill="#374151" />
      <rect x="70" y="10" width="20" height="20" fill="#374151" />
      <rect x="10" y="70" width="20" height="20" fill="#374151" />
    </svg>
  );
}

// ─── COVER ───────────────────────────────────────────────────────────────────
// Fixed to the viewport (not the page flow) and laid out with flexbox so the
// guest box, countdown and "Buka Undangan" button are always inside the
// visible screen height — on phones and on desktop — with no scrolling.
function Cover({ onOpen, audioRef }) {
  const countdown = useCountdown(WEDDING_DATE);

  const handleOpen = () => {
    onOpen();
    if (audioRef?.current) {
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          let vol = 0;
          const fadeIn = setInterval(() => {
            vol = Math.min(vol + 0.05, 1);
            if (audioRef.current) audioRef.current.volume = vol;
            if (vol >= 1) clearInterval(fadeIn);
          }, 80);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="wed-theme bg-brand-deep fixed inset-0 z-50 flex justify-center p-0 sm:p-6">
      <div className="bg-brand flex h-full w-full max-w-lg flex-col overflow-hidden shadow-2xl sm:rounded-3xl">
        {/* Hero photo — shrinks first if the screen is short, so the
            content below it never gets pushed off-screen */}
        <div className="relative min-h-40 flex-1 overflow-hidden">
          <img
            src={IMAGES.cover}
            alt="couple"
            className="anim-zoom-in h-full w-full object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "linear-gradient(to bottom, rgba(107,143,163,0) 40%, rgba(93,130,153,1) 100%)" }}
          />
        </div>

        {/* Content — fixed height, always fully visible */}
        <div className="relative z-10 flex-shrink-0 px-6 pb-7 pt-0 sm:px-8">
          <p className="anim-fade-down mb-1.5 -mt-2 text-xs uppercase tracking-widest text-white/70">
            The Wedding Of
          </p>
          <h1
            className="font-display anim-fade-up mb-2 leading-tight text-white"
            style={{ fontSize: "clamp(1.4rem, 9vw, 2.4rem)" }}
          >
            Yeobo &amp;<br /><em>Aein</em>
          </h1>

          <div className="anim-fade-up mb-5 rounded-2xl bg-white/20 px-4 py-3">
            <p className="text-xs text-white/60">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="text-base font-bold text-white">Nama Tamu Undangan</p>
          </div>

          <div className="mb-4 grid grid-cols-4 gap-2">
            {[["days","Hari"],["hours","Jam"],["minutes","Menit"],["seconds","Detik"]].map(([k,l]) => (
              <div key={k} className="rounded-xl bg-white/20 px-1 py-2 text-center">
                <div className="font-display text-1xl font-bold tabular-nums text-white">
                  {String(countdown[k]).padStart(2,"0")}
                </div>
                <div className="mt-1 text-xs tracking-wide text-white/60">{l}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleOpen}
              className="btn-outline-cover rounded-full px-9 py-3 text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
            >
              Buka Undangan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RSVP MODAL ──────────────────────────────────────────────────────────────
function RSVPModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", attendance: "hadir", message: "" });
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
      <div className="anim-modal-in w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl">
        <h3 className="font-display text-brand-ink mb-1 text-center text-xl">Konfirmasi Kehadiran</h3>
        <p className="text-brand-muted-2 mb-5 text-center text-xs">Mohon isi form di bawah ini</p>
        <input
          className="field-input mb-3 w-full rounded-xl px-3.5 py-2.5 text-sm text-slate-700"
          placeholder="Nama Lengkap"
          value={form.name}
          onChange={set("name")}
        />
        <select
          className="field-input mb-3 w-full cursor-pointer rounded-xl px-3.5 py-2.5 text-sm text-slate-700"
          value={form.attendance}
          onChange={set("attendance")}
        >
          <option value="hadir">✅ Hadir</option>
          <option value="tidak">❌ Tidak Hadir</option>
        </select>
        <textarea
          className="field-input mb-3 w-full resize-none rounded-xl px-3.5 py-2.5 text-sm text-slate-700"
          rows={3}
          placeholder="Tulis doa & ucapan untuk kedua mempelai..."
          value={form.message}
          onChange={set("message")}
        />
        <button
          className="btn-primary mb-2 w-full rounded-full py-3 text-sm font-semibold text-white"
          onClick={() => { if (form.name.trim()) onSubmit(form); }}
        >
          <i className="fas fa-paper-plane" /> Kirim RSVP
        </button>
        <button className="text-brand-muted-2 hover:text-brand-ink w-full py-2 text-sm transition-colors" onClick={onClose}>
          Batal
        </button>
      </div>
    </div>
  );
}

// ─── QR MODAL ────────────────────────────────────────────────────────────────
function QRModal({ name, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
      <div className="anim-modal-in w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl">
        <p className="text-brand-muted mb-1 text-xs uppercase tracking-widest">E-Ticket</p>
        <h3 className="font-display text-brand-ink mb-1 text-xl">The Wedding Of</h3>
        <p className="text-brand-muted mb-5 text-sm">Yeobo &amp; Aein · 20 September 2025</p>
        <div className="bg-brand-page mb-4 rounded-2xl p-4">
          <QRCode name={name} />
        </div>
        <p className="mb-1 text-base font-bold text-slate-700">{name}</p>
        <p className="text-brand-muted-2 mb-5 text-xs">Tunjukkan QR ini di pintu masuk</p>
        <button
          className="btn-primary mb-2 w-full rounded-full py-3 text-sm font-semibold text-white"
          onClick={() => {
            const a = document.createElement("a");
            a.href = `data:text/plain;charset=utf-8,E-Ticket%0AYeobo%20%26%20Aein%20Wedding%0AName%3A%20${encodeURIComponent(name)}%0ADate%3A%2020%20September%202025`;
            a.download = "e-ticket.txt"; a.click();
          }}
        >
          <i className="fas fa-download" /> Download Tiket
        </button>
        <button className="text-brand-muted-2 hover:text-brand-ink w-full py-2 text-sm transition-colors" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
}

// ─── TRANSFER MODAL ──────────────────────────────────────────────────────────
function TransferModal({ onClose }) {
  const [copied, setCopied] = useState("");
  const copy = (val) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(() => setCopied(""), 2000); };
  const accounts = [
    { bank: "BCA", name: "Yeobo Prasetyo", number: "1234567890", icon: "🏦" },
    { bank: "Mandiri", name: "Aein Rahayu", number: "0987654321", icon: "🏛️" },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
      <div className="anim-modal-in w-full max-w-sm overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl" style={{ maxHeight: "90vh" }}>
        <p className="text-brand-muted mb-1 text-center text-xs uppercase tracking-widest">Wedding Gift</p>
        <h3 className="font-display text-brand-ink mb-1 text-center text-xl">Kirim Hadiah</h3>
        <p className="text-brand-muted-2 mb-5 text-center text-xs">Doa dan dukunganmu adalah hadiah terbaik kami</p>
        {accounts.map(a => (
          <div key={a.bank} className="mb-3 rounded-2xl border border-slate-100 p-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-2xl">{a.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-700">{a.bank}</p>
                <p className="text-brand-muted-2 text-xs">{a.name}</p>
              </div>
            </div>
            <div className="bg-brand-page flex items-center justify-between rounded-lg px-3.5 py-2.5">
              <span className="font-mono text-sm tracking-wide text-slate-700">{a.number}</span>
              <button onClick={() => copy(a.number)} className="btn-primary rounded-full px-4 py-1.5 text-xs font-semibold text-white">
                {copied === a.number ? "✓" : "Salin"}
              </button>
            </div>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-center">
          <i className="fas fa-gift mb-2 block text-xl text-pink-300" />
          <p className="text-brand-muted-2 text-xs">Kado fisik dapat dikirim ke:</p>
          <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-700">
            Jl. Bunga Sakura No. 12, Seoul Garden<br />Jakarta Selatan 12345
          </p>
        </div>
        <button className="text-brand-muted-2 hover:text-brand-ink mt-4 w-full py-2 text-sm transition-colors" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
}

// ─── INVITATION MAIN ─────────────────────────────────────────────────────────
function Invitation({ audioRef, playing, setPlaying }) {
  const countdown = useCountdown(WEDDING_DATE);
  const [rsvpModal, setRsvpModal] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  const [transferModal, setTransferModal] = useState(false);
  const [wishes, setWishes] = useState([
    { name: "Budi Santoso", attendance: "hadir", message: "Semoga menjadi keluarga yang sakinah mawaddah warahmah 🙏" },
    { name: "Siti Rahayu", attendance: "hadir", message: "Bahagia selalu Yeobo & Aein! 💕" },
  ]);
  const [rsvpName, setRsvpName] = useState("");

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  const handleRSVP = (form) => {
    setWishes(p => [{ ...form }, ...p]);
    setRsvpName(form.name);
    setRsvpModal(false);
    setTimeout(() => setQrModal(true), 300);
  };

  return (
    <div className="bg-brand-deep min-h-screen w-full sm:py-10">
      <button
        onClick={toggleMusic}
        title={playing ? "Pause musik" : "Play musik"}
        className="bg-brand fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
      >
        <i className={`fas fa-${playing ? "pause" : "music"}`} />
      </button>

      <div className="bg-brand-page relative mx-auto w-full max-w-lg overflow-hidden shadow-2xl sm:rounded-3xl">

        {/* ── HERO ── */}
        <section className="bg-brand relative overflow-hidden">
          <Reveal direction="scale">
            <div className="h-96 overflow-hidden">
              <img src={IMAGES.cover} alt="couple" className="h-full w-full object-cover object-top" />
            </div>
          </Reveal>
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "linear-gradient(to bottom, rgba(107,143,163,0.1) 30%, rgba(93,130,153,0.85) 100%)" }}
          />
          <div className="relative z-10 -mt-20 px-7 pb-10">
            <Reveal delay={0.1}>
              <span className="mb-2 block text-xs uppercase tracking-widest text-white/70">Wedding Invitation</span>
              <h1
                className="font-display mb-3 leading-tight text-white"
                style={{ fontSize: "clamp(2.6rem, 10vw, 3.5rem)" }}
              >
                Yeobo &amp;<br /><em>Aein</em>
              </h1>
              <p className="mb-7 max-w-xs text-sm leading-relaxed text-white/80">
                Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Anda untuk hadir menyaksikan hari istimewa kami.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="grid grid-cols-4 gap-2.5">
                {[["days","Hari"],["hours","Jam"],["minutes","Menit"],["seconds","Detik"]].map(([k,l]) => (
                  <div key={k} className="rounded-xl bg-white/20 px-2 py-3.5 text-center">
                    <div className="font-display text-2xl font-bold tabular-nums text-white">
                      {String(countdown[k]).padStart(2,"0")}
                    </div>
                    <div className="mt-1 text-xs tracking-wide text-white/60">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── OPENING QUOTE ── */}
        <section className="bg-brand-page px-7 py-14 text-center">
          <Reveal>
            <Ornament />
            <p className="font-display mx-auto mb-3 max-w-sm text-base italic leading-loose text-slate-600">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
            </p>
            <p className="text-brand-muted-2 text-xs tracking-wide">— QS. Ar-Rum: 21</p>
          </Reveal>
        </section>

        {/* ── BRIDE ── */}
        <section className="bg-brand-slate overflow-hidden px-5 pb-8 pt-10">
          <Reveal>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {[IMAGES.gallery1, IMAGES.gallery2, IMAGES.couple].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden">
                  <img src={src} alt="" className="block h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-stretch">
              <div className="flex flex-1 flex-col">
                <div className="flex-1 overflow-hidden" style={{ borderTopLeftRadius: "50% 80px" }}>
                  <img src={IMAGES.bride} alt="bride" className="block min-h-80 w-full object-cover object-top" />
                </div>
                <div className="rounded-b-lg bg-white/95 px-5 py-5">
                  <h3 className="mb-1 text-xl font-bold uppercase tracking-wide text-slate-700">Aein Putri</h3>
                  <p className="text-brand-muted text-sm">Putri dari Bapak Park &amp; Ibu Choi</p>
                </div>
              </div>
              <div className="flex w-9 flex-shrink-0 flex-col items-center justify-center gap-1.5 pl-1.5">
                <span
                  className="font-display text-5xl leading-none text-white/75"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  Bride
                </span>
                <span className="text-sm uppercase tracking-widest text-white/60">The</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── GROOM ── */}
        <section className="bg-brand-slate overflow-hidden px-5 pb-12 pt-2">
          <Reveal>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {[IMAGES.gallery3, IMAGES.gallery4, IMAGES.couple].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden">
                  <img src={src} alt="" className="block h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-stretch">
              <div className="flex w-9 flex-shrink-0 flex-col items-center justify-center gap-1.5 pr-1.5">
                <span className="font-display text-5xl leading-none text-white/75" style={{ writingMode: "vertical-rl" }}>
                  Groom
                </span>
                <span className="text-sm uppercase tracking-widest text-white/60">The</span>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex-1 overflow-hidden" style={{ borderTopRightRadius: "50% 80px" }}>
                  <img src={IMAGES.groom} alt="groom" className="block min-h-80 w-full object-cover object-top" />
                </div>
                <div className="rounded-b-lg bg-white/95 px-5 py-5">
                  <h3 className="mb-1 text-xl font-bold uppercase tracking-wide text-slate-700">Yeobo Putra</h3>
                  <p className="text-brand-muted text-sm">Putra dari Bapak Kim &amp; Ibu Lee</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── WEDDING DETAIL ── */}
        <section className="bg-brand-deep px-7 py-14">
          <Reveal>
            <span className="mb-2 block text-center text-xs uppercase tracking-widest text-white/60">Save The Date</span>
            <h2 className="font-display mb-7 text-center text-4xl text-white">Acara Pernikahan</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {[
              { icon: "fa-ring", title: "Akad Nikah", date: "Sabtu, 20 September 2025", time: "08:00 – 10:00 WIB", place: "Masjid Al-Ikhlas\nJl. Bunga Sakura No. 1, Jakarta" },
              { icon: "fa-glass-cheers", title: "Resepsi", date: "Sabtu, 20 September 2025", time: "11:00 – 14:00 WIB", place: "Grand Seoul Ballroom\nJl. Thamrin No. 99, Jakarta Pusat" },
            ].map((e, i) => (
              <Reveal key={e.title} delay={i * 0.15}>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-5">
                  <i className={`fas ${e.icon} mb-2.5 block text-lg text-white/70`} />
                  <h4 className="mb-2 text-sm font-bold text-white">{e.title}</h4>
                  <p className="text-xs leading-relaxed text-white/80">{e.date}</p>
                  <p className="text-xs text-white/80">{e.time}</p>
                  <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-white/50">{e.place}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-8 flex justify-center gap-8">
              {[["days","Hari"],["hours","Jam"],["minutes","Menit"],["seconds","Detik"]].map(([k,l]) => (
                <div key={k} className="text-center">
                  <div className="font-display text-4xl font-bold leading-none tabular-nums text-white">
                    {String(countdown[k]).padStart(2,"0")}
                  </div>
                  <div className="mt-1 text-xs tracking-wide text-white/50">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── MAPS ── */}
        <section className="bg-brand-page px-7 py-14">
          <Reveal>
            <span className="text-brand-muted mb-4 block text-center text-xs uppercase tracking-widest">Lokasi</span>
            <div className="mb-4 overflow-hidden rounded-2xl shadow-lg">
              <iframe
                title="map"
                width="100%"
                height="220"
                className="block border-0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.8%2C-6.22%2C106.85%2C-6.18&layer=mapnik"
              />
            </div>
            <div className="text-center">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white no-underline transition-transform hover:-translate-y-0.5"
              >
                <i className="fas fa-map-marker-alt" /> Buka di Google Maps
              </a>
            </div>
          </Reveal>
        </section>

        {/* ── MEMORIES ── */}
        <section className="bg-white px-7 py-14">
          <Reveal>
            <span className="text-brand-muted block text-center text-xs uppercase tracking-widest">Our Memories</span>
          </Reveal>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[IMAGES.memory1,IMAGES.memory2,IMAGES.memory3,IMAGES.memory4,IMAGES.memory5,IMAGES.memory6].map((src, i) => (
              <Reveal key={i} delay={i * 0.07} direction="scale">
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img src={src} alt={`memory-${i}`} className="memory-img h-full w-full object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── LIVE STREAMING ── */}
        <section className="bg-brand-page px-7 py-14 text-center">
          <Reveal>
            <i className="fas fa-video text-brand mb-3 block text-2xl" />
            <span className="text-brand-muted text-xs uppercase tracking-widest">Live Streaming</span>
            <h3 className="font-display text-brand-ink mb-3 mt-2 text-2xl">Saksikan Momen Kami</h3>
            <p className="text-brand-muted mx-auto mb-6 max-w-xs text-sm leading-relaxed">
              Bagi yang tidak bisa hadir, saksikan momen bahagia kami melalui siaran langsung.
            </p>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white no-underline transition-transform hover:-translate-y-0.5"
            >
              <i className="fab fa-youtube" /> Tonton Live
            </a>
          </Reveal>
        </section>

        {/* ── RSVP ── */}
        <section className="bg-white px-7 py-14">
          <Reveal>
            <div className="text-center">
              <i className="fas fa-envelope-open-text text-brand mb-3 block text-2xl" />
              <span className="text-brand-muted text-xs uppercase tracking-widest">RSVP</span>
              <h3 className="font-display text-brand-ink mb-2 mt-2 text-2xl">Konfirmasi Kehadiran</h3>
              <p className="text-brand-muted-2 mb-6 text-xs leading-relaxed">
                Mohon konfirmasi kehadiran Anda sebelum<br />10 September 2025
              </p>
              <button
                onClick={() => setRsvpModal(true)}
                className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <i className="fas fa-check-circle" /> Konfirmasi Sekarang
              </button>
            </div>
          </Reveal>
        </section>

        {/* ── WISHES ── */}
        {wishes.length > 0 && (
          <section className="bg-brand-page px-7 py-10">
            <Reveal>
              <span className="text-brand-muted block text-center text-xs uppercase tracking-widest">Doa &amp; Ucapan</span>
            </Reveal>
            <div className="mt-5 space-y-2.5">
              {wishes.map((w, i) => (
                <Reveal key={i} delay={Math.min(i * 0.06, 0.3)}>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2.5">
                      <div className="bg-brand flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                        {w.name[0]}
                      </div>
                      <p className="flex-1 text-sm font-bold text-slate-700">{w.name}</p>
                      <span className={`text-xs font-semibold ${w.attendance === "hadir" ? "text-emerald-500" : "text-red-500"}`}>
                        {w.attendance === "hadir" ? "✅ Hadir" : "❌ Tidak Hadir"}
                      </span>
                    </div>
                    <p className="pl-11 text-sm leading-relaxed text-slate-500">{w.message}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── WEDDING GIFT ── */}
        <section className="bg-white px-7 py-14">
          <Reveal>
            <div className="text-center">
              <i className="fas fa-gift text-brand-accent mb-3 block text-2xl" />
              <span className="text-brand-muted text-xs uppercase tracking-widest">Wedding Gift</span>
              <h3 className="font-display text-brand-ink mb-2 mt-2 text-2xl">Hadiah Pernikahan</h3>
              <p className="text-brand-muted-2 mx-auto mb-6 max-w-xs text-xs leading-relaxed">
                Kehadiran dan doa restu Anda adalah karunia terbesar bagi kami. Jika ingin memberikan hadiah:
              </p>
              <button
                onClick={() => setTransferModal(true)}
                className="btn-accent inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <i className="fas fa-hand-holding-heart" /> Kirim Hadiah
              </button>
            </div>
          </Reveal>
        </section>

        {/* ── CLOSING ── */}
        <section className="bg-brand-deep px-7 py-14 text-center">
          <Reveal direction="scale">
            <div className="mx-auto mb-7 h-48 w-48 overflow-hidden rounded-full border-4 border-white/20 shadow-xl">
              <img src={IMAGES.couple2} alt="couple" className="h-full w-full object-cover object-top" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="text-xs uppercase tracking-widest text-white/60">With Love</span>
            <h2 className="font-display mb-2 mt-1 text-4xl text-white">Yeobo &amp; Aein</h2>
            <p className="text-xs tracking-wide text-white/50">20 September 2025 · Jakarta, Indonesia</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-6 flex justify-center gap-3">
              {[["fab fa-instagram","https://instagram.com"],["fab fa-tiktok","https://tiktok.com"]].map(([cls, href], i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white no-underline transition-colors hover:bg-white/30"
                >
                  <i className={cls} />
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* MODALS */}
        {rsvpModal && <RSVPModal onClose={() => setRsvpModal(false)} onSubmit={handleRSVP} />}
        {qrModal && <QRModal name={rsvpName} onClose={() => setQrModal(false)} />}
        {transferModal && <TransferModal onClose={() => setTransferModal(false)} />}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="wed-theme">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <style>{themeStyles}</style>
      <audio
        ref={audioRef}
        src={MUSIC_URL}
        loop
        className="hidden"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {!opened
        ? <Cover onOpen={() => setOpened(true)} audioRef={audioRef} />
        : <Invitation audioRef={audioRef} playing={playing} setPlaying={setPlaying} />
      }
    </div>
  );
}
