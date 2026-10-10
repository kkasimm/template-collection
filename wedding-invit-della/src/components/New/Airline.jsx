import { useEffect, useId, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  AirlineWedding.jsx  —  undangan tema tiket pesawat / boarding pass
 * ------------------------------------------------------------------ */

const L = {
  ticket: "WEDDING TICKET",
  departure: "DEPARTURE",
  flightDate: "FLIGHT & DATE",
  klass: "CLASS",
  destination: "DESTINATION",
  weddingLocation: "WEDDING LOCATION",
  boarding: "BOARDING FOR LOVE",
  dear: ["DEAR FRIENDS", "AND FAMILY"],
  waiting: ["WE ARE WAITING", "FOR YOU"],
  saveDate: "SAVE THE DATE",
  venue: "VENUE",
  howTo: "HOW TO GET THERE",
  passengers: "THE PASSENGERS",
  story: "OUR FLIGHT LOG",
  memories: "MEMORIES",
  rsvp: "RSVP",
  gift: "WEDDING GIFT",
  thanks: "SEE YOU ON BOARD",
  open: "OPEN INVITATION",
  dearGuest: "DEAR",
  invitedTo: "YOU ARE INVITED TO THE WEDDING OF",
  giftAddr: "SEND A GIFT",
  giftHint: "Contact us for the delivery address:",
  waitingText: "Pack your bags and join us for a weekend filled with love, laughter and unforgettable memories.",
  boardingPass: "ATTENDANCE QR",
  showPass: "VIEW MY ATTENDANCE QR",
  close: "CLOSE",
  scanHint: "This code is unique to you. Please show this QR to the staff at check-in.",
  quote:
    "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang.",
  quoteSource: "(Q.S Ar-Rum ayat 21)",
  countdown: ["Days", "Hours", "Minutes", "Seconds"],
  confirmTransfer: "CONFIRM TRANSFER",
  transferThanks: "Thank you for confirming your transfer!",
  rsvpThanks: "Thank you! Your attendance has been confirmed.",
};

/* ─── Dummy Data (susunan array sama dengan Spotify.jsx) ────────────────────── */
const COUPLE = {
  groom: {
    name: "Briptu Indra Lukman Hakim S.H",
    shortName: "Indra",
    parent: "Putra dari Bapak H. Amad (Alm) dan Ibu Hj. Nurhalimah",
    instagram: "indra_lukman",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=880&fit=crop&crop=face",
  },
  bride: {
    name: "Yurita Febriyawati S.I.Kom",
    shortName: "Yurita",
    parent: "Putri dari Bapak Muslim (KBJ) dan Ibu Nurkhasanah",
    instagram: "yurita_febri",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&h=880&fit=crop&crop=face",
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
    photo: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=600&fit=crop",
  },
  {
    id: "resepsi",
    title: "Resepsi",
    date: "Sunday, 23 November 2028",
    time: "08.00 – 12.00 WIB",
    venue: "HOTEL SATU HATI",
    mapsUrl: "https://maps.google.com",
    photo: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&h=600&fit=crop",
  },
];

const LOVE_STORY = [
  {
    track: 1,
    title: "Pertemuan Kita",
    color: "from-teal-700 to-teal-900",
    text: "Mereka bertemu tanpa rencana, hanya dua orang asing yang kebetulan berada di tempat yang sama pada waktu yang tepat. Dari sapaan singkat yang awalnya biasa saja, tiba-tiba muncul percakapan yang terasa hangat dan berbeda.",
    photo: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop",
  },
  {
    track: 2,
    title: "Jatuh Cinta",
    color: "from-green-700 to-green-900",
    text: "Mereka bertemu tanpa rencana, hanya dua orang asing yang kebetulan berada di tempat yang sama pada waktu yang tepat. Dari sapaan singkat yang awalnya biasa saja, tiba-tiba muncul percakapan yang terasa hangat dan berbeda.",
    photo: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop",
  },
  {
    track: 3,
    title: "Mengikat Cinta",
    color: "from-purple-700 to-purple-900",
    text: "Mereka bertemu tanpa rencana, hanya dua orang asing yang kebetulan berada di tempat yang sama pada waktu yang tepat. Dari sapaan singkat yang awalnya biasa saja, tiba-tiba muncul percakapan yang terasa hangat dan berbeda.",
    photo: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
  },
  {
    track: 4,
    title: "Married",
    color: "from-yellow-700 to-yellow-900",
    text: "Mereka bertemu tanpa rencana, hanya dua orang asing yang kebetulan berada di tempat yang sama pada waktu yang tepat. Dari sapaan singkat yang awalnya biasa saja, tiba-tiba muncul percakapan yang terasa hangat dan berbeda.",
    photo: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=600&fit=crop",
  },
];

const MEMORIES = [
  { title: "1", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&h=700&fit=crop&crop=face" },
  { title: "2", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&h=700&fit=crop&crop=face" },
  { title: "3", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=700&h=700&fit=crop&crop=face" },
  { title: "4", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&h=700&fit=crop&crop=face" },
  { title: "5", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&h=700&fit=crop&crop=face" },
  { title: "6", photo: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=700&h=700&fit=crop&crop=face" },
];
const COVER_PHOTO = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&h=700&fit=crop";
const AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const BANK_ACCOUNTS = [
  { bank: "BCA", accountNumber: "98122XXXX", accountName: "Pramarta Andita", color: "#005BAC" },
  { bank: "MANDIRI", accountNumber: "75021XXXX", accountName: "Aminudin Syahputra", color: "#E8A000" },
];

const GIFT_PHONE = "+62 812-XXXX-XXXX";

/* ─── Guest QR (sama seperti Spotify.jsx: payload unik per tamu → api.qrserver.com) ─── */
const guestCodeOf = (name) => btoa(unescape(encodeURIComponent(name))).slice(0, 10);
const buildQrPayload = ({ groom, bride, guestName, dateText }) =>
  `The Wedding Of ${groom} & ${bride}\nTamu: ${guestName}\nTanggal: ${dateText}\nKode: ${guestCodeOf(guestName)}`;
const buildQrUrl = (payload, color = "121212") =>
  `https://api.qrserver.com/v1/create-qr-code/?size=230x230&margin=8&color=${color}&bgcolor=ffffff&data=${encodeURIComponent(payload)}`;

// Teks khusus tema tiket pesawat
const TICKET = { brand: "Ruvida", tagline: "A destination to remember", kelas: "First Class", tujuan: "Jakarta, Indonesia" };

/* ---------- helper tanggal ---------- */
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MON3 = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

// "Sunday, 23 November 2028" -> "2028-11-23"
const eventDateISO = (text = "") => {
  const m = String(text).match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  const mi = m ? MONTHS.findIndex((x) => x.toLowerCase() === m[2].toLowerCase()) : -1;
  return m && mi >= 0 ? `${m[3]}-${String(mi + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}` : "2025-06-21";
};
// "08.00 – 12.00 WIB" -> "08:00:00"
const eventTimeISO = (text = "") => {
  const m = String(text).match(/(\d{1,2})[.:](\d{2})/);
  return m ? `${m[1].padStart(2, "0")}:${m[2]}:00` : "08:00:00";
};
const parseDate = (s) => {
  const [y, m, d] = (s || "2025-06-21").split("-").map(Number);
  return { y, m, d };
};
const fmtDot = (s) => {
  const { y, m, d } = parseDate(s);
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`;
};
const fmtStamp = (s) => {
  const { y, m, d } = parseDate(s);
  return `${d} ${MON3[m - 1]} ${y}`;
};
function upper(s = "") {
  return String(s).toUpperCase();
}

/* ---------- hook hitung mundur (sama seperti Spotify.jsx) ---------- */
function useCountdown(target) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (!(diff > 0)) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
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

/* ---------- animasi muncul saat scroll (sekali, sama gaya Spotify.jsx) ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(-24px)",
        transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- ornamen SVG ---------- */
function Plane({ size = 18, rotate = 45, color = "currentColor", style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={color}
      strokeWidth="0.8"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotate}deg)`, flex: "none", ...style }}
      aria-hidden="true"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function Globe() {
  const line = "#8f8a7e";
  return (
    <svg viewBox="0 0 120 120" width="118" height="118" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="#ebe5d8" stroke={line} strokeWidth="1.2" />
      <g fill="#cfc8b8" stroke={line} strokeWidth="0.7" strokeLinejoin="round">
        <path d="M18 38c6-8 16-12 25-11 6 1 4 6 9 7 5 1 9-3 12 0 2 3-3 6-6 8-4 3-3 8-8 10-6 2-9-3-13-1-4 3-1 9-6 11-5 2-10-6-12-12-2-4-3-8-1-12z" />
        <path d="M62 62c5-3 11-1 15 2 4 4 3 10 1 15-3 6-6 11-10 12-5 0-6-8-8-13-1-6-3-13 2-16z" />
        <path d="M74 30c6-4 15-5 22-1 5 3 7 9 4 13-4 4-10 2-14 4-5 3-7 9-12 7-4-2-3-8-2-12 1-4 0-8 2-11z" />
        <path d="M30 70c4-2 9 0 11 4 2 5-1 11-5 12-5 0-9-6-8-11 0-2 1-4 2-5z" />
      </g>
      <g fill="none" stroke={line} strokeWidth="0.6" opacity="0.75">
        <ellipse cx="60" cy="60" rx="56" ry="20" />
        <ellipse cx="60" cy="60" rx="56" ry="40" />
        <ellipse cx="60" cy="60" rx="20" ry="56" />
        <ellipse cx="60" cy="60" rx="40" ry="56" />
        <line x1="60" y1="4" x2="60" y2="116" />
        <line x1="4" y1="60" x2="116" y2="60" />
      </g>
    </svg>
  );
}

function Stamp({ top, bottom, size = 92, tilt = -8 }) {
  const id = useId().replace(/:/g, "");
  const c = "#2a2a2a";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ transform: `rotate(${tilt}deg)`, opacity: 0.85, flex: "none" }} aria-hidden="true">
      <defs>
        <path id={`t${id}`} d="M 11 50 A 39 39 0 0 1 89 50" />
        <path id={`b${id}`} d="M 7 50 A 43 43 0 0 0 93 50" />
      </defs>
      <circle cx="50" cy="50" r="47" fill="none" stroke={c} strokeWidth="1.4" />
      <circle cx="50" cy="50" r="31" fill="none" stroke={c} strokeWidth="1" />
      <text fontFamily="Jost, sans-serif" fontSize="7.4" fontWeight="500" letterSpacing="1.2" fill={c}>
        <textPath href={`#t${id}`} startOffset="50%" textAnchor="middle">{top}</textPath>
      </text>
      <text fontFamily="Jost, sans-serif" fontSize="7.4" fontWeight="500" letterSpacing="1.2" fill={c}>
        <textPath href={`#b${id}`} startOffset="50%" textAnchor="middle">{bottom}</textPath>
      </text>
      <g transform="translate(37 37) scale(1.08)" fill={c} stroke={c} strokeWidth="0.8" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </g>
    </svg>
  );
}

function Postmark() {
  return (
    <svg viewBox="0 0 90 34" width="88" height="34" aria-hidden="true">
      <g fill="none" stroke="#2a2a2a" strokeWidth="0.9" opacity="0.7" strokeLinecap="round">
        {[4, 11, 18, 25].map((y) => (
          <path key={y} d={`M2 ${y} q7 -5 14 0 t14 0 t14 0 t14 0 t14 0 t14 0`} />
        ))}
      </g>
    </svg>
  );
}

function FlightPath({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 40" aria-hidden="true">
      <path d="M6 14 C 60 36, 140 30, 200 22 C 240 17, 262 20, 286 18" fill="none" stroke="currentColor" strokeWidth="1.1" strokeDasharray="1.5 5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- blok dasar ---------- */
function Photo({ src, alt = "", ratio = "4 / 3", bw = false, radius = 12 }) {
  return (
    <div className="tk-photo" style={{ aspectRatio: ratio, borderRadius: radius }}>
      {src ? (
        <img src={src} alt={alt} loading="lazy"  />
      ) : (
        <div className="tk-photo-empty" aria-hidden="true">
          <Plane size={26} rotate={0} />
        </div>
      )}
    </div>
  );
}

function Ticket({ children, notch = false, className = "", style }) {
  return (
    <section className={`tk-ticket ${className}`} style={style}>
      <i className="tk-scallop top" />
      <i className="tk-scallop bottom" />
      {notch && <i className="tk-notch" />}
      {children}
    </section>
  );
}

function Calendar({ date }) {
  const { y, m, d } = parseDate(date);
  const lead = (new Date(y, m - 1, 1).getDay() + 6) % 7; // Senin = 0
  const total = new Date(y, m, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  return (
    <div className="tk-cal">
      <div className="tk-cal-title">{upper(MONTHS[m - 1])} {y}</div>
      <div className="tk-cal-grid">
        {["M", "T", "W", "T", "F", "S", "S"].map((w, i) => (
          <span key={i} className="tk-cal-w">{w}</span>
        ))}
        {cells.map((n, i) => (
          <span key={i} className={n === d ? "tk-cal-d on" : "tk-cal-d"}>{n || ""}</span>
        ))}
      </div>
      <div className="tk-cal-foot">
        <small>{L.saveDate}</small>
        <strong>{fmtDot(date)}</strong>
        <span className="tk-heart">&#10084;</span>
      </div>
    </div>
  );
}

function Countdown({ target }) {
  const t = useCountdown(target);
  const vals = [t.days, t.hours, t.minutes, t.seconds];
  return (
    <div className="tk-count" role="timer" aria-label="Countdown to the wedding">
      {L.countdown.map((label, i) => (
        <div key={label}>
          <b>{String(vals[i]).padStart(2, "0")}</b>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}

function Cover({ guest, wife, husband, dateDot, tujuan, leaving, onOpen, onShowPass }) {
  return (
    <div className={`tk-cover ${leaving ? "leaving" : ""}`} role="dialog" aria-label="Wedding invitation cover">
      <div className="tk-cover-in">
        <Ticket notch>
          <div className="tk-hero-in">
            <p className="tk-label tk-center tk-hero-top">{L.ticket}</p>
            <hr className="tk-dash" />
            <span className="tk-fly"><Plane size={22} rotate={-45} style={{ margin: "14px auto 6px", display: "block" }} /></span>
            <div className="tk-globe-wrap" style={{ margin: "4px 0 14px" }}><Globe /></div>
            {guest && (
              <>
                <p className="tk-label tk-center tk-ink-soft">{L.dearGuest}</p>
                <p className="tk-guest">{upper(guest)}</p>
              </>
            )}
            <p className="tk-label tk-center tk-ink-soft tk-invited">{L.invitedTo}</p>
            <h2 className="tk-names tk-names-md">{upper(wife)}</h2>
            <div className="tk-and">and</div>
            <h2 className="tk-names tk-names-md">{upper(husband)}</h2>
            <p className="tk-label tk-center tk-cover-meta">
              {[dateDot, upper(tujuan)].filter(Boolean).join("  \u00b7  ")}
            </p>
            <button className="tk-btn tk-open" onClick={onOpen}>{L.open}</button>
            <button className="tk-btn tk-btn-ghost" onClick={onShowPass}>{L.showPass}</button>
            <hr className="tk-dash" />
            <p className="tk-label tk-center tk-boarding">{L.boarding}</p>
          </div>
        </Ticket>
      </div>
    </div>
  );
}

/* ================================================================== */
export default function AirlineWedding({
  couple = COUPLE,
  events = EVENTS,
  loveStory = LOVE_STORY,
  memories = MEMORIES,
  bankAccounts = BANK_ACCOUNTS,
  giftPhone = GIFT_PHONE,
  coverPhoto = COVER_PHOTO,
  audioUrl = AUDIO_URL,
  onRsvp,
}) {
  const tanggal = eventDateISO(events[0]?.date);
  const target = `${tanggal}T${eventTimeISO(events[0]?.time)}`;
  const dateDot = fmtDot(tanggal);
  const { y: wy, m: wm, d: wd } = parseDate(tanggal);
  const dateText = `${wd} ${MONTHS[wm - 1]} ${wy}`;
  const wife = couple.bride.shortName;
  const husband = couple.groom.shortName;
  const lokasi = events[0]?.venue || "";
  const [kota, negara = ""] = TICKET.tujuan.split(",").map((x) => x.trim());
  const venues = events.filter((e, i, arr) => e.venue && arr.findIndex((x) => x.venue === e.venue) === i);

  const [guestName, setGuestName] = useState("Nama Tamu");
  // Baca nama tamu dari link undangan, mis. ?to=Budi+Santoso
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to") || params.get("nama");
      if (to && to.trim()) setGuestName(to.trim());
    } catch (e) {
      /* no query params available */
    }
  }, []);

  /* font */
  useEffect(() => {
    if (document.getElementById("tk-fonts")) return;
    const l = document.createElement("link");
    l.id = "tk-fonts";
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Marcellus&family=Mrs+Saint+Delafield&family=Pinyon+Script&display=swap";
    document.head.appendChild(l);
  }, []);

  /* alur: cover -> (leaving) -> open */
  const [phase, setPhase] = useState("cover");
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const openInvite = () => {
    if (phase !== "cover") return;
    setPhase("leaving");
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    setTimeout(() => {
      setPhase("open");
      window.scrollTo?.(0, 0);
    }, 900);
  };
  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else {
      a.pause();
      setPlaying(false);
    }
  };

  /* QR kehadiran */
  const [showQR, setShowQR] = useState(false);
  useEffect(() => {
    if (!showQR) return;
    const onKey = (e) => e.key === "Escape" && setShowQR(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showQR]);
  const qrUrl = buildQrUrl(buildQrPayload({ groom: husband, bride: wife, guestName, dateText }));

  /* RSVP */
  const [rsvp, setRsvp] = useState({ name: "", message: "", attend: "hadir" });
  const [submitted, setSubmitted] = useState(false);
  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRsvp?.({ ...rsvp, guestName });
    } catch (_) {}
    setSubmitted(true);
  };

  /* salin rekening + konfirmasi transfer */
  const [copied, setCopied] = useState("");
  const [transferOk, setTransferOk] = useState(false);
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(""), 1800);
    } catch (_) {}
  };

  return (
    <div className={`tk-root ${phase !== "open" ? "tk-locked" : ""}`}>
      <style>{css}</style>
      {phase !== "open" && (
        <Cover
          guest={guestName}
          wife={wife}
          husband={husband}
          dateDot={dateDot}
          tujuan={TICKET.tujuan}
          leaving={phase === "leaving"}
          onOpen={openInvite}
          onShowPass={() => setShowQR(true)}
        />
      )}

      {/* panel judul untuk desktop */}
      <aside className="tk-poster" aria-hidden="true">
        <span className="tk-poster-brand">{TICKET.brand}</span>
        <div className="tk-poster-script">Wedding</div>
        <div className="tk-poster-title">Invitation</div>
        <div className="tk-poster-rule"><i /><Plane size={16} rotate={45} /><i /></div>
        <p className="tk-poster-sub">{upper(TICKET.tagline)}</p>
      </aside>

      <main className="tk-col">
        {/* ===== 1. TIKET UTAMA ===== */}
        <Ticket notch className="tk-hero">
          <div className="tk-hero-in">
            <p className="tk-label tk-center tk-hero-top">{L.ticket}</p>
            <hr className="tk-dash" />
            <Plane size={20} rotate={-45} style={{ margin: "14px auto 8px", display: "block" }} />
            <div className="tk-globe-wrap">
              <span className="tk-vert">&#9660;&nbsp;{L.departure}</span>
              <Globe />
            </div>
            <h1 className="tk-names">{upper(wife)}</h1>
            <div className="tk-and">and</div>
            <h1 className="tk-names">{upper(husband)}</h1>

            <div className="tk-info">
              {[
                [L.flightDate, dateDot],
                [L.klass, upper(TICKET.kelas)],
                [L.destination, upper(TICKET.tujuan)],
                [L.weddingLocation, upper(lokasi)],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}><small>{k}</small><b>{v}</b></div>
                ))}
            </div>

            <div className="tk-sign-row">
              <Stamp top={`${upper(wife)} & ${upper(husband)}`} bottom={fmtStamp(tanggal)} />
              <div className="tk-post"><Postmark /></div>
              <span className="tk-signature">{TICKET.brand}</span>
            </div>

            <hr className="tk-dash" style={{ marginTop: 18 }} />
            <p className="tk-label tk-center tk-boarding">{L.boarding}</p>
          </div>
        </Ticket>

        {/* ===== 2. DEAR FRIENDS (COVER_PHOTO + kutipan) ===== */}
        <Reveal>
          <section className="tk-navy tk-pad tk-dear">
            <h2 className="tk-h">{L.dear[0]}<br />{L.dear[1]}</h2>
            <p className="tk-body">{L.quote}</p>
            {L.quoteSource && <p className="tk-body tk-quote-src">{L.quoteSource}</p>}
            <Photo src={coverPhoto} bw ratio="16 / 10" alt={`${wife} & ${husband}`} />
            <FlightPath className="tk-path-a" />
            <Plane size={20} rotate={45} style={{ position: "absolute", right: 34, bottom: 6 }} />
          </section>
        </Reveal>

        {/* ===== 3. COUPLE ===== */}
        <section className="tk-navy tk-pad">
          <Reveal><h2 className="tk-h">{L.passengers}</h2></Reveal>
          <div className="tk-stack">
            {[couple.bride, couple.groom].map((c, i) => (
              <Reveal key={i} delay={i * 120}>
                <Ticket className="tk-card">
                  <div className="tk-card-photo"><Photo src={c.photo} ratio="4 / 4.4" bw alt={c.name} /></div>
                  <h3 className="tk-names tk-names-sm">{upper(c.name)}</h3>
                  {c.parent && <p className="tk-body tk-ink-soft tk-parent">{c.parent}</p>}
                  {c.instagram && (
                    <a className="tk-ig" href={`https://instagram.com/${c.instagram.replace("@", "")}`} target="_blank" rel="noreferrer">
                      @{c.instagram.replace("@", "")}
                    </a>
                  )}
                </Ticket>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== 4. SAVE THE DATE ===== */}
        <section className="tk-navy tk-pad">
          <Reveal>
            <h2 className="tk-h">{L.waiting[0]}<br />{L.waiting[1]}</h2>
            <p className="tk-body">{L.waitingText}</p>
          </Reveal>
          <Reveal delay={80}><Countdown target={target} /></Reveal>
          <Reveal delay={140}>
            <Ticket className="tk-card"><Calendar date={tanggal} /></Ticket>
          </Reveal>
        </section>

        {/* ===== 5. VENUE ===== */}
        {venues.map((v) => {
          const evs = events.filter((e) => e.venue === v.venue);
          return (
            <Reveal key={v.venue}>
              <Ticket notch className="tk-venue">
                <div className="tk-venue-in">
                  <div className="tk-venue-head">
                    <h2 className="tk-h tk-ink">{L.venue}</h2>
                    {kota && (
                      <div className="tk-venue-stamp">
                        <Stamp size={64} top={upper(kota)} bottom={upper(negara)} tilt={8} />
                      </div>
                    )}
                  </div>
                  <hr className="tk-dash" />
                  <p className="tk-venue-name">{upper(v.venue)}</p>
                  <ul className="tk-ev">
                    {evs.map((e) => (
                      <li key={e.id}>
                        <span>
                          <b>{e.title}</b>
                          <em>{upper(e.date)}</em>
                        </span>
                        <time>{e.time}</time>
                      </li>
                    ))}
                  </ul>
                  {v.mapsUrl && <a className="tk-btn" href={v.mapsUrl} target="_blank" rel="noreferrer">{L.howTo}</a>}
                  {v.photo && <Photo src={v.photo} ratio="4 / 2.9" alt={v.venue} bw />}
                </div>
              </Ticket>
            </Reveal>
          );
        })}

        {/* ===== 6. KISAH CINTA ===== */}
        {loveStory.length > 0 && (
          <section className="tk-navy tk-pad">
            <Reveal><h2 className="tk-h">{L.story}</h2></Reveal>
            <div className="tk-stack">
              {loveStory.map((k, i) => (
                <Reveal key={k.track} delay={i * 80}>
                  <Ticket className="tk-card tk-center-card">
                    {k.photo && <div className="tk-card-photo"><Photo src={k.photo} ratio="4 / 3" bw radius={8} alt={k.title} /></div>}
                    <small className="tk-label tk-ink-soft">LEG {String(k.track).padStart(2, "0")}</small>
                    <h3 className="tk-venue-name tk-leg-title">{upper(k.title)}</h3>
                    <p className="tk-body tk-ink-soft tk-flush">{k.text}</p>
                  </Ticket>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ===== 7. MEMORI ===== */}
        {memories.length > 0 && (
          <section className="tk-navy tk-pad">
            <Reveal><h2 className="tk-h">{L.memories}</h2></Reveal>
            <div className="tk-gallery">
              {memories.map((m, i) => (
                <Reveal key={m.title} delay={(i % 2) * 80} className={i % 5 === 0 ? "tk-wide" : ""}>
                  <figure>
                    <Photo src={m.photo} ratio={i % 5 === 0 ? "16 / 10" : "1 / 1"} alt={m.title} bw radius={10} />
                    <figcaption>{m.title}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ===== 8. RSVP ===== */}
        <section className="tk-navy tk-pad">
          <Reveal><h2 className="tk-h">{L.rsvp}</h2></Reveal>
          <Reveal delay={80}>
            <Ticket className="tk-card">
              {submitted ? (
                <p className="tk-sent">{L.rsvpThanks}</p>
              ) : (
                <form className="tk-form" onSubmit={handleRsvpSubmit}>
                  <label>
                    <small>PASSENGER</small>
                    <input required value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} placeholder="Your name" />
                  </label>
                  <label>
                    <small>WILL YOU BOARD?</small>
                    <select value={rsvp.attend} onChange={(e) => setRsvp({ ...rsvp, attend: e.target.value })}>
                      <option value="hadir">Yes, I will be there</option>
                      <option value="tidak">Sorry, I can't make it</option>
                    </select>
                  </label>
                  <label>
                    <small>WISHES & PRAYERS</small>
                    <textarea rows={3} value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} placeholder="Write a message for the couple" />
                  </label>
                  <button className="tk-btn" type="submit">CONFIRM ATTENDANCE</button>
                </form>
              )}
            </Ticket>
          </Reveal>
        </section>

        {/* ===== 9. HADIAH ===== */}
        {(bankAccounts.length > 0 || giftPhone) && (
          <section className="tk-navy tk-pad">
            <Reveal><h2 className="tk-h">{L.gift}</h2></Reveal>
            <div className="tk-stack">
              {bankAccounts.map((r, i) => (
                <Reveal key={r.bank} delay={i * 100}>
                  <Ticket className="tk-card tk-center-card">
                    <small className="tk-label tk-ink-soft tk-bank">
                      <i className="tk-dot" style={{ background: r.color }} />
                      {upper(r.bank)}
                    </small>
                    <p className="tk-acc">{r.accountNumber}</p>
                    <p className="tk-body tk-ink-soft tk-acc-name">a.n. {r.accountName}</p>
                    <button className="tk-btn tk-btn-sm" onClick={() => copy(r.accountNumber)}>
                      {copied === r.accountNumber ? "COPIED" : "COPY NUMBER"}
                    </button>
                  </Ticket>
                </Reveal>
              ))}
              {bankAccounts.length > 0 && (
                <Reveal delay={200}>
                  {transferOk ? (
                    <p className="tk-thanks-line">{L.transferThanks}</p>
                  ) : (
                    <button className="tk-btn tk-btn-outline" onClick={() => setTransferOk(true)}>{L.confirmTransfer}</button>
                  )}
                </Reveal>
              )}
              {giftPhone && (
                <Reveal delay={260}>
                  <Ticket className="tk-card tk-center-card">
                    <small className="tk-label tk-ink-soft">{L.giftAddr}</small>
                    <p className="tk-body tk-ink-soft tk-gift-hint">{L.giftHint}</p>
                    <a className="tk-phone" href={`https://wa.me/${giftPhone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                      {giftPhone}
                    </a>
                  </Ticket>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* ===== 10. PENUTUP ===== */}
        <Reveal>
          <section className="tk-navy tk-pad tk-close">
            <Plane size={22} rotate={-45} style={{ margin: "0 auto 14px", display: "block" }} />
            <p className="tk-body">With love,</p>
            <h2 className="tk-names tk-names-cream">{upper(wife)} &amp; {upper(husband)}</h2>
            <p className="tk-label tk-center tk-thanks">{L.thanks}</p>
            <span className="tk-signature tk-signature-cream">{TICKET.brand}</span>
          </section>
        </Reveal>
      </main>

      {/* ===== modal QR kehadiran (sama seperti QRModal di Spotify.jsx) ===== */}
      {showQR && (
        <div className="tk-modal" role="dialog" aria-modal="true" aria-label={L.boardingPass} onClick={() => setShowQR(false)}>
          <div className="tk-modal-in" onClick={(e) => e.stopPropagation()}>
            <Ticket notch className="tk-bp">
              <div className="tk-bp-in">
                <p className="tk-label tk-center">{L.boardingPass}</p>
                <hr className="tk-dash" style={{ marginTop: 10 }} />
                <div className="tk-info" style={{ marginTop: 14 }}>
                  {[
                    ["PASSENGER", upper(guestName)],
                    ["FLIGHT & DATE", dateDot],
                    ["GATE", upper(lokasi)],
                  ].map(([k, v]) => (
                    <div key={k}><small>{k}</small><b>{v}</b></div>
                  ))}
                </div>
                <div className="tk-qr">
                  <img src={qrUrl} alt="QR Code Kehadiran" width={200} height={200} />
                </div>
                <p className="tk-body tk-ink-soft tk-scan">{L.scanHint}</p>
              </div>
            </Ticket>
            <button className="tk-btn tk-modal-close" onClick={() => setShowQR(false)}>{L.close}</button>
          </div>
        </div>
      )}

      {audioUrl && (
        <>
          <audio ref={audioRef} src={audioUrl} loop preload="none" />
          {phase === "open" && (
            <button className={`tk-music ${playing ? "on" : ""}`} onClick={toggleMusic} aria-label={playing ? "Pause music" : "Play music"}>
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" /><rect x="14" y="4" width="5" height="16" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}

/* ================================================================== */
const css = `
.tk-root{
  --navy:#0a1a33; --navy-2:#0d2140; --cream:#efe9dc;
  --ink:#1b1b1b; --ink-soft:#4c4a44; --red:#c8372d; --on-navy:#ece6d9;
  font-family:'Jost',system-ui,sans-serif; color:var(--on-navy);
  background:var(--navy); min-height:100vh;
  -webkit-font-smoothing:antialiased;
}
.tk-root *{box-sizing:border-box}
.tk-poster{display:none}
.tk-col{width:100%; max-width:430px; margin:0 auto; background:var(--navy); position:relative; overflow:hidden; padding:28px 0 90px}

/* ---- tipografi ---- */
.tk-label{font-size:10px; letter-spacing:.24em; font-weight:400; margin:0; text-transform:uppercase; display:block}
.tk-center{text-align:center}
.tk-h{font-family:'Marcellus',serif; font-weight:400; font-size:23px; line-height:1.2; letter-spacing:.07em; text-align:center; margin:0 0 16px; color:var(--on-navy)}
.tk-h.tk-ink{color:var(--ink)}
.tk-body{font-size:12.4px; line-height:1.8; font-weight:300; text-align:center; margin:0 auto 20px; max-width:310px; color:var(--on-navy)}
.tk-ink-soft{color:var(--ink-soft)}
.tk-flush{margin:0 auto}
.tk-names{font-family:'Marcellus',serif; font-weight:400; font-size:34px; letter-spacing:.09em; text-align:center; margin:0; color:var(--ink); line-height:1.2}
.tk-names-md{font-size:30px}
.tk-names-sm{font-size:19px; line-height:1.3; letter-spacing:.07em}
.tk-names-cream{color:var(--on-navy); font-size:26px}
.tk-and{font-family:'Pinyon Script',cursive; font-size:26px; text-align:center; color:#3a3833; margin:-2px 0 0; position:relative; line-height:1.1}
.tk-and::before,.tk-and::after{content:""; position:absolute; top:52%; width:60px; border-top:1px solid #6b665c; opacity:.55}
.tk-and::before{right:calc(50% + 34px)} .tk-and::after{left:calc(50% + 34px)}
.tk-signature{font-family:'Mrs Saint Delafield',cursive; font-size:34px; color:#2a2a2a; line-height:1}
.tk-signature-cream{display:block; text-align:center; color:var(--on-navy); margin-top:8px}

/* ---- tiket ---- */
.tk-ticket{position:relative; background-color:var(--cream); color:var(--ink); border-radius:6px; margin:0 16px;
  background-image:radial-gradient(rgba(120,100,60,.07) 1px, transparent 1.2px); background-size:3px 3px}
.tk-scallop{position:absolute; left:0; right:0; height:8px; pointer-events:none}
.tk-scallop.top{top:0; background:radial-gradient(circle at 50% 0, var(--navy) 3.4px, transparent 3.9px) 0 0/11px 8px repeat-x}
.tk-scallop.bottom{bottom:0; background:radial-gradient(circle at 50% 100%, var(--navy) 3.4px, transparent 3.9px) 0 0/11px 8px repeat-x}
.tk-notch{position:absolute; left:50%; bottom:-16px; width:32px; height:32px; border-radius:50%; background:var(--navy); transform:translateX(-50%); z-index:2}
.tk-dash{border:0; border-top:1px dashed #8d887c; margin:0; opacity:.8}

.tk-hero-in{padding:30px 24px 32px}
.tk-hero-top{letter-spacing:.3em; font-size:9.5px; margin-bottom:12px; color:#3a3833}
.tk-globe-wrap{position:relative; display:flex; justify-content:center; margin:6px 0 18px}
.tk-vert{position:absolute; left:-4px; top:6px; writing-mode:vertical-rl; transform:rotate(180deg); font-size:9px; letter-spacing:.22em; color:#3a3833}
.tk-info{display:grid; grid-template-columns:1fr 1fr; border:1px solid #8d887c; margin:24px 0 0}
.tk-info>div{padding:10px 12px 11px; text-align:left; min-width:0}
.tk-info>div:nth-child(odd){border-right:1px solid #8d887c}
.tk-info>div:nth-child(-n+2){border-bottom:1px solid #8d887c}
.tk-info small{display:block; font-size:8.5px; letter-spacing:.2em; color:#4c4a44; margin-bottom:3px}
.tk-info b{font-family:'Marcellus',serif; font-weight:400; font-size:13px; letter-spacing:.08em; color:var(--ink); display:block; overflow-wrap:anywhere}
.tk-sign-row{display:flex; align-items:center; justify-content:space-between; margin-top:16px; gap:6px}
.tk-post{flex:1; display:flex; justify-content:center}
.tk-boarding{margin-top:14px; letter-spacing:.3em; font-size:9.5px; color:#3a3833; text-align:center}
.tk-invited{font-size:8.5px; margin:0 auto 14px; max-width:230px; line-height:1.7}
.tk-cover-meta{margin:18px 0 0; color:#3a3833; text-align:center}

/* ---- seksi navy ---- */
.tk-navy{position:relative}
.tk-pad{padding:48px 24px 8px}
.tk-dear{padding-bottom:34px}
.tk-photo{width:100%; overflow:hidden; background:#16284a}
.tk-photo img{width:100%; height:100%; object-fit:cover; display:block}
.tk-photo-empty{width:100%; height:100%; display:grid; place-items:center; color:#6c7a93; background:linear-gradient(135deg,#1c2f52,#12233f)}
.tk-path-a{display:block; width:100%; height:40px; color:var(--on-navy); margin-top:12px; opacity:.85}
.tk-quote-src{margin-top:-10px; font-style:italic}

.tk-stack{display:grid; gap:20px}
.tk-card{margin:0 4px; padding:24px 20px}
.tk-center-card{text-align:center}
.tk-card-photo{margin-bottom:16px}
.tk-parent{margin:10px auto 0; font-size:12px}
.tk-ig{display:inline-block; margin-top:12px; font-size:11px; letter-spacing:.12em; color:var(--ink); text-decoration:none; border-bottom:1px dashed #8d887c; padding-bottom:2px}
.tk-ig:hover{color:var(--red)}
.tk-leg-title{margin:8px 0 10px}

/* hitung mundur */
.tk-count{display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin:0 4px 6px; text-align:center}
.tk-count>div{border:1px solid rgba(236,230,217,.35); border-radius:4px; padding:12px 4px 10px}
.tk-count b{display:block; font-family:'Marcellus',serif; font-weight:400; font-size:24px; letter-spacing:.06em; font-variant-numeric:tabular-nums; line-height:1.1}
.tk-count small{display:block; margin-top:5px; font-size:8.5px; letter-spacing:.18em; text-transform:uppercase; opacity:.8}

/* kalender */
.tk-cal-title{font-family:'Marcellus',serif; text-align:center; letter-spacing:.14em; font-size:15px; margin-bottom:12px}
.tk-cal-grid{display:grid; grid-template-columns:repeat(7,1fr); row-gap:7px; text-align:center}
.tk-cal-w{font-size:10px; letter-spacing:.1em; color:#3a3833; padding-bottom:4px}
.tk-cal-d{font-size:12px; height:26px; line-height:26px; color:var(--ink); font-weight:300}
.tk-cal-d.on{background:var(--red); color:#fff; border-radius:50%; width:26px; margin:0 auto; font-weight:400}
.tk-cal-foot{border-top:1px dashed #8d887c; margin-top:14px; padding-top:10px; text-align:center}
.tk-cal-foot small{display:block; font-size:9px; letter-spacing:.24em; color:#4c4a44}
.tk-cal-foot strong{font-family:'Marcellus',serif; font-weight:400; font-size:23px; letter-spacing:.1em; display:block; margin:4px 0 2px}
.tk-heart{color:var(--ink); font-size:11px}

/* ---- venue ---- */
.tk-venue{margin-top:48px; margin-bottom:16px}
.tk-venue-in{padding:28px 20px 36px}
.tk-venue-head{position:relative; display:flex; justify-content:center; align-items:center; padding-bottom:12px}
.tk-venue-head .tk-h{margin:0; font-size:26px}
.tk-venue-stamp{position:absolute; right:-6px; top:-16px}
.tk-venue-name{font-family:'Marcellus',serif; letter-spacing:.1em; font-size:14px; text-align:center; margin:16px 0 8px; color:var(--ink); font-weight:400}
.tk-ev{list-style:none; margin:0 0 18px; padding:0; border-top:1px dashed #8d887c}
.tk-ev li{display:flex; justify-content:space-between; align-items:flex-start; gap:10px; padding:11px 2px; border-bottom:1px dashed #8d887c}
.tk-ev b{display:block; font-family:'Marcellus',serif; font-weight:400; font-size:13px; letter-spacing:.06em}
.tk-ev em{display:block; font-style:normal; font-size:9.5px; letter-spacing:.14em; color:var(--ink-soft); margin-top:3px}
.tk-ev time{font-family:'Marcellus',serif; font-size:13px; letter-spacing:.06em; white-space:nowrap}

/* ---- tombol ---- */
.tk-btn{display:block; width:100%; background:var(--navy); color:var(--on-navy); border:0; border-radius:3px; padding:12px 14px; font:400 10.5px 'Jost',sans-serif; letter-spacing:.2em; text-align:center; text-decoration:none; cursor:pointer; margin:0 0 18px; transition:background .2s}
.tk-btn:hover{background:#13294d}
.tk-btn:focus-visible,.tk-form input:focus-visible,.tk-form select:focus-visible,.tk-form textarea:focus-visible,.tk-music:focus-visible,.tk-ig:focus-visible,.tk-phone:focus-visible{outline:2px solid var(--red); outline-offset:2px}
.tk-btn-sm{padding:10px 12px; margin:0}
.tk-btn-ghost{background:transparent; color:var(--ink); border:1px solid var(--ink); margin:-6px 0 20px}
.tk-btn-ghost:hover{background:rgba(10,26,51,.08)}
.tk-btn-outline{background:transparent; border:1px solid rgba(236,230,217,.55); margin:0 4px}
.tk-btn-outline:hover{background:rgba(236,230,217,.1)}
.tk-thanks-line{margin:0 4px; text-align:center; font-size:12px; letter-spacing:.06em; color:var(--on-navy); padding:10px 0}

/* ---- form ---- */
.tk-form{display:grid; gap:14px}
.tk-form label{display:grid; gap:5px}
.tk-form small{font-size:8.5px; letter-spacing:.2em; color:#4c4a44}
.tk-form input,.tk-form select,.tk-form textarea{width:100%; background:transparent; border:0; border-bottom:1px solid #8d887c; padding:8px 2px; font:300 13px 'Jost',sans-serif; color:var(--ink); border-radius:0; resize:none}
.tk-form .tk-btn{margin:8px 0 0}
.tk-sent{margin:0; padding:20px 0; font-size:13px; text-align:center; color:var(--ink-soft); line-height:1.7}

/* ---- galeri ---- */
.tk-gallery{display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:0 2px}
.tk-gallery .tk-wide{grid-column:span 2}
.tk-gallery figure{margin:0}
.tk-gallery figcaption{font-size:10.5px; letter-spacing:.06em; font-weight:300; text-align:center; margin-top:7px; color:var(--on-navy)}

/* ---- hadiah ---- */
.tk-bank{display:flex; align-items:center; justify-content:center; gap:8px}
.tk-dot{width:8px; height:8px; border-radius:50%; display:inline-block}
.tk-acc{font-family:'Marcellus',serif; font-size:21px; letter-spacing:.12em; margin:8px 0 2px; overflow-wrap:anywhere}
.tk-acc-name{margin:0 auto 14px}
.tk-gift-hint{margin:10px auto 8px}
.tk-phone{display:inline-block; font-family:'Marcellus',serif; letter-spacing:.1em; font-size:15px; color:var(--ink); text-decoration:none; border-bottom:1px dashed #8d887c; padding-bottom:2px}
.tk-phone:hover{color:var(--red)}

/* ---- penutup ---- */
.tk-close{padding-top:64px; padding-bottom:20px}
.tk-thanks{color:#cfc8b8; margin-top:18px; text-align:center}

/* ---- cover ---- */
.tk-locked{height:100vh; overflow:hidden}
.tk-cover{position:fixed; inset:0; z-index:60; background:var(--navy); display:flex; overflow-y:auto; transition:transform .9s cubic-bezier(.7,0,.2,1)}
.tk-cover.leaving{transform:translateY(-100%)}
.tk-cover-in{margin:auto; width:100%; max-width:390px; padding:28px 0}
.tk-guest{font-family:'Marcellus',serif; font-size:21px; letter-spacing:.08em; text-align:center; margin:4px 0 14px; overflow-wrap:anywhere; color:var(--ink)}
.tk-open{margin:22px 0 12px}
.tk-fly{display:block; animation:tk-fly 3.6s ease-in-out infinite}
@keyframes tk-fly{0%,100%{transform:translate(-6px,3px)} 50%{transform:translate(6px,-3px)}}

/* ---- modal QR ---- */
.tk-modal{position:fixed; inset:0; z-index:80; background:rgba(10,26,51,.96); display:flex; overflow-y:auto; padding:20px; animation:tk-fade .25s ease both}
.tk-modal-in{margin:auto; width:100%; max-width:360px; animation:tk-pop .3s cubic-bezier(.2,.8,.2,1) both}
.tk-modal .tk-ticket{margin:0}
.tk-bp-in{padding:28px 20px 22px}
.tk-qr{display:flex; justify-content:center; margin:20px 0 8px}
.tk-qr img{background:#fff; padding:6px; border-radius:6px; box-shadow:0 0 0 1px rgba(0,0,0,.12); display:block}
.tk-scan{margin:6px auto 4px; font-size:11.5px}
.tk-modal-close{margin:20px 0 0; background:transparent; border:1px solid rgba(236,230,217,.55)}
.tk-modal-close:hover{background:rgba(236,230,217,.1)}
.tk-modal-close:focus-visible{outline:2px solid var(--red); outline-offset:2px}
@keyframes tk-fade{from{opacity:0} to{opacity:1}}
@keyframes tk-pop{from{opacity:0; transform:translateY(14px) scale(.97)} to{opacity:1; transform:none}}

/* ---- musik ---- */
.tk-music{position:fixed; right:16px; bottom:16px; width:42px; height:42px; border-radius:50%; border:1px solid rgba(236,230,217,.5); background:var(--navy-2); color:var(--on-navy); display:grid; place-items:center; cursor:pointer; z-index:30}
.tk-music.on{background:var(--cream); color:var(--navy)}

/* ---- animasi tiket utama saat dibuka ---- */
@keyframes tk-drop{from{opacity:0; transform:translateY(-14px)} to{opacity:1; transform:none}}
.tk-hero{animation:tk-drop .8s cubic-bezier(.2,.7,.2,1) both}

@media (prefers-reduced-motion:reduce){
  .tk-fly,.tk-hero,.tk-modal,.tk-modal-in{animation:none}
  .tk-cover{transition:none}
}

/* ---- desktop: poster judul di kiri, kolom ponsel di kanan ---- */
@media (min-width:960px){
  .tk-root{display:grid; grid-template-columns:1fr 470px; background:linear-gradient(180deg,#dcdcda,#b9b9b6)}
  .tk-poster{display:flex; flex-direction:column; align-items:center; justify-content:center; position:sticky; top:0; height:100vh; color:#16161a; padding:0 40px; text-align:center}
  .tk-poster-brand{font-family:'Mrs Saint Delafield',cursive; font-size:44px; position:absolute; top:34px; right:12%}
  .tk-poster-script{font-family:'Mrs Saint Delafield',cursive; font-weight:400; font-size:150px; line-height:.9; margin:0}
  .tk-poster-title{font-family:'Marcellus',serif; font-weight:400; font-size:58px; letter-spacing:.04em; margin:-6px 0 0}
  .tk-poster-rule{display:flex; align-items:center; gap:14px; margin:20px 0 26px}
  .tk-poster-rule i{width:90px; border-top:1px solid #16161a; opacity:.5}
  .tk-poster-sub{font-size:11px; letter-spacing:.34em; margin:0}
  .tk-col{max-width:430px; box-shadow:0 0 60px rgba(0,0,0,.35); margin:0 20px}
}
`;