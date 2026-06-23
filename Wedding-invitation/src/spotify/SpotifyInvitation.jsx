import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import musicFile from "../assets/music.mp3";
import "./SpotifyInvitation.css";

// ════════════════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════════════════

const TRACKS = [
  {
    number: "01",
    title: "Pertemuan Pertama",
    lyric: "Seperti playlist baru yang langsung masuk ke hati",
    duration: "3:24",
    active: false,
  },
  {
    number: "02",
    title: "Jatuh Tanpa Sadar",
    lyric: "Lagu favoritmu jadi lagu favoritku juga",
    duration: "4:01",
    active: true,
  },
  {
    number: "03",
    title: "Bertahan di Sisi",
    lyric: "Repeat mode — selalu ingin diputar lagi",
    duration: "3:47",
    active: false,
  },
  {
    number: "04",
    title: "Lamaran",
    lyric: "Track terbaik dalam album hidup ini",
    duration: "5:12",
    active: false,
  },
  {
    number: "05",
    title: "Selamanya",
    lyric: "Tidak ada skip, tidak ada pause — hanya play",
    duration: "∞",
    active: false,
  },
];

const GALLERY_ITEMS = [
  { emoji: "💑", large: true },
  { emoji: "🌹", large: false },
  { emoji: "💍", large: false },
  { emoji: "🎶", large: false },
  { emoji: "✨", large: false },
  { emoji: "🕊️", large: false },
];

const INITIAL_WISHES = [
  {
    id: 1,
    name: "Budi Santoso",
    message: "Semoga menjadi keluarga yang sakinah mawaddah warahmah 🤲",
    attend: "hadir",
    time: "2 hari lalu",
  },
  {
    id: 2,
    name: "Sari Dewi",
    message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair 💕",
    attend: "hadir",
    time: "1 hari lalu",
  },
  {
    id: 3,
    name: "Andi Pratama",
    message: "Selamat menempuh hidup baru! Semoga langgeng sampai kakek nenek 🎉",
    attend: "tidak",
    time: "5 jam lalu",
  },
];

const STORAGE_KEY = "rhapsody_wishes";

// ════════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════════

function formatTime(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
}

function formatSeconds(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ════════════════════════════════════════════════════════════════════════════

/** Animates children when they enter the viewport */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Floating Spotify-style mini player — hidden while opener is in view */
function MusicPlayer({ audioRef, isPlaying, setIsPlaying, visible }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, [audioRef]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="music-player"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="album-thumb">🎵</div>
          <div className="track-info">
            <div className="track-name">Rhapsody JKT48</div>
            <div className="track-artist">Wedding Playlist · 2025</div>
          </div>
          <button
            className="play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Section 1 — Opening "Now Playing" screen */
function SectionOpener({ audioRef, onSectionExit }) {
  const fillRef = useRef(null);
  const timeRef = useRef(null);
  const sectionRef = useRef(null);
  const [duration, setDuration] = useState("∞");

  // Ambil nama tamu dari URL ?nama=...
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("nama") || null;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Sync progress bar & waktu dengan audio asli
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const update = () => {
      const dur = audio.duration || 0;
      const current = audio.currentTime || 0;
      const pct = dur ? (current / dur) * 100 : 0;

      if (fillRef.current) fillRef.current.style.width = `${pct}%`;
      if (timeRef.current) timeRef.current.textContent = formatSeconds(current);
    };

    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [audioRef]);

  // Ambil durasi asli lagu
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;
    const onLoaded = () => {
      const d = audio.duration;
      if (d && isFinite(d)) setDuration(formatSeconds(d));
    };
    audio.addEventListener("loadedmetadata", onLoaded);
    if (audio.readyState >= 1) onLoaded();
    return () => audio.removeEventListener("loadedmetadata", onLoaded);
  }, [audioRef]);

  // Sembunyikan MusicPlayer saat opener masih terlihat
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !onSectionExit) return;

    const observer = new IntersectionObserver(
      ([entry]) => onSectionExit(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [onSectionExit]);

  return (
    <section className="section-opener" ref={sectionRef}>
      <div className="opener-bg-grid" />
      <div className="opener-bg-glow" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {guestName && (
          <motion.div variants={item} className="opener-guest">
            Kepada Yth. <span>{guestName}</span>
          </motion.div>
        )}

        <motion.div variants={item} className="opener-label">
          Wedding Invitation
        </motion.div>

        <motion.div
          variants={item}
          className="opener-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          💑
        </motion.div>

        <motion.div variants={item} className="opener-couple">
          Rizki Pratama
          <span className="opener-couple-amp">&</span>
          Aulia Zahra
        </motion.div>

        <motion.div variants={item} className="opener-now-playing">
          Now Playing
        </motion.div>

        <motion.h1 variants={item} className="opener-title">
          Rhapsody<br />
          <span style={{ color: "#1DB954" }}>JKT48</span>
        </motion.h1>

        <motion.p variants={item} className="opener-subtitle">
          A love story, written in songs
        </motion.p>

        <motion.div variants={item} className="opener-progress">
          <div className="opener-progress-bar">
            <div ref={fillRef} className="opener-progress-fill" />
          </div>
          <div className="opener-progress-times">
            <span ref={timeRef}>0:00</span>
            <span>{duration}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="opener-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span>Scroll</span>
        <div className="scroll-chevron" />
      </motion.div>
    </section>
  );
}

/** Section 2 — Tracklist / Our Story */
function SectionStory() {
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

/** Section 3 — Detail Acara */
function SectionDetail() {
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
              <div className="meta-sub">Akad: 08.00 WIB · Resepsi: 11.00 WIB</div>
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
              <div className="meta-sub">Produced by: Keluarga Besar Kedua Mempelai</div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/** Section 4 — Gallery */
function SectionGallery() {
  return (
    <section className="section-gallery">
      <FadeUp>
        <div className="section-eyebrow">Artist Photos</div>
        <h2 className="section-heading">Galeri Kami</h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="gallery-grid">
          {GALLERY_ITEMS.map((galleryItem, i) => (
            <div key={i} className={`gallery-item${galleryItem.large ? " large" : ""}`}>
              <span style={{ fontSize: galleryItem.large ? "64px" : "32px" }}>
                {galleryItem.emoji}
              </span>
              <div className="gallery-overlay" />
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: "11px", color: "#535353", marginTop: "12px" }}>
          Ganti emoji dengan foto — tambahkan tag &lt;img&gt; di dalam gallery-item
        </p>
      </FadeUp>
    </section>
  );
}

/** Section 5 — RSVP + Wishlist (persisted via localStorage) */
function SectionRSVP() {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WISHES));
        setWishes(INITIAL_WISHES);
      }
    } catch {
      setWishes(INITIAL_WISHES);
    }
  }, []);

  const handleSubmit = () => {
    if (!name.trim() || selected === null) return;

    const newWish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim() || "— tidak meninggalkan pesan —",
      attend: selected,
      time: new Date().toISOString(),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      console.warn("Gagal menyimpan ke localStorage");
    }

    setSubmitted(true);
  };

  return (
    <section className="section-rsvp">
      <FadeUp>
        <div className="section-eyebrow">Add to Queue</div>
        <h2 className="section-heading">Konfirmasi Kehadiran</h2>
      </FadeUp>

      {/* ── FORM CARD ── */}
      <FadeUp delay={0.1}>
        <div className="rsvp-card">
          <div className="rsvp-avatar">💑</div>
          <div className="rsvp-name">Rizki & Aulia</div>
          <div className="rsvp-verified">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            Verified Artist
          </div>

          <div className="rsvp-stats">
            <div>
              <div className="rsvp-stat-value">{wishes.length}</div>
              <div className="rsvp-stat-label">Ucapan</div>
            </div>
            <div>
              <div className="rsvp-stat-value">∞</div>
              <div className="rsvp-stat-label">Years Together</div>
            </div>
            <div>
              <div className="rsvp-stat-value">2</div>
              <div className="rsvp-stat-label">Families</div>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: "center", padding: "16px 0" }}
            >
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎵</div>
              <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>
                {selected === "hadir" ? "Yeay, sampai jumpa!" : "Terima kasih sudah memberi tahu kami 🙏"}
              </div>
              <div style={{ fontSize: "12px", color: "#A7A7A7" }}>
                Ucapanmu sudah ditambahkan ke playlist kami
              </div>
            </motion.div>
          ) : (
            <>
              <input
                className="rsvp-input"
                placeholder="Nama lengkap kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="rsvp-attend-options">
                <button
                  className={`rsvp-option${selected === "hadir" ? " selected" : ""}`}
                  onClick={() => setSelected("hadir")}
                >
                  ✅ Hadir
                </button>
                <button
                  className={`rsvp-option${selected === "tidak" ? " selected" : ""}`}
                  onClick={() => setSelected("tidak")}
                >
                  ❌ Tidak Hadir
                </button>
              </div>
              <textarea
                className="rsvp-textarea"
                placeholder="Titip doa & ucapan untuk kami... 🎶"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="btn-follow"
                onClick={handleSubmit}
                style={{
                  opacity: !name.trim() || selected === null ? 0.4 : 1,
                  cursor: !name.trim() || selected === null ? "not-allowed" : "pointer",
                }}
              >
                Add to Queue ♫
              </button>
            </>
          )}
        </div>
      </FadeUp>

      {/* ── WISH LIST ── */}
      <FadeUp delay={0.15}>
        <div className="wishlist-header">
          <span className="wishlist-title">🎶 Playlist Ucapan</span>
          <span className="wishlist-count">{wishes.length} ucapan</span>
        </div>
      </FadeUp>

      <div className="wishlist">
        <AnimatePresence>
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              className="wish-item"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="wish-avatar">
                {wish.name.charAt(0).toUpperCase()}
              </div>
              <div className="wish-content">
                <div className="wish-header">
                  <span className="wish-name">{wish.name}</span>
                  <span className={`wish-badge ${wish.attend === "hadir" ? "hadir" : "tidak"}`}>
                    {wish.attend === "hadir" ? "✅ Hadir" : "❌ Tidak Hadir"}
                  </span>
                </div>
                <p className="wish-message">"{wish.message}"</p>
                <span className="wish-time">
                  {wish.time.includes("T") ? formatTime(wish.time) : wish.time}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

/** Section 6 — Closing */
function SectionClosing({ isPlaying }) {
  return (
    <section className="section-closing">
      <FadeUp>
        <div className={`closing-vinyl${isPlaying ? " vinyl-spinning" : ""}`} />
      </FadeUp>

      <FadeUp delay={0.1}>
        <p className="closing-quote">
          "Setiap lagu punya akhir,<br />
          tapi album kita baru saja dimulai."
        </p>
      </FadeUp>

      <FadeUp delay={0.15}>
        <h2 className="closing-title">Sampai Jumpa di Hari Bahagia Kami</h2>
        <div className="closing-date">14 · 06 · 2025</div>
      </FadeUp>

      <FadeUp delay={0.2}>
        <div className="closing-footer">
          <div className="closing-footer-logo">♫ Rhapsody JKT48 ♫</div>
        </div>
      </FadeUp>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT (default export)
// ════════════════════════════════════════════════════════════════════════════

export default function SpotifyInvitation() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.5;

    const tryPlay = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };

    audio.play()
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

      <SectionOpener audioRef={audioRef} onSectionExit={setShowPlayer} />
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