import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  Invitation.jsx — "Benang Merah" (versi Pink Elegan)
 * ------------------------------------------------------------------ */

const L = {
  forYou: "Kepada YTH:",
  seal: "Buka",
  qr: "QR Kehadiran",
  kicker: "Wedding!",
  lead: "Dateng ya, seru-seruan bareng kami.",
  scroll: "geser ke bawah",
  dayTitle: "Catat tanggalnya!",
  left: "Tinggal",
  d: "hari", h: "jam", m: "menit", s: "detik",
  passed: "Hari-H udah tiba!",
  meet: "Mempelai",
  tickets: "Tiket Kamu",
  date: "Tanggal",
  time: "Jam",
  place: "Lokasi",
  seeMap: "Buka Maps",
  story: "Cerita Kami",
  part: "Part",
  moments: "Momen Seru",
  envelope: "Amplop Digital",
  giftText: "Doa kamu udah cukup banget. Kalau mau kasih tanda kasih:",
  copy: "Salin",
  copied: "Tersalin!",
  sendGift: "Kirim kado",
  giftHint: "Chat kami buat alamatnya",
  rsvp: "Bisa Dateng?",
  rsvpText: "Balas kartu pos ini ya, biar tempatmu aman.",
  name: "Nama",
  attend: "Kehadiran",
  yes: "Dateng dong!",
  no: "Maaf, nggak bisa",
  message: "Ucapan & doa",
  send: "Kirim",
  thanksRsvp: "Terimakasih, kartu posmu udah sampai!",
  bye: "Sampai ketemu!",
  byeSmall: "Terimakasih udah jadi bagian cerita kami.",
  qrTitle: "QR Kehadiran",
  qrHint: "QR ini khusus buat kamu. Tunjukkan ke petugas saat check-in.",
  close: "Tutup",
};

/* ─── Data (susunan array sama) ─────────────────────────────────────────────── */
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

/* ─── Guest QR (payload unik per tamu → api.qrserver.com) ─── */
const guestCodeOf = (name) => btoa(unescape(encodeURIComponent(name))).slice(0, 10);
const buildQrPayload = ({ groom, bride, guestName, dateText }) =>
  `The Wedding Of ${groom} & ${bride}\nTamu: ${guestName}\nTanggal: ${dateText}\nKode: ${guestCodeOf(guestName)}`;
const buildQrUrl = (payload, color = "121212") =>
  `https://api.qrserver.com/v1/create-qr-code/?size=230x230&margin=8&color=${color}&bgcolor=ffffff&data=${encodeURIComponent(payload)}`;

/* ---------- helper tanggal ---------- */
const MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const MONTHS_EN = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const DAYS = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const pad2 = (n) => String(n).padStart(2, "0");

const eventDateISO = (text = "") => {
  const m = String(text).match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return "2025-06-21";
  const name = m[2].toLowerCase();
  let mi = MONTHS_EN.indexOf(name);
  if (mi < 0) mi = MONTHS.findIndex((x) => x.toLowerCase() === name);
  return mi < 0 ? "2025-06-21" : `${m[3]}-${pad2(mi + 1)}-${pad2(Number(m[1]))}`;
};
const eventTimeISO = (text = "") => {
  const m = String(text).match(/(\d{1,2})[.:](\d{2})/);
  return m ? `${pad2(Number(m[1]))}:${m[2]}:00` : "08:00:00";
};
const parseDate = (s) => {
  const [y, m, d] = String(s || "").split("-").map(Number);
  return { y, m, d };
};

/* ---------- hitung mundur ---------- */
function useCountdown(target) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (!(diff > 0)) return;
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

/* ---------- muncul saat di-scroll (sekali) ---------- */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setOn(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, on];
}
function Pop({ children, className = "", delay = 0, style }) {
  const [ref, on] = useInView();
  return (
    <div ref={ref} className={`iv-pop ${on ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ================== DOODLE (SVG) ================== */
const PINK_D = "#B04F72";   // dusty rose (utama)
const MAUVE = "#7E4560";    // mauve (pendamping, lebih gelap)
const ROSE = "#E59AAE";     // soft pink
const TAN = "#CDAE95";      // champagne
const dp = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

function HeartD({ size = 22, style, fill = "none" }) {
  return (
    <svg className="iv-d" width={size} height={size} viewBox="0 0 24 24" {...dp} fill={fill} style={style} aria-hidden="true">
      <path d="M12 21C4 15 2 10 4.5 6.8C7 4 10.5 5 12 8C13.5 5 17 4 19.5 6.8C22 10 20 15 12 21Z" />
    </svg>
  );
}
function Sparkle({ size = 22, style }) {
  return (
    <svg className="iv-d" width={size} height={size} viewBox="0 0 24 24" {...dp} style={style} aria-hidden="true">
      <path d="M12 1C12.6 7 17 11.4 23 12C17 12.6 12.6 17 12 23C11.4 17 7 12.6 1 12C7 11.4 11.4 7 12 1Z" />
    </svg>
  );
}
function SprigD({ size = 54, style }) {
  const leaves = [[100, 40], [78, 42], [56, 46], [34, 50], [14, 55]];
  return (
    <svg className="iv-d" width={size} height={size * 1.5} viewBox="0 0 80 120" style={style} aria-hidden="true">
      <path d="M40 118 C38 80 44 40 58 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {leaves.map(([y, x], i) => (
        <g key={i} fill="currentColor">
          <ellipse cx={x - 10} cy={y} rx="11" ry="4.5" transform={`rotate(-32 ${x - 10} ${y})`} />
          <ellipse cx={x + 10} cy={y - 8} rx="11" ry="4.5" transform={`rotate(32 ${x + 10} ${y - 8})`} />
        </g>
      ))}
    </svg>
  );
}
function ArrowD({ size = 54, style }) {
  return (
    <svg className="iv-d" width={size} height={size} viewBox="0 0 60 60" {...dp} style={style} aria-hidden="true">
      <path d="M12 8C34 6 46 20 40 40" />
      <path d="M30 36l10 8 6-12" />
    </svg>
  );
}
function Rings({ size = 72, style }) {
  return (
    <svg className="iv-d" width={size} height={size * 0.72} viewBox="0 0 56 40" {...dp} style={style} aria-hidden="true">
      <circle cx="19" cy="25" r="13" /><circle cx="19" cy="25" r="9.5" />
      <circle cx="37" cy="25" r="13" /><circle cx="37" cy="25" r="9.5" />
      <path d="M37 4.5l4 4-4 5-4-5z" /><path d="M8 6l2 3M3 12l3 1" />
    </svg>
  );
}
const coupeG = (
  <>
    <path d="M3 4h28c0 10-6 15-14 15S3 14 3 4z" />
    <path d="M17 19v14M9 36h16" />
    <path d="M17 25l-5-3v6zM17 25l5-3v6z" />
    <circle cx="11" cy="9" r="1.1" /><circle cx="19" cy="12" r="1.1" />
  </>
);
function Cheers({ size = 96, style }) {
  return (
    <svg className="iv-d" width={size} height={size * 0.62} viewBox="0 0 90 56" {...dp} style={style} aria-hidden="true">
      <g transform="translate(2 8) rotate(-14 17 20) scale(.95)">{coupeG}</g>
      <g transform="translate(52 6) rotate(14 17 20) scale(.95)">{coupeG}</g>
      <path d="M44 6l1 3M48 3l-1 4M40 3l2 3" />
    </svg>
  );
}
function Cake({ size = 74, style }) {
  return (
    <svg className="iv-d" width={size} height={size * 1.15} viewBox="0 0 70 80" {...dp} style={style} aria-hidden="true">
      <circle cx="35" cy="14" r="4" /><path d="M35 10c1-3 3-4 5-4" />
      <path d="M22 26h26v14H22zM14 40h42v16H14zM6 56h58v18H6z" />
      <path d="M22 26q3 5 6.5 0t6.5 0t6.5 0t6.5 0M14 40q3.5 5 7 0t7 0t7 0t7 0t7 0t7 0M6 56q4 5 8 0t8 0t8 0t8 0t8 0t8 0t8 0" />
      <path d="M2 76h66M35 76v4M18 80h34" />
    </svg>
  );
}
function Envelope({ size = 78, style }) {
  return (
    <svg className="iv-d" width={size} height={size * 0.72} viewBox="0 0 60 44" {...dp} style={style} aria-hidden="true">
      <rect x="4" y="8" width="52" height="32" rx="3" />
      <path d="M4 11l26 18 26-18" />
      <path d="M30 4c-2-3-6-1-5 2 1 2 5 4 5 4s4-2 5-4c1-3-3-5-5-2z" />
    </svg>
  );
}
function Note({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" />
    </svg>
  );
}
function QrIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14v.01M14 20h3M20 17v4" />
    </svg>
  );
}
const iconForAcara = (nama = "", i = 0) => {
  const n = nama.toLowerCase();
  if (/akad|nikah|ceremony|pemberkatan|ijab|janji|vow/.test(n)) return "rings";
  if (/resepsi|reception|pesta|party|toast/.test(n)) return "cheers";
  if (/makan|dinner|lunch|selesai|end|penutup/.test(n)) return "cake";
  return ["rings", "cheers", "cake"][i % 3];
};
function AcaraDoodle({ kind, style }) {
  if (kind === "rings") return <Rings size={62} style={style} />;
  if (kind === "cake") return <Cake size={48} style={style} />;
  return <Cheers size={70} style={style} />;
}

/* doodle berserakan: [{k, x, rx, y, by, s, r, c, f}] */
function Deco({ items }) {
  return (
    <div className="iv-deco" aria-hidden="true">
      {items.map((it, i) => {
        const st = { position: "absolute", left: it.x, right: it.rx, top: it.y, bottom: it.by, color: it.c || PINK_D, transform: `rotate(${it.r || 0}deg)` };
        if (it.k === "sprig") return <SprigD key={i} size={it.s || 46} style={st} />;
        if (it.k === "spark") return <Sparkle key={i} size={it.s || 20} style={st} />;
        return <HeartD key={i} size={it.s || 20} style={st} fill={it.f || "none"} />;
      })}
    </div>
  );
}

/* ---------- foto (bentuk: "", arch, round, heart) ---------- */
function Photo({ src, ratio = "4 / 5", alt = "", shape = "" }) {
  return (
    <div className={`iv-photo ${shape}`} style={{ aspectRatio: ratio }}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : <div className="iv-photo-empty" aria-hidden="true"><HeartD size={34} /></div>}
    </div>
  );
}

/* benang pink yang menjalar sepanjang halaman */
const threadPath = (n = 18) => {
  let d = "M50 0";
  const h = 100 / n;
  for (let i = 0; i < n; i++) {
    const y0 = i * h;
    const dir = i % 2 ? 1 : -1;
    d += ` C ${50 + dir * 20} ${y0 + h * 0.3}, ${50 - dir * 20} ${y0 + h * 0.7}, 50 ${y0 + h}`;
  }
  return d;
};
const THREAD_D = threadPath();

/* ================================================================== */
export default function Invitation({
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
  const { y: wy, m: wm, d: wd } = parseDate(tanggal);
  const weekday = DAYS[new Date(wy, wm - 1, wd).getDay()];
  const dateText = `${wd} ${MONTHS[wm - 1]} ${wy}`;
  const nameA = couple.groom.shortName;
  const nameB = couple.bride.shortName;

  const [guestName, setGuestName] = useState("Nama Tamu");
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
    if (document.getElementById("iv-fonts")) return;
    const l = document.createElement("link");
    l.id = "iv-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Marck+Script&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap";
    document.head.appendChild(l);
  }, []);

  /* alur: cover -> leaving -> open */
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
    }, 850);
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
  const [qrOpen, setQrOpen] = useState(false);
  useEffect(() => {
    if (!qrOpen) return;
    const onKey = (e) => e.key === "Escape" && setQrOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [qrOpen]);
  const qrUrl = buildQrUrl(buildQrPayload({ groom: nameA, bride: nameB, guestName, dateText }), "121212");

  /* hitung mundur */
  const countdown = useCountdown(target);
  const isPast = new Date(target) <= new Date();
  const cd = [
    [countdown.days, L.d],
    [countdown.hours, L.h],
    [countdown.minutes, L.m],
    [countdown.seconds, L.s],
  ];

  /* RSVP */
  const [rsvp, setRsvp] = useState({ name: "", message: "", attend: "hadir" });
  const [sent, setSent] = useState(false);
  const submitRsvp = async (e) => {
    e.preventDefault();
    try {
      await onRsvp?.({ ...rsvp, guestName });
    } catch (_) {}
    setSent(true);
  };

  /* salin */
  const [copied, setCopied] = useState("");
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(""), 1800);
    } catch (_) {}
  };

  const people = [couple.groom, couple.bride];

  return (
    <div className={`iv-root ${phase !== "open" ? "iv-locked" : ""}`}>
      <style>{css}</style>

      {/* defs: filter garis goyang + bentuk hati untuk foto */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="iv-wob" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
        </filter>
        <clipPath id="iv-heartclip" clipPathUnits="objectBoundingBox">
          <path transform="scale(0.01 0.011111)" d="M50 88 C20 66 2 48 2 28 C2 12 14 2 28 2 C38 2 46 8 50 16 C54 8 62 2 72 2 C86 2 98 12 98 28 C98 48 80 66 50 88Z" />
        </clipPath>
      </svg>

      {/* hiasan latar (desktop) */}
      <div className="iv-bgdecor" aria-hidden="true">
        <HeartD size={40} style={{ position: "absolute", left: "6%", top: "8%", color: "#fff4f7" }} />
        <HeartD size={26} style={{ position: "absolute", left: "11%", top: "16%", color: "#fff4f7" }} />
        <SprigD size={72} style={{ position: "absolute", left: "9%", top: "46%", color: "#fbe3da", transform: "rotate(18deg)" }} />
        <HeartD size={48} style={{ position: "absolute", right: "7%", top: "12%", color: "#fff4f7" }} />
        <SprigD size={84} style={{ position: "absolute", right: "8%", bottom: "9%", color: "#fbe3da", transform: "rotate(-14deg)" }} />
      </div>

      {/* ================= COVER ================= */}
      {phase !== "open" && (
        <div className={`iv-cover ${phase === "leaving" ? "leaving" : ""}`} role="dialog" aria-label="Sampul undangan">
          <Deco items={[
            { k: "sprig", x: "-6px", y: "4%", s: 54, r: 14, c: MAUVE },
            { k: "sprig", rx: "-6px", y: "10%", s: 46, r: -18, c: MAUVE },
            { k: "heart", x: "14%", y: "26%", s: 18, r: -10, c: ROSE },
            { k: "heart", rx: "12%", y: "40%", s: 24, r: 12, c: PINK_D, f: ROSE },
            { k: "spark", x: "8%", by: "30%", s: 20, c: MAUVE },
            { k: "heart", rx: "10%", by: "26%", s: 16, r: 8, c: PINK_D },
          ]} />
          <div className="iv-cover-in">
            <p className="iv-cover-top">The Wedding Of</p>
            <h1 className="iv-cover-names">
              <span className="a">{nameA}</span>
              <span className="amp">&amp;</span>
              <span className="b">{nameB}</span>
            </h1>

            <div className="iv-hangtag">
              <i className="iv-hangtag-string" />
              <div className="iv-hangtag-card">
                <small>{L.forYou}</small>
                <b>{guestName}</b>
              </div>
            </div>

            <button className="iv-seal" onClick={openInvite} aria-label="Buka undangan">
              <svg viewBox="0 0 100 90" aria-hidden="true">
                <path d="M50 88 C20 66 2 48 2 28 C2 12 14 2 28 2 C38 2 46 8 50 16 C54 8 62 2 72 2 C86 2 98 12 98 28 C98 48 80 66 50 88Z" fill={PINK_D} />
                <path d="M26 20c6-6 14-5 19 1" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <span>{L.seal}</span>
            </button>

            <button className="iv-qrbtn" onClick={() => setQrOpen(true)}>
              <QrIcon /> {L.qr}
            </button>
          </div>
        </div>
      )}

      <main className="iv-col">
        {/* benang pink */}
        <svg className="iv-thread" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={THREAD_D} fill="none" stroke={PINK_D} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.1 7" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="iv-flow">
          {/* ===== 1. HERO: foto berbentuk hati ===== */}
          <section className="iv-hero">
            <Deco items={[
              { k: "sprig", x: "-4px", y: "6px", s: 44, r: 10, c: MAUVE },
              { k: "spark", rx: "22px", y: "30px", s: 22, c: MAUVE },
              { k: "heart", rx: "10px", y: "190px", s: 20, r: 14, c: PINK_D },
            ]} />
            <p className="iv-kicker">{L.kicker}</p>
            <div className="iv-heroheart">
              <svg className="iv-heroheart-back" viewBox="0 0 100 90" aria-hidden="true">
                <path d="M50 88 C20 66 2 48 2 28 C2 12 14 2 28 2 C38 2 46 8 50 16 C54 8 62 2 72 2 C86 2 98 12 98 28 C98 48 80 66 50 88Z" fill={PINK_D} />
              </svg>
              <svg className="iv-heroheart-line" viewBox="0 0 100 90" aria-hidden="true">
                <path d="M50 88 C20 66 2 48 2 28 C2 12 14 2 28 2 C38 2 46 8 50 16 C54 8 62 2 72 2 C86 2 98 12 98 28 C98 48 80 66 50 88Z" fill="none" stroke={MAUVE} strokeWidth="1.4" strokeDasharray="3 3" />
              </svg>
              <div className="iv-heroheart-photo">
                <Photo src={coverPhoto} ratio="10 / 9" alt={`${nameA} & ${nameB}`} shape="heart" />
              </div>
            </div>
            <h1 className="iv-names">
              <span className="a">{nameA}</span>
              <span className="amp">&amp;</span>
              <span className="b">{nameB}</span>
            </h1>
            <p className="iv-lead">{L.lead}</p>
            <div className="iv-scroll">
              <span>{L.scroll}</span>
              <ArrowD size={44} style={{ color: MAUVE, transform: "rotate(95deg)" }} />
            </div>
          </section>

          {/* ===== 2. TANGGAL: sobekan kalender + koin hitung mundur ===== */}
          <section className="iv-cal">
            <Deco items={[
              { k: "heart", x: "6px", y: "20px", s: 22, r: -12, c: ROSE, f: ROSE },
              { k: "sprig", rx: "-2px", by: "40px", s: 40, r: -20, c: MAUVE },
            ]} />
            <h2 className="iv-h">{L.dayTitle}</h2>
            <Pop>
              <div className="iv-sheet">
                <span className="iv-tape" />
                <div className="iv-sheet-top">
                  <i /><i />
                  {MONTHS[wm - 1]} {wy}
                </div>
                <div className="iv-sheet-day">{wd}</div>
                <div className="iv-sheet-wd">{weekday}</div>
              </div>
            </Pop>

            <p className="iv-left">{L.left}</p>
            {isPast ? (
              <p className="iv-passed">{L.passed}</p>
            ) : (
              <div className="iv-coins">
                {cd.map(([n, lab], i) => (
                  <div key={lab} className={`iv-coin c${i}`}>
                    <b>{pad2(n)}</b>
                    <small>{lab}</small>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ===== 3. KENALAN: foto lengkung bertingkat ===== */}
          <section className="iv-meet">
            <Deco items={[
              { k: "spark", x: "10px", y: "40px", s: 20, c: MAUVE },
              { k: "heart", rx: "8px", by: "120px", s: 20, r: 10, c: PINK_D },
            ]} />
            <h2 className="iv-h">{L.meet}</h2>
            <div className="iv-meet-grid">
              {people.map((c, i) => (
                <Pop key={i} delay={i * 120} className={`iv-person p${i}`}>
                  <Photo src={c.photo} ratio="3 / 4.2" alt={c.name} shape="arch" />
                  <h3 style={{ color: i === 0 ? PINK_D : MAUVE }}>{c.name}</h3>
                  {c.parent && <p>{c.parent}</p>}
                  {c.instagram && (
                    <a className="iv-ig" href={`https://instagram.com/${c.instagram.replace("@", "")}`} target="_blank" rel="noreferrer">
                      @{c.instagram.replace("@", "")}
                    </a>
                  )}
                </Pop>
              ))}
            </div>
          </section>

          {/* ===== 4. TIKET: jadwal + lokasi jadi satu ===== */}
          {events.length > 0 && (
            <section className="iv-tix">
              <Deco items={[
                { k: "heart", rx: "14px", y: "6px", s: 24, r: 14, c: PINK_D, f: ROSE },
                { k: "sprig", x: "-8px", y: "40%", s: 44, r: 20, c: MAUVE },
              ]} />
              <h2 className="iv-h">{L.tickets}</h2>
              {events.map((e, i) => (
                <Pop key={e.id} delay={i * 100} className={`iv-ticket-wrap ${i % 2 ? "r" : "l"}`} style={{ "--rot": `${i % 2 ? 2.2 : -2.2}deg` }}>
                  <article className={`iv-ticket ${i % 2 ? "g" : ""}`}>
                    <div className="iv-ticket-body">
                      <div className="iv-ticket-photo">
                        <Photo src={e.photo} ratio="16 / 8.5" alt={e.title} />
                      </div>
                      <h3>{e.title}</h3>
                      <AcaraDoodle kind={iconForAcara(e.title, i)} style={{ color: "#fff", position: "absolute", right: 16, top: "calc(100% - 118px)", opacity: 0.9 }} />
                      <dl>
                        <div><dt>{L.date}</dt><dd>{e.date}</dd></div>
                        <div><dt>{L.time}</dt><dd>{e.time}</dd></div>
                      </dl>
                    </div>
                    <div className="iv-stub">
                      <div>
                        <small>{L.place}</small>
                        <b>{e.venue}</b>
                      </div>
                      {e.mapsUrl && <a className="iv-mini" href={e.mapsUrl} target="_blank" rel="noreferrer">{L.seeMap}</a>}
                    </div>
                  </article>
                </Pop>
              ))}
            </section>
          )}

          {/* ===== 5. CERITA: foto dijemur di benang ===== */}
          {loveStory.length > 0 && (
            <section className="iv-story">
              <Deco items={[
                { k: "sprig", rx: "-6px", y: "10px", s: 46, r: -16, c: MAUVE },
                { k: "heart", x: "10px", by: "60px", s: 18, r: -8, c: ROSE },
              ]} />
              <h2 className="iv-h">{L.story}</h2>
              {loveStory.map((k, i) => (
                <Pop key={k.track} className={`iv-hang ${i % 2 ? "r" : "l"}`}>
                  <div className="iv-hang-photo" style={{ transform: `rotate(${i % 2 ? 3 : -3}deg)` }}>
                    <span className="iv-pin" />
                    <Photo src={k.photo} ratio="4 / 3" alt={k.title} />
                  </div>
                  <div className="iv-hang-note" style={{ transform: `rotate(${i % 2 ? -2 : 2}deg)` }}>
                    <span className="iv-tape sm" />
                    <small>{L.part} {pad2(k.track)}</small>
                    <h3>{k.title}</h3>
                    <p>{k.text}</p>
                  </div>
                </Pop>
              ))}
            </section>
          )}

          {/* ===== 6. MOMEN: kolase beragam bentuk ===== */}
          {memories.length > 0 && (
            <section className="iv-moments">
              <h2 className="iv-h">{L.moments}</h2>
              <div className="iv-collage">
                {memories.map((m, i) => {
                  const shapes = ["", "round", "arch", "", "heart", "round"];
                  const ratios = ["4 / 3", "1 / 1", "3 / 4", "3 / 2", "10 / 9", "1 / 1"];
                  const k = i % 6;
                  return (
                    <Pop key={m.title + i} delay={(i % 3) * 80} className={`iv-m m${k}`}>
                      <figure style={{ transform: `rotate(${[-2.5, 3, 2, -1.5, -3, 2.5][k]}deg)` }}>
                        <Photo src={m.photo} ratio={ratios[k]} alt={m.title} shape={shapes[k]} />
                        <figcaption>{m.title}</figcaption>
                      </figure>
                    </Pop>
                  );
                })}
              </div>
            </section>
          )}

          {/* ===== 7. AMPLOP DIGITAL: kartu ATM bertumpuk ===== */}
          {(bankAccounts.length > 0 || giftPhone) && (
            <section className="iv-gift">
              <Deco items={[
                { k: "spark", rx: "30px", y: "40px", s: 20, c: MAUVE },
                { k: "heart", x: "6px", by: "40px", s: 22, r: -10, c: PINK_D, f: ROSE },
              ]} />
              <div className="iv-gift-head">
                <Envelope size={70} style={{ color: MAUVE, transform: "rotate(-8deg)" }} />
                <h2 className="iv-h">{L.envelope}</h2>
              </div>
              <p className="iv-gift-text">{L.giftText}</p>
              <div className="iv-cards">
                {bankAccounts.map((r, i) => (
                  <Pop key={r.bank} delay={i * 100}>
                    <div className={`iv-atm ${i % 2 ? "g" : "r"}`} style={{ transform: `rotate(${i % 2 ? 2.4 : -2.4}deg)` }}>
                      <div className="iv-atm-top">
                        <span className="iv-chipic" aria-hidden="true" />
                        <span className="iv-bank"><i style={{ background: r.color }} />{r.bank}</span>
                      </div>
                      <p className="iv-atm-no">{r.accountNumber}</p>
                      <div className="iv-atm-bot">
                        <span>{r.accountName}</span>
                        <button onClick={() => copy(r.accountNumber)}>{copied === r.accountNumber ? L.copied : L.copy}</button>
                      </div>
                    </div>
                  </Pop>
                ))}
              </div>
              {giftPhone && (
                <Pop className="iv-kado">
                  <p>{L.sendGift}</p>
                  <a href={`https://wa.me/${giftPhone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{giftPhone}</a>
                  <small>{L.giftHint}</small>
                </Pop>
              )}
            </section>
          )}

          {/* ===== 8. RSVP: kartu pos ===== */}
          <section className="iv-rsvp">
            <Deco items={[
              { k: "sprig", x: "-6px", y: "-10px", s: 40, r: 12, c: MAUVE },
              { k: "heart", rx: "16px", by: "-6px", s: 22, r: 10, c: PINK_D, f: ROSE },
            ]} />
            <Pop>
              <div className="iv-post">
                <div className="iv-stamp" aria-hidden="true">
                  <HeartD size={30} fill={ROSE} style={{ color: PINK_D }} />
                  <small>cinta</small>
                </div>
                <svg className="iv-postmark iv-d" width="86" height="56" viewBox="0 0 86 56" fill="none" stroke={MAUVE} strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <circle cx="26" cy="28" r="22" /><circle cx="26" cy="28" r="17" />
                  <path d="M46 18q6-4 12 0t12 0t12 0M46 28q6-4 12 0t12 0t12 0M46 38q6-4 12 0t12 0t12 0" />
                </svg>
                <h2 className="iv-h left">{L.rsvp}</h2>
                <p className="iv-post-text">{L.rsvpText}</p>
                {sent ? (
                  <p className="iv-sent">{L.thanksRsvp}</p>
                ) : (
                  <form onSubmit={submitRsvp} className="iv-form">
                    <label>
                      <span>{L.name}</span>
                      <input required value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} />
                    </label>
                    <div className="iv-choose" role="group" aria-label={L.attend}>
                      {[["hadir", L.yes], ["tidak", L.no]].map(([val, label], i) => (
                        <button
                          type="button"
                          key={val}
                          aria-pressed={rsvp.attend === val}
                          onClick={() => setRsvp({ ...rsvp, attend: val })}
                          style={{ transform: `rotate(${i ? 1.6 : -1.6}deg)` }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <label>
                      <span>{L.message}</span>
                      <textarea rows={3} value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} />
                    </label>
                    <button className="iv-send" type="submit">{L.send}</button>
                  </form>
                )}
              </div>
            </Pop>
          </section>

          {/* ===== 9. PENUTUP: hati bergantung ===== */}
          <section className="iv-end">
            <div className="iv-hangers" aria-hidden="true">
              {[38, 74, 52, 96, 60].map((h, i) => (
                <span key={i} style={{ height: h, left: `${10 + i * 20}%` }}>
                  <HeartD size={20} fill={i % 2 ? ROSE : PINK_D} style={{ color: i % 2 ? ROSE : PINK_D }} />
                </span>
              ))}
            </div>
            <p className="iv-bye">{L.bye}</p>
            <p className="iv-endnames">{nameA} <em>&amp;</em> {nameB}</p>
            <p className="iv-byesmall">{L.byeSmall}</p>
          </section>
        </div>
      </main>

      {/* ===== tombol melayang ===== */}
      {phase === "open" && (
        <>
          <button className="iv-fab" style={{ bottom: audioUrl ? 68 : 16 }} onClick={() => setQrOpen(true)} aria-label={L.qr}><QrIcon /></button>
          {audioUrl && (
            <button className={`iv-fab ${playing ? "on" : ""}`} style={{ bottom: 16 }} onClick={toggleMusic} aria-label={playing ? "Jeda musik" : "Putar musik"}>
              {playing ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4.5" height="16" /><rect x="13.5" y="4" width="4.5" height="16" /></svg>
              ) : <Note />}
            </button>
          )}
        </>
      )}
      {audioUrl && <audio ref={audioRef} src={audioUrl} loop preload="none" />}

      {/* ===== modal QR kehadiran ===== */}
      {qrOpen && (
        <div className="iv-modal" role="dialog" aria-modal="true" aria-label={L.qrTitle} onClick={() => setQrOpen(false)}>
          <div className="iv-modal-in" onClick={(e) => e.stopPropagation()}>
            <Sparkle size={24} style={{ color: MAUVE, position: "absolute", left: 18, top: 18 }} />
            <HeartD size={26} style={{ color: ROSE, position: "absolute", right: 18, top: 16 }} fill={ROSE} />
            <p className="iv-modal-top">{L.qrTitle}</p>
            <p className="iv-endnames" style={{ margin: "6px 0 0" }}>{nameA} <em>&amp;</em> {nameB}</p>
            <p className="iv-modal-guest">{guestName}</p>
            <div className="iv-qr">
              <img src={qrUrl} alt="QR Code Kehadiran" width={200} height={200} />
            </div>
            <p className="iv-modal-hint">{L.qrHint}</p>
            <button className="iv-send" onClick={() => setQrOpen(false)}>{L.close}</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
const css = `
.iv-root{
  --cream:#FCF4F1; --blush:#F7D9E0; --rose:#E59AAE; --pink-d:#B04F72; --mauve:#7E4560; --tan:#CDAE95; --ink:#3E2A33; --txt:#6B565E;
  --script:'Marck Script',cursive;
  font-family:'Nunito',system-ui,sans-serif; color:var(--txt); min-height:100vh;
  background:linear-gradient(180deg,#F4CCD7,#E9B1C2); -webkit-font-smoothing:antialiased; position:relative;
}
.iv-root *{box-sizing:border-box}
.iv-locked{height:100vh; overflow:hidden}
.iv-d{filter:url(#iv-wob); overflow:visible; flex:none}
.iv-bgdecor{display:none}
@media (min-width:700px){.iv-bgdecor{display:block; position:fixed; inset:0; pointer-events:none}}
.iv-col{position:relative; z-index:1; width:100%; max-width:440px; margin:0 auto; background:var(--cream); background-image:radial-gradient(rgba(176,79,114,.09) 1px, transparent 1px); background-size:18px 18px; overflow:hidden}
.iv-thread{position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none}
.iv-flow{position:relative; z-index:1}
.iv-flow section{position:relative}
.iv-deco{position:absolute; inset:0; pointer-events:none; z-index:0}
.iv-flow section>*:not(.iv-deco){position:relative; z-index:1}

/* ---- muncul ---- */
.iv-pop{opacity:0; transform:translateY(-26px) scale(.97); transition:opacity .6s ease, transform .6s cubic-bezier(.2,.9,.3,1.2)}
.iv-pop.in{opacity:1; transform:none}

/* ---- tipografi ---- */
.iv-h{font-family:var(--script); font-weight:400; font-size:46px; line-height:1; margin:0 0 18px; color:var(--pink-d); text-align:center; transform:rotate(-2deg); -webkit-text-stroke:6px var(--cream); paint-order:stroke fill}
.iv-h.left{text-align:left; transform:rotate(-1.5deg); -webkit-text-stroke:0; margin-bottom:6px}
.iv-names,.iv-cover-names{font-family:var(--script); font-weight:400; margin:0; line-height:.9; -webkit-text-stroke:8px var(--cream); paint-order:stroke fill}
.iv-names{font-size:78px; margin-top:-34px; padding:0 22px; position:relative; z-index:3}
.iv-names .a,.iv-cover-names .a{display:block; color:var(--pink-d); text-align:left; transform:rotate(-4deg)}
.iv-names .b,.iv-cover-names .b{display:block; color:var(--mauve); text-align:right; transform:rotate(3deg); margin-top:-4px}
.iv-names .amp,.iv-cover-names .amp{display:block; text-align:center; font-size:.46em; color:var(--rose); line-height:.7; margin:2px 0 0}
.iv-names .amp{margin-left:6px}

/* ---- cover ---- */
.iv-cover{position:fixed; inset:0; z-index:60; background:var(--cream); background-image:radial-gradient(rgba(176,79,114,.09) 1px, transparent 1px); background-size:18px 18px; display:flex; overflow-y:auto; transition:transform .85s cubic-bezier(.6,0,.9,.4), opacity .3s ease .55s}
.iv-cover.leaving{transform:translateY(-105%) rotate(-1.5deg); opacity:0}
.iv-cover-in{position:relative; z-index:1; margin:auto; width:100%; max-width:380px; padding:36px 26px 40px; display:flex; flex-direction:column; align-items:center; text-align:center}
.iv-cover-top{font-weight:800; font-size:12px; color:var(--mauve); margin:0 0 6px; letter-spacing:.04em}
.iv-cover-names{font-size:74px; width:100%}
.iv-hangtag{display:flex; flex-direction:column; align-items:center; margin-top:14px; transform:rotate(3deg); transform-origin:top center}
.iv-hangtag-string{display:block; width:2px; height:30px; background:var(--pink-d)}
.iv-hangtag-card{position:relative; background:#fff; border:2px solid var(--pink-d); border-radius:12px 12px 18px 18px; padding:20px 26px 12px; min-width:170px; max-width:280px; box-shadow:4px 5px 0 rgba(176,79,114,.2)}
.iv-hangtag-card::before{content:""; position:absolute; left:50%; top:6px; width:10px; height:10px; margin-left:-5px; border-radius:50%; border:2px solid var(--pink-d); background:var(--cream)}
.iv-hangtag-card small{display:block; font-family:var(--script); font-size:19px; color:var(--pink-d)}
.iv-hangtag-card b{display:block; font-family:var(--script); font-weight:400; font-size:32px; line-height:1.05; color:var(--mauve); overflow-wrap:anywhere}
.iv-seal{position:relative; margin-top:26px; width:122px; height:110px; border:0; background:none; cursor:pointer; padding:0; animation:iv-beat 2.2s ease-in-out infinite; filter:drop-shadow(4px 5px 0 rgba(176,79,114,.28))}
.iv-seal svg{position:absolute; inset:0; width:100%; height:100%}
.iv-seal span{position:relative; font-family:var(--script); font-size:34px; color:var(--cream); display:block; margin-top:-2px; transform:rotate(-6deg)}
.iv-seal:focus-visible,.iv-qrbtn:focus-visible,.iv-fab:focus-visible,.iv-mini:focus-visible,.iv-send:focus-visible,.iv-choose button:focus-visible,.iv-atm button:focus-visible,.iv-form input:focus-visible,.iv-form textarea:focus-visible,.iv-ig:focus-visible,.iv-kado a:focus-visible{outline:3px solid var(--rose); outline-offset:3px}
@keyframes iv-beat{0%,100%{transform:scale(1) rotate(-2deg)} 50%{transform:scale(1.07) rotate(2deg)}}
.iv-qrbtn{margin-top:22px; display:inline-flex; align-items:center; gap:8px; background:transparent; border:2px dashed var(--mauve); color:var(--mauve); border-radius:14px 20px 12px 22px / 20px 12px 22px 14px; padding:9px 18px; font:800 13px 'Nunito',sans-serif; cursor:pointer}

/* ---- hero ---- */
.iv-hero{padding:38px 0 30px; text-align:center}
.iv-kicker{font-family:var(--script); font-size:30px; color:var(--mauve); margin:0 0 4px; transform:rotate(-3deg)}
.iv-heroheart{position:relative; width:88%; margin:0 auto; aspect-ratio:10/9}
.iv-heroheart-back{position:absolute; left:3%; top:5%; width:100%; height:100%; transform:rotate(7deg); transform-origin:50% 60%}
.iv-heroheart-line{position:absolute; left:-3%; top:-2%; width:104%; height:104%; transform:rotate(-5deg)}
.iv-heroheart-photo{position:absolute; inset:0; z-index:2}
.iv-lead{font-size:13px; font-weight:700; color:var(--txt); margin:12px 0 0; padding:0 34px}
.iv-scroll{display:flex; flex-direction:column; align-items:center; margin-top:8px}
.iv-scroll span{font-family:var(--script); font-size:20px; color:var(--mauve)}

/* ---- kalender sobekan + koin ---- */
.iv-cal{padding:20px 26px 36px; text-align:center}
.iv-sheet{position:relative; width:200px; margin:6px auto 0; background:#fff; transform:rotate(-4deg); box-shadow:4px 6px 0 rgba(176,79,114,.2); padding-bottom:12px}
.iv-sheet::after{content:""; position:absolute; left:0; right:0; bottom:-9px; height:10px; background:linear-gradient(-135deg,#fff 5px,transparent 0) 0 5px, linear-gradient(135deg,#fff 5px,transparent 0) 0 5px; background-size:10px 10px; background-repeat:repeat-x}
.iv-sheet-top{position:relative; background:var(--pink-d); color:#fff; font-weight:800; font-size:13px; padding:9px 8px 7px; letter-spacing:.04em}
.iv-sheet-top i{position:absolute; top:5px; width:9px; height:9px; border-radius:50%; background:var(--cream); box-shadow:inset 0 1px 2px rgba(0,0,0,.35)}
.iv-sheet-top i:nth-child(1){left:22px}
.iv-sheet-top i:nth-child(2){right:22px}
.iv-sheet-top{padding-top:18px}
.iv-sheet-day{font-family:var(--script); font-size:104px; line-height:1; color:var(--pink-d); margin-top:2px}
.iv-sheet-wd{font-family:var(--script); font-size:28px; color:var(--mauve); margin-top:-6px}
.iv-tape{position:absolute; top:-12px; left:50%; width:70px; height:22px; margin-left:-35px; background:rgba(205,174,149,.6); transform:rotate(3deg); z-index:2}
.iv-tape.sm{width:54px; height:18px; margin-left:-27px; top:-10px; transform:rotate(-4deg)}
.iv-left{font-family:var(--script); font-size:30px; color:var(--mauve); margin:30px 0 8px; transform:rotate(-2deg)}
.iv-coins{display:flex; justify-content:center; align-items:flex-start; gap:10px}
.iv-coin{width:74px; height:74px; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; border:2px dashed var(--mauve); background:#fff; box-shadow:3px 4px 0 rgba(176,79,114,.2)}
.iv-coin b{font-weight:800; font-size:23px; line-height:1; color:var(--pink-d); font-variant-numeric:tabular-nums}
.iv-coin small{font-size:11px; font-weight:700; margin-top:2px}
.iv-coin.c0{transform:translateY(0) rotate(-6deg); background:var(--pink-d); border-color:var(--cream); color:#fff}
.iv-coin.c0 b{color:#fff}
.iv-coin.c1{transform:translateY(16px) rotate(4deg)}
.iv-coin.c2{transform:translateY(-4px) rotate(-3deg); background:var(--mauve); border-color:var(--cream); color:#fff}
.iv-coin.c2 b{color:#fff}
.iv-coin.c3{transform:translateY(12px) rotate(6deg); background:var(--blush)}
.iv-passed{font-family:var(--script); font-size:34px; color:var(--pink-d); margin:6px 0 0}

/* ---- kenalan ---- */
.iv-meet{padding:18px 20px 30px}
.iv-meet-grid{display:grid; grid-template-columns:1fr 1fr; gap:14px; align-items:start}
.iv-person{text-align:center}
.iv-person.p0{transform:rotate(-2deg)}
.iv-person.p0.in{transform:rotate(-2deg)}
.iv-person.p1{margin-top:56px}
.iv-person.p1.in{transform:rotate(2deg)}
.iv-person h3{font-family:var(--script); font-weight:400; font-size:25px; line-height:1.1; margin:14px 0 4px; -webkit-text-stroke:5px var(--cream); paint-order:stroke fill}
.iv-person p{font-size:10.5px; line-height:1.6; margin:0 0 6px; color:var(--txt)}
.iv-ig{display:inline-block; position:relative; background:var(--mauve); color:#fff; font-size:11px; font-weight:800; padding:4px 11px; border-radius:14px 14px 14px 3px; text-decoration:none}

/* ---- tiket ---- */
.iv-tix{padding:20px 22px 36px}
.iv-ticket-wrap{filter:drop-shadow(4px 5px 0 rgba(126,69,96,.3)); width:92%; margin:0 0 30px; transform:rotate(var(--rot))}
.iv-ticket-wrap.in{transform:rotate(var(--rot))}
.iv-ticket-wrap.l{margin-right:auto}
.iv-ticket-wrap.r{margin-left:auto}
.iv-ticket{color:#fff; background:var(--pink-d); border-radius:22px; display:flex; flex-direction:column;
  -webkit-mask:radial-gradient(circle 12px at 0 calc(100% - 78px), transparent 97%, #000) left/51% 100% no-repeat, radial-gradient(circle 12px at 100% calc(100% - 78px), transparent 97%, #000) right/51% 100% no-repeat;
  mask:radial-gradient(circle 12px at 0 calc(100% - 78px), transparent 97%, #000) left/51% 100% no-repeat, radial-gradient(circle 12px at 100% calc(100% - 78px), transparent 97%, #000) right/51% 100% no-repeat}
.iv-ticket.g{background:var(--mauve)}
.iv-ticket-body{position:relative; padding:16px 18px 14px}
.iv-ticket-photo .iv-photo{border-width:3px; box-shadow:none; border-radius:14px}
.iv-ticket h3{font-family:var(--script); font-weight:400; font-size:36px; line-height:1; margin:12px 0 6px}
.iv-ticket dl{margin:0; display:grid; gap:6px}
.iv-ticket dl div{display:flex; gap:10px; align-items:baseline}
.iv-ticket dt{font-family:var(--script); font-size:19px; opacity:.75; min-width:62px}
.iv-ticket dd{margin:0; font-weight:800; font-size:13.5px; line-height:1.3}
.iv-stub{height:78px; border-top:2px dashed rgba(255,255,255,.6); display:flex; align-items:center; justify-content:space-between; gap:10px; padding:0 18px}
.iv-stub small{display:block; font-family:var(--script); font-size:18px; opacity:.75; line-height:1}
.iv-stub b{display:block; font-size:12.5px; font-weight:800; line-height:1.25; overflow-wrap:anywhere}
.iv-mini{flex:none; background:var(--cream); color:var(--pink-d); font-weight:800; font-size:12px; padding:8px 13px; border-radius:12px 16px 10px 16px / 16px 10px 16px 12px; text-decoration:none}
.iv-ticket.g .iv-mini{color:var(--mauve)}

/* ---- cerita (jemuran) ---- */
.iv-story{padding:20px 22px 34px}
.iv-hang{margin:0 0 38px; display:flex; flex-direction:column}
.iv-hang.l{align-items:flex-start}
.iv-hang.r{align-items:flex-end}
.iv-hang-photo{position:relative; width:64%}
.iv-pin{position:absolute; top:-16px; left:50%; width:16px; height:30px; margin-left:-8px; background:var(--tan); border-radius:3px; z-index:3; box-shadow:1px 2px 0 rgba(0,0,0,.18)}
.iv-pin::after{content:""; position:absolute; left:0; right:0; top:11px; height:2px; background:rgba(0,0,0,.25)}
.iv-hang-note{position:relative; width:76%; margin-top:-26px; z-index:2; background:#FFF9F7; padding:20px 16px 14px; box-shadow:3px 4px 0 rgba(126,69,96,.2); background-image:repeating-linear-gradient(transparent 0 23px, rgba(176,79,114,.13) 23px 24px)}
.iv-hang.l .iv-hang-note{align-self:flex-end}
.iv-hang.r .iv-hang-note{align-self:flex-start}
.iv-hang-note small{display:inline-block; background:var(--mauve); color:#fff; font-weight:800; font-size:10.5px; padding:2px 10px; border-radius:999px; transform:rotate(-3deg)}
.iv-hang-note h3{font-family:var(--script); font-weight:400; font-size:30px; line-height:1.05; margin:6px 0 4px; color:var(--pink-d)}
.iv-hang-note p{font-size:11.5px; line-height:24px; margin:0; color:var(--txt)}

/* ---- kolase ---- */
.iv-moments{padding:20px 22px 34px}
.iv-collage{display:grid; grid-template-columns:repeat(6,1fr); gap:20px 12px; align-items:center}
.iv-m figure{position:relative; margin:0}
.iv-m figcaption{position:absolute; left:6px; bottom:-12px; max-width:88%; background:var(--cream); color:var(--pink-d); font-family:var(--script); font-size:15px; line-height:1.1; padding:2px 8px; border-radius:8px; transform:rotate(-3deg); box-shadow:1px 2px 0 rgba(176,79,114,.25)}
.iv-m.m0{grid-column:1/5}
.iv-m.m1{grid-column:5/7}
.iv-m.m2{grid-column:1/3}
.iv-m.m3{grid-column:3/7}
.iv-m.m4{grid-column:1/4}
.iv-m.m5{grid-column:4/7; margin-top:26px}
.iv-m.m1.in,.iv-m.m2.in{transform:none}

/* ---- foto umum ---- */
.iv-photo{width:100%; overflow:hidden; background:#F6DDE3; border:4px solid #fff; border-radius:20px 26px 18px 28px / 26px 18px 28px 20px; box-shadow:0 0 0 2px var(--pink-d), 5px 6px 0 2px rgba(176,79,114,.2)}
.iv-photo img{width:100%; height:100%; object-fit:cover; display:block}
.iv-photo-empty{width:100%; height:100%; display:grid; place-items:center; color:var(--rose)}
.iv-photo.arch{border-radius:999px 999px 22px 22px}
.iv-photo.round{border-radius:50%}
.iv-photo.heart{border:0; box-shadow:none; border-radius:0; background:#F6DDE3; clip-path:url(#iv-heartclip)}

/* ---- amplop digital ---- */
.iv-gift{padding:20px 26px 40px}
.iv-gift-head{display:flex; align-items:center; justify-content:center; gap:10px}
.iv-gift-head .iv-h{margin:0}
.iv-gift-text{font-size:12.5px; font-weight:600; text-align:center; margin:12px auto 22px; max-width:260px; line-height:1.6}
.iv-cards{display:flex; flex-direction:column}
.iv-cards .iv-pop + .iv-pop{margin-top:-34px}
.iv-atm{position:relative; aspect-ratio:1.62; border-radius:20px; padding:16px 20px 15px; color:#fff; display:flex; flex-direction:column; justify-content:space-between; box-shadow:5px 6px 0 rgba(62,42,51,.2); overflow:hidden; background-image:radial-gradient(circle at 88% 14%, rgba(255,255,255,.16) 0 44px, transparent 45px), radial-gradient(circle at 104% 62%, rgba(255,255,255,.1) 0 66px, transparent 67px)}
.iv-atm.r{background-color:var(--pink-d)}
.iv-atm.g{background-color:var(--mauve)}
.iv-atm-top{display:flex; align-items:center; justify-content:space-between}
.iv-chipic{width:38px; height:28px; border-radius:7px; background:linear-gradient(135deg,#ecd8bd,#c2a07a); position:relative}
.iv-chipic::after{content:""; position:absolute; inset:5px 9px; border:1.5px solid rgba(90,60,30,.4); border-radius:3px}
.iv-bank{display:inline-flex; align-items:center; gap:7px; font-weight:800; font-size:14px; letter-spacing:.1em}
.iv-bank i{width:9px; height:9px; border-radius:50%; display:inline-block; border:1.5px solid #fff}
.iv-atm-no{margin:0; font-weight:800; font-size:23px; letter-spacing:.14em; overflow-wrap:anywhere}
.iv-atm-bot{display:flex; align-items:flex-end; justify-content:space-between; gap:8px}
.iv-atm-bot span{font-size:12.5px; font-weight:700; line-height:1.2}
.iv-atm button{background:var(--cream); color:var(--ink); border:0; font:800 12px 'Nunito',sans-serif; padding:7px 13px; border-radius:999px; cursor:pointer; flex:none}
.iv-kado{margin-top:34px; text-align:center; background:#fff; border:2px dashed var(--mauve); border-radius:26px 30px 22px 32px / 30px 22px 32px 26px; padding:14px 18px 16px; transform:rotate(1.5deg)}
.iv-kado.in{transform:rotate(1.5deg)}
.iv-kado p{font-family:var(--script); font-size:28px; color:var(--pink-d); margin:0; line-height:1.1}
.iv-kado a{display:inline-block; margin:4px 0; font-weight:800; font-size:20px; letter-spacing:.04em; color:var(--ink); text-decoration:none; border-bottom:2px dotted var(--rose)}
.iv-kado small{display:block; font-size:11.5px; color:var(--txt)}

/* ---- rsvp: kartu pos ---- */
.iv-rsvp{padding:24px 22px 40px}
.iv-post{position:relative; background:#FFF9F7; padding:22px 18px 22px; border:9px solid transparent; border-image:repeating-linear-gradient(135deg,var(--pink-d) 0 14px,#fff 14px 26px,var(--rose) 26px 40px,#fff 40px 52px) 9; box-shadow:5px 7px 0 rgba(126,69,96,.22); transform:rotate(1.4deg)}
.iv-stamp{position:absolute; top:12px; right:12px; width:58px; height:70px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#fff; border:3px dotted var(--pink-d); transform:rotate(4deg)}
.iv-stamp small{font-family:var(--script); font-size:15px; color:var(--mauve)}
.iv-postmark{position:absolute; top:34px; right:40px; opacity:.8; transform:rotate(-8deg)}
.iv-post-text{font-size:12px; font-weight:600; margin:0 0 14px; max-width:200px; line-height:1.5}
.iv-form{display:grid; gap:14px}
.iv-form label{display:grid; gap:2px}
.iv-form label span{font-family:var(--script); font-size:21px; color:var(--mauve); line-height:1}
.iv-form input,.iv-form textarea{width:100%; background:transparent; border:0; border-bottom:2px dashed var(--pink-d); padding:6px 2px; font:700 15px 'Nunito',sans-serif; color:var(--ink); border-radius:0; resize:none}
.iv-form textarea{background-image:repeating-linear-gradient(transparent 0 27px, rgba(176,79,114,.25) 27px 28px); line-height:28px; border-bottom:0; padding-top:0}
.iv-choose{display:flex; gap:10px; flex-wrap:wrap}
.iv-choose button{border:2px solid var(--pink-d); background:transparent; color:var(--pink-d); font:800 13px 'Nunito',sans-serif; padding:8px 16px; border-radius:16px 22px 14px 24px / 22px 14px 24px 16px; cursor:pointer; transition:background .2s,color .2s}
.iv-choose button[aria-pressed="true"]{background:var(--pink-d); color:#fff}
.iv-send{justify-self:center; background:var(--mauve); color:#fff; border:0; font:800 14px 'Nunito',sans-serif; padding:11px 30px; border-radius:16px 24px 14px 26px / 24px 14px 26px 16px; cursor:pointer; box-shadow:3px 4px 0 var(--rose); transform:rotate(-1.5deg)}
.iv-sent{font-family:var(--script); font-size:28px; color:var(--mauve); margin:8px 0 0; line-height:1.15}

/* ---- penutup ---- */
.iv-end{padding:0 26px 60px; text-align:center}
.iv-hangers{position:relative; height:110px; margin:0 -26px 6px}
.iv-hangers span{position:absolute; top:0; width:1.5px; background:var(--pink-d)}
.iv-hangers span svg{position:absolute; bottom:-14px; left:-9.5px}
.iv-bye{font-family:var(--script); font-size:60px; line-height:1; color:var(--pink-d); margin:18px 0 6px; transform:rotate(-3deg); -webkit-text-stroke:7px var(--cream); paint-order:stroke fill}
.iv-endnames{font-family:var(--script); font-size:34px; color:var(--mauve); margin:0}
.iv-endnames em{font-style:normal; color:var(--rose)}
.iv-byesmall{font-size:12px; font-weight:600; margin:8px 0 0}

/* ---- tombol melayang ---- */
.iv-fab{position:fixed; right:16px; width:44px; height:44px; border-radius:50%; border:2px solid var(--mauve); background:var(--cream); color:var(--mauve); display:grid; place-items:center; cursor:pointer; z-index:30; box-shadow:3px 3px 0 var(--rose)}
.iv-fab.on{background:var(--pink-d); border-color:var(--pink-d); color:#fff}

/* ---- modal QR ---- */
.iv-modal{position:fixed; inset:0; z-index:80; background:rgba(60,25,40,.68); display:flex; overflow-y:auto; padding:20px; animation:iv-fade .25s ease both}
.iv-modal-in{position:relative; margin:auto; width:100%; max-width:330px; background:var(--cream); border:2px solid var(--pink-d); border-radius:26px 32px 24px 34px / 32px 24px 34px 26px; box-shadow:6px 6px 0 var(--rose); padding:30px 22px 24px; text-align:center; animation:iv-pop .3s cubic-bezier(.2,.8,.2,1) both}
.iv-modal-top{font-family:var(--script); font-size:26px; color:var(--pink-d); margin:0}
.iv-modal-guest{font-family:var(--script); font-size:30px; color:var(--mauve); margin:2px 0 0; overflow-wrap:anywhere; line-height:1.1}
.iv-modal-hint{font-size:11.5px; line-height:1.6; margin:6px 0 16px}
.iv-qr{display:flex; justify-content:center; margin:12px 0 4px}
.iv-qr img{background:#fff; padding:6px; border-radius:10px; border:2px solid var(--pink-d); display:block; transform:rotate(-2deg)}
@keyframes iv-fade{from{opacity:0} to{opacity:1}}
@keyframes iv-pop{from{opacity:0; transform:translateY(14px) scale(.97)} to{opacity:1; transform:none}}
@media (prefers-reduced-motion:reduce){
  .iv-seal{animation:none}
  .iv-cover{transition:opacity .3s ease}
  .iv-cover.leaving{transform:none}
  .iv-pop{transition:none; opacity:1; transform:none}
  .iv-modal,.iv-modal-in{animation:none}
}
`;