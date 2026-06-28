import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Flame,
  Calendar,
  MapPin,
  Shirt,
  Heart,
  X,
  PartyPopper,
  Package,
  Landmark,
  Smartphone,
  Copy,
  Check,
  MessageCircleHeart,
  Mail,
} from "lucide-react";
import { invitationData } from "../data/invitationData";
import "./TinderInvitation.css";

// HELPERS

function formatTime(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
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

/** Loading screen ala Tinder saat pertama buka */
function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="loading-flame"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flame size={56} color="#fff" fill="#fff" />
      </motion.div>
      <div className="loading-text">finding your match...</div>
    </motion.div>
  );
}

/** Single swipeable profile card */
function SwipeCard({ profile, photoSrc, onSwipe, isTop }) {
  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExitX(400);
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      setExitX(-400);
      onSwipe("left");
    }
  };

  return (
    <motion.div
      className="swipe-card"
      style={{ zIndex: isTop ? 10 : 5 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={
        exitX !== 0
          ? { x: exitX, opacity: 0, rotate: exitX > 0 ? 20 : -20 }
          : {}
      }
      transition={{ duration: 0.35 }}
      whileDrag={{ scale: 1.02 }}
    >
      <div className="swipe-card-photo">
        <img src={photoSrc} alt={profile.name} className="swipe-card-img" />
        <div className="swipe-card-gradient" />
      </div>
      <div className="swipe-card-info">
        <h3>
          {profile.name}, {profile.age}
        </h3>
        <p className="swipe-card-bio">{profile.bio}</p>
        <div className="swipe-card-tags">
          {profile.tags.map((tag, i) => (
            <span key={i} className="swipe-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="swipe-card-food">
          Makanan favorit: {profile.favFood}
        </div>
      </div>
    </motion.div>
  );
}

/** Section: Swipe Profile + It's a Match */
function SectionSwipe({ onMatched }) {
  const { profiles } = invitationData.themes.tinder;
  const { photos } = invitationData.media;
  const { couple } = invitationData;

  const [queue, setQueue] = useState(profiles);
  const [matched, setMatched] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "right") {
      const newCount = likeCount + 1;
      setLikeCount(newCount);
      if (newCount >= profiles.length) {
        setTimeout(() => {
          setMatched(true);
          onMatched && onMatched();
        }, 350);
      }
    }
    setTimeout(() => {
      setQueue((prev) => prev.slice(1));
    }, 300);
  };

  return (
    <section className="section-swipe">
      <FadeUp>
        <div className="section-eyebrow">Discover</div>
        <h2 className="section-heading">Swipe untuk Kenalan</h2>
        <p className="section-sub">
          Geser kanan kalau suka, geser kiri kalau lewat
        </p>
      </FadeUp>

      <div className="swipe-stack">
        {queue.length > 0 ? (
          <AnimatePresence>
            {queue
              .slice(0, 2)
              .reverse()
              .map((profile, idx, arr) => (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  photoSrc={photos[profile.photoKey]}
                  isTop={idx === arr.length - 1}
                  onSwipe={handleSwipe}
                />
              ))}
          </AnimatePresence>
        ) : (
          <div className="swipe-empty">
            {matched
              ? "Semua sudah di-swipe!"
              : "Yah, kelewat. Refresh untuk ulang"}
          </div>
        )}
      </div>

      {queue.length > 0 && (
        <div className="swipe-hint-row">
          <span className="hint-nope">
            <X size={14} /> Lewat
          </span>
          <span className="hint-like">
            <Heart size={14} /> Suka
          </span>
        </div>
      )}

      <AnimatePresence>
        {matched && (
          <motion.div
            className="match-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="match-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.h1
                className="match-title"
                initial={{ rotate: -8 }}
                animate={{ rotate: 0 }}
              >
                It's a Match!
              </motion.h1>
              <p className="match-sub">{couple.displayName} akhirnya menikah</p>
              <div className="match-avatars">
                <div className="match-avatar">
                  <img
                    src={photos.groom}
                    alt="Groom"
                    className="match-avatar-img"
                  />
                </div>
                <Heart
                  size={26}
                  color="#fff"
                  fill="#fff"
                  className="match-heart"
                />
                <div className="match-avatar">
                  <img
                    src={photos.bride}
                    alt="Bride"
                    className="match-avatar-img"
                  />
                </div>
              </div>
              <button
                className="match-continue-btn"
                onClick={() => {
                  setMatched(false);
                  setTimeout(() => {
                    document.getElementById("our-story")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              >
                Lanjutkan ke Cerita Kami
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/** Section: Our Story (chat bubble style) */
function SectionStory() {
  const { chatStory } = invitationData.themes.tinder;

  return (
    <section className="section-story" id="our-story">
      <FadeUp>
        <div className="section-eyebrow">Our Chat</div>
        <h2 className="section-heading">Kisah Cinta Kami</h2>
      </FadeUp>

      <div className="chat-window">
        {chatStory.map((msg, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div
              className={`chat-bubble-row ${msg.from === "groom" ? "left" : "right"}`}
            >
              <div
                className={`chat-bubble ${msg.from === "groom" ? "bubble-groom" : "bubble-bride"}`}
              >
                {msg.text}
                <span className="chat-time">{msg.time}</span>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/** Section: Detail Acara */
function SectionDetail() {
  const { event } = invitationData;

  return (
    <section className="section-detail">
      <FadeUp>
        <div className="section-eyebrow">Event Info</div>
        <h2 className="section-heading">Detail Acara</h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="detail-card">
          <div className="detail-row">
            <div className="detail-icon">
              <Calendar size={16} color="#FD297B" />
            </div>
            <div>
              <div className="detail-label">Tanggal</div>
              <div className="detail-value">{event.date.full}</div>
              <div className="detail-sub">
                {event.schedule.map((s, i) => (
                  <span key={i}>
                    {s.label}: {s.time}
                    {i < event.schedule.length - 1 ? " · " : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-icon">
              <MapPin size={16} color="#FD297B" />
            </div>
            <div style={{ flex: 1 }}>
              <div className="detail-label">Venue</div>
              <div className="detail-value">{event.venue.name}</div>
              <div className="detail-sub">{event.venue.address}</div>
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

          <div className="detail-row">
            <div className="detail-icon">
              <Shirt size={16} color="#FD297B" />
            </div>
            <div>
              <div className="detail-label">Dress Code</div>
              <div className="detail-value">{event.dressCode.tinder}</div>
              <div className="detail-sub">{event.dressCode.note}</div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/** Section: RSVP via swipe + confirm modal + wishlist */
function SectionRSVP() {
  const { storageKey, initialWishes } = invitationData.rsvp.tinder;

  const [pendingChoice, setPendingChoice] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);
  const [exitX, setExitX] = useState(0);
  const [cardKey, setCardKey] = useState(0);

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

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExitX(400);
      setTimeout(() => setPendingChoice("hadir"), 200);
    } else if (info.offset.x < -threshold) {
      setExitX(-400);
      setTimeout(() => setPendingChoice("tidak"), 200);
    }
  };

  const cancelChoice = () => {
    setPendingChoice(null);
    setExitX(0);
    setCardKey((k) => k + 1);
  };

  const finalizeSubmit = () => {
    if (!name.trim()) return;

    const newWish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim() || "— tidak meninggalkan pesan —",
      attend: pendingChoice,
      time: new Date().toISOString(),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);

    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      console.warn("Gagal menyimpan ke localStorage");
    }

    setConfirmed(true);
  };

  return (
    <section className="section-rsvp">
      <FadeUp>
        <div className="section-eyebrow">Will You Come?</div>
        <h2 className="section-heading">Konfirmasi Kehadiran</h2>
        <p className="section-sub">
          Geser kartu untuk menjawab — kanan jika hadir, kiri jika tidak
        </p>
      </FadeUp>

      {!confirmed && !pendingChoice && (
        <div className="rsvp-swipe-stack">
          <motion.div
            key={cardKey}
            className="rsvp-swipe-card"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={
              exitX !== 0
                ? { x: exitX, opacity: 0, rotate: exitX > 0 ? 20 : -20 }
                : {}
            }
            transition={{ duration: 0.3 }}
            whileDrag={{ scale: 1.02 }}
          >
            <Mail size={40} color="#fff" className="rsvp-card-icon" />
            <h3>Akan Datang ke Pernikahan Kami?</h3>
            <p>Geser untuk menjawab</p>
          </motion.div>
          <div className="swipe-hint-row">
            <span className="hint-nope">
              <X size={14} /> Tidak Bisa
            </span>
            <span className="hint-like">
              <Heart size={14} /> Hadir
            </span>
          </div>
        </div>
      )}

      <AnimatePresence>
        {pendingChoice && !confirmed && (
          <motion.div
            className="confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="confirm-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="confirm-icon">
                {pendingChoice === "hadir" ? (
                  <Check size={36} color="#1DB954" />
                ) : (
                  <X size={36} color="#ff4458" />
                )}
              </div>
              <h3>
                {pendingChoice === "hadir"
                  ? "Yeay! Kamu akan hadir?"
                  : "Yakin tidak bisa hadir?"}
              </h3>
              <p className="confirm-text">
                Pastikan pilihanmu benar sebelum lanjut mengisi data.
              </p>

              <input
                className="rsvp-input"
                placeholder="Nama lengkap kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="rsvp-textarea"
                placeholder="Titip doa & ucapan untuk kami..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="confirm-btn-row">
                <button className="confirm-btn-cancel" onClick={cancelChoice}>
                  Pilih Lagi
                </button>
                <button
                  className="confirm-btn-submit"
                  onClick={finalizeSubmit}
                  disabled={!name.trim()}
                  style={{ opacity: !name.trim() ? 0.4 : 1 }}
                >
                  Konfirmasi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {confirmed && (
        <motion.div
          className="rsvp-success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <PartyPopper
            size={44}
            color="#FD297B"
            style={{ marginBottom: "12px" }}
          />
          <h3>
            {pendingChoice === "hadir"
              ? "Sampai jumpa di hari bahagia kami!"
              : "Terima kasih atas perhatiannya"}
          </h3>
        </motion.div>
      )}

      <FadeUp delay={0.15}>
        <div className="wishlist-header">
          <span className="wishlist-title">
            <MessageCircleHeart
              size={14}
              style={{ marginRight: 6, verticalAlign: "middle" }}
            />
            Ucapan dari Tamu
          </span>
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
              transition={{ duration: 0.4 }}
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

/** Section: Kirim Hadiah */
function SectionGift() {
  const { gifts } = invitationData;
  const [copiedKey, setCopiedKey] = useState(null);

  if (!gifts.enabled || !gifts.methods?.length) return null;

  return (
    <section className="section-gift">
      <FadeUp>
        <div className="section-eyebrow">Send a Gift</div>
        <h2 className="section-heading">{gifts.title}</h2>
        <p className="section-sub">{gifts.note}</p>
      </FadeUp>

      {gifts.methods.map((method, i) => {
        const Icon = giftIconFor(method.type);
        return (
          <FadeUp key={method.id} delay={0.1 + i * 0.05}>
            <div className="gift-card">
              <Icon size={26} color="#FD297B" className="gift-icon" />
              <div className="gift-label">{method.label}</div>
              <div className="gift-value">{method.title}</div>
              <div className="gift-sub">{method.detail}</div>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(method.copyText, setCopiedKey, method.id)
                }
              >
                {copiedKey === method.id ? (
                  <>
                    <Check size={13} /> Tersalin!
                  </>
                ) : (
                  <>
                    <Copy size={13} /> {method.copyButtonLabel}
                  </>
                )}
              </button>
            </div>
          </FadeUp>
        );
      })}
    </section>
  );
}

/** Section: Closing */
function SectionClosing() {
  const { event, couple, media } = invitationData;

  return (
    <section className="section-closing">
      <FadeUp>
        <div className="closing-photo">
          <img
            src={media.photos.couple}
            alt="Couple"
            className="closing-photo-img"
          />
        </div>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="closing-quote">
          "Dari sekian banyak swipe di dunia ini,
          <br />
          syukurlah kami akhirnya saling match."
        </p>
      </FadeUp>
      <FadeUp delay={0.15}>
        <h2 className="closing-title">Sampai Jumpa di Hari Bahagia Kami</h2>
        <div className="closing-date">{event.date.short}</div>
      </FadeUp>
      <FadeUp delay={0.2}>
        <div className="closing-footer">{couple.displayName}</div>
      </FadeUp>
    </section>
  );
}

// MAIN COMPONENT

export default function TinderInvitation() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="tinder-app">
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <SectionSwipe />
          <SectionStory />
          <SectionDetail />
          <SectionRSVP />
          <SectionGift />
          <SectionClosing />
        </>
      )}
    </div>
  );
}
