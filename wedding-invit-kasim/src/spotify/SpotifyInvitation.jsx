import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Music2,
  Play,
  Pause,
  Calendar,
  MapPin,
  Shirt,
  Mic2,
  BadgeCheck,
  Disc3,
  ImageIcon,
  Package,
  Landmark,
  Smartphone,
  Copy,
  Check,
} from "lucide-react";
import { invitationData } from "../data/invitationData";
import "./SpotifyInvitation.css";

const GALLERY_COUNT = 6;

// HELPERS

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

async function copyToClipboard(text, setCopiedKey, key) {
  try {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  } catch {
    console.warn("Gagal menyalin ke clipboard");
  }
}

function giftIconFor(type) {
  if (type === "address") return Package;
  if (type === "bank") return Landmark;
  if (type === "ewallet") return Smartphone;
  return Package;
}

// SUB-COMPONENTS

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
  const { music } = invitationData;

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
          <div className="album-thumb">
            <Music2 size={16} />
          </div>
          <div className="track-info">
            <div className="track-name">{music.title}</div>
            <div className="track-artist">{music.artist}</div>
          </div>
          <button
            className="play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={14} fill="#000" /> : <Play size={14} fill="#000" />}
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
function SectionOpener({ audioRef, isPlaying, setIsPlaying, onSectionExit }) {
  const timeRef = useRef(null);
  const sectionRef = useRef(null);
  const [duration, setDuration] = useState("∞");
  const [progress, setProgress] = useState(0);

  const { couple, media, music } = invitationData;

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

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const update = () => {
      const dur = audio.duration || 0;
      const current = audio.currentTime || 0;
      const pct = dur ? (current / dur) * 100 : 0;

      setProgress(pct);
      if (timeRef.current) timeRef.current.textContent = formatSeconds(current);
    };

    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [audioRef]);

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
          <img src={media.photos.couple} alt="Couple" className="opener-cover-img" />
        </motion.div>

        <motion.div variants={item} className="opener-now-playing">
          Now Playing
        </motion.div>

        <motion.h1 variants={item} className="opener-title">
          {couple.groom.name}
          <br />
          <span style={{ color: "#1DB954" }}>& {couple.bride.name}</span>
        </motion.h1>

        <motion.p variants={item} className="opener-subtitle">
          {music.subtitle}
        </motion.p>

        <motion.div variants={item} className="opener-player">
          <button
            className="opener-play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={16} fill="#000" /> : <Play size={16} fill="#000" />}
          </button>

          <div className="opener-progress">
            <div className="opener-progress-bar">
              <div className="opener-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="opener-progress-times">
              <span ref={timeRef}>0:00</span>
              <span>{duration}</span>
            </div>
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
  const { tracks } = invitationData.music;

  return (
    <section className="section-story">
      <FadeUp>
        <div className="section-eyebrow">Tracklist</div>
        <h2 className="section-heading">Our Story</h2>
      </FadeUp>

      <div className="tracklist">
        {tracks.map((track, i) => (
          <FadeUp key={track.number} delay={i * 0.08}>
            <div className={`track-item${track.active ? " active" : ""}`}>
              <span className="track-number">
                {track.active ? <Play size={11} fill="#1DB954" color="#1DB954" /> : track.number}
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
  const { event, couple } = invitationData;

  return (
    <section className="section-detail">
      <FadeUp>
        <div className="section-eyebrow">Album Info</div>
        <h2 className="section-heading">Detail Acara</h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="album-meta-card">
          <div className="meta-row">
            <div className="meta-icon"><Calendar size={16} color="#1DB954" /></div>
            <div>
              <div className="meta-label">Release Date</div>
              <div className="meta-value">{event.date.full}</div>
              <div className="meta-sub">
                {event.schedule.map((s, i) => (
                  <span key={i}>
                    {s.label}: {s.time}
                    {i < event.schedule.length - 1 ? " · " : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="meta-row">
            <div className="meta-icon"><MapPin size={16} color="#1DB954" /></div>
            <div style={{ flex: 1 }}>
              <div className="meta-label">Venue</div>
              <div className="meta-value">{event.venue.name}</div>
              <div className="meta-sub">{event.venue.address}</div>
              {event.venue.mapsUrl && (
                <a
                  href={event.venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="maps-btn"
                >
                  <MapPin size={13} /> Buka di Google Maps
                </a>
              )}
            </div>
          </div>

          <div className="meta-row">
            <div className="meta-icon"><Shirt size={16} color="#1DB954" /></div>
            <div>
              <div className="meta-label">Dress Code</div>
              <div className="meta-value">{event.dressCode.spotify}</div>
              <div className="meta-sub">{event.dressCode.note}</div>
            </div>
          </div>

          <div className="meta-row">
            <div className="meta-icon"><Mic2 size={16} color="#1DB954" /></div>
            <div>
              <div className="meta-label">Featured Artists</div>
              <div className="meta-value">{couple.fullDisplayName}</div>
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
          {Array.from({ length: GALLERY_COUNT }).map((_, i) => (
            <div key={i} className={`gallery-item${i === 0 ? " large" : ""}`}>
              <ImageIcon size={i === 0 ? 40 : 24} color="#535353" />
              <div className="gallery-overlay" />
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

/** Section 5 — RSVP + Wishlist (persisted via localStorage) */
function SectionRSVP() {
  const { storageKey, initialWishes } = invitationData.rsvp.spotify;
  const { couple, media } = invitationData;

  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        localStorage.setItem(storageKey, JSON.stringify(initialWishes));
        setWishes(initialWishes);
      }
    } catch {
      setWishes(initialWishes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      localStorage.setItem(storageKey, JSON.stringify(updated));
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

      <FadeUp delay={0.1}>
        <div className="rsvp-card">
          <div className="rsvp-avatar">
            <img src={media.photos.couple} alt="Couple" className="rsvp-avatar-img" />
          </div>
          <div className="rsvp-name">{couple.displayName}</div>
          <div className="rsvp-verified">
            <BadgeCheck size={14} color="#1DB954" />
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
              <Disc3 size={40} color="#1DB954" style={{ marginBottom: "12px" }} />
              <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>
                {selected === "hadir" ? "Yeay, sampai jumpa!" : "Terima kasih sudah memberi tahu kami"}
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
                  Hadir
                </button>
                <button
                  className={`rsvp-option${selected === "tidak" ? " selected" : ""}`}
                  onClick={() => setSelected("tidak")}
                >
                  Tidak Hadir
                </button>
              </div>
              <textarea
                className="rsvp-textarea"
                placeholder="Titip doa & ucapan untuk kami..."
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
                Add to Queue
              </button>
            </>
          )}
        </div>
      </FadeUp>

      <FadeUp delay={0.15}>
        <div className="wishlist-header">
          <span className="wishlist-title">Playlist Ucapan</span>
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
                    {wish.attend === "hadir" ? "Hadir" : "Tidak Hadir"}
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

/** Section 6 — Kirim Hadiah (Spotify-themed) */
function SectionGift() {
  const { gifts } = invitationData;
  const [copiedKey, setCopiedKey] = useState(null);

  if (!gifts.enabled || !gifts.methods?.length) return null;

  return (
    <section className="section-gift">
      <FadeUp>
        <div className="section-eyebrow">Bonus Track</div>
        <h2 className="section-heading">{gifts.title}</h2>
        <p className="gift-note">{gifts.note}</p>
      </FadeUp>

      {gifts.methods.map((method, i) => {
        const Icon = giftIconFor(method.type);
        return (
          <FadeUp key={method.id} delay={0.1 + i * 0.05}>
            <div className="gift-card">
              <div className="gift-icon-wrap">
                <Icon size={20} color="#1DB954" />
              </div>
              <div className="gift-label">{method.label}</div>
              <div className="gift-value">{method.title}</div>
              <div className="gift-sub">{method.detail}</div>
              <button
                className="gift-copy-btn"
                onClick={() => copyToClipboard(method.copyText, setCopiedKey, method.id)}
              >
                {copiedKey === method.id ? (
                  <><Check size={13} /> Tersalin!</>
                ) : (
                  <><Copy size={13} /> {method.copyButtonLabel}</>
                )}
              </button>
            </div>
          </FadeUp>
        );
      })}
    </section>
  );
}

/** Section 7 — Closing */
function SectionClosing({ isPlaying }) {
  const { event, couple } = invitationData;
  const { music } = invitationData;

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
        <div className="closing-date">{event.date.short}</div>
      </FadeUp>

      <FadeUp delay={0.2}>
        <div className="closing-footer">
          <div className="closing-footer-logo">{music.title}</div>
        </div>
      </FadeUp>
    </section>
  );
}

// MAIN COMPONENT (default export)

export default function SpotifyInvitation() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const { music } = invitationData;

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
      <audio ref={audioRef} src={music.file} preload="auto" />

      <SectionOpener
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onSectionExit={setShowPlayer}
      />
      <SectionStory />
      <SectionDetail />
      <SectionGallery />
      <SectionRSVP />
      <SectionGift />
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