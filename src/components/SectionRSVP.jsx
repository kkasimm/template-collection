import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "./FadeUp";

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
    message:
      "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair 💕",
    attend: "hadir",
    time: "1 hari lalu",
  },
  {
    id: 3,
    name: "Andi Pratama",
    message:
      "Selamat menempuh hidup baru! Semoga langgeng sampai kakek nenek 🎉",
    attend: "tidak",
    time: "5 jam lalu",
  },
];

const STORAGE_KEY = "rhapsody_wishes";

function formatTime(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
}

export default function SectionRSVP() {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);

  // Load dari localStorage saat pertama buka
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        // Pertama kali buka — isi dengan data awal
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
      time: new Date().toISOString(), // simpan sebagai ISO string
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);

    // Simpan ke localStorage
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
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "6px",
                }}
              >
                {selected === "hadir"
                  ? "Yeay, sampai jumpa!"
                  : "Terima kasih sudah memberi tahu kami 🙏"}
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
                  cursor:
                    !name.trim() || selected === null
                      ? "not-allowed"
                      : "pointer",
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
                  <span
                    className={`wish-badge ${wish.attend === "hadir" ? "hadir" : "tidak"}`}
                  >
                    {wish.attend === "hadir" ? "✅ Hadir" : "❌ Tidak Hadir"}
                  </span>
                </div>
                <p className="wish-message">"{wish.message}"</p>
                <span className="wish-time">
                  {/* Kalau time berupa ISO string, format; kalau string lama tetap tampilkan */}
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
