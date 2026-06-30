import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Calendar,
  Cloud,
  Music2,
  Image as ImageIcon,
  MapPin,
  Gift,
  Mail,
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Check,
  Copy,
  Package,
  Landmark,
  Smartphone,
  Heart,
  Flashlight,
  Camera,
  Signal,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { iosData } from "../data/iosData";
import "./IOSInvitation.css";

// HELPERS[
function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatClockTime(date) {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

function formatClockDate(date) {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatStatusBarTime(date) {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

function formatSeconds(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function getCountdown(targetDateStr) {
  const target = new Date(targetDateStr);
  const now = new Date();
  const diff = target - now;
  if (isNaN(target.getTime()) || diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

function formatRsvpTime(isoString) {
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

// STATUS BAR (ala iOS)[
function StatusBar({ clock }) {
  return (
    <div className="flex items-center justify-between px-7 pt-3 text-white text-[15px] font-semibold">
      <span>{formatStatusBarTime(clock)}</span>
      <div className="flex items-center gap-1.5">
        <Signal size={15} strokeWidth={2.5} />
        <Wifi size={15} strokeWidth={2.5} />
        <BatteryFull size={20} strokeWidth={2} />
      </div>
    </div>
  );
}

// APPLE MUSIC STYLE PLAYER (non-interactive sheet, hanya play/pause)[
function NowPlayingCard({ audioRef, isPlaying, togglePlay }) {
  const { music, media } = iosData;
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };
    const onLoaded = () => {
      if (audio.duration && isFinite(audio.duration))
        setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", onUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    if (audio.readyState >= 1) onLoaded();

    return () => {
      audio.removeEventListener("timeupdate", onUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [audioRef]);

  return (
    <motion.div
      className="ls-player-blur rounded-[22px] px-3 py-3 mx-4 mb-3"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-[8px] overflow-hidden flex-shrink-0 bg-black/20">
          <img
            src={media.photos.couple}
            alt="Album"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="text-[13px] font-bold text-[#1c1c1e] truncate">
            {music.title}
          </div>
          <div className="text-[12px] text-[#3c3c43]/75 truncate">
            {music.artist}
          </div>
        </div>
      </div>

      <div className="mt-2.5">
        <div className="h-[3px] bg-black/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1c1c1e] rounded-full transition-[width] duration-300 linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-[#3c3c43]/70 mt-1 tabular-nums">
          <span>{formatSeconds(currentTime)}</span>
          <span>-{formatSeconds(Math.max(duration - currentTime, 0))}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-12 mt-1.5">
        <button
          className="text-[#1c1c1e] opacity-50 cursor-default"
          disabled
          aria-label="Previous"
        >
          <SkipBack size={20} fill="currentColor" />
        </button>
        <button
          className="text-[#1c1c1e] cursor-pointer"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={28} fill="currentColor" />
          ) : (
            <Play size={28} fill="currentColor" />
          )}
        </button>
        <button
          className="text-[#1c1c1e] opacity-50 cursor-default"
          disabled
          aria-label="Next"
        >
          <SkipForward size={20} fill="currentColor" />
        </button>
      </div>
    </motion.div>
  );
}

// NOTIFICATION CARD[
function NotificationCard({
  icon,
  iconBg,
  appName,
  time,
  title,
  preview,
  onClick,
  delay = 0,
}) {
  return (
    <motion.button
      className="ls-notif-blur w-full rounded-2xl px-4 py-3 flex items-start gap-3 text-left border border-white/10"
      onClick={onClick}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-[13px] font-semibold text-white/90">
            {appName}
          </span>
          <span className="text-[11px] text-white/60 flex-shrink-0">
            {time}
          </span>
        </div>
        <div className="text-[13px] font-bold text-white leading-snug">
          {title}
        </div>
        <div className="text-[12px] text-white/75 leading-snug truncate">
          {preview}
        </div>
      </div>
    </motion.button>
  );
}

// HOME SCREEN APP ICON[
function AppIcon({
  icon,
  iconBg,
  label,
  onClick,
  delay = 0,
  isPhotosApp = false,
  thumbnailSrc,
}) {
  return (
    <motion.button
      className="flex flex-col items-center gap-1.5"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.92 }}
    >
      <div
        className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center shadow-md overflow-hidden"
        style={{ background: iconBg }}
      >
        {isPhotosApp && thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          icon
        )}
      </div>
      <span className="text-[11px] text-white font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
        {label}
      </span>
    </motion.button>
  );
}

// BOTTOM SHEET MODAL[
function Sheet({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/55 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-[#1c1c1e] rounded-t-[24px] z-[101] max-h-[80vh] flex flex-col shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            <div className="w-9 h-1 bg-white/25 rounded-full mx-auto mt-2.5" />
            <div className="flex items-center justify-between px-5 pt-3.5 pb-2">
              <h3 className="text-base font-bold text-white">{title}</h3>
              <button
                className="w-7 h-7 rounded-full bg-white/10 border-none text-white flex items-center justify-center cursor-pointer"
                onClick={onClose}
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-5 pb-8 overflow-y-auto text-white">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// SHEET CONTENTS[
function CalendarSheetContent() {
  const { event } = iosData;
  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl font-extrabold mb-1.5">{event.date.full}</div>
      <div className="flex flex-col gap-2.5">
        {event.schedule.map((s, i) => (
          <div
            className="flex justify-between py-2.5 border-b border-white/10 text-[13px]"
            key={i}
          >
            <span className="text-white/55">{s.label}</span>
            <span className="font-semibold">{s.time}</span>
          </div>
        ))}
        <div className="flex justify-between py-2.5 border-b border-white/10 text-[13px]">
          <span className="text-white/55">Venue</span>
          <span className="font-semibold">{event.venue.name}</span>
        </div>
        <div className="flex justify-between py-2.5 text-[13px]">
          <span className="text-white/55">Dress Code</span>
          <span className="font-semibold">{event.dressCode.label}</span>
        </div>
      </div>
    </div>
  );
}

function MessageSheetContent() {
  const { chatStory } = iosData;
  return (
    <div className="flex flex-col gap-2">
      {chatStory.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.from === "groom" ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
              msg.from === "groom"
                ? "bg-white/10 rounded-bl-[4px]"
                : "bg-[#0a84ff] rounded-br-[4px]"
            }`}
          >
            {msg.text}
            <span className="block text-[9px] opacity-60 mt-1 text-right">
              {msg.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function WeatherSheetContent() {
  const { quotes } = iosData.weatherQuote;
  return (
    <div className="flex flex-col gap-3">
      {quotes.map((q, i) => (
        <p
          className="text-[13px] italic text-white/85 leading-relaxed p-3.5 bg-white/[0.06] rounded-xl"
          key={i}
        >
          "{q}"
        </p>
      ))}
    </div>
  );
}

function PhotoSheetContent() {
  const { photos } = iosData.media;
  const photoList = [photos.couple, photos.groom, photos.bride];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photoList.length);
    }, 2500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={photoList[index]}
          alt="Couple"
          className="w-full h-[280px] object-cover rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <div className="flex gap-1.5">
        {photoList.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-4 bg-white" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function MapsSheetContent() {
  const { event } = iosData;
  return (
    <div className="flex flex-col gap-3">
      <div className="text-base font-extrabold">{event.venue.name}</div>
      <div className="text-xs text-white/60">{event.venue.address}</div>
      {event.venue.mapsUrl && (
        <a
          href={event.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[#ee0979] text-white no-underline px-5 py-2.5 rounded-full text-xs font-bold w-fit mt-1.5"
        >
          <MapPin size={14} /> Buka di Google Maps
        </a>
      )}
    </div>
  );
}

function GiftSheetContent() {
  const { gifts } = iosData;
  const [copiedKey, setCopiedKey] = useState(null);

  if (!gifts.enabled) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-white/60 leading-relaxed">{gifts.note}</p>
      {gifts.methods.map((method) => {
        const Icon = giftIconFor(method.type);
        return (
          <div
            className="flex items-center gap-3 bg-white/[0.06] rounded-2xl p-3.5"
            key={method.id}
          >
            <Icon size={20} />
            <div className="flex-1 overflow-hidden">
              <div className="text-[9px] uppercase tracking-wide text-white/50 mb-0.5">
                {method.label}
              </div>
              <div className="text-[13px] font-bold">{method.title}</div>
              <div className="text-[11px] text-white/55 mt-0.5">
                {method.detail}
              </div>
            </div>
            <button
              className="w-8 h-8 rounded-full bg-white/[0.12] border-none text-white flex items-center justify-center cursor-pointer flex-shrink-0"
              onClick={() =>
                copyToClipboard(method.copyText, setCopiedKey, method.id)
              }
            >
              {copiedKey === method.id ? (
                <Check size={14} />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function RSVPSheetContent() {
  const { storageKey, initialWishes } = iosData.rsvp;
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

  if (submitted) {
    return (
      <div className="text-center py-4">
        <Heart size={36} fill="#fff" className="mx-auto mb-2.5" />
        <p>Terima kasih atas konfirmasimu!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        className="w-full bg-white/[0.08] border border-white/[0.12] rounded-[10px] px-3.5 py-3 text-white font-sans text-[13px] outline-none focus:border-[#11998e] placeholder:text-white/50"
        placeholder="Nama lengkap kamu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className={`flex-1 py-2.5 rounded-[10px] border text-xs font-semibold cursor-pointer font-sans transition-all ${
            selected === "hadir"
              ? "bg-[#11998e]/25 border-[#11998e] text-[#38ef7d]"
              : "border-white/15 bg-transparent text-white/70"
          }`}
          onClick={() => setSelected("hadir")}
        >
          Hadir
        </button>
        <button
          className={`flex-1 py-2.5 rounded-[10px] border text-xs font-semibold cursor-pointer font-sans transition-all ${
            selected === "tidak"
              ? "bg-[#11998e]/25 border-[#11998e] text-[#38ef7d]"
              : "border-white/15 bg-transparent text-white/70"
          }`}
          onClick={() => setSelected("tidak")}
        >
          Tidak Hadir
        </button>
      </div>
      <textarea
        className="w-full bg-white/[0.08] border border-white/[0.12] rounded-[10px] px-3.5 py-3 text-white font-sans text-[13px] outline-none resize-none h-[70px] focus:border-[#11998e] placeholder:text-white/50"
        placeholder="Titip doa & ucapan..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-gradient-to-br from-[#11998e] to-[#38ef7d] text-white border-none rounded-3xl py-3 text-[13px] font-bold cursor-pointer font-sans"
        onClick={handleSubmit}
        style={{ opacity: !name.trim() || selected === null ? 0.4 : 1 }}
      >
        Kirim
      </button>

      <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-white/[0.08]">
        {wishes.slice(0, 5).map((wish) => (
          <div className="flex flex-col gap-0.5 text-xs py-2" key={wish.id}>
            <span className="font-bold">{wish.name}</span>
            <span className="text-white/70 italic">{wish.message}</span>
            <span className="text-[10px] text-white/40">
              {wish.time.includes("T") ? formatRsvpTime(wish.time) : wish.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// HOME SCREEN (muncul setelah swipe up)[
function HomeScreen({ media, onOpenSheet, onSwipeDown }) {
  const apps = [
    {
      id: "rsvp",
      icon: <Mail size={26} color="#fff" strokeWidth={1.75} />,
      iconBg: "#007AFF",
      label: "RSVP",
    },
    {
      id: "gift",
      icon: <Gift size={26} color="#fff" strokeWidth={1.75} />,
      iconBg: "#FF3B30",
      label: "Hadiah",
    },
    {
      id: "maps",
      icon: <MapPin size={26} color="#fff" strokeWidth={1.75} />,
      iconBg: "#34C759",
      label: "Lokasi",
    },
  ];

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 80) {
      onSwipeDown();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-20 max-w-[480px] mx-auto flex flex-col"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 260 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.5, bottom: 0 }}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-center pt-3">
        <div className="w-9 h-1 bg-white/60 rounded-full" />
      </div>

      <div className="flex-1 px-6 pt-10 flex flex-col">
        <div className="grid grid-cols-4 gap-x-4 gap-y-6">
          {apps.map((app, i) => (
            <AppIcon
              key={app.id}
              icon={app.icon}
              iconBg={app.iconBg}
              label={app.label}
              delay={0.1 + i * 0.05}
              isPhotosApp={app.isPhotosApp}
              thumbnailSrc={app.isPhotosApp ? media.photos.couple : undefined}
              onClick={() => onOpenSheet(app.id)}
            />
          ))}
        </div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <div className="text-[11px] text-white/60 font-medium mb-2.5 px-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            Kenangan Kami
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              className="col-span-2 row-span-2 aspect-square rounded-xl overflow-hidden"
              onClick={() => onOpenSheet("photos")}
            >
              <img
                src={media.photos.couple}
                alt="Couple"
                className="w-full h-full object-cover"
              />
            </button>
            <button
              className="aspect-square rounded-xl overflow-hidden"
              onClick={() => onOpenSheet("photos")}
            >
              <img
                src={media.photos.groom}
                alt="Groom"
                className="w-full h-full object-cover"
              />
            </button>
            <button
              className="aspect-square rounded-xl overflow-hidden"
              onClick={() => onOpenSheet("photos")}
            >
              <img
                src={media.photos.bride}
                alt="Bride"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-1.5 pb-2.5">
        <span className="text-[11px] text-white/70 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Geser ke bawah untuk kembali
        </span>
        <div className="w-9 h-1 bg-white/70 rounded-full" />
      </div>
    </motion.div>
  );
}

// MAIN COMPONENT[
export default function LockscreenInvitation() {
  const clock = useClock();
  const { couple, event, media, music } = iosData;
  const { messagePreview, weatherQuote } = iosData;

  const [openSheet, setOpenSheet] = useState(null);
  const [showHome, setShowHome] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRefObj = useRef(null);

  // Setup audio + autoplay
  useEffect(() => {
    const audio = new Audio(music.file);
    audio.loop = true;
    audio.volume = 0.5;
    audioRefObj.current = audio;
    setAudioReady(true);

    let cancelled = false;

    const tryPlay = () => {
      if (cancelled || !audio.paused) return;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };

    audio
      .play()
      .then(() => {
        if (!cancelled) setIsPlaying(true);
      })
      .catch(() => {
        document.addEventListener("click", tryPlay, { once: true });
        document.addEventListener("touchstart", tryPlay, { once: true });
      });

    return () => {
      cancelled = true;
      audio.pause();
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const img = new Image();
    img.src = media.photos.couple;
  }, [media.photos.couple]);

  const togglePlay = () => {
    const audio = audioRefObj.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const countdown = getCountdown(event.date.iso);
  const closeSheet = () => setOpenSheet(null);

  const notifications = [
    {
      id: "message",
      icon: (
        <MessageCircle
          size={16}
          color="#fff"
          strokeWidth={1.75}
          fill="#fff"
          fillOpacity={0}
        />
      ),
      iconBg: "#30D158",
      appName: "Messages",
      time: "now",
      title: messagePreview.sender,
      preview: messagePreview.text,
    },
    {
      id: "calendar",
      icon: <Calendar size={16} color="#FF3B30" strokeWidth={1.75} />,
      iconBg: "#FFFFFF",
      appName: "Calendar",
      time: "1m ago",
      title: `Pernikahan ${couple.displayName}`,
      preview: event.date.full,
    },
    {
      id: "weather",
      icon: <Cloud size={16} color="#fff" strokeWidth={1.75} />,
      iconBg: "#0A84FF",
      appName: "Weather",
      time: "2m ago",
      title: weatherQuote.condition,
      preview: weatherQuote.temp,
    },
  ];

  const handleLockscreenDragEnd = (event, info) => {
    if (info.offset.y < -80) {
      setShowHome(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-white">
      {/* Wallpaper permanen — tidak pernah unmount, mencegah flicker putih saat transisi */}
      <div
        className="fixed inset-0 ls-wallpaper"
        style={{ backgroundImage: `url(${media.photos.couple})` }}
      />
      <div className="fixed inset-0 ls-overlay-gradient" />

      <AnimatePresence>
        {!showHome && (
          <motion.div
            className="relative z-10 max-w-[480px] mx-auto min-h-screen flex flex-col"
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
            onDragEnd={handleLockscreenDragEnd}
          >
            <StatusBar clock={clock} />

            <div className="text-center pt-6 pb-2 px-4">
              <div className="text-[80px] font-semibold leading-none tracking-tight [text-shadow:0_4px_24px_rgba(0,0,0,0.4)]">
                {formatClockTime(clock)}
              </div>
              <div className="text-sm text-white/85 mt-1.5 font-medium">
                {formatClockDate(clock)}
              </div>
              <div className="text-lg font-bold mt-3">{couple.displayName}</div>
              {countdown && (
                <div className="inline-block text-[11px] text-white/75 mt-2 bg-white/10 px-3.5 py-1.5 rounded-full ls-notif-blur">
                  {countdown.days}h {countdown.hours}j {countdown.minutes}m
                  menuju hari bahagia
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-2 px-4 pt-6 pb-4">
              {notifications.map((notif, i) => (
                <NotificationCard
                  key={notif.id}
                  icon={notif.icon}
                  iconBg={notif.iconBg}
                  appName={notif.appName}
                  time={notif.time}
                  title={notif.title}
                  preview={notif.preview}
                  delay={0.05 * i}
                  onClick={() => setOpenSheet(notif.id)}
                />
              ))}
            </div>

            {audioReady && (
              <NowPlayingCard
                audioRef={audioRefObj}
                isPlaying={isPlaying}
                togglePlay={togglePlay}
              />
            )}

            <div className="flex items-center justify-between px-10 pb-3">
              <div className="w-11 h-11 rounded-full ls-notif-blur flex items-center justify-center">
                <Flashlight size={18} color="#fff" />
              </div>
              <div className="w-11 h-11 rounded-full ls-notif-blur flex items-center justify-center">
                <Camera size={18} color="#fff" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1.5 pb-2.5">
              <span className="text-[11px] text-white/70 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] animate-swipe-hint">
                Geser ke atas untuk lihat lainnya
              </span>
              <div className="w-9 h-1 bg-white/70 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHome && (
          <HomeScreen
            media={media}
            onOpenSheet={(id) => {
              if (id === "gallery") {
                setOpenSheet("photos");
              } else {
                setOpenSheet(id);
              }
            }}
            onSwipeDown={() => setShowHome(false)}
          />
        )}
      </AnimatePresence>

      <Sheet
        open={openSheet === "calendar"}
        onClose={closeSheet}
        title="Detail Acara"
      >
        <CalendarSheetContent />
      </Sheet>
      <Sheet
        open={openSheet === "message"}
        onClose={closeSheet}
        title="Kisah Cinta Kami"
      >
        <MessageSheetContent />
      </Sheet>
      <Sheet
        open={openSheet === "weather"}
        onClose={closeSheet}
        title="In Love, Forever"
      >
        <WeatherSheetContent />
      </Sheet>
      <Sheet
        open={openSheet === "photos"}
        onClose={closeSheet}
        title="Galeri Kami"
      >
        <PhotoSheetContent />
      </Sheet>
      <Sheet
        open={openSheet === "maps"}
        onClose={closeSheet}
        title="Lokasi Acara"
      >
        <MapsSheetContent />
      </Sheet>
      <Sheet
        open={openSheet === "gift"}
        onClose={closeSheet}
        title="Kirim Hadiah"
      >
        <GiftSheetContent />
      </Sheet>
      <Sheet
        open={openSheet === "rsvp"}
        onClose={closeSheet}
        title="Konfirmasi Kehadiran"
      >
        <RSVPSheetContent />
      </Sheet>
    </div>
  );
}
