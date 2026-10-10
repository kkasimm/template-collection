import { useEffect, useId, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  FloralBurgundyWedding.jsx — undangan amplop wine + bunga cat air
 *
 *  Alur   : cover amplop (Buka Undangan / Lihat QR Kehadiran Saya) -> isi undangan
 *  Data   : susunan array (COUPLE, EVENTS, LOVE_STORY, MEMORIES, BANK_ACCOUNTS,
 *           GIFT_PHONE, COVER_PHOTO, AUDIO_URL) sama persis dengan Spotify.jsx.
 *           Semua konstanta juga bisa dikirim lewat props (couple, events, ...).
 *  Tanggal: otomatis dari EVENTS[0].date + EVENTS[0].time
 *           (kalender, hitung mundur, dan QR ikut berubah).
 *  QR     : sama seperti Spotify.jsx — modal dari cover, QR unik per tamu
 *           lewat api.qrserver.com.
 *  Tamu   : nama dari ?to=Nama+Tamu (atau ?nama=)
 * ------------------------------------------------------------------ */

/* ---------- teks tampilan (teks tema, bukan data admin) ---------- */
const L = {
  guestHi: "KEPADA YTH.",
  invite: "Dengan penuh cinta, kami mengundang Anda",
  open: "BUKA UNDANGAN",
  qr: "QR KEHADIRAN",
  weMarry: "KAMI MENIKAH!",
  playSong: "Putar lagu kami",
  blessing: "Dengan cinta yang menyatukan, restu Tuhan, dan dukungan orang tua kami:",
  unite: "Mari satukan hati kami dalam ikatan pernikahan",
  countdown: "MENUJU HARI BAHAGIA",
  d: "Hari", h: "Jam", m: "Menit", s: "Detik",
  passed: "Hari bahagia telah tiba",
  couple: "Mempelai",
  venue: "LOKASI ACARA",
  seeMap: "Lihat Lokasi",
  itinerary: "RANGKAIAN ACARA",
  story: "Kisah Kami",
  leg: "TRACK",
  memories: "Momen Kami",
  gift: "HADIAH PERNIKAHAN",
  giftText: "Doa restu Anda adalah hadiah terindah. Namun jika ingin memberikan tanda kasih, kami menyediakan pilihan berikut.",
  account: "NOMOR REKENING",
  copyNo: "Salin Nomor",
  giftAddr: "KIRIM KADO",
  giftHint: "Silakan hubungi kami untuk alamat pengiriman:",
  copied: "Tersalin",
  rsvp: "KONFIRMASI KEHADIRAN",
  rsvpText: "Mohon konfirmasi kehadiran Anda agar kami dapat mempersiapkan segalanya dengan baik.",
  name: "Nama",
  attend: "Kehadiran",
  yes: "Hadir",
  no: "Tidak Hadir",
  message: "Ucapan & Doa",
  send: "Konfirmasi Kehadiran",
  thanksRsvp: "Terima kasih! Kehadiran Anda telah dikonfirmasi.",
  waiting: "KAMI TUNGGU KEHADIRAN ANDA",
  thanks: "Terima Kasih",
  qrTitle: "QR KEHADIRAN",
  qrHint: "Kode ini unik untuk Anda. Mohon tunjukkan QR ini kepada petugas saat check-in di lokasi acara.",
  close: "Tutup",
  music: "Musik",
  quote:
    "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang.",
  quoteSource: "(Q.S Ar-Rum ayat 21)",
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
const dayName = (s) => {
  const { y, m, d } = parseDate(s);
  return DAYS[new Date(y, m - 1, d).getDay()];
};
const fmtDot = (s) => {
  const { y, m, d } = parseDate(s);
  return `${pad2(d)}.${pad2(m)}.${y}`;
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

/* ---------- ikon garis ---------- */
const ICON = {
  building: (<><path d="M5 21V4.5A1.5 1.5 0 0 1 6.5 3h8A1.5 1.5 0 0 1 16 4.5V21" /><path d="M16 9h2.5A1.5 1.5 0 0 1 20 10.5V21" /><path d="M3 21h18" /><path d="M8.5 7h4M8.5 11h4M8.5 15h4" /><path d="M10 21v-3h1.5v3" /></>),
  toast: (<><path d="M5.5 3h4.2l-.5 6.2a1.6 1.6 0 0 1-3.2 0z" /><path d="M7.6 10.8V18M5 19.5h5.2" /><path d="M14.3 3h4.2l-.5 6.2a1.6 1.6 0 0 1-3.2 0z" /><path d="M16.4 10.8V18M13.8 19.5H19" /></>),
  dinner: (<><circle cx="12" cy="12" r="5.2" /><circle cx="12" cy="12" r="2.4" /><path d="M3.5 3v6a1.6 1.6 0 0 0 1.6 1.6V21M5.1 3v5" /><path d="M20.5 3c-1.8 1-2.8 3.6-2.8 6.4h2.8V21" /></>),
  party: (<><circle cx="12" cy="13.5" r="6.5" /><path d="M12 2v5M5.5 13.5h13" /><path d="M12 7c-2.6 3-2.6 10 0 13M12 7c2.6 3 2.6 10 0 13" /><path d="M7 9.4c3.2 1.2 6.8 1.2 10 0M7 17.6c3.2-1.2 6.8-1.2 10 0" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  ring: (<><circle cx="12" cy="15" r="6" /><path d="m9 6 3-3.4L15 6l-3 3z" /></>),
  gift: (<><path d="M3 9h18v4H3zM5 13h14v8H5zM12 9v12" /><path d="M12 9c-2.2 0-4.2-1-4.2-3S10 3.2 12 7c2-3.8 4.2-2 4.2 0S14.2 9 12 9z" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3 6.5 9 7 9-7" /></>),
  calHeart: (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M12 18.4c-2.8-1.8-3.9-3.2-3.9-4.6a1.9 1.9 0 0 1 3.9-.5 1.9 1.9 0 0 1 3.9.5c0 1.4-1.1 2.8-3.9 4.6z" /></>),
  qr: (<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM20 14v.01M14 20h3M20 17v4" /></>),
};
function Icon({ name, size = 26, stroke = 1.2, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", ...style }} aria-hidden="true">
      {ICON[name]}
    </svg>
  );
}
const iconFor = () => "building";

/* ---------- bunga cat air (SVG prosedural) ---------- */
function Floral({ seed = 1, flip = false }) {
  const id = useId().replace(/:/g, "");
  const nodes = useMemo(() => {
    let t = seed * 7919 + 104729;
    const rnd = () => (t = (t * 16807) % 2147483647) / 2147483647;
    const petals = ["#a8465a", "#7d2437", "#d89aa6", "#ecc9cf", "#7f93ab", "#c97a86"];
    const greens = ["#8fa383", "#a8b79a", "#74896c"];
    const out = [];
    const W = 400;
    const count = 9;
    for (let i = 0; i < count; i++) {
      const x = 14 + ((W - 28) * (i + rnd() * 0.6)) / count;
      const len = 32 + rnd() * 52;
      const sway = (rnd() - 0.5) * 64;
      const x2 = x + sway;
      out.push(<path key={`s${i}`} d={`M${x} 0 C${x + sway * 0.1} ${len * 0.35} ${x + sway * 0.9} ${len * 0.6} ${x2} ${len}`} fill="none" stroke="#7d8f73" strokeWidth="0.9" opacity=".8" />);
      const leaves = 2 + Math.floor(rnd() * 3);
      for (let k = 0; k < leaves; k++) {
        const ty = len * (0.18 + 0.7 * rnd());
        const tx = x + sway * (ty / len) * 0.85;
        const ang = (rnd() > 0.5 ? 1 : -1) * (30 + rnd() * 45);
        out.push(<ellipse key={`l${i}-${k}`} cx="0" cy="7" rx="2.5" ry="7.5" fill={greens[Math.floor(rnd() * 3)]} opacity=".72" transform={`translate(${tx} ${ty}) rotate(${ang})`} />);
      }
      const kind = rnd();
      if (kind < 0.62) {
        const r = 5 + rnd() * 5.5;
        const col = petals[Math.floor(rnd() * petals.length)];
        out.push(
          <g key={`f${i}`} transform={`translate(${x2} ${len}) rotate(${Math.floor(rnd() * 72)})`}>
            {[0, 1, 2, 3, 4].map((p) => (
              <ellipse key={p} cx="0" cy={-r * 0.9} rx={r * 0.55} ry={r} fill={col} opacity=".8" transform={`rotate(${p * 72})`} />
            ))}
            <circle r="1.9" fill={rnd() > 0.5 ? "#e6cb86" : "#5b2432"} />
          </g>
        );
      } else if (kind < 0.86) {
        out.push(<ellipse key={`b${i}`} cx={x2} cy={len + 3} rx="2.6" ry="4.6" fill={petals[Math.floor(rnd() * petals.length)]} opacity=".78" />);
      } else {
        for (let q = 0; q < 6; q++) out.push(<circle key={`d${i}-${q}`} cx={x2 + (rnd() - 0.5) * 14} cy={len + (rnd() - 0.5) * 14} r="1.5" fill="#b9c4ad" opacity=".9" />);
      }
    }
    if (rnd() > 0.35) {
      const bx = 60 + rnd() * 280;
      const by = 34 + rnd() * 30;
      out.push(
        <g key="bf" transform={`translate(${bx} ${by}) rotate(${rnd() * 40 - 20})`} opacity=".85">
          <ellipse cx="-5" cy="-3" rx="6" ry="3.4" fill="#5f8aa0" transform="rotate(-25 -5 -3)" />
          <ellipse cx="5" cy="-3" rx="6" ry="3.4" fill="#c97a86" transform="rotate(25 5 -3)" />
          <ellipse cx="-3.5" cy="3" rx="4" ry="2.4" fill="#5f8aa0" opacity=".8" transform="rotate(20 -3.5 3)" />
          <ellipse cx="3.5" cy="3" rx="4" ry="2.4" fill="#c97a86" opacity=".8" transform="rotate(-20 3.5 3)" />
          <path d="M0 -5v9" stroke="#3a2a2e" strokeWidth=".9" />
        </g>
      );
    }
    return out;
  }, [seed]);
  return (
    <svg className="tk2-floral" viewBox="0 0 400 100" aria-hidden="true" style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <defs>
        <filter id={`w${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
        </filter>
      </defs>
      <g filter={`url(#w${id})`}>{nodes}</g>
    </svg>
  );
}

/* ---------- amplop ---------- */
function Envelope({ a, b, date, open = false, hero = false }) {
  const gid = useId().replace(/:/g, "");
  return (
    <div className={`tk2-env ${open ? "open" : ""} ${hero ? "hero" : ""}`}>
      <div className="tk2-env-body">
        <div className="tk2-letter">
          <span className="tk2-letter-m">{(a || "")[0]} <i /> {(b || "")[0]}</span>
        </div>
        <p className="tk2-env-date">{date}</p>
      </div>
      <div className="tk2-flap">
        <svg viewBox="0 0 250 205" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`g${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8d4a56" />
              <stop offset="1" stopColor="#6c2f3b" />
            </linearGradient>
          </defs>
          <path d="M0 0H250V120Q250 132 240 138L134 198Q125 204 116 198L10 138Q0 132 0 120Z" fill={`url(#g${gid})`} />
        </svg>
        <div className="tk2-env-names">
          <span>{a}</span>
          <em>&amp;</em>
          <span>{b}</span>
        </div>
      </div>
    </div>
  );
}

/* shape: "rect" | "arch" (lengkung atas) | "oval" | "polaroid" */
function Photo({ src, ratio = "4 / 5", alt = "", shape = "rect" }) {
  return (
    <div className={`tk2-photo ${shape}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="tk2-photo-empty" aria-hidden="true"><Icon name="ring" size={32} /></div>
      )}
    </div>
  );
}

/* ================================================================== */
export default function FloralBurgundyWedding({
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
  const nameA = couple.groom.shortName; // sesuai desain: nama pria dulu
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
    if (document.getElementById("tk2-fonts")) return;
    const l = document.createElement("link");
    l.id = "tk2-fonts";
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap";
    document.head.appendChild(l);
  }, []);

  /* alur: cover -> opening (amplop terbuka) -> leaving -> open */
  const [phase, setPhase] = useState("cover");
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(0);
  const openInvite = () => {
    if (phase !== "cover") return;
    setPhase("opening");
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    setTimeout(() => setPhase("leaving"), 1000);
    setTimeout(() => {
      setPhase("open");
      window.scrollTo?.(0, 0);
    }, 1700);
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
  const [showQR, setShowQR] = useState(false);
  useEffect(() => {
    if (!showQR) return;
    const onKey = (e) => e.key === "Escape" && setShowQR(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showQR]);
  const qrUrl = buildQrUrl(buildQrPayload({ groom: nameA, bride: nameB, guestName, dateText }), "2b1418");

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
  const [submitted, setSubmitted] = useState(false);
  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRsvp?.({ ...rsvp, guestName });
    } catch (_) {}
    setSubmitted(true);
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

  return (
    <div className={`tk2-root ${phase !== "open" ? "tk2-locked" : ""}`}>
      <style>{css}</style>

      {/* ================= COVER ================= */}
      {phase !== "open" && (
        <div className={`tk2-cover ${phase === "leaving" ? "leaving" : ""}`} role="dialog" aria-label="Sampul undangan">
          <div className="tk2-cover-top"><Floral seed={3} /></div>
          <div className="tk2-cover-in">
            <p className="tk2-label">{L.guestHi}</p>
            <p className="tk2-guest">{guestName}</p>
            <p className="tk2-invite">{L.invite}</p>
            <Envelope a={nameA} b={nameB} date={dateDot} open={phase !== "cover"} />
            <div className="tk2-cover-btns">
              <button className="tk2-pill solid" onClick={openInvite}>{L.open}</button>
              <button className="tk2-pill" onClick={() => setShowQR(true)}><Icon name="qr" size={15} style={{ marginRight: 7 }} />{L.qr}</button>
            </div>
          </div>
          <div className="tk2-cover-bot"><Floral seed={9} flip /></div>
        </div>
      )}

      <main className="tk2-col">
        {/* ===== 1. HEADER AMPLOP ===== */}
        <Envelope a={nameA} b={nameB} date={dateDot} hero />

        {/* COVER_PHOTO sekarang tampil lebih dulu dalam bingkai lengkung,
            lalu judul, monogram, dan kutipan di bawahnya */}
        <div className="tk2-cream">
          <Floral seed={5} />
          <div className="tk2-pad" style={{ paddingTop: 6 }}>
            <div className="tk2-arch-wrap">
              <Photo src={coverPhoto} ratio="4 / 5" shape="arch" alt={`${nameA} & ${nameB}`} />
            </div>
            <p className="tk2-heading" style={{ marginTop: 26 }}>{L.weMarry}</p>
            <div className="tk2-mono"><span>{nameA[0]}</span><i /><span>{nameB[0]}</span></div>
            <p className="tk2-quote">
              “{L.quote}”
              {L.quoteSource && <span>{L.quoteSource}</span>}
            </p>
          </div>
          <Floral seed={11} flip />
        </div>

        {/* ===== 2. MUSIK + ORANG TUA ===== */}
        <section className="tk2-wine tk2-pad">
          {audioUrl && (
            <div className="tk2-player">
              <p className="tk2-player-t">{L.playSong}</p>
              <div className="tk2-bar"><i style={{ width: `${prog}%` }} /></div>
              <button className="tk2-play" onClick={toggleMusic} aria-label={playing ? "Jeda musik" : "Putar musik"}>
                {playing ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4.5" height="16" /><rect x="13.5" y="4" width="4.5" height="16" /></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 4.5l12 7.5-12 7.5z" /></svg>
                )}
              </button>
            </div>
          )}
          <p className="tk2-body">{L.blessing}</p>
          <div className="tk2-parents">
            <p>{couple.groom.parent}</p>
            <p className="tk2-amp">&amp;</p>
            <p>{couple.bride.parent}</p>
          </div>
          <p className="tk2-body" style={{ marginTop: 20 }}>{L.unite}</p>
        </section>

        {/* ===== 3. TANGGAL + HITUNG MUNDUR (dari EVENTS[0]) ===== */}
        <section className="tk2-datebox tk2-pad">
          <p className="tk2-month">{upper(MONTHS[wm - 1])}</p>
          <div className="tk2-dayrow">
            <span>{upper(dayName(tanggal))}</span>
            <b>{pad2(wd)}</b>
            <span>{wy}</span>
          </div>
          <p className="tk2-label" style={{ marginTop: 26 }}>{L.countdown}</p>
          {isPast ? (
            <p className="tk2-passed">{L.passed}</p>
          ) : (
            <div className="tk2-cd">
              {cd.map(([n, lab], i) => (
                <div key={lab}>
                  <b>{pad2(n)}</b>
                  <small>{lab}</small>
                  {i < 3 && <i>:</i>}
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="tk2-cream">
          <Floral seed={21} />

          {/* ===== 4. MEMPELAI — dua foto oval berdampingan ===== */}
          <section className="tk2-pad" style={{ paddingTop: 0 }}>
            <h2 className="tk2-script">{L.couple}</h2>
            <div className="tk2-duo">
              {[couple.groom, couple.bride].map((c, i) => (
                <div key={i} className="tk2-duo-item">
                  <Photo src={c.photo} ratio="3 / 4" shape="oval" alt={c.name} />
                  <h3 className="tk2-pname">{c.name}</h3>
                  {c.parent && <p className="tk2-psub">{c.parent}</p>}
                  {c.instagram && (
                    <a className="tk2-ig" href={`https://instagram.com/${c.instagram.replace("@", "")}`} target="_blank" rel="noreferrer">
                      @{c.instagram.replace("@", "")}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ===== 5. LOKASI — foto di atas, detail di bawah ===== */}
          {venues.map((v) => (
            <section key={v.venue} className="tk2-pad tk2-venue">
              {v.photo && <Photo src={v.photo} ratio="4 / 3" shape="arch" alt={v.venue} />}
              <div className="tk2-venue-card">
                <Icon name="building" size={30} />
                <p className="tk2-heading" style={{ marginTop: 8 }}>{L.venue}</p>
                {v.date && <p className="tk2-time">{v.date}</p>}
                <p className="tk2-vname">{upper(v.venue)}</p>
                {v.mapsUrl && <a className="tk2-pill solid" href={v.mapsUrl} target="_blank" rel="noreferrer">{L.seeMap}</a>}
              </div>
            </section>
          ))}

          {/* ===== 6. RANGKAIAN ACARA ===== */}
          {events.length > 0 && (
            <section className="tk2-pad" style={{ paddingTop: 6 }}>
              <p className="tk2-heading" style={{ marginBottom: 22 }}>{L.itinerary}</p>
              <ol className="tk2-tl">
                {events.map((e, i) => (
                  <li key={e.id} className={i % 2 === 0 ? "l" : "r"}>
                    <div className="tk2-tl-t">
                      <small>{e.time}</small>
                      <b>{upper(e.title)}</b>
                      {e.date && <em>{e.date}</em>}
                    </div>
                    <div className="tk2-tl-i"><Icon name={iconFor(e.title, i)} size={30} /></div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ===== 7. KISAH CINTA — foto kiri/kanan bergantian ===== */}
          {loveStory.length > 0 && (
            <section className="tk2-pad">
              <Floral seed={31} />
              <h2 className="tk2-script">{L.story}</h2>
              {loveStory.map((k, i) => (
                <article key={k.track} className={`tk2-leg ${i % 2 ? "rev" : ""}`}>
                  {k.photo && (
                    <div className="tk2-leg-photo">
                      <Photo src={k.photo} ratio="3 / 4" shape="polaroid" alt={k.title} />
                    </div>
                  )}
                  <div className="tk2-leg-txt">
                    <p className="tk2-label ink">{L.leg} {pad2(k.track)}</p>
                    <h3 className="tk2-lt">{k.title}</h3>
                    <p className="tk2-ld">{k.text}</p>
                  </div>
                </article>
              ))}
            </section>
          )}

          {/* ===== 8. MEMORI — galeri dua kolom bertingkat ===== */}
          {memories.length > 0 && (
            <section className="tk2-pad" style={{ paddingTop: 0 }}>
              <h2 className="tk2-script">{L.memories}</h2>
              <div className="tk2-gal">
                {memories.map((m) => (
                  <figure key={m.title}>
                    <Photo src={m.photo} ratio="4 / 5" shape="polaroid" alt={m.title} />
                    <figcaption>{m.title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
          <Floral seed={41} flip />
        </div>

        {/* ===== 9. HADIAH + RSVP + PENUTUP ===== */}
        <section className="tk2-wine tk2-pad tk2-last">
          {(bankAccounts.length > 0 || giftPhone) && (
            <>
              <Icon name="gift" size={32} />
              <p className="tk2-heading lt" style={{ marginTop: 10 }}>{L.gift}</p>
              <p className="tk2-body">{L.giftText}</p>
              {bankAccounts.map((r) => (
                <div key={r.bank} className="tk2-card">
                  <small className="tk2-label">{L.account} · {upper(r.bank)}</small>
                  <p className="tk2-acc">{r.accountNumber}</p>
                  <p className="tk2-an">a.n. {r.accountName}</p>
                  <button className="tk2-pill sm" onClick={() => copy(r.accountNumber)}>{copied === r.accountNumber ? L.copied : L.copyNo}</button>
                </div>
              ))}
              {giftPhone && (
                <div className="tk2-card">
                  <Icon name="mail" size={22} />
                  <small className="tk2-label" style={{ display: "block", marginTop: 6 }}>{L.giftAddr}</small>
                  <p className="tk2-an" style={{ margin: "8px 0 6px" }}>{L.giftHint}</p>
                  <a className="tk2-acc tk2-phone" href={`https://wa.me/${giftPhone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{giftPhone}</a>
                </div>
              )}
            </>
          )}

          <div className="tk2-sep" />
          <Icon name="calHeart" size={32} />
          <p className="tk2-heading lt" style={{ marginTop: 10 }}>{L.rsvp}</p>
          <p className="tk2-body">{L.rsvpText}</p>
          {submitted ? (
            <p className="tk2-sent">{L.thanksRsvp}</p>
          ) : (
            <form className="tk2-form" onSubmit={handleRsvpSubmit}>
              <label>
                <small>{L.name}</small>
                <input required value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} />
              </label>
              <label>
                <small>{L.attend}</small>
                <select value={rsvp.attend} onChange={(e) => setRsvp({ ...rsvp, attend: e.target.value })}>
                  <option value="hadir">{L.yes}</option>
                  <option value="tidak">{L.no}</option>
                </select>
              </label>
              <label>
                <small>{L.message}</small>
                <textarea rows={3} value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} />
              </label>
              <button className="tk2-pill" type="submit" style={{ alignSelf: "center", marginTop: 8 }}>{L.send}</button>
            </form>
          )}

          <p className="tk2-label" style={{ marginTop: 40 }}>{L.waiting}</p>
          <p className="tk2-thanks">{L.thanks}</p>
        </section>
      </main>

      {/* ===== tombol musik melayang ===== */}
      {phase === "open" && audioUrl && (
        <button className="tk2-fab" onClick={toggleMusic} aria-label={L.music}>
          {playing ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4.5" height="16" /><rect x="13.5" y="4" width="4.5" height="16" /></svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 4.5l12 7.5-12 7.5z" /></svg>
          )}
        </button>
      )}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          loop
          preload="none"
          onTimeUpdate={(e) => {
            const a = e.currentTarget;
            setProg(a.duration ? (a.currentTime / a.duration) * 100 : 0);
          }}
        />
      )}

      {/* ===== modal QR kehadiran ===== */}
      {showQR && (
        <div className="tk2-modal" role="dialog" aria-modal="true" aria-label={L.qrTitle} onClick={() => setShowQR(false)}>
          <div className="tk2-modal-in" onClick={(e) => e.stopPropagation()}>
            <Floral seed={61} />
            <div className="tk2-modal-body">
              <p className="tk2-label ink">{L.qrTitle}</p>
              <p className="tk2-script sm">{nameA} &amp; {nameB}</p>
              <p className="tk2-guest" style={{ marginTop: 4 }}>{guestName}</p>
              <div className="tk2-qr">
                <img src={qrUrl} alt="QR Code Kehadiran" width={200} height={200} />
              </div>
              <p className="tk2-qhint">{L.qrHint}</p>
              <button className="tk2-pill solid" onClick={() => setShowQR(false)}>{L.close}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
const css = `
.tk2-root{
  --wine:#561d2a; --wine-d:#3d1520; --cream:#f2eee5; --ink:#2b1418; --ink-s:#5b4a4d; --on-wine:#f4efe6;
  font-family:'Libre Baskerville',Georgia,serif; color:var(--ink); min-height:100vh;
  background:linear-gradient(180deg,#d6d6d4,#a7a7a4); -webkit-font-smoothing:antialiased;
}
.tk2-root *{box-sizing:border-box}
.tk2-locked{height:100vh; overflow:hidden}
.tk2-col{width:100%; max-width:430px; margin:0 auto; background:var(--cream); position:relative; overflow:hidden}
@media (min-width:600px){.tk2-col{box-shadow:0 0 0 9px #fff, 0 20px 60px rgba(0,0,0,.28)}}

/* ---- tipografi ---- */
.tk2-label{font-size:9.5px; letter-spacing:.2em; text-transform:uppercase; margin:0; text-align:center; color:var(--on-wine); opacity:.92}
.tk2-label.ink{color:var(--ink-s); opacity:1}
.tk2-heading{font-size:10.5px; font-weight:700; letter-spacing:.17em; text-align:center; margin:0 0 10px; text-transform:uppercase; color:var(--ink)}
.tk2-heading.lt{color:var(--on-wine)}
.tk2-script{font-family:'Great Vibes',cursive; font-weight:400; font-size:38px; line-height:1.15; text-align:center; margin:0 0 24px; color:var(--wine)}
.tk2-script.sm{font-size:30px; margin:4px 0 8px}
.tk2-body{font-size:11.5px; line-height:1.85; text-align:center; margin:0 auto 14px; max-width:300px; color:var(--on-wine); opacity:.95}
.tk2-pad{padding:32px 28px}
.tk2-wine{background:linear-gradient(180deg,var(--wine),#4b1824); color:var(--on-wine); text-align:center}
.tk2-cream{background-color:var(--cream); background-image:radial-gradient(rgba(110,80,60,.06) 1px, transparent 1.2px); background-size:3px 3px; text-align:center}
.tk2-floral{display:block; width:100%; height:auto; pointer-events:none}

/* ---- foto (bentuk) ---- */
.tk2-photo{width:100%; overflow:hidden; background:#e6dcd9}
.tk2-photo img{width:100%; height:100%; object-fit:cover; display:block}
.tk2-photo.arch{border-radius:999px 999px 6px 6px}
.tk2-photo.oval{border-radius:50%}
.tk2-photo.polaroid{border-radius:2px; border:6px solid #fff; border-bottom-width:6px; box-shadow:0 6px 16px rgba(60,20,30,.18); background:#fff}
.tk2-photo-empty{width:100%; height:100%; display:grid; place-items:center; color:#b99aa0; background:linear-gradient(135deg,#eadfdc,#dccbca)}
.tk2-arch-wrap{width:78%; margin:0 auto; padding:7px; border:1px solid var(--wine); border-radius:999px 999px 10px 10px}
.tk2-arch-wrap .tk2-photo{border-radius:999px 999px 6px 6px}

/* ---- amplop ---- */
.tk2-env{position:relative; width:262px; height:340px; margin:0 auto; perspective:1000px}
.tk2-env.hero{width:100%; height:350px}
.tk2-env-body{position:absolute; inset:0; background:linear-gradient(180deg,#4a1925,#3d1520); box-shadow:0 14px 34px rgba(30,6,12,.35)}
.tk2-env.hero .tk2-env-body{box-shadow:none}
.tk2-env-date{position:absolute; left:0; right:0; bottom:26px; margin:0; text-align:center; color:var(--on-wine); font-size:11px; letter-spacing:.18em}
.tk2-letter{position:absolute; left:12%; right:12%; top:26px; bottom:46px; background:var(--cream); display:grid; place-items:center; transition:transform .9s cubic-bezier(.3,.7,.2,1) .25s; box-shadow:0 2px 10px rgba(0,0,0,.2)}
.tk2-letter-m{font-family:'Cormorant Garamond',serif; font-size:44px; letter-spacing:.06em; color:var(--ink); display:flex; align-items:center; gap:14px}
.tk2-letter-m i{width:1px; height:44px; background:var(--ink); display:block}
.tk2-env.open .tk2-letter{transform:translateY(-64px)}
.tk2-flap{position:absolute; left:0; right:0; top:0; height:62%; transform-origin:top center; backface-visibility:hidden; transition:transform .75s cubic-bezier(.5,0,.2,1); z-index:3; filter:drop-shadow(0 8px 8px rgba(0,0,0,.28))}
.tk2-flap svg{position:absolute; inset:0; width:100%; height:100%; display:block}
.tk2-env.open .tk2-flap{transform:rotateX(180deg)}
.tk2-env-names{position:relative; z-index:2; padding-top:40px; text-align:center; font-family:'Great Vibes',cursive; color:#f6ecee; line-height:1.05}
.tk2-env-names span{display:block; font-size:44px}
.tk2-env-names em{display:block; font-style:normal; font-size:22px; line-height:1; margin:2px 0}

/* ---- cover ---- */
.tk2-cover{position:fixed; inset:0; z-index:60; background-color:var(--cream); background-image:radial-gradient(rgba(110,80,60,.06) 1px, transparent 1.2px); background-size:3px 3px; display:flex; flex-direction:column; overflow-y:auto; transition:opacity .7s ease, transform .7s ease}
.tk2-cover.leaving{opacity:0; transform:translateY(-24px)}
.tk2-cover-top,.tk2-cover-bot{width:100%; max-width:520px; margin:0 auto; flex:none}
.tk2-cover-in{flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:6px 24px; text-align:center}
.tk2-cover-in .tk2-label{color:var(--ink-s)}
.tk2-guest{font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:500; margin:2px 0 8px; color:var(--wine); overflow-wrap:anywhere}
.tk2-invite{font-size:11px; font-style:italic; color:var(--ink-s); margin:0 0 48px}
.tk2-cover-btns{display:flex; flex-direction:column; gap:10px; margin-top:30px; width:240px}

/* ---- tombol pil ---- */
.tk2-pill{display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--on-wine); background:transparent; color:var(--on-wine); border-radius:10px; padding:9px 18px; font:400 11px 'Libre Baskerville',serif; letter-spacing:.08em; text-decoration:none; cursor:pointer; transition:background .2s,color .2s}
.tk2-pill:hover{background:rgba(244,239,230,.14)}
.tk2-pill.sm{padding:6px 14px; font-size:10.5px; margin-top:12px}
.tk2-cream .tk2-pill,.tk2-cover .tk2-pill,.tk2-modal .tk2-pill{border-color:var(--wine); color:var(--wine)}
.tk2-pill.solid,.tk2-cream .tk2-pill.solid,.tk2-cover .tk2-pill.solid,.tk2-modal .tk2-pill.solid{background:var(--wine); color:var(--on-wine); border-color:var(--wine)}
.tk2-pill.solid:hover{background:var(--wine-d)}
.tk2-pill:focus-visible,.tk2-fab:focus-visible,.tk2-play:focus-visible,.tk2-form input:focus-visible,.tk2-form select:focus-visible,.tk2-form textarea:focus-visible,.tk2-ig:focus-visible{outline:2px solid #d89aa6; outline-offset:2px}

/* ---- header: monogram + kutipan ---- */
.tk2-mono{display:flex; align-items:center; justify-content:center; gap:16px; font-family:'Cormorant Garamond',serif; font-size:60px; font-weight:400; color:var(--ink); line-height:1; margin-top:6px}
.tk2-mono i{width:1px; height:54px; background:var(--ink)}
.tk2-quote{font-size:10.5px; font-style:italic; line-height:1.85; max-width:280px; margin:22px auto 4px; color:var(--ink)}
.tk2-quote span{display:block; margin-top:4px; font-style:normal; font-size:10px}

/* ---- player + orang tua ---- */
.tk2-player{max-width:290px; margin:0 auto 28px; padding:14px 18px 16px; border-radius:14px; background:rgba(0,0,0,.18)}
.tk2-player-t{margin:0 0 14px; font-size:12px; letter-spacing:.04em}
.tk2-bar{height:3px; border-radius:3px; background:rgba(244,239,230,.3); overflow:hidden}
.tk2-bar i{display:block; height:100%; background:var(--on-wine); transition:width .4s linear}
.tk2-play{width:44px; height:44px; border-radius:50%; border:0; background:var(--on-wine); color:var(--wine); display:grid; place-items:center; margin:14px auto 0; cursor:pointer}
.tk2-parents p{margin:0; font-size:11.5px; font-style:italic; line-height:2}
.tk2-parents .tk2-amp{font-style:normal; margin:2px 0}

/* ---- tanggal + hitung mundur ---- */
.tk2-datebox{background:#4b1824; color:var(--on-wine); text-align:center; padding-top:6px; padding-bottom:38px}
.tk2-month{font-size:11px; letter-spacing:.3em; margin:0 0 12px}
.tk2-dayrow{display:flex; align-items:center; justify-content:center; gap:18px; border-top:1px solid rgba(244,239,230,.55); border-bottom:1px solid rgba(244,239,230,.55); max-width:280px; margin:0 auto; padding:6px 0}
.tk2-dayrow span{font-size:10px; letter-spacing:.2em; min-width:62px}
.tk2-dayrow b{font-family:'Cormorant Garamond',serif; font-style:italic; font-weight:500; font-size:50px; line-height:1}
.tk2-cd{display:flex; justify-content:center; margin-top:12px}
.tk2-cd>div{position:relative; width:64px; text-align:center}
.tk2-cd b{display:block; font-family:'Cormorant Garamond',serif; font-weight:500; font-size:40px; line-height:1.05; font-variant-numeric:tabular-nums}
.tk2-cd small{display:block; font-size:8.5px; letter-spacing:.08em; opacity:.9}
.tk2-cd i{position:absolute; right:-4px; top:2px; font-style:normal; font-family:'Cormorant Garamond',serif; font-size:36px}
.tk2-passed{font-family:'Great Vibes',cursive; font-size:30px; margin:10px 0 0}

/* ---- mempelai: dua kolom oval ---- */
.tk2-duo{display:grid; grid-template-columns:1fr 1fr; gap:18px 14px; align-items:start}
.tk2-duo-item{min-width:0}
.tk2-duo-item .tk2-photo{box-shadow:0 0 0 5px var(--cream), 0 0 0 6px var(--wine)}
.tk2-pname{font-family:'Cormorant Garamond',serif; font-weight:600; font-size:18px; line-height:1.25; letter-spacing:.02em; margin:20px 0 6px; color:var(--ink)}
.tk2-psub{font-size:10px; font-style:italic; color:var(--ink-s); margin:0 auto; line-height:1.7}
.tk2-ig{display:inline-block; margin-top:8px; font-size:10px; letter-spacing:.08em; color:var(--wine); text-decoration:none; border-bottom:1px solid currentColor; overflow-wrap:anywhere}

/* ---- lokasi + rangkaian acara ---- */
.tk2-venue{color:var(--ink)}
.tk2-venue-card{margin:-34px 10px 0; position:relative; background:var(--cream); padding:22px 16px 6px; border-radius:6px; box-shadow:0 8px 22px rgba(60,20,30,.14)}
.tk2-venue-card .tk2-pill{margin:6px 0 16px}
.tk2-time{font-size:11px; letter-spacing:.06em; margin:0 0 6px; color:var(--ink-s)}
.tk2-vname{font-size:13px; font-weight:700; letter-spacing:.12em; margin:6px 0 14px}
.tk2-tl{list-style:none; margin:0 auto; padding:0; max-width:340px; position:relative}
.tk2-tl::before{content:""; position:absolute; left:50%; top:10px; bottom:10px; border-left:1px solid var(--ink)}
.tk2-tl li{position:relative; display:grid; grid-template-columns:1fr 46px 1fr; align-items:center; min-height:66px}
.tk2-tl-i{grid-column:2; grid-row:1; justify-self:center; color:var(--ink); background:var(--cream); padding:3px 0; position:relative}
.tk2-tl li.l .tk2-tl-t{grid-column:1; grid-row:1; text-align:right; padding-right:4px}
.tk2-tl li.r .tk2-tl-t{grid-column:3; grid-row:1; text-align:left; padding-left:4px}
.tk2-tl-t small{display:block; font-size:10px; letter-spacing:.06em; color:var(--ink-s)}
.tk2-tl-t b{display:block; font-size:9.5px; font-weight:400; letter-spacing:.14em; margin-top:2px}
.tk2-tl-t em{display:block; font-style:normal; font-size:9px; color:var(--ink-s); margin-top:2px}

/* ---- kisah: zigzag ---- */
.tk2-leg{display:flex; align-items:center; gap:18px; margin:0 0 34px; text-align:left}
.tk2-leg.rev{flex-direction:row-reverse}
.tk2-leg-photo{flex:0 0 42%; max-width:42%}
.tk2-leg:nth-child(odd) .tk2-leg-photo .tk2-photo{transform:rotate(-2deg)}
.tk2-leg:nth-child(even) .tk2-leg-photo .tk2-photo{transform:rotate(2deg)}
.tk2-leg-txt{flex:1; min-width:0}
.tk2-leg-txt .tk2-label{text-align:left; margin:0 0 4px}
.tk2-lt{font-family:'Great Vibes',cursive; font-weight:400; font-size:30px; margin:0 0 6px; color:var(--wine); line-height:1.2}
.tk2-ld{font-size:10.5px; line-height:1.85; margin:0; color:var(--ink)}

/* ---- galeri bertingkat ---- */
.tk2-gal{display:grid; grid-template-columns:1fr 1fr; gap:16px 14px; align-items:start; padding-bottom:28px}
.tk2-gal figure{margin:0}
.tk2-gal figure:nth-child(even){transform:translateY(28px)}
.tk2-gal figure:nth-child(4n+1) .tk2-photo{transform:rotate(-1.5deg)}
.tk2-gal figure:nth-child(4n) .tk2-photo{transform:rotate(1.5deg)}
.tk2-gal figcaption{font-size:10px; font-style:italic; margin-top:9px; color:var(--ink-s); line-height:1.5}

/* ---- hadiah + rsvp ---- */
.tk2-last{padding-top:40px; padding-bottom:46px}
.tk2-card{border:1px solid rgba(244,239,230,.42); border-radius:12px; padding:16px 14px 18px; margin:12px auto 0; max-width:300px}
.tk2-acc{font-family:'Cormorant Garamond',serif; font-size:26px; letter-spacing:.1em; margin:6px 0 0; overflow-wrap:anywhere}
.tk2-phone{display:inline-block; font-size:20px; color:inherit; text-decoration:none; border-bottom:1px solid rgba(244,239,230,.5)}
.tk2-an{font-size:11px; font-style:italic; margin:2px 0 0; opacity:.92; line-height:1.7}
.tk2-sep{width:60px; border-top:1px solid rgba(244,239,230,.45); margin:36px auto 30px}
.tk2-form{display:grid; gap:14px; max-width:290px; margin:18px auto 0; text-align:left}
.tk2-form label{display:grid; gap:4px}
.tk2-form small{font-size:9px; letter-spacing:.18em; text-transform:uppercase; opacity:.85}
.tk2-form input,.tk2-form select,.tk2-form textarea{width:100%; background:transparent; border:0; border-bottom:1px solid rgba(244,239,230,.6); border-radius:0; padding:7px 2px; font:400 13px 'Libre Baskerville',serif; color:var(--on-wine)}
.tk2-form textarea{resize:none}
.tk2-form option{color:var(--ink)}
.tk2-sent{margin:16px 0 0; font-size:11.5px; font-style:italic; text-align:center}
.tk2-thanks{font-family:'Great Vibes',cursive; font-size:40px; margin:6px 0 0; line-height:1.2}

/* ---- tombol melayang ---- */
.tk2-fab{position:fixed; right:16px; bottom:16px; width:42px; height:42px; border-radius:50%; border:1px solid rgba(244,239,230,.55); background:var(--wine); color:var(--on-wine); display:grid; place-items:center; cursor:pointer; z-index:30; box-shadow:0 4px 14px rgba(40,8,16,.35)}

/* ---- modal QR ---- */
.tk2-modal{position:fixed; inset:0; z-index:80; background:rgba(30,8,14,.82); display:flex; overflow-y:auto; padding:20px; animation:tk2-fade .25s ease both}
.tk2-modal-in{margin:auto; width:100%; max-width:340px; background-color:var(--cream); border-radius:6px; overflow:hidden; animation:tk2-pop .3s cubic-bezier(.2,.8,.2,1) both; text-align:center}
.tk2-modal-body{padding:0 24px 26px; margin-top:-6px}
.tk2-qr{display:flex; justify-content:center; margin:14px 0 6px}
.tk2-qr img{background:#fff; padding:6px; border-radius:8px; box-shadow:0 0 0 1px rgba(0,0,0,.12); display:block}
.tk2-qhint{font-size:10.5px; font-style:italic; color:var(--ink-s); margin:0 0 16px; line-height:1.7}
@keyframes tk2-fade{from{opacity:0} to{opacity:1}}
@keyframes tk2-pop{from{opacity:0; transform:translateY(14px) scale(.97)} to{opacity:1; transform:none}}
@media (prefers-reduced-motion:reduce){
  .tk2-letter,.tk2-flap,.tk2-cover,.tk2-modal,.tk2-modal-in{transition:none; animation:none}
}
`;