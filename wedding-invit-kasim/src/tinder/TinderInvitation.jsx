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
import { tinderData } from "../data/tinderData";
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
      className="fixed inset-0 gradient-tinder flex flex-col items-center justify-center z-[9999]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-4"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flame size={56} color="#fff" fill="#fff" />
      </motion.div>
      <div className="text-[13px] text-white/90 tracking-wide font-medium">
        finding your match...
      </div>
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
      className="absolute w-full max-w-[340px] h-[460px] bg-[#1a1a1a] rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing flex flex-col"
      style={{ zIndex: isTop ? 10 : 5 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX, opacity: 0, rotate: exitX > 0 ? 20 : -20 } : {}}
      transition={{ duration: 0.35 }}
      whileDrag={{ scale: 1.02 }}
    >
      <div className="flex-1 gradient-tinder swipe-card-photo-gradient flex items-center justify-center relative overflow-hidden">
        <img src={photoSrc} alt={profile.name} className="w-full h-full object-cover" />
      </div>
      <div className="px-5 pt-4 pb-5 bg-[#1a1a1a]">
        <h3 className="text-lg font-extrabold mb-1.5 text-white">
          {profile.name}, {profile.age}
        </h3>
        <p className="text-xs text-[#b3b3b3] mb-2.5">{profile.bio}</p>
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {profile.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] bg-[#FD297B]/[0.15] text-[#FD297B] px-2.5 py-1 rounded-full font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-[11px] text-[#9b9b9b]">Makanan favorit: {profile.favFood}</div>
      </div>
    </motion.div>
  );
}

/** Section: Swipe Profile + It's a Match */
function SectionSwipe({ onMatched }) {
  const { profiles } = tinderData;
  const { photos } = tinderData.media;
  const { couple } = tinderData;

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
    <section className="min-h-screen px-6 pt-16 pb-10 max-w-[480px] mx-auto flex flex-col relative">
      <FadeUp>
        <div className="text-[10px] font-bold tracking-[3px] text-[#FD297B] uppercase mb-2.5">
          Discover
        </div>
        <h2 className="text-[clamp(24px,5vw,34px)] font-extrabold leading-[1.15] tracking-tight mb-3 text-white">
          Swipe untuk Kenalan
        </h2>
        <p className="text-[13px] text-[#9b9b9b] mb-8">
          Geser kanan kalau suka, geser kiri kalau lewat
        </p>
      </FadeUp>

      <div className="relative h-[480px] flex items-center justify-center">
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
          <div className="text-sm text-[#9b9b9b] text-center">
            {matched ? "Semua sudah di-swipe!" : "Yah, kelewat. Refresh untuk ulang"}
          </div>
        )}
      </div>

      {queue.length > 0 && (
        <div className="flex justify-between max-w-[340px] mx-auto mt-4 px-5 gap-x-4">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ff4458] tracking-wide">
            <X size={14} /> Lewat
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1DB954] tracking-wide">
            <Heart size={14} /> Suka
          </span>
        </div>
      )}

      <AnimatePresence>
        {matched && (
          <motion.div
            className="fixed inset-0 gradient-tinder-overlay flex items-center justify-center z-[2000] p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.h1
                className="text-[clamp(32px,9vw,56px)] font-black italic text-white mb-3 [text-shadow:0_4px_20px_rgba(0,0,0,0.3)]"
                initial={{ rotate: -8 }}
                animate={{ rotate: 0 }}
              >
                It's a Match!
              </motion.h1>
              <p className="text-sm text-white/90 mb-8">{couple.displayName} akhirnya menikah</p>
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="w-[90px] h-[90px] rounded-full bg-white/[0.15] border-[3px] border-white overflow-hidden flex items-center justify-center">
                  <img src={photos.groom} alt="Groom" className="w-full h-full object-cover" />
                </div>
                <Heart size={26} color="#fff" fill="#fff" className="animate-heart-pulse" />
                <div className="w-[90px] h-[90px] rounded-full bg-white/[0.15] border-[3px] border-white overflow-hidden flex items-center justify-center">
                  <img src={photos.bride} alt="Bride" className="w-full h-full object-cover" />
                </div>
              </div>
              <button
                className="bg-white text-[#FD297B] border-none px-8 py-3.5 rounded-full font-extrabold text-sm cursor-pointer font-sans transition-transform hover:scale-105"
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
  const { chatStory } = tinderData;

  return (
    <section className="px-6 py-20 max-w-[560px] mx-auto" id="our-story">
      <FadeUp>
        <div className="text-[10px] font-bold tracking-[3px] text-[#FD297B] uppercase mb-2.5">
          Our Chat
        </div>
        <h2 className="text-[clamp(24px,5vw,34px)] font-extrabold leading-[1.15] tracking-tight mb-8 text-white">
          Kisah Cinta Kami
        </h2>
      </FadeUp>

      <div className="bg-[#141414] rounded-2xl p-5 flex flex-col gap-2.5">
        {chatStory.map((msg, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className={`flex ${msg.from === "groom" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                  msg.from === "groom"
                    ? "bg-[#262626] text-white rounded-bl-[4px]"
                    : "gradient-tinder text-white rounded-br-[4px]"
                }`}
              >
                {msg.text}
                <span className="block text-[9px] opacity-60 mt-1 text-right">{msg.time}</span>
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
  const { event } = tinderData;

  return (
    <section className="px-6 py-20 max-w-[560px] mx-auto">
      <FadeUp>
        <div className="text-[10px] font-bold tracking-[3px] text-[#FD297B] uppercase mb-2.5">
          Event Info
        </div>
        <h2 className="text-[clamp(24px,5vw,34px)] font-extrabold leading-[1.15] tracking-tight mb-8 text-white">
          Detail Acara
        </h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="bg-[#141414] border border-white/[0.06] rounded-2xl p-7">
          <div className="flex items-start gap-4 py-4 border-b border-white/[0.06]">
            <div className="w-9 h-9 rounded-lg bg-[#FD297B]/[0.12] flex items-center justify-center flex-shrink-0">
              <Calendar size={16} color="#FD297B" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#9b9b9b] mb-1">
                Tanggal
              </div>
              <div className="text-[15px] font-bold text-white leading-snug">{event.date.full}</div>
              <div className="text-xs text-[#9b9b9b] mt-0.5">
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
            <div className="w-9 h-9 rounded-lg bg-[#FD297B]/[0.12] flex items-center justify-center flex-shrink-0">
              <MapPin size={16} color="#FD297B" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#9b9b9b] mb-1">
                Venue
              </div>
              <div className="text-[15px] font-bold text-white leading-snug">{event.venue.name}</div>
              <div className="text-xs text-[#9b9b9b] mt-0.5">{event.venue.address}</div>
              {event.venue.mapsUrl && (
                <a
                  href={event.venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 gradient-tinder text-white no-underline text-xs font-bold px-5 py-2.5 rounded-full transition-transform hover:scale-[1.04]"
                >
                  <MapPin size={13} /> Buka di Google Maps
                </a>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4 py-4">
            <div className="w-9 h-9 rounded-lg bg-[#FD297B]/[0.12] flex items-center justify-center flex-shrink-0">
              <Shirt size={16} color="#FD297B" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#9b9b9b] mb-1">
                Dress Code
              </div>
              <div className="text-[15px] font-bold text-white leading-snug">{event.dressCode.label}</div>
              <div className="text-xs text-[#9b9b9b] mt-0.5">{event.dressCode.note}</div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/** Section: RSVP via swipe + confirm modal + wishlist */
function SectionRSVP() {
  const { storageKey, initialWishes } = tinderData.rsvp;

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
    <section className="px-6 py-20 max-w-[560px] mx-auto">
      <FadeUp>
        <div className="text-[10px] font-bold tracking-[3px] text-[#FD297B] uppercase mb-2.5">
          Will You Come?
        </div>
        <h2 className="text-[clamp(24px,5vw,34px)] font-extrabold leading-[1.15] tracking-tight mb-3 text-white">
          Konfirmasi Kehadiran
        </h2>
        <p className="text-[13px] text-[#9b9b9b] mb-8">
          Geser kartu untuk menjawab — kanan jika hadir, kiri jika tidak
        </p>
      </FadeUp>

      {!confirmed && !pendingChoice && (
        <div className="flex flex-col items-center">
          <motion.div
            key={cardKey}
            className="w-full max-w-[320px] gradient-tinder rounded-[20px] px-6 py-10 text-center cursor-grab active:cursor-grabbing shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={exitX !== 0 ? { x: exitX, opacity: 0, rotate: exitX > 0 ? 20 : -20 } : {}}
            transition={{ duration: 0.3 }}
            whileDrag={{ scale: 1.02 }}
          >
            <Mail size={40} color="#fff" className="mx-auto mb-4" />
            <h3 className="text-base font-extrabold mb-1.5 text-white">
              Akan Datang ke Pernikahan Kami?
            </h3>
            <p className="text-xs text-white/85">Geser untuk menjawab</p>
          </motion.div>
          <div className="flex justify-between max-w-[320px] w-full mt-4 px-5">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ff4458] tracking-wide">
              <X size={14} /> Tidak Bisa
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1DB954] tracking-wide">
              <Heart size={14} /> Hadir
            </span>
          </div>
        </div>
      )}

      <AnimatePresence>
        {pendingChoice && !confirmed && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1500] p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#141414] rounded-[20px] px-6 py-8 max-w-[380px] w-full text-center border border-white/[0.08]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="mb-3">
                {pendingChoice === "hadir" ? (
                  <Check size={36} color="#1DB954" className="mx-auto" />
                ) : (
                  <X size={36} color="#ff4458" className="mx-auto" />
                )}
              </div>
              <h3 className="text-base font-extrabold mb-2 text-white">
                {pendingChoice === "hadir" ? "Yeay! Kamu akan hadir?" : "Yakin tidak bisa hadir?"}
              </h3>
              <p className="text-xs text-[#9b9b9b] mb-5">
                Pastikan pilihanmu benar sebelum lanjut mengisi data.
              </p>

              <input
                className="w-full bg-[#262626] border border-white/[0.08] rounded-lg px-4 py-3 text-white font-sans text-[13px] mb-3 outline-none focus:border-[#FD297B] placeholder:text-[#9b9b9b]"
                placeholder="Nama lengkap kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="w-full bg-[#262626] border border-white/[0.08] rounded-lg px-4 py-3 text-white font-sans text-[13px] mb-4 outline-none resize-none h-[70px] focus:border-[#FD297B] placeholder:text-[#9b9b9b]"
                placeholder="Titip doa & ucapan untuk kami..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="flex gap-2.5">
                <button
                  className="flex-1 py-3 rounded-full border border-white/[0.15] bg-transparent text-white text-[13px] font-semibold cursor-pointer font-sans"
                  onClick={cancelChoice}
                >
                  Pilih Lagi
                </button>
                <button
                  className="flex-1 py-3 rounded-full border-none gradient-tinder text-white text-[13px] font-bold cursor-pointer font-sans"
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
          className="text-center py-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <PartyPopper size={44} color="#FD297B" className="mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">
            {pendingChoice === "hadir"
              ? "Sampai jumpa di hari bahagia kami!"
              : "Terima kasih atas perhatiannya"}
          </h3>
        </motion.div>
      )}

      <FadeUp delay={0.15}>
        <div className="flex justify-between items-center mt-10 mb-3">
          <span className="inline-flex items-center text-[13px] font-bold text-white">
            <MessageCircleHeart size={14} className="mr-1.5" />
            Ucapan dari Tamu
          </span>
          <span className="text-[11px] text-[#9b9b9b] bg-[#262626] px-2.5 py-1 rounded-full">
            {wishes.length} ucapan
          </span>
        </div>
      </FadeUp>

      <div className="flex flex-col gap-2.5">
        <AnimatePresence>
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              className="flex gap-3 bg-[#141414] border border-white/[0.05] rounded-xl px-4 py-3.5"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-9 h-9 rounded-full gradient-tinder flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {wish.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                  <span className="text-[13px] font-bold text-white">{wish.name}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      wish.attend === "hadir"
                        ? "bg-[#1DB954]/[0.15] text-[#1DB954]"
                        : "bg-white/[0.06] text-[#9b9b9b]"
                    }`}
                  >
                    {wish.attend === "hadir" ? "Hadir" : "Tidak Hadir"}
                  </span>
                </div>
                <p className="text-xs text-[#b3b3b3] italic leading-relaxed mb-1.5">
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

/** Section: Kirim Hadiah */
function SectionGift() {
  const { gifts } = tinderData;
  const [copiedKey, setCopiedKey] = useState(null);

  if (!gifts.enabled || !gifts.methods?.length) return null;

  return (
    <section className="px-6 py-20 max-w-[560px] mx-auto">
      <FadeUp>
        <div className="text-[10px] font-bold tracking-[3px] text-[#FD297B] uppercase mb-2.5">
          Send a Gift
        </div>
        <h2 className="text-[clamp(24px,5vw,34px)] font-extrabold leading-[1.15] tracking-tight mb-3 text-white">
          {gifts.title}
        </h2>
        <p className="text-[13px] text-[#9b9b9b] mb-2">{gifts.note}</p>
      </FadeUp>

      {gifts.methods.map((method, i) => {
        const Icon = giftIconFor(method.type);
        return (
          <FadeUp key={method.id} delay={0.1 + i * 0.05}>
            <div className="bg-[#141414] border border-white/[0.06] rounded-2xl p-6 mt-4">
              <Icon size={26} color="#FD297B" className="mb-2.5" />
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#FD297B] mb-1.5">
                {method.label}
              </div>
              <div className="text-[15px] font-bold text-white mb-1">{method.title}</div>
              <div className="text-xs text-[#9b9b9b] leading-relaxed mb-3.5 whitespace-pre-line">
                {method.detail}
              </div>
              <button
                className="inline-flex items-center gap-1.5 gradient-tinder text-white border-none px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer font-sans transition-transform hover:scale-[1.03]"
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

/** Section: Closing */
function SectionClosing() {
  const { event, couple, media } = tinderData;

  return (
    <section className="px-6 pt-20 pb-32 max-w-[560px] mx-auto text-center">
      <FadeUp>
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden mx-auto mb-6 border-[3px] border-[#FD297B]">
          <img src={media.photos.couple} alt="Couple" className="w-full h-full object-cover" />
        </div>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="text-[13px] text-[#9b9b9b] italic leading-relaxed mb-6">
          "Dari sekian banyak swipe di dunia ini,<br />
          syukurlah kami akhirnya saling match."
        </p>
      </FadeUp>
      <FadeUp delay={0.15}>
        <h2 className="text-[clamp(20px,5vw,28px)] font-extrabold mb-2 text-white">
          Sampai Jumpa di Hari Bahagia Kami
        </h2>
        <div className="text-[13px] text-[#FD297B] font-bold tracking-[2px] uppercase">
          {event.date.short}
        </div>
      </FadeUp>
      <FadeUp delay={0.2}>
        <div className="mt-12 pt-7 border-t border-white/[0.06] text-xs text-[#555] tracking-[2px] uppercase">
          {couple.displayName}
        </div>
      </FadeUp>
    </section>
  );
}


// MAIN COMPONENT
export default function TinderInvitation() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white font-sans overflow-x-hidden">
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