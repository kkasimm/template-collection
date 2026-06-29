import { useState, useEffect, useRef } from "react";

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const COUPLE = {
  groom: {
    name: "Briptu Indra Lukman Hakim S.H",
    shortName: "Indra",
    parent: "Putra dari Bapak H. Amad (Alm) dan Ibu Hj. Nurhalimah",
    instagram: "indra_lukman",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  bride: {
    name: "Yurita Febriyawati S.I.Kom",
    shortName: "Yurita",
    parent: "Putri dari Bapak Muslim (KBJ) dan Ibu Nurkhasanah",
    instagram: "yurita_febri",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
};

const EVENTS = [
  {
    id: "akad",
    title: "Akad Nikah",
    date: "Sunday, 23 November 2028",
    time: "08.00 – 12.00 WIB",
    venue: "HOTEL SATU HATI",
    mapsUrl: "https://maps.google.com",
    photo: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=350&fit=crop",
  },
  {
    id: "resepsi",
    title: "Resepsi",
    date: "Sunday, 23 November 2028",
    time: "08.00 – 12.00 WIB",
    venue: "HOTEL SATU HATI",
    mapsUrl: "https://maps.google.com",
    photo: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=350&fit=crop",
  },
];

const LOVE_STORY = [
  {
    track: 1,
    title: "Pertemuan Kita",
    color: "from-teal-700 to-teal-900",
    text: "Mereka bertemu tanpa rencana, hanya dua orang asing yang kebetulan berada di tempat yang sama pada waktu yang tepat. Dari sapaan singkat yang awalnya biasa saja, tiba-tiba muncul percakapan yang terasa hangat dan berbeda.",
    photo: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=180&h=180&fit=crop",
  },
  {
    track: 2,
    title: "Jatuh Cinta",
    color: "from-green-700 to-green-900",
    text: "Mereka bertemu tanpa rencana, hanya dua orang asing yang kebetulan berada di tempat yang sama pada waktu yang tepat. Dari sapaan singkat yang awalnya biasa saja, tiba-tiba muncul percakapan yang terasa hangat dan berbeda.",
    photo: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=180&h=180&fit=crop",
  },
  {
    track: 3,
    title: "Mengikat Cinta",
    color: "from-purple-700 to-purple-900",
    text: "Mereka bertemu tanpa rencana, hanya dua orang asing yang kebetulan berada di tempat yang sama pada waktu yang tepat. Dari sapaan singkat yang awalnya biasa saja, tiba-tiba muncul percakapan yang terasa hangat dan berbeda.",
    photo: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=180&h=180&fit=crop",
  },
  {
    track: 4,
    title: "Married",
    color: "from-yellow-700 to-yellow-900",
    text: "Mereka bertemu tanpa rencana, hanya dua orang asing yang kebetulan berada di tempat yang sama pada waktu yang tepat. Dari sapaan singkat yang awalnya biasa saja, tiba-tiba muncul percakapan yang terasa hangat dan berbeda.",
    photo: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=180&h=180&fit=crop",
  },
];

const MEMORIES = [
  { title: "Sedia Aku Sebelum Hujan", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
  { title: "Cinta Luar Biasa", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
  { title: "Bawa Dia Kembali", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { title: "Sampai Menutup Mata", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
  { title: "Komang - Raim Laode", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face" },
  { title: "Mencintaimu", photo: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=200&h=200&fit=crop&crop=face" },
];

const COVER_PHOTO = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&h=300&fit=crop";
const AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const BANK_ACCOUNTS = [
  { bank: "BCA", accountNumber: "98122XXXX", accountName: "Pramarta Andita", color: "#005BAC" },
  { bank: "MANDIRI", accountNumber: "75021XXXX", accountName: "Aminudin Syahputra", color: "#E8A000" },
];

const GIFT_PHONE = "+62 812-XXXX-XXXX";

// ─── Countdown Hook ───────────────────────────────────────────────────────────
function useCountdown(target) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return;
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

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
// Mengembalikan [ref, isVisible]. Animasi slide-from-top berjalan sekali
// saat elemen pertama kali masuk viewport.
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Reveal Wrapper Component ─────────────────────────────────────────────────
// Membungkus children dengan animasi slide-down + fade.
// delay (ms) memungkinkan stagger pada item dalam grid.
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(-36px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Spotify Logo SVG ─────────────────────────────────────────────────────────
function SpotifyLogo({ size = 40, heart = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="84" cy="84" r="84" fill="#1DB954" />
      {heart ? (
        <path d="M84 120s-36-22-36-46c0-14 10-24 22-24 7 0 14 4 14 4s7-4 14-4c12 0 22 10 22 24 0 24-36 46-36 46z" fill="white" />
      ) : (
        <>
          <path d="M119 111.5c-1.5 2.5-4.7 3.3-7.2 1.8C93 103.5 69.8 101 43.3 107c-3 .7-5.9-1.1-6.6-4.1-.7-3 1.1-5.9 4.1-6.6 29.1-6.6 54.8-3.8 75.4 8.1 2.5 1.5 3.3 4.7 1.8 7.2zm10-22.2c-1.9 3.1-5.9 4-9 2.1C99.3 79.2 71.1 74.9 47.8 82.5c-3.3 1-6.8-.9-7.8-4.1-1-3.3.9-6.8 4.1-7.8 26.9-8.2 60.2-3.2 83.1 12 3.1 1.9 4 5.9 2.1 9l-.3-.3zm.9-23.1C104.4 51 62.8 49.5 38 56.7c-3.9 1.2-8-.9-9.2-4.8-1.2-3.9.9-8 4.8-9.2 28.4-8.6 75.7-6.9 105.6 10.4 3.5 2.1 4.7 6.5 2.6 10.1-2.1 3.5-6.6 4.7-10.1 2.6z" fill="white" />
        </>
      )}
    </svg>
  );
}

// ─── Sticky Music Player Bar ──────────────────────────────────────────────────
function StickyPlayer({ playing, onToggle, onToggleMute, muted }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#181818] border-t border-[#282828] px-4 py-2 flex items-center gap-3">
      <img src={COVER_PHOTO} alt="cover" className="w-10 h-10 rounded object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-semibold truncate">The Wedding Of</p>
        <p className="text-[#b3b3b3] text-xs truncate">Indra &amp; Yurita</p>
      </div>
      <button onClick={onToggle} className="text-white">
        <i className={`fas ${playing ? "fa-pause" : "fa-play"} text-sm`} />
      </button>
      <button onClick={onToggleMute} className="text-white ml-1">
        <i className={`fas ${muted ? "fa-volume-mute" : "fa-volume-up"} text-sm`} />
      </button>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <Reveal>
      <div className="text-center mb-6">
        <h2 className="text-white text-2xl font-bold">{children}</h2>
        <div className="w-12 h-0.5 bg-green-500 mx-auto mt-2" />
      </div>
    </Reveal>
  );
}

// ─── Copy to Clipboard Button ─────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handleCopy} className="text-[#b3b3b3] hover:text-green-500 transition" title="Salin nomor rekening">
      {copied ? <i className="fas fa-check text-green-500 text-sm" /> : <i className="far fa-copy text-sm" />}
    </button>
  );
}

// ─── Bank Logo Badge ──────────────────────────────────────────────────────────
function BankLogo({ bank, color }) {
  return (
    <span className="font-extrabold text-base tracking-tight" style={{ color }}>
      {bank === "BCA" ? "BCA" : <span style={{ fontFamily: "serif", letterSpacing: "0.05em" }}>Mandiri</span>}
    </span>
  );
}

// ─── Transfer Rekening Section ────────────────────────────────────────────────
function TransferSection() {
  const [open, setOpen] = useState(true);
  const [konfirmasi, setKonfirmasi] = useState(false);
  return (
    <section className="px-4 py-6 bg-[#121212]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between mb-4">
            <span className="text-green-500 text-xs font-bold tracking-widest uppercase">Transfer Rekening</span>
            <i className={`fas fa-chevron-${open ? "up" : "down"} text-green-500 text-xs`} />
          </button>
        </Reveal>
        {open && (
          <div className="space-y-3">
            {BANK_ACCOUNTS.map((acc, i) => (
              <Reveal key={acc.bank} delay={i * 100}>
                <div className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm">
                  <div>
                    <BankLogo bank={acc.bank} color={acc.color} />
                    <p className="text-gray-900 font-bold text-xl mt-1 tracking-wide">{acc.accountNumber}</p>
                    <p className="text-gray-400 text-sm mt-0.5">{acc.accountName}</p>
                  </div>
                  <CopyButton text={acc.accountNumber} />
                </div>
              </Reveal>
            ))}
            <Reveal delay={200}>
              {konfirmasi ? (
                <div className="text-center py-4">
                  <i className="fas fa-check-circle text-green-500 text-2xl mb-1 block" />
                  <p className="text-green-500 text-sm font-semibold">Terima kasih telah mengonfirmasi transfer!</p>
                </div>
              ) : (
                <button
                  onClick={() => setKonfirmasi(true)}
                  className="w-full border border-[#444] text-white text-xs font-bold tracking-widest uppercase py-3.5 rounded-xl hover:border-green-500 hover:text-green-500 transition mt-1"
                >
                  Konfirmasi Transfer
                </button>
              )}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Kirim Kado Section ───────────────────────────────────────────────────────
function KadoSection() {
  const [open, setOpen] = useState(true);
  return (
    <section className="px-4 py-6 bg-[#181818]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between mb-4">
            <span className="text-green-500 text-xs font-bold tracking-widest uppercase">Kirim Kado</span>
            <i className={`fas fa-chevron-${open ? "up" : "down"} text-green-500 text-xs`} />
          </button>
        </Reveal>
        {open && (
          <Reveal delay={80}>
            <div className="rounded-2xl border border-[#2a2a2a] p-5">
              <p className="text-[#b3b3b3] text-sm leading-relaxed mb-3">Silakan hubungi kami untuk alamat pengiriman:</p>
              <a
                href={`https://wa.me/${GIFT_PHONE.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-green-500 font-bold text-base hover:underline"
              >
                <i className="fab fa-whatsapp text-green-500" />
                {GIFT_PHONE}
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Spotify() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [guestName] = useState("Nama Tamu");
  const [rsvp, setRsvp] = useState({ name: "", message: "", attend: "hadir" });
  const [submitted, setSubmitted] = useState(false);
  const [showVinyl, setShowVinyl] = useState(false);
  const audioRef = useRef(null);
  const countdown = useCountdown("2028-11-23T08:00:00");

  useEffect(() => {
    const timer = setTimeout(() => setShowVinyl(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [playing]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
  }, [muted]);

  const handleOpen = () => {
    setOpened(true);
    setPlaying(true);
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // ── Cover Screen ─────────────────────────────────────────────────────────
  if (!opened) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-sans">
        <div className="w-full max-w-sm mx-auto px-8 py-16 flex flex-col items-center text-center">
          <div className="w-40 h-40 flex items-center justify-center mb-10">
            {!showVinyl ? (
              <div className="flex items-end gap-2 h-16">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-2 bg-green-500 rounded-full animate-pulse"
                    style={{ height: `${20 + (i % 3) * 15}px`, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            ) : (
              <div className="relative animate-spin-slow">
                <div className="w-36 h-36 rounded-full bg-black border-4 border-zinc-800 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-1/2 w-20 h-40 bg-white/10 blur-xl -translate-x-1/2 rotate-12" />
                  <div className="absolute inset-4 rounded-full border border-zinc-700" />
                  <div className="absolute inset-8 rounded-full border border-zinc-700" />
                  <div className="absolute inset-12 rounded-full border border-zinc-700" />
                  <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-green-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}
          </div>
          <h1 className="text-white font-extrabold text-2xl leading-tight mb-4">
            Stream our love story.<br />Groom &amp; Bride.
          </h1>
          <p className="text-[#b3b3b3] text-sm mb-1">on the special playlist:</p>
          <p className="text-white font-bold text-base mb-10">{guestName}</p>
          <button
            onClick={handleOpen}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-black font-bold py-3 rounded-full text-base hover:bg-green-400 transition mb-3"
          >
            <SpotifyLogo size={22} />
            Open Invitation
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-[#555] text-white py-3 rounded-full text-sm hover:border-white transition">
            <i className="fas fa-play text-xs" />
            Konfirmasi Kehadiran
          </button>
        </div>
      </div>
    );
  }

  // ── Full Invitation ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black font-sans pb-20">
      <div className="max-w-7xl mx-auto">
        <audio ref={audioRef} src={AUDIO_URL} loop />

        {/* ── Hero ── */}
        <Reveal>
          <section className="relative">
            <img src={COVER_PHOTO} alt="couple" className="w-full h-56 md:h-[420px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          </section>
        </Reveal>

        {/* ── Now Playing Card ── */}
        <div className="bg-[#121212] px-4 md:px-8 pt-4 pb-10">
          <div className="max-w-5xl mx-auto">
            {/* Controls */}
            <Reveal delay={60}>
              <div className="flex justify-center items-center gap-6 text-[#b3b3b3] mb-3">
                <button><i className="fas fa-random" /></button>
                <button><i className="fas fa-step-backward" /></button>
                <button
                  onClick={() => setPlaying(!playing)}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black text-xl"
                >
                  <i className={`fas ${playing ? "fa-pause" : "fa-play"} ml-0.5`} />
                </button>
                <button><i className="fas fa-step-forward" /></button>
                <button><i className="fas fa-redo" /></button>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="text-center mb-4">
                <p className="text-white font-extrabold text-xl">Indra &amp; Yurita: New Chapter</p>
                <span className="inline-block bg-green-500 text-black text-xs font-bold px-3 py-0.5 rounded-full mt-1">
                  Coming soon on Saturday, 14 December 2024
                </span>
              </div>
            </Reveal>

            {/* Countdown — stagger each box */}
            <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto text-center mb-5">
              {[
                ["Hari", countdown.days],
                ["Jam", countdown.hours],
                ["Menit", countdown.minutes],
                ["Detik", countdown.seconds],
              ].map(([label, val], i) => (
                <Reveal key={label} delay={120 + i * 70}>
                  <div className="bg-[#1a1a1a] rounded-xl py-3">
                    <p className="text-white font-extrabold text-2xl tabular-nums">{String(val).padStart(2, "0")}</p>
                    <p className="text-[#b3b3b3] text-xs mt-0.5">{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={180}>
              <p className="text-[#b3b3b3] text-xs text-center leading-relaxed px-4">
                Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
              </p>
              <p className="text-[#b3b3b3] text-xs text-center mt-1 italic">(Q.S Ar-Rum ayat 21)</p>
            </Reveal>
          </div>
        </div>

        {/* ── Favourite Couple ── */}
        <section className="px-4 md:px-8 py-12 bg-[#181818]">
          <SectionTitle>Favourite Couple</SectionTitle>
          <Reveal delay={60}>
            <p className="text-[#b3b3b3] text-xs text-center mb-6 leading-relaxed">
              Dengan memohon rahmat dan ridho Allah SWT kami bermaksud mengundang Bapak/Ibu/Saudara/i dalam acara Akad Nikah &amp; Resepsi putra-putri kami
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Reveal delay={0}>
              <div className="rounded-3xl px-6 py-6 flex items-center gap-5 shadow-xl min-h-[180px]" style={{ background: "linear-gradient(135deg,#6b21a8,#a21caf)" }}>
                <img src={COUPLE.groom.photo} alt="groom" className="w-28 h-28 rounded-full object-cover border-4 border-white/30 flex-shrink-0" />
                <div>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full mb-1 inline-block">@{COUPLE.groom.instagram}</span>
                  <h3 className="text-white font-extrabold">{COUPLE.groom.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{COUPLE.groom.parent}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={130}>
              <div className="rounded-3xl px-6 py-6 flex items-center gap-5 shadow-xl min-h-[180px]" style={{ background: "linear-gradient(135deg,#0f766e,#0369a1)" }}>
                <img src={COUPLE.bride.photo} alt="bride" className="w-28 h-28 rounded-full object-cover border-4 border-white/30 flex-shrink-0" />
                <div>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full mb-1 inline-block">@{COUPLE.bride.instagram}</span>
                  <h3 className="text-white font-extrabold">{COUPLE.bride.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{COUPLE.bride.parent}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Timeline & Location ── */}
        <section className="px-4 py-8 bg-[#121212]">
          <SectionTitle>Timeline &amp; Location</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {EVENTS.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 130}>
                <div className="rounded-2xl overflow-hidden relative">
                  <img src={ev.photo} alt={ev.title} className="w-full h-56 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-5"
                    style={{ background: "linear-gradient(to top, rgba(29,185,84,0.55) 0%, transparent 70%)" }}
                  >
                    <h3 className="text-white font-extrabold text-2xl mb-2">{ev.title}</h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm mb-1"><i className="far fa-calendar-alt text-xs" /><span>{ev.date}</span></div>
                    <div className="flex items-center gap-2 text-white/90 text-sm mb-1"><i className="far fa-clock text-xs" /><span>{ev.time}</span></div>
                    <div className="flex items-center gap-2 text-white/90 text-sm mb-3"><i className="fas fa-map-marker-alt text-xs" /><span>{ev.venue}</span></div>
                    <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-block bg-green-500 text-black font-bold text-sm px-4 py-1.5 rounded-full w-fit hover:bg-green-400 transition">
                      Petunjuk Lokasi
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Confirm Attendance ── */}
        <section className="px-4 md:px-8 py-12 bg-[#181818]">
          <SectionTitle>Confirm Attendance</SectionTitle>
          <Reveal delay={60}>
            <p className="text-[#b3b3b3] text-sm text-center mb-6">
              Silakan tekan tombol di bawah ini untuk mengkonfirmasi kehadiran Anda dan mengirim ucapan atau doa. Kami sangat menghargai kehadiran Anda!
            </p>
          </Reveal>
          <Reveal delay={120}>
            {submitted ? (
              <div className="text-center text-green-500 font-bold text-lg py-6">
                <i className="fas fa-check-circle text-3xl mb-2 block" />
                Terima kasih! Kehadiran Anda telah dikonfirmasi.
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4 max-w-2xl mx-auto bg-[#1a1a1a] p-8 rounded-3xl border border-[#2a2a2a]">
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  className="w-full bg-[#282828] text-white rounded-2xl px-4 py-4 text-sm border border-[#3e3e3e] outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                  required
                />
                <div className="relative">
                  <select
                    value={rsvp.attend}
                    onChange={(e) => setRsvp({ ...rsvp, attend: e.target.value })}
                    className="w-full appearance-none bg-[#282828] text-white rounded-2xl px-4 py-3 pr-12 text-sm border border-[#3e3e3e] outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 cursor-pointer"
                  >
                    <option value="hadir">Hadir</option>
                    <option value="tidak">Tidak Hadir</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <textarea
                  placeholder="Ucapan & Doa"
                  value={rsvp.message}
                  onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })}
                  className="w-full bg-[#282828] text-white rounded-2xl px-4 py-3 text-sm outline-none placeholder-[#555] resize-none h-24 focus:ring-1 focus:ring-green-500"
                />
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-500 text-black font-bold py-3 rounded-full hover:bg-green-400 transition">
                  <SpotifyLogo size={20} />
                  Konfirmasi Kehadiran
                </button>
              </form>
            )}
          </Reveal>
        </section>

        {/* ── Our Love Story ── */}
        <section className="px-4 md:px-8 py-12 bg-[#121212]">
          <SectionTitle>Our Love Story</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {LOVE_STORY.map((item, i) => (
              <Reveal key={item.track} delay={i * 100}>
                <div className={`rounded-3xl bg-gradient-to-br ${item.color} p-6 flex gap-5 items-start shadow-xl`}>
                  <img src={item.photo} alt={item.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-xs font-semibold mb-0.5">Track {item.track}</p>
                    <h3 className="text-white font-extrabold text-base mb-1">{item.title}</h3>
                    <p className="text-white/80 text-xs leading-relaxed line-clamp-5">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Our Memories ── */}
        <section className="px-4 md:px-8 py-12 bg-[#181818]">
          <SectionTitle>Our Memories</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {MEMORIES.map((m, i) => (
              <Reveal key={m.title} delay={i * 60}>
                <div className="rounded-xl overflow-hidden relative group cursor-pointer">
                  <img src={m.photo} alt={m.title} className="w-full h-40 object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold leading-tight">{m.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Transfer Rekening ── */}
        <TransferSection />

        {/* ── Kirim Kado ── */}
        <KadoSection />

        {/* ── Footer ── */}
        <section className="px-4 md:px-8 py-12 bg-[#121212] text-center">
          <Reveal>
            <div className="flex justify-center mb-6">
              <SpotifyLogo size={56} heart />
            </div>
            <p className="text-[#b3b3b3] text-xs leading-relaxed max-w-xs mx-auto mb-6">
              Kami mengucapkan terima kasih atas kehadiran Anda dalam perayaan pernikahan kami. Kami sangat berterima kasih atas kehadiran, doa restu, dan hadiah yang telah Anda berikan. Kami menantikan masa depan kami bersama dan menciptakan lebih banyak kenangan dengan Anda.
            </p>
            <p className="text-[#b3b3b3] text-sm mb-1">See You On Our Big Day</p>
            <h2 className="text-white font-extrabold text-2xl">Indra &amp; Yurita</h2>
            <p className="text-[#555] text-xs mt-6">Music: Telling the World (From the Soundtrack to "RIO" the Movie)</p>
          </Reveal>
        </section>

        {/* ── Sticky Bottom Player ── */}
        <StickyPlayer
          playing={playing}
          onToggle={() => setPlaying(!playing)}
          onToggleMute={() => setMuted(!muted)}
          muted={muted}
        />
      </div>
    </div>
  );
}
