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
import { spotifyData } from "../data/spotifyData";
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
  const { music } = spotifyData;

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
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-[#282828] border border-[#3E3E3E] rounded-full px-5 py-2.5 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md min-w-[260px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-9 h-9 rounded bg-gradient-to-br from-spotify-green to-[#158a3e] flex items-center justify-center flex-shrink-0">
            <Music2 size={16} />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-[11px] font-semibold text-white truncate">{music.title}</div>
            <div className="text-[10px] text-spotify-gray mt-0.5">{music.artist}</div>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-spotify-green border-none cursor-pointer flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 hover:bg-spotify-greenLight"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={14} fill="#000" color="#000" /> : <Play size={14} fill="#000" color="#000" />}
          </button>
          <div className="absolute -bottom-px left-4 right-4 h-0.5 bg-[#3E3E3E] rounded-full overflow-hidden">
            <div
              className="h-full bg-spotify-green rounded-full transition-[width] duration-500 linear"
              style={{ width: `${progress}%` }}
            />
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

  const { couple, media, music } = spotifyData;

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
    <section
      className="min-h-screen flex flex-col items-center justify-center relative px-6 py-10 overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-grid-spotify pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-glow-spotify top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center relative z-10"
      >
        {guestName && (
          <motion.div variants={item} className="text-xs text-spotify-gray font-normal tracking-wide mb-4 text-center">
            Kepada Yth. <span className="text-spotify-green font-bold">{guestName}</span>
          </motion.div>
        )}

        <motion.div variants={item} className="text-[10px] font-bold tracking-[4px] text-spotify-green uppercase mb-8">
          Wedding Invitation
        </motion.div>

        <motion.div
          variants={item}
          className="w-[220px] h-[220px] rounded-xl cover-gradient-spotify flex items-center justify-center shadow-[0_32px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)] mb-6 relative overflow-hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={media.photos.couple} alt="Couple" className="w-full h-full object-cover rounded-xl" />
        </motion.div>

        <motion.div variants={item} className="text-[10px] font-medium tracking-[2px] text-spotify-gray uppercase mb-2">
          Now Playing
        </motion.div>

        <motion.h1
          variants={item}
          className="text-[clamp(28px,7vw,52px)] font-extrabold text-center leading-[1.1] tracking-tight mb-2 text-white"
        >
          {couple.groom.name}
          <br />
          <span className="text-spotify-green">& {couple.bride.name}</span>
        </motion.h1>

        <motion.p variants={item} className="text-sm text-spotify-gray italic text-center mb-10">
          {music.subtitle}
        </motion.p>

        <motion.div variants={item} className="flex items-center gap-3.5 w-[240px]">
          <button
            className="w-10 h-10 rounded-full bg-spotify-green border-none cursor-pointer flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 hover:bg-spotify-greenLight"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={16} fill="#000" color="#000" /> : <Play size={16} fill="#000" color="#000" />}
          </button>

          <div className="flex-1">
            <div className="h-[3px] bg-[#3E3E3E] rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-white rounded-full transition-[width] duration-200 linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-spotify-gray">
              <span ref={timeRef}>0:00</span>
              <span>{duration}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[2px] text-spotify-gray uppercase">Scroll</span>
        <div className="w-4 h-4 border-r-2 border-b-2 border-spotify-gray rotate-45 animate-bounce-down" />
      </motion.div>
    </section>
  );
}

/** Section 2 — Tracklist / Our Story */
function SectionStory() {
  const { tracks } = spotifyData.music;

  return (
    <section className="px-6 py-20 max-w-[640px] mx-auto">
      <FadeUp>
        <div className="text-[10px] font-bold tracking-[4px] text-spotify-green uppercase mb-3">
          Tracklist
        </div>
        <h2 className="text-[clamp(24px,5vw,36px)] font-extrabold leading-[1.15] tracking-tight mb-12 text-white">
          Our Story
        </h2>
      </FadeUp>

      <div className="flex flex-col">
        {tracks.map((track, i) => (
          <FadeUp key={track.number} delay={i * 0.08}>
            <div
              className={`flex items-start gap-4 px-3 py-4 rounded-lg border-b border-white/[0.04] transition-colors hover:bg-white/[0.04] ${
                track.active ? "text-spotify-green" : ""
              }`}
            >
              <span className={`text-[13px] font-medium min-w-[20px] pt-0.5 tabular-nums ${track.active ? "text-spotify-green" : "text-spotify-gray"}`}>
                {track.active ? <Play size={11} fill="#1DB954" color="#1DB954" /> : track.number}
              </span>
              <div className="flex-1">
                <div className={`text-sm font-semibold mb-1 leading-snug ${track.active ? "text-spotify-green" : "text-white"}`}>
                  {track.title}
                </div>
                <div className="text-xs text-spotify-gray italic leading-relaxed">"{track.lyric}"</div>
              </div>
              <span className="text-xs text-spotify-gray tabular-nums pt-0.5 flex-shrink-0">{track.duration}</span>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/** Section 3 — Detail Acara */
function SectionDetail() {
  const { event, couple } = spotifyData;

  return (
    <section className="px-6 py-20 max-w-[640px] mx-auto">
      <FadeUp>
        <div className="text-[10px] font-bold tracking-[4px] text-spotify-green uppercase mb-3">
          Album Info
        </div>
        <h2 className="text-[clamp(24px,5vw,36px)] font-extrabold leading-[1.15] tracking-tight mb-12 text-white">
          Detail Acara
        </h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="bg-spotify-card border border-white/[0.06] rounded-2xl p-8">
          <div className="flex items-start gap-4 py-4 border-b border-white/[0.06]">
            <div className="w-9 h-9 rounded-lg bg-spotify-green/[0.12] flex items-center justify-center flex-shrink-0">
              <Calendar size={16} color="#1DB954" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-spotify-gray mb-1">
                Release Date
              </div>
              <div className="text-[15px] font-semibold text-white leading-snug">{event.date.full}</div>
              <div className="text-xs text-spotify-gray mt-0.5">
                {event.schedule.map((s, i) => (
                  <span key={i}>
                    {s.label}: {s.time}
                    {i < event.schedule.length - 1 ? " · " : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 py-4 border-b border-white/[0.06]">
            <div className="w-9 h-9 rounded-lg bg-spotify-green/[0.12] flex items-center justify-center flex-shrink-0">
              <MapPin size={16} color="#1DB954" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-spotify-gray mb-1">
                Venue
              </div>
              <div className="text-[15px] font-semibold text-white leading-snug">{event.venue.name}</div>
              <div className="text-xs text-spotify-gray mt-0.5">{event.venue.address}</div>
              {event.venue.mapsUrl && (
                <a
                  href={event.venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 bg-gradient-to-br from-spotify-green to-[#0d7a35] text-white no-underline text-xs font-bold px-4 py-2.5 rounded-full transition-transform hover:scale-[1.04]"
                >
                  <MapPin size={13} /> Buka di Google Maps
                </a>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4 py-4 border-b border-white/[0.06]">
            <div className="w-9 h-9 rounded-lg bg-spotify-green/[0.12] flex items-center justify-center flex-shrink-0">
              <Shirt size={16} color="#1DB954" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-spotify-gray mb-1">
                Dress Code
              </div>
              <div className="text-[15px] font-semibold text-white leading-snug">{event.dressCode.label}</div>
              <div className="text-xs text-spotify-gray mt-0.5">{event.dressCode.note}</div>
            </div>
          </div>

          <div className="flex items-start gap-4 py-4">
            <div className="w-9 h-9 rounded-lg bg-spotify-green/[0.12] flex items-center justify-center flex-shrink-0">
              <Mic2 size={16} color="#1DB954" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-spotify-gray mb-1">
                Featured Artists
              </div>
              <div className="text-[15px] font-semibold text-white leading-snug">{couple.fullDisplayName}</div>
              <div className="text-xs text-spotify-gray mt-0.5">Produced by: Keluarga Besar Kedua Mempelai</div>
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
    <section className="px-6 py-20 max-w-[640px] mx-auto">
      <FadeUp>
        <div className="text-[10px] font-bold tracking-[4px] text-spotify-green uppercase mb-3">
          Artist Photos
        </div>
        <h2 className="text-[clamp(24px,5vw,36px)] font-extrabold leading-[1.15] tracking-tight mb-12 text-white">
          Galeri Kami
        </h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="grid grid-cols-3 gap-1 mt-8 rounded-xl overflow-hidden">
          {Array.from({ length: GALLERY_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square bg-spotify-card flex items-center justify-center relative overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] hover:z-10 ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <ImageIcon size={i === 0 ? 40 : 24} color="#535353" />
              <div className="absolute inset-0 gallery-overlay-fade opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

/** Section 5 — RSVP + Wishlist (persisted via localStorage) */
function SectionRSVP() {
  const { storageKey, initialWishes } = spotifyData.rsvp;
  const { couple, media } = spotifyData;

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
    <section className="px-6 py-20 max-w-[640px] mx-auto text-center">
      <FadeUp>
        <div className="text-[10px] font-bold tracking-[4px] text-spotify-green uppercase mb-3">
          Add to Queue
        </div>
        <h2 className="text-[clamp(24px,5vw,36px)] font-extrabold leading-[1.15] tracking-tight mb-12 text-white">
          Konfirmasi Kehadiran
        </h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="bg-spotify-card border border-white/[0.06] rounded-2xl px-8 py-10">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
            <img src={media.photos.couple} alt="Couple" className="w-full h-full object-cover" />
          </div>
          <div className="text-xl font-bold mb-1 text-white">{couple.displayName}</div>
          <div className="inline-flex items-center gap-1 text-[11px] text-spotify-green font-semibold mb-6">
            <BadgeCheck size={14} color="#1DB954" />
            Verified Artist
          </div>

          <div className="flex justify-center gap-8 py-5 border-y border-white/[0.06] mb-7">
            <div>
              <div className="text-xl font-extrabold text-white">{wishes.length}</div>
              <div className="text-[11px] text-spotify-gray mt-0.5">Ucapan</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">∞</div>
              <div className="text-[11px] text-spotify-gray mt-0.5">Years Together</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">2</div>
              <div className="text-[11px] text-spotify-gray mt-0.5">Families</div>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-4"
            >
              <Disc3 size={40} color="#1DB954" className="mx-auto mb-3" />
              <div className="text-base font-bold mb-1.5 text-white">
                {selected === "hadir" ? "Yeay, sampai jumpa!" : "Terima kasih sudah memberi tahu kami"}
              </div>
              <div className="text-xs text-spotify-gray">
                Ucapanmu sudah ditambahkan ke playlist kami
              </div>
            </motion.div>
          ) : (
            <>
              <input
                className="w-full bg-[#282828] border border-white/[0.08] rounded-lg px-4 py-3 text-white font-sans text-sm mb-3 outline-none focus:border-spotify-green placeholder:text-spotify-gray"
                placeholder="Nama lengkap kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex gap-2 mb-5">
                <button
                  className={`flex-1 py-2.5 rounded-lg border text-[13px] font-medium transition-all ${
                    selected === "hadir"
                      ? "border-spotify-green bg-spotify-green/[0.12] text-spotify-green"
                      : "border-white/[0.12] bg-transparent text-spotify-gray"
                  }`}
                  onClick={() => setSelected("hadir")}
                >
                  Hadir
                </button>
                <button
                  className={`flex-1 py-2.5 rounded-lg border text-[13px] font-medium transition-all ${
                    selected === "tidak"
                      ? "border-spotify-green bg-spotify-green/[0.12] text-spotify-green"
                      : "border-white/[0.12] bg-transparent text-spotify-gray"
                  }`}
                  onClick={() => setSelected("tidak")}
                >
                  Tidak Hadir
                </button>
              </div>
              <textarea
                className="w-full bg-[#282828] border border-white/[0.08] rounded-lg px-4 py-3 text-white font-sans text-sm mb-4 outline-none resize-none h-20 focus:border-spotify-green placeholder:text-spotify-gray"
                placeholder="Titip doa & ucapan untuk kami..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="w-full py-3.5 bg-spotify-green text-black border-none rounded-full font-sans text-sm font-bold tracking-wide cursor-pointer transition-all hover:bg-spotify-greenLight hover:scale-[1.02]"
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
        <div className="flex justify-between items-center mt-8 mb-3 px-1">
          <span className="text-[13px] font-bold text-white">Playlist Ucapan</span>
          <span className="text-[11px] text-spotify-gray bg-[#282828] px-2.5 py-1 rounded-full">
            {wishes.length} ucapan
          </span>
        </div>
      </FadeUp>

      <div className="flex flex-col gap-2.5 max-w-[640px] mx-auto pb-6 text-left">
        <AnimatePresence>
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              className="flex gap-3 bg-spotify-card border border-white/[0.05] rounded-xl px-4 py-3.5 items-start transition-colors hover:bg-[#1e1e1e]"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-spotify-green to-[#0d7a35] flex items-center justify-center text-sm font-bold text-black flex-shrink-0">
                {wish.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                  <span className="text-[13px] font-bold text-white">{wish.name}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      wish.attend === "hadir"
                        ? "bg-spotify-green/[0.12] text-spotify-green"
                        : "bg-white/[0.06] text-spotify-gray"
                    }`}
                  >
                    {wish.attend === "hadir" ? "Hadir" : "Tidak Hadir"}
                  </span>
                </div>
                <p className="text-xs text-[#B3B3B3] italic leading-relaxed mb-1.5 break-words">
                  "{wish.message}"
                </p>
                <span className="text-[10px] text-[#555]">
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
  const { gifts } = spotifyData;
  const [copiedKey, setCopiedKey] = useState(null);

  if (!gifts.enabled || !gifts.methods?.length) return null;

  return (
    <section className="px-6 py-20 max-w-[640px] mx-auto">
      <FadeUp>
        <div className="text-[10px] font-bold tracking-[4px] text-spotify-green uppercase mb-3">
          Bonus Track
        </div>
        <h2 className="text-[clamp(24px,5vw,36px)] font-extrabold leading-[1.15] tracking-tight mb-2 text-white">
          {gifts.title}
        </h2>
        <p className="text-[13px] text-spotify-gray mb-2">{gifts.note}</p>
      </FadeUp>

      {gifts.methods.map((method, i) => {
        const Icon = giftIconFor(method.type);
        return (
          <FadeUp key={method.id} delay={0.1 + i * 0.05}>
            <div className="bg-spotify-card border border-white/[0.06] rounded-2xl p-6 mt-4">
              <div className="w-10 h-10 rounded-[10px] bg-spotify-green/[0.12] flex items-center justify-center mb-3.5">
                <Icon size={20} color="#1DB954" />
              </div>
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-spotify-green mb-1.5">
                {method.label}
              </div>
              <div className="text-[15px] font-bold text-white mb-1">{method.title}</div>
              <div className="text-xs text-spotify-gray leading-relaxed mb-4 whitespace-pre-line">
                {method.detail}
              </div>
              <button
                className="inline-flex items-center gap-2 bg-spotify-green text-black border-none px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer font-sans transition-all hover:bg-spotify-greenLight hover:scale-[1.03]"
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
  const { event, music } = spotifyData;

  return (
    <section className="px-6 pt-20 pb-40 max-w-[640px] mx-auto text-center">
      <FadeUp>
        <div
          className={`w-40 h-40 rounded-full vinyl-bg flex items-center justify-center mx-auto mb-10 relative shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.6)] ${
            isPlaying ? "animate-vinyl-spin" : ""
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-spotify-dark border-[3px] border-spotify-green absolute" />
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <p className="text-[13px] text-spotify-gray italic leading-relaxed mb-6">
          "Setiap lagu punya akhir,<br />
          tapi album kita baru saja dimulai."
        </p>
      </FadeUp>

      <FadeUp delay={0.15}>
        <h2 className="text-[clamp(20px,5vw,28px)] font-extrabold tracking-tight mb-2 text-white">
          Sampai Jumpa di Hari Bahagia Kami
        </h2>
        <div className="text-[13px] text-spotify-green font-semibold tracking-[2px] uppercase">
          {event.date.short}
        </div>
      </FadeUp>

      <FadeUp delay={0.2}>
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <div className="text-[11px] text-[#535353] tracking-[3px] uppercase">{music.title}</div>
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
  const { music } = spotifyData;

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
    <div className="bg-spotify-dark min-h-screen text-white font-sans overflow-x-hidden">
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