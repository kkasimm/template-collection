import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  DoodlePinkWedding.jsx — undangan doodle hand-drawn (krem, pink, biru)
 *
 *  Alur   : cover (Buka Undangan / QR Kehadiran) -> isi undangan
 *  Data   : susunan array (COUPLE, EVENTS, LOVE_STORY, MEMORIES, BANK_ACCOUNTS,
 *           GIFT_PHONE, COVER_PHOTO, AUDIO_URL) sama persis dengan Spotify.jsx.
 *           Semua konstanta juga bisa dikirim lewat props (couple, events, ...).
 *  Tanggal: otomatis dari EVENTS[0].date + EVENTS[0].time
 *           (strip tanggal, hitung mundur, dan QR ikut berubah).
 *  QR     : sama seperti Spotify.jsx — modal dari cover, QR unik per tamu
 *           lewat api.qrserver.com (tanpa library tambahan).
 *  Tamu   : nama dari ?to=Nama+Tamu (atau ?nama=)
 *  Ikon   : umum / netral (cincin, hati, kue, gelas, bunga), tidak merujuk agama.
 * ------------------------------------------------------------------ */

/* ---------- teks tampilan (teks tema, bukan data admin) ---------- */
const L = {
  guestHi: "Kepada Yth.",
  open: "Buka Undangan",
  qr: "QR Kehadiran",
  and: "dan",
  saveDate: "Save the date",
  dear: "Teman-teman tersayang!",
  opening: "Dengan penuh cinta, kami mengundang Anda untuk berbagi kebahagiaan di hari yang sangat penting bagi kami.",
  countdown: "Menuju hari bahagia",
  d: "Hari", h: "Jam", m: "Menit", s: "Detik",
  passed: "Hari bahagia telah tiba",
  place: "Tempat",
  placeText: "Acara akan dilaksanakan di",
  seeMap: "Lihat Lokasi",
  schedule: "Rangkaian Acara",
  couple: "Mempelai",
  story: "Kisah Kami",
  leg: "Perjalanan",
  memories: "Momen Kami",
  swipe: "Geser untuk melihat lainnya",
  gift: "Hadiah",
  giftText: "Doa restu Anda adalah hadiah terbaik. Namun jika ingin memberikan tanda kasih, kami dengan senang hati menerimanya dengan cara berikut.",
  account: "Nomor Rekening",
  copyNo: "Salin Nomor",
  copied: "Tersalin!",
  giftAddr: "Kirim kado",
  giftHint: "Silakan hubungi kami untuk alamat pengiriman:",
  rsvp: "Konfirmasi",
  rsvpText: "Mohon konfirmasi kehadiran Anda supaya kami bisa menyiapkan semuanya dengan baik.",
  name: "Nama",
  attend: "Kehadiran",
  yes: "Hadir",
  no: "Tidak dapat hadir",
  message: "Ucapan & Doa",
  send: "Kirim",
  thanksRsvp: "Terima kasih, konfirmasi Anda sudah kami terima!",
  thanks: "Sampai jumpa di hari bahagia kami!",
  qrTitle: "QR Kehadiran",
  qrHint: "Kode ini unik untuk Anda. Mohon tunjukkan QR ini kepada petugas saat check-in di lokasi acara.",
  close: "Tutup",
  music: "Musik",
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

/* ---------- helper tanggal ---------- */
const MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const MONTHS_EN = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const DAYS = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const pad2 = (n) => String(n).padStart(2, "0");
const upper = (s = "") => String(s).toUpperCase();

// "Sunday, 23 November 2028" / "Minggu, 23 November 2028" -> "2028-11-23"
const eventDateISO = (text = "") => {
  const m = String(text).match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return "2025-06-21";
  const name = m[2].toLowerCase();
  let mi = MONTHS_EN.indexOf(name);
  if (mi < 0) mi = MONTHS.findIndex((x) => x.toLowerCase() === name);
  return mi < 0 ? "2025-06-21" : `${m[3]}-${pad2(mi + 1)}-${pad2(Number(m[1]))}`;
};
// "08.00 – 12.00 WIB" -> "08:00:00"
const eventTimeISO = (text = "") => {
  const m = String(text).match(/(\d{1,2})[.:](\d{2})/);
  return m ? `${pad2(Number(m[1]))}:${m[2]}:00` : "08:00:00";
};
const parseDate = (s) => {
  const [y, m, d] = String(s || "").split("-").map(Number);
  return { y, m, d };
};
const fmtDot = (s) => {
  const { y, m, d } = parseDate(s);
  return `${pad2(d)}.${pad2(m)}.${y}`;
};
const fmtLong = (s) => {
  const { y, m, d } = parseDate(s);
  return `${DAYS[new Date(y, m - 1, d).getDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
};

/* ---------- hitung mundur (sama seperti useCountdown di Spotify.jsx) ---------- */
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

/* ================== ILUSTRASI DOODLE (SVG, netral) ================== */
const dp = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

function Sparkle({ size = 22, style }) {
  return (
    <svg className="tk3-d" width={size} height={size} viewBox="0 0 24 24" {...dp} style={style} aria-hidden="true">
      <path d="M12 1C12.6 7 17 11.4 23 12C17 12.6 12.6 17 12 23C11.4 17 7 12.6 1 12C7 11.4 11.4 7 12 1Z" />
    </svg>
  );
}
function HeartD({ size = 22, style, fill = "none" }) {
  return (
    <svg className="tk3-d" width={size} height={size} viewBox="0 0 24 24" {...dp} fill={fill} style={style} aria-hidden="true">
      <path d="M12 21C4 15 2 10 4.5 6.8C7 4 10.5 5 12 8C13.5 5 17 4 19.5 6.8C22 10 20 15 12 21Z" />
    </svg>
  );
}
function Rings({ size = 72, style }) {
  return (
    <svg className="tk3-d" width={size} height={size * 0.72} viewBox="0 0 56 40" {...dp} style={style} aria-hidden="true">
      <circle cx="19" cy="25" r="13" />
      <circle cx="19" cy="25" r="9.5" />
      <circle cx="37" cy="25" r="13" />
      <circle cx="37" cy="25" r="9.5" />
      <path d="M37 4.5l4 4-4 5-4-5z" />
      <path d="M8 6l2 3M3 12l3 1" />
    </svg>
  );
}
const coupeG = (
  <>
    <path d="M3 4h28c0 10-6 15-14 15S3 14 3 4z" />
    <path d="M17 19v14M9 36h16" />
    <path d="M17 25l-5-3v6zM17 25l5-3v6z" />
    <circle cx="11" cy="9" r="1.1" />
    <circle cx="19" cy="12" r="1.1" />
  </>
);
function Cheers({ size = 96, style }) {
  return (
    <svg className="tk3-d" width={size} height={size * 0.62} viewBox="0 0 90 56" {...dp} style={style} aria-hidden="true">
      <g transform="translate(2 8) rotate(-14 17 20) scale(.95)">{coupeG}</g>
      <g transform="translate(52 6) rotate(14 17 20) scale(.95)">{coupeG}</g>
      <path d="M44 6l1 3M48 3l-1 4M40 3l2 3" />
    </svg>
  );
}
function Cake({ size = 74, style }) {
  return (
    <svg className="tk3-d" width={size} height={size * 1.15} viewBox="0 0 70 80" {...dp} style={style} aria-hidden="true">
      <circle cx="35" cy="14" r="4" />
      <path d="M35 10c1-3 3-4 5-4" />
      <path d="M22 26h26v14H22zM14 40h42v16H14zM6 56h58v18H6z" />
      <path d="M22 26q3 5 6.5 0t6.5 0t6.5 0t6.5 0M14 40q3.5 5 7 0t7 0t7 0t7 0t7 0t7 0M6 56q4 5 8 0t8 0t8 0t8 0t8 0t8 0t8 0" />
      <path d="M2 76h66M35 76v4M18 80h34" />
      <circle cx="24" cy="48" r="1" /><circle cx="46" cy="48" r="1" /><circle cx="18" cy="65" r="1" /><circle cx="52" cy="65" r="1" />
    </svg>
  );
}
function LoveLetter({ size = 84, style }) {
  return (
    <svg className="tk3-d" width={size} height={size * 0.72} viewBox="0 0 60 44" {...dp} style={style} aria-hidden="true">
      <rect x="4" y="8" width="52" height="32" rx="3" />
      <path d="M4 11l26 18 26-18" />
      <path d="M30 4c-2-3-6-1-5 2 1 2 5 4 5 4s4-2 5-4c1-3-3-5-5-2z" />
    </svg>
  );
}
function Flower({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="3" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={cx + 6.2 * Math.cos((a * Math.PI) / 180)} cy={cy + 6.2 * Math.sin((a * Math.PI) / 180)} r="4.1" />
      ))}
    </g>
  );
}
function Bouquet({ size = 110, style }) {
  return (
    <svg className="tk3-d" width={size} height={size * 1.25} viewBox="0 0 90 112" {...dp} style={style} aria-hidden="true">
      <path d="M22 32Q30 60 45 82M45 24Q45 55 45 82M68 34Q60 60 45 82M33 50Q38 66 45 82M57 50Q52 66 45 82" />
      <Flower cx={22} cy={22} />
      <Flower cx={46} cy={14} />
      <Flower cx={69} cy={24} />
      <Flower cx={32} cy={42} />
      <Flower cx={58} cy={42} />
      <path d="M45 86l-13-6v13zM45 86l13-6v13z" />
      <path d="M45 88l-6 20M45 88l6 20" />
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
  if (kind === "rings") return <Rings style={style} />;
  if (kind === "cake") return <Cake size={64} style={style} />;
  return <Cheers size={84} style={style} />;
}

/* ---------- foto ---------- */
function Photo({ src, ratio = "4 / 5", alt = "" }) {
  return (
    <div className="tk3-photo" style={{ aspectRatio: ratio }}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="tk3-photo-empty" aria-hidden="true"><HeartD size={34} /></div>
      )}
    </div>
  );
}

/* foto utama dengan hati oranye di belakang + stiker tanggal (hero & cover) */
function HeroFrame({ src, alt, dateDot, small = false }) {
  return (
    <div className={`tk3-hf ${small ? "sm" : ""}`}>
      <svg className="tk3-hf-heart" viewBox="0 0 320 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d="M158 286C40 204 14 118 64 74c36-30 76-8 94 24 18-32 58-54 94-24 50 44 24 130-94 212z" fill="#f26b21" />
        <path d="M232 70c34-14 66 4 70 40 4 40-30 88-86 128 22-30 34-60 34-86 0-34-8-60-18-82z" fill="#f89a5c" opacity=".55" />
      </svg>
      <div className="tk3-hf-photo"><Photo src={src} ratio="4 / 4.6" alt={alt} /></div>
      <div className="tk3-sticker">
        <small>{L.saveDate}</small>
        <b>{dateDot}</b>
      </div>
      <Sparkle size={26} style={{ color: "#3447d6", position: "absolute", left: "4%", top: "6%" }} />
      <Sparkle size={16} style={{ color: "#3447d6", position: "absolute", left: "13%", top: "16%" }} />
      <HeartD size={26} style={{ color: "#ff8fb0", position: "absolute", right: "6%", top: "4%" }} />
      <Sparkle size={20} style={{ color: "#3447d6", position: "absolute", right: "3%", bottom: "30%" }} />
    </div>
  );
}

/* ================================================================== */
export default function DoodlePinkWedding({
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
  const dateDot = fmtDot(tanggal);
  const dateText = `${wd} ${MONTHS[wm - 1]} ${wy}`;
  const nameA = couple.groom.shortName; // nama pria dulu (sama seperti Spotify.jsx)
  const nameB = couple.bride.shortName;
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
    if (document.getElementById("tk3-fonts")) return;
    const l = document.createElement("link");
    l.id = "tk3-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap";
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
    }, 950);
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

  /* QR kehadiran (sama seperti QRModal di Spotify.jsx) */
  const [qrOpen, setQrOpen] = useState(false);
  useEffect(() => {
    if (!qrOpen) return;
    const onKey = (e) => e.key === "Escape" && setQrOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [qrOpen]);
  const qrUrl = buildQrUrl(buildQrPayload({ groom: nameA, bride: nameB, guestName, dateText }), "1c1f6b");

  /* hitung mundur */
  const countdown = useCountdown(target);
  const isPast = new Date(target) <= new Date();
  const cd = [
    [countdown.days, L.d],
    [countdown.hours, L.h],
    [countdown.minutes, L.m],
    [countdown.seconds, L.s],
  ];

  /* strip tanggal: H-1 sampai H+5, tanggal acara dilingkari hati */
  const week = useMemo(
    () => Array.from({ length: 7 }, (_, i) => ({ n: new Date(wy, wm - 1, wd - 1 + i).getDate(), on: i === 1 })),
    [wy, wm, wd]
  );

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

  const palette = ["#3447d6", "#ee6a1d", "#3447d6", "#f5a623", "#ee6a1d"];
  const people = [couple.groom, couple.bride];

  return (
    <div className={`tk3-root ${phase !== "open" ? "tk3-locked" : ""}`}>
      <style>{css}</style>
      {/* filter garis goyang ala gambar tangan */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="tk3-wob" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
        </filter>
      </svg>

      {/* hiasan latar (desktop) */}
      <div className="tk3-bgdecor" aria-hidden="true">
        <HeartD size={34} style={{ position: "absolute", left: "5%", top: "6%", color: "#ff8fb0" }} />
        <HeartD size={26} style={{ position: "absolute", left: "9%", top: "13%", color: "#ff8fb0" }} />
        <HeartD size={46} style={{ position: "absolute", right: "6%", top: "9%", color: "#ff8fb0" }} />
        <HeartD size={30} style={{ position: "absolute", right: "10%", top: "17%", color: "#ff8fb0" }} />
        <HeartD size={40} style={{ position: "absolute", left: "6%", bottom: "14%", color: "#ff8fb0" }} />
        <HeartD size={28} style={{ position: "absolute", left: "11%", bottom: "7%", color: "#ff8fb0" }} />
        <Bouquet size={150} style={{ position: "absolute", right: "6%", bottom: "4%", color: "#ff8fb0" }} />
      </div>

      {/* ================= COVER ================= */}
      {phase !== "open" && (
        <div className={`tk3-cover ${phase === "leaving" ? "leaving" : ""}`} role="dialog" aria-label="Sampul undangan">
          <HeartD size={36} style={{ position: "absolute", left: "8%", top: "6%", color: "#ff8fb0" }} />
          <HeartD size={26} style={{ position: "absolute", left: "16%", top: "13%", color: "#ff8fb0" }} />
          <HeartD size={44} style={{ position: "absolute", right: "9%", top: "9%", color: "#ff8fb0" }} />
          <HeartD size={30} style={{ position: "absolute", right: "7%", bottom: "9%", color: "#ff8fb0" }} />
          <HeartD size={34} style={{ position: "absolute", left: "7%", bottom: "8%", color: "#ff8fb0" }} />
          <div className="tk3-card">
            <p className="tk3-small">{L.guestHi}</p>
            <p className="tk3-guest">{guestName}</p>
            <h1 className="tk3-names tk3-names-sm">
              <span className="a">{upper(nameA)}</span> <em>{L.and}</em> <span className="b">{upper(nameB)}</span>
            </h1>
            <HeroFrame src={coverPhoto} alt={`${nameA} & ${nameB}`} dateDot={dateDot} small />
            <div className="tk3-cover-btns">
              <button className="tk3-btn solid" onClick={openInvite}>{L.open}</button>
              <button className="tk3-btn" onClick={() => setQrOpen(true)}><QrIcon /> {L.qr}</button>
            </div>
            <div className="tk3-edge" />
          </div>
        </div>
      )}

      <main className="tk3-col">
        {/* ===== 1. HERO ===== */}
        <section className="tk3-hero">
          <h1 className="tk3-names">
            <span className="a">{upper(nameA)}</span>
            <em>{L.and}</em>
            <span className="b">{upper(nameB)}</span>
          </h1>
          <HeroFrame src={coverPhoto} alt={`${nameA} & ${nameB}`} dateDot={dateDot} />
        </section>

        {/* ===== 2. SAPAAN ===== */}
        <section className="tk3-open">
          <LoveLetter size={88} style={{ color: "#3447d6", position: "absolute", right: 22, top: 6 }} />
          <p className="tk3-small left"><b>{L.dear}</b><br />{L.opening}</p>
        </section>

        {/* ===== 3. BULAN + STRIP TANGGAL + HITUNG MUNDUR ===== */}
        <section className="tk3-month">
          <h2 className="tk3-h big">{MONTHS[wm - 1]}</h2>
          <div className="tk3-week">
            {week.map((w, i) => (
              <span key={i} className={w.on ? "on" : ""}>
                {w.on && <HeartD size={44} style={{ color: "#3447d6", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-52%)" }} />}
                <b>{w.n}</b>
              </span>
            ))}
          </div>
          <p className="tk3-small left" style={{ marginTop: 8 }}>{fmtLong(tanggal)}</p>

          <p className="tk3-chip" style={{ marginTop: 18 }}>{L.countdown}</p>
          {isPast ? (
            <p className="tk3-passed">{L.passed}</p>
          ) : (
            <div className="tk3-cd">
              {cd.map(([n, lab]) => (
                <div key={lab}>
                  <b>{pad2(n)}</b>
                  <small>{lab}</small>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ===== 4. TEMPAT — foto kiri/kanan bergantian ===== */}
        {venues.map((v, i) => (
          <section key={v.venue} className={`tk3-place ${i % 2 ? "rev" : ""}`}>
            {v.photo && (
              <div className="tk3-place-photo">
                <Photo src={v.photo} ratio="3 / 4" alt={v.venue} />
              </div>
            )}
            <div className="tk3-place-t">
              <h2 className="tk3-h">{L.place}</h2>
              <p className="tk3-small left">
                {L.placeText} <b>{v.venue}</b>
              </p>
              {v.mapsUrl && <a className="tk3-btn sm" href={v.mapsUrl} target="_blank" rel="noreferrer">{L.seeMap}</a>}
            </div>
          </section>
        ))}

        {/* ===== 5. RANGKAIAN ACARA ===== */}
        {events.length > 0 && (
          <section className="tk3-sched">
            <h2 className="tk3-h mid">{L.schedule}</h2>
            <ol>
              {events.map((e, i) => (
                <li key={e.id} className={i % 2 === 0 ? "l" : "r"}>
                  <div className="tk3-st">
                    <time style={{ color: palette[i % palette.length] }}>{e.time}</time>
                    <h3 style={{ color: palette[(i + 1) % palette.length] }}>{e.title}</h3>
                    {e.date && <p>{e.date}</p>}
                  </div>
                  <AcaraDoodle kind={iconForAcara(e.title, i)} style={{ color: "#3447d6" }} />
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ===== 6. MEMPELAI — dua foto saling menumpuk ===== */}
        <section className="tk3-sec">
          <h2 className="tk3-h mid">{L.couple}</h2>
          <div className="tk3-duo">
            {people.map((c, i) => (
              <div key={i} className={`tk3-duo-pic p${i}`}>
                <Photo src={c.photo} ratio="3 / 4" alt={c.name} />
              </div>
            ))}
            <span className="tk3-duo-heart"><HeartD size={46} fill="#ff8fb0" style={{ color: "#3447d6" }} /></span>
          </div>
          {people.map((c, i) => (
            <div key={i} className="tk3-person">
              <h3 style={{ color: i === 0 ? "#3447d6" : "#ee6a1d" }}>{c.name}</h3>
              {c.parent && <p className="tk3-small">{c.parent}</p>}
              {c.instagram && (
                <a className="tk3-ig" href={`https://instagram.com/${c.instagram.replace("@", "")}`} target="_blank" rel="noreferrer">
                  @{c.instagram.replace("@", "")}
                </a>
              )}
            </div>
          ))}
        </section>

        {/* ===== 7. KISAH CINTA — foto miring, label menimpa tepi foto ===== */}
        {loveStory.length > 0 && (
          <section className="tk3-sec">
            <h2 className="tk3-h mid">{L.story}</h2>
            {loveStory.map((k, i) => (
              <article key={k.track} className="tk3-leg">
                {i > 0 && <div className="tk3-dots"><HeartD size={20} style={{ color: "#ff8fb0" }} /></div>}
                {k.photo && (
                  <div className={`tk3-leg-photo ${i % 2 ? "b" : "a"}`}>
                    <Photo src={k.photo} ratio="4 / 3" alt={k.title} />
                    <span className="tk3-tag">{L.leg} {pad2(k.track)}</span>
                  </div>
                )}
                <h3 style={{ color: palette[i % palette.length] }}>{k.title}</h3>
                <p className="tk3-small">{k.text}</p>
              </article>
            ))}
          </section>
        )}

        {/* ===== 8. MEMORI — carousel geser samping ===== */}
        {memories.length > 0 && (
          <section className="tk3-sec tk3-mem">
            <h2 className="tk3-h mid">{L.memories}</h2>
            <div className="tk3-strip" tabIndex={0} aria-label={L.memories}>
              {memories.map((m, i) => (
                <figure key={m.title} style={{ transform: `rotate(${[-1.8, 1.4, -1, 1.8, -1.4][i % 5]}deg)` }}>
                  <Photo src={m.photo} ratio="4 / 5" alt={m.title} />
                  <figcaption>{m.title}</figcaption>
                </figure>
              ))}
            </div>
            <p className="tk3-small tk3-hint">{L.swipe}</p>
          </section>
        )}

        {/* ===== 9. HADIAH ===== */}
        {(bankAccounts.length > 0 || giftPhone) && (
          <section className="tk3-sec tk3-gift">
            <h2 className="tk3-h mid">{L.gift}</h2>
            <div className="tk3-gift-top">
              <p className="tk3-small left">{L.giftText}</p>
              <div className="tk3-gift-art"><Bouquet size={64} style={{ color: "#3447d6" }} /></div>
            </div>
            {bankAccounts.map((r) => (
              <div key={r.bank} className="tk3-acct">
                <span className="tk3-chip"><i className="tk3-dot" style={{ background: r.color }} />{L.account} · {upper(r.bank)}</span>
                <p className="tk3-acc">{r.accountNumber}</p>
                <p className="tk3-small">a.n. {r.accountName}</p>
                <button className="tk3-btn sm" onClick={() => copy(r.accountNumber)}>{copied === r.accountNumber ? L.copied : L.copyNo}</button>
              </div>
            ))}
            {giftPhone && (
              <div className="tk3-acct">
                <span className="tk3-chip">{L.giftAddr}</span>
                <p className="tk3-small" style={{ marginTop: 4 }}>{L.giftHint}</p>
                <a className="tk3-acc sm tk3-phone" href={`https://wa.me/${giftPhone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{giftPhone}</a>
              </div>
            )}
            <div className="tk3-gift-deco">
              <Rings size={74} style={{ color: "#3447d6" }} />
              <HeartD size={22} style={{ color: "#3447d6" }} />
              <HeartD size={30} style={{ color: "#3447d6" }} />
            </div>
          </section>
        )}

        {/* ===== 10. RSVP ===== */}
        <section className="tk3-sec">
          <h2 className="tk3-h mid">{L.rsvp}</h2>
          <p className="tk3-small">{L.rsvpText}</p>
          {sent ? (
            <p className="tk3-sent">{L.thanksRsvp}</p>
          ) : (
            <form className="tk3-form" onSubmit={submitRsvp}>
              <label>
                <span>{L.name}</span>
                <input required value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} />
              </label>
              <label>
                <span>{L.attend}</span>
                <select value={rsvp.attend} onChange={(e) => setRsvp({ ...rsvp, attend: e.target.value })}>
                  <option value="hadir">{L.yes}</option>
                  <option value="tidak">{L.no}</option>
                </select>
              </label>
              <label>
                <span>{L.message}</span>
                <textarea rows={3} value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} />
              </label>
              <button className="tk3-btn solid" type="submit">{L.send}</button>
            </form>
          )}
        </section>

        {/* ===== penutup ===== */}
        <section className="tk3-end">
          <Sparkle size={26} style={{ color: "#3447d6" }} />
          <p className="tk3-thanks">{L.thanks}</p>
          <p className="tk3-endnames">{nameA} <em>&amp;</em> {nameB}</p>
        </section>
        <div className="tk3-edge" />
      </main>

      {/* ===== tombol melayang ===== */}
      {phase === "open" && (
        <>
          <button className="tk3-fab" style={{ bottom: audioUrl ? 68 : 16 }} onClick={() => setQrOpen(true)} aria-label={L.qr}><QrIcon /></button>
          {audioUrl && (
            <button className={`tk3-fab ${playing ? "on" : ""}`} style={{ bottom: 16 }} onClick={toggleMusic} aria-label={playing ? "Jeda musik" : "Putar musik"}>
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
        <div className="tk3-modal" role="dialog" aria-modal="true" aria-label={L.qrTitle} onClick={() => setQrOpen(false)}>
          <div className="tk3-modal-in" onClick={(e) => e.stopPropagation()}>
            <Sparkle size={24} style={{ color: "#3447d6", position: "absolute", left: 18, top: 18 }} />
            <HeartD size={26} style={{ color: "#ff8fb0", position: "absolute", right: 18, top: 16 }} />
            <p className="tk3-chip" style={{ marginTop: 6 }}>{L.qrTitle}</p>
            <p className="tk3-endnames" style={{ margin: "10px 0 2px" }}>{nameA} <em>&amp;</em> {nameB}</p>
            <p className="tk3-guest" style={{ margin: "2px 0 0" }}>{guestName}</p>
            <div className="tk3-qr">
              <img src={qrUrl} alt="QR Code Kehadiran" width={200} height={200} />
            </div>
            <p className="tk3-small" style={{ margin: "6px 0 16px" }}>{L.qrHint}</p>
            <button className="tk3-btn solid" onClick={() => setQrOpen(false)}>{L.close}</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
const css = `
.tk3-root{
  --cream:#fdfaea; --pink:#ffc7d3; --pink-d:#ff8fb0; --orange:#ee6a1d; --red:#d8431c;
  --yellow:#f5a623; --blue:#3447d6; --navy:#1c1f6b; --txt:#5c524d;
  font-family:'Nunito',system-ui,sans-serif; color:var(--txt); min-height:100vh;
  background:var(--pink); -webkit-font-smoothing:antialiased; position:relative;
}
.tk3-root *{box-sizing:border-box}
.tk3-locked{height:100vh; overflow:hidden}
.tk3-d{filter:url(#tk3-wob); overflow:visible; flex:none}
.tk3-bgdecor{display:none}
@media (min-width:700px){.tk3-bgdecor{display:block; position:fixed; inset:0; pointer-events:none}}
.tk3-col{position:relative; z-index:1; width:100%; max-width:430px; margin:0 auto; background:var(--cream); overflow:hidden}

/* ---- tipografi ---- */
.tk3-h{font-family:'Baloo 2',sans-serif; font-weight:800; font-size:30px; line-height:1.1; margin:0 0 10px; color:var(--red); letter-spacing:.01em}
.tk3-h.big{font-size:46px; margin:0 0 14px}
.tk3-h.mid{text-align:center; font-size:34px; margin-bottom:22px}
.tk3-small{font-size:11.5px; line-height:1.75; margin:0 0 6px; text-align:center; color:var(--txt)}
.tk3-small.left{text-align:left}
.tk3-small b{color:var(--navy)}
.tk3-names{font-family:'Baloo 2',sans-serif; font-weight:800; font-size:38px; line-height:1.02; margin:0; text-align:left}
.tk3-names .a{color:#f59a1b}
.tk3-names .b{color:#f6b02a}
.tk3-names em{font-style:normal; color:var(--blue); font-size:26px; margin:0 8px}
.tk3-names-sm{font-size:28px; text-align:center}
.tk3-names-sm em{font-size:20px; margin:0 6px}
.tk3-guest{font-family:'Baloo 2',sans-serif; font-weight:700; font-size:22px; color:var(--blue); margin:0 0 10px; text-align:center; overflow-wrap:anywhere}
.tk3-chip{display:inline-flex; align-items:center; gap:7px; background:var(--pink); color:var(--navy); font-family:'Baloo 2',sans-serif; font-weight:700; font-size:11px; letter-spacing:.08em; padding:3px 12px; border-radius:999px; text-transform:uppercase; margin:12px 0 4px}
.tk3-dot{width:8px; height:8px; border-radius:50%; display:inline-block}

/* ---- tombol ---- */
.tk3-btn{display:inline-flex; align-items:center; justify-content:center; gap:8px; border:2px solid var(--blue); background:var(--cream); color:var(--blue); border-radius:14px; padding:10px 22px; font:700 14px 'Baloo 2',sans-serif; letter-spacing:.03em; cursor:pointer; box-shadow:3px 3px 0 var(--pink-d); transition:transform .15s, box-shadow .15s; text-decoration:none}
.tk3-btn:hover{transform:translate(1px,1px); box-shadow:2px 2px 0 var(--pink-d)}
.tk3-btn.solid{background:var(--blue); color:#fff}
.tk3-btn.sm{padding:6px 14px; font-size:12.5px; margin-top:8px}
.tk3-btn:focus-visible,.tk3-fab:focus-visible,.tk3-form input:focus-visible,.tk3-form select:focus-visible,.tk3-form textarea:focus-visible,.tk3-strip:focus-visible,.tk3-ig:focus-visible{outline:3px solid var(--pink-d); outline-offset:2px}

/* ---- cover ---- */
.tk3-cover{position:fixed; inset:0; z-index:60; background:var(--pink); display:flex; overflow-y:auto; padding:22px 18px; transition:opacity .45s ease .5s}
.tk3-cover.leaving{opacity:0}
.tk3-card{position:relative; margin:auto; width:100%; max-width:340px; background:var(--cream); padding:28px 22px 40px; text-align:center; box-shadow:0 10px 30px rgba(180,60,100,.25); animation:tk3-in .6s cubic-bezier(.2,.8,.2,1) both}
.tk3-cover.leaving .tk3-card{animation:tk3-fly .95s cubic-bezier(.5,0,.8,.4) forwards}
.tk3-card .tk3-small{margin:0}
.tk3-cover-btns{display:flex; flex-direction:column; gap:12px; align-items:center; margin-top:10px}
.tk3-cover-btns .tk3-btn{width:210px}
@keyframes tk3-in{from{opacity:0; transform:translateY(24px) rotate(-1.5deg)} to{opacity:1; transform:none}}
@keyframes tk3-fly{0%{transform:none} 22%{transform:translateY(10px) rotate(-2deg)} 100%{transform:translateY(-130vh) rotate(5deg)}}

/* ---- pinggiran bergelombang ---- */
.tk3-edge{position:absolute; left:0; right:0; bottom:0; height:12px; background:radial-gradient(circle at 7px 100%, var(--pink) 6px, transparent 6.6px) 0 0/14px 12px repeat-x}
.tk3-col .tk3-edge{position:relative; display:block; margin-top:-1px}

/* ---- hero: foto + hati + stiker ---- */
.tk3-hero{padding:34px 26px 4px}
.tk3-hf{position:relative; margin:6px -6px 0; padding:26px 0 22px}
.tk3-hf.sm{margin:8px 0 8px; padding:20px 0 16px}
.tk3-hf-heart{position:absolute; left:2%; right:2%; top:4%; width:96%; height:94%}
.tk3-hf-photo{position:relative; width:64%; margin:0 auto; transform:rotate(-3deg)}
.tk3-hf.sm .tk3-hf-photo{width:58%}
.tk3-hf-photo .tk3-photo{border-color:var(--navy); box-shadow:5px 5px 0 rgba(28,31,107,.35)}
.tk3-sticker{position:absolute; right:3%; bottom:4%; width:92px; height:92px; border-radius:50%; background:var(--blue); color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; transform:rotate(9deg); border:2px dashed #fff; outline:3px solid var(--blue); outline-offset:0; box-shadow:3px 3px 0 var(--pink-d)}
.tk3-hf.sm .tk3-sticker{width:76px; height:76px; right:0}
.tk3-sticker small{font-family:'Baloo 2',sans-serif; font-weight:600; font-size:9.5px; letter-spacing:.08em; text-transform:uppercase; line-height:1.1}
.tk3-sticker b{font-family:'Baloo 2',sans-serif; font-weight:800; font-size:13px; line-height:1.15; margin-top:2px}
.tk3-hf.sm .tk3-sticker small{font-size:8px}
.tk3-hf.sm .tk3-sticker b{font-size:11px}
.tk3-open{position:relative; padding:12px 26px 20px}
.tk3-open .tk3-small{max-width:210px}

/* ---- bulan + strip tanggal + hitung mundur ---- */
.tk3-month{padding:6px 26px 26px}
.tk3-week{display:flex; justify-content:space-between; max-width:300px}
.tk3-week span{position:relative; width:40px; height:40px; display:grid; place-items:center; color:#7b6f69; font-size:11px}
.tk3-week span b{position:relative; font-weight:600}
.tk3-week span.on b{color:var(--blue); font-family:'Baloo 2',sans-serif; font-weight:800; font-size:20px}
.tk3-cd{display:grid; grid-template-columns:repeat(4,1fr); gap:8px; max-width:300px; margin-top:6px}
.tk3-cd>div{background:#fff; border:2px solid var(--blue); border-radius:14px; padding:8px 2px 6px; text-align:center; box-shadow:3px 3px 0 var(--pink-d)}
.tk3-cd b{display:block; font-family:'Baloo 2',sans-serif; font-weight:800; font-size:24px; line-height:1.05; color:var(--navy); font-variant-numeric:tabular-nums}
.tk3-cd small{display:block; font-size:10px; color:var(--txt)}
.tk3-passed{font-family:'Baloo 2',sans-serif; font-weight:700; font-size:20px; color:var(--orange); margin:6px 0 0}

/* ---- tempat ---- */
.tk3-place{display:flex; align-items:center; gap:18px; padding:12px 26px 18px}
.tk3-place.rev{flex-direction:row-reverse}
.tk3-place-photo{flex:0 0 44%; max-width:44%; transform:rotate(-2.5deg)}
.tk3-place.rev .tk3-place-photo{transform:rotate(2.5deg)}
.tk3-place-t{flex:1; min-width:0}
.tk3-place-t .tk3-h{margin-bottom:6px}
.tk3-place-t b{overflow-wrap:anywhere}

/* ---- rangkaian acara ---- */
.tk3-sched{padding:18px 26px 14px}
.tk3-sched ol{list-style:none; margin:0; padding:0}
.tk3-sched li{display:flex; align-items:center; gap:12px; margin:0 0 20px}
.tk3-sched li.l{flex-direction:row; text-align:left}
.tk3-sched li.r{flex-direction:row-reverse; text-align:right}
.tk3-st{flex:1; min-width:0}
.tk3-st time{display:block; font-family:'Baloo 2',sans-serif; font-weight:700; font-size:17px; line-height:1.15}
.tk3-st h3{font-family:'Baloo 2',sans-serif; font-weight:800; font-size:27px; line-height:1.1; margin:2px 0 4px}
.tk3-st p{font-size:10.5px; line-height:1.6; margin:0; color:var(--txt)}

/* ---- seksi umum ---- */
.tk3-sec{padding:28px 26px 14px; text-align:center}
.tk3-photo{width:100%; overflow:hidden; background:#ffe3ea; border:2px solid var(--blue); border-radius:20px; box-shadow:5px 5px 0 var(--pink-d)}
.tk3-photo img{width:100%; height:100%; object-fit:cover; display:block}
.tk3-photo-empty{width:100%; height:100%; display:grid; place-items:center; color:var(--pink-d)}

/* ---- mempelai: foto menumpuk ---- */
.tk3-duo{position:relative; display:flex; justify-content:center; align-items:flex-start; padding:4px 0 34px}
.tk3-duo-pic{width:54%}
.tk3-duo-pic.p0{transform:rotate(-4deg); position:relative; z-index:1}
.tk3-duo-pic.p1{transform:rotate(4deg); margin-left:-8%; margin-top:30px; position:relative; z-index:2}
.tk3-duo-heart{position:absolute; left:50%; top:44%; transform:translate(-50%,-50%); z-index:3}
.tk3-person{margin:0 0 26px}
.tk3-person h3{font-family:'Baloo 2',sans-serif; font-weight:800; font-size:25px; line-height:1.15; margin:0 0 4px}
.tk3-person .tk3-small{max-width:280px; margin:0 auto 4px}
.tk3-ig{display:inline-block; margin-top:2px; font-size:11.5px; font-weight:700; color:var(--blue); text-decoration:none; border-bottom:2px dotted var(--pink-d)}

/* ---- kisah ---- */
.tk3-leg{margin:0 0 6px}
.tk3-leg-photo{position:relative; width:86%; margin:0 auto 22px}
.tk3-leg-photo.a{transform:rotate(-2deg)}
.tk3-leg-photo.b{transform:rotate(2deg)}
.tk3-tag{position:absolute; left:50%; bottom:-14px; transform:translateX(-50%); background:var(--pink); color:var(--navy); border:2px solid var(--blue); border-radius:999px; padding:2px 14px; font-family:'Baloo 2',sans-serif; font-weight:700; font-size:11px; letter-spacing:.08em; text-transform:uppercase; white-space:nowrap}
.tk3-leg h3{font-family:'Baloo 2',sans-serif; font-weight:800; font-size:26px; line-height:1.1; margin:2px 0 6px}
.tk3-leg .tk3-small{max-width:300px; margin:0 auto}
.tk3-dots{display:grid; place-items:center; height:44px}

/* ---- memori: carousel ---- */
.tk3-mem{padding-bottom:20px}
.tk3-strip{display:flex; gap:16px; overflow-x:auto; scroll-snap-type:x mandatory; padding:10px 26px 22px; margin:0 -26px; -webkit-overflow-scrolling:touch; scrollbar-width:thin; scrollbar-color:var(--pink-d) transparent}
.tk3-strip figure{flex:0 0 62%; scroll-snap-align:center; margin:0}
.tk3-strip figcaption{font-family:'Baloo 2',sans-serif; font-weight:600; font-size:13px; margin-top:10px; color:var(--blue)}
.tk3-hint{font-style:italic; opacity:.8; margin-top:-4px}

/* ---- hadiah ---- */
.tk3-gift-top{display:flex; gap:14px; align-items:center; text-align:left; margin-bottom:6px}
.tk3-gift-art{flex:none; width:70px}
.tk3-acct{position:relative; border:2px solid var(--blue); border-radius:18px; padding:8px 16px 16px; margin:16px 0 0; background:#fff; text-align:center}
.tk3-acc{font-family:'Baloo 2',sans-serif; font-weight:800; font-size:26px; letter-spacing:.06em; line-height:1.15; margin:4px 0 0; color:var(--navy); overflow-wrap:anywhere}
.tk3-acc.sm{font-size:20px; letter-spacing:.04em}
.tk3-phone{display:inline-block; text-decoration:none; border-bottom:2px dotted var(--pink-d); margin-top:2px}
.tk3-gift-deco{display:flex; align-items:flex-end; justify-content:center; gap:12px; margin-top:26px}

/* ---- form ---- */
.tk3-form{display:grid; gap:14px; max-width:300px; margin:16px auto 0; text-align:left}
.tk3-form label{display:grid; gap:5px}
.tk3-form span{font-family:'Baloo 2',sans-serif; font-weight:700; font-size:12.5px; color:var(--blue); letter-spacing:.04em}
.tk3-form input,.tk3-form select,.tk3-form textarea{width:100%; background:#fff; border:2px solid var(--blue); border-radius:12px; padding:9px 12px; font:600 14px 'Nunito',sans-serif; color:var(--navy)}
.tk3-form textarea{resize:none}
.tk3-form .tk3-btn{align-self:center; margin-top:6px}
.tk3-sent{margin:18px 0 0; font-size:13px; font-weight:700; color:var(--blue)}

/* ---- penutup ---- */
.tk3-end{text-align:center; padding:30px 26px 46px}
.tk3-thanks{font-family:'Baloo 2',sans-serif; font-weight:800; font-size:26px; line-height:1.15; color:var(--orange); margin:8px auto; max-width:270px}
.tk3-endnames{font-family:'Baloo 2',sans-serif; font-weight:700; font-size:22px; color:var(--blue); margin:0}
.tk3-endnames em{font-style:normal; color:var(--pink-d)}

/* ---- tombol melayang ---- */
.tk3-fab{position:fixed; right:16px; width:44px; height:44px; border-radius:50%; border:2px solid var(--blue); background:var(--cream); color:var(--blue); display:grid; place-items:center; cursor:pointer; z-index:30; box-shadow:3px 3px 0 var(--pink-d)}
.tk3-fab.on{background:var(--blue); color:#fff}

/* ---- modal QR ---- */
.tk3-modal{position:fixed; inset:0; z-index:80; background:rgba(60,20,40,.62); display:flex; overflow-y:auto; padding:20px; animation:tk3-fade .25s ease both}
.tk3-modal-in{position:relative; margin:auto; width:100%; max-width:330px; background:var(--cream); border:2px solid var(--blue); border-radius:22px; box-shadow:6px 6px 0 var(--pink-d); padding:26px 22px 24px; text-align:center; animation:tk3-pop .3s cubic-bezier(.2,.8,.2,1) both}
.tk3-qr{display:flex; justify-content:center; margin:14px 0 4px}
.tk3-qr img{background:#fff; padding:6px; border-radius:10px; border:2px solid var(--blue); display:block}
@keyframes tk3-fade{from{opacity:0} to{opacity:1}}
@keyframes tk3-pop{from{opacity:0; transform:translateY(14px) scale(.97)} to{opacity:1; transform:none}}
@media (prefers-reduced-motion:reduce){
  .tk3-card,.tk3-cover,.tk3-cover.leaving .tk3-card,.tk3-modal,.tk3-modal-in{animation:none; transition:none}
  .tk3-cover.leaving{opacity:0}
}
`;