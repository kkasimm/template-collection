import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  RomanticVeilWedding.jsx — undangan gelap navy + emas (romantic veil)
 *
 *  Alur   : hero sebagai cover (Open Invitation / View My Attendance QR)
 *           -> isi undangan (scroll)
 *  Data   : susunan array (COUPLE, EVENTS, LOVE_STORY, MEMORIES, BANK_ACCOUNTS,
 *           GIFT_PHONE, COVER_PHOTO, AUDIO_URL). Tanggal & jam otomatis dari
 *           EVENTS[0].date + EVENTS[0].time. Semua bisa dikirim lewat props.
 *  QR     : QR unik per tamu lewat api.qrserver.com
 *  Tamu   : nama dari ?to=Nama+Tamu (atau ?nama=)
 * ------------------------------------------------------------------ */

const L = {
  invitedScript: "You're invited",
  dear: "DEAR",
  open: "OPEN INVITATION",
  qr: "VIEW MY ATTENDANCE QR",
  scroll: "SCROLL",
  invLabel: "AN INVITATION",
  invTitle: "Join Our Celebration",
  invText: "With joyful hearts, we invite you to celebrate the beginning of our next chapter together. Your presence will make the day truly unforgettable.",
  d: "DAYS", h: "HOURS", m: "MINS", s: "SECS",
  passed: "The big day is here",
  addCal: "ADD TO CALENDAR",
  journeyLabel: "OUR JOURNEY",
  journeyTitle: "How It All Began",
  journeyText: "Some say it was fate, we just know it was the best thing that ever happened. Here is a little glimpse into our journey together.",
  chapter: "CHAPTER",
  ourStory: "OUR STORY",
  closeStory: "CLOSE",
  galleryLabel: "OUR MOMENTS",
  galleryTitle: "Captured Moments",
  planLabel: "THE PLAN",
  planTitle: "Event Details",
  followedBy: "FOLLOWED BY",
  directions: "GET DIRECTIONS",
  copyAddr: "Copy venue",
  copied: "Copied",
  coupleLabel: "OUR FAVORITE PEOPLE",
  coupleTitle: "The Couple",
  coupleText: "Two hearts, one story. Meet the people at the center of our celebration.",
  groom: "THE GROOM",
  bride: "THE BRIDE",
  joinLabel: "JOIN US",
  joinTitle: "Will you be there?",
  rsvpText: "We kindly request that you confirm your attendance so we can finalize our preparations for this special day.",
  rsvpBtn: "RSVP",
  name: "NAME",
  attend: "ATTENDANCE",
  yes: "Joyfully attending",
  no: "Regretfully declining",
  message: "WISHES & PRAYERS",
  confirm: "CONFIRM",
  rsvpThanks: "Thank you! Your attendance has been confirmed.",
  giftLabel: "WITH LOVE",
  giftTitle: "Wedding Gift",
  giftText: "Your presence is the greatest gift. Should you wish to give something more, we are grateful for your kindness.",
  copyNo: "COPY NUMBER",
  sendGift: "SEND A GIFT",
  giftHint: "Contact us for the delivery address:",
  thanks: "Thank You",
  thanksSub: "We can't wait to celebrate with you",
  qrTitle: "ATTENDANCE QR",
  qrHint: "This code is unique to you. Please show this QR to the staff at check-in.",
  close: "CLOSE",
};

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
  { id: "akad", title: "Akad Nikah", date: "Sunday, 23 November 2028", time: "08.00 – 12.00 WIB", venue: "HOTEL SATU HATI", mapsUrl: "https://maps.google.com", photo: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=600&fit=crop" },
  { id: "resepsi", title: "Resepsi", date: "Sunday, 23 November 2028", time: "08.00 – 12.00 WIB", venue: "HOTEL SATU HATI", mapsUrl: "https://maps.google.com", photo: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&h=600&fit=crop" },
];

const STORY_TEXT = "Mereka bertemu tanpa rencana, hanya dua orang asing yang kebetulan berada di tempat yang sama pada waktu yang tepat. Dari sapaan singkat yang awalnya biasa saja, tiba-tiba muncul percakapan yang terasa hangat dan berbeda.";
const LOVE_STORY = [
  { track: 1, title: "Pertemuan Kita", text: STORY_TEXT, photo: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop" },
  { track: 2, title: "Jatuh Cinta", text: STORY_TEXT, photo: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop" },
  { track: 3, title: "Mengikat Cinta", text: STORY_TEXT, photo: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop" },
  { track: 4, title: "Married", text: STORY_TEXT, photo: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=600&fit=crop" },
];

const MEMORIES = [
  { title: "Sedia Aku Sebelum Hujan", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&h=700&fit=crop&crop=face" },
  { title: "Cinta Luar Biasa", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&h=700&fit=crop&crop=face" },
  { title: "Bawa Dia Kembali", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=700&h=700&fit=crop&crop=face" },
  { title: "Sampai Menutup Mata", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&h=700&fit=crop&crop=face" },
  { title: "Komang - Raim Laode", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&h=700&fit=crop&crop=face" },
  { title: "Mencintaimu", photo: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=700&h=700&fit=crop&crop=face" },
];

const COVER_PHOTO = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&h=1400&fit=crop";
const AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const BANK_ACCOUNTS = [
  { bank: "BCA", accountNumber: "98122XXXX", accountName: "Pramarta Andita", color: "#005BAC" },
  { bank: "MANDIRI", accountNumber: "75021XXXX", accountName: "Aminudin Syahputra", color: "#E8A000" },
];
const GIFT_PHONE = "+62 812-XXXX-XXXX";

/* ─── Guest QR ─── */
const guestCodeOf = (name) => btoa(unescape(encodeURIComponent(name))).slice(0, 10);
const buildQrPayload = ({ groom, bride, guestName, dateText }) =>
  `The Wedding Of ${groom} & ${bride}\nTamu: ${guestName}\nTanggal: ${dateText}\nKode: ${guestCodeOf(guestName)}`;
const buildQrUrl = (payload, color = "121212") =>
  `https://api.qrserver.com/v1/create-qr-code/?size=230x230&margin=8&color=${color}&bgcolor=ffffff&data=${encodeURIComponent(payload)}`;

/* ─── helper tanggal & jam ─── */
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_ID = ["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"];
const MON3 = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const pad2 = (n) => String(n).padStart(2, "0");
const upper = (s = "") => String(s).toUpperCase();
const titleCase = (s = "") => String(s).toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

const eventDateISO = (text = "") => {
  const m = String(text).match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return "2025-06-21";
  const name = m[2].toLowerCase();
  let mi = MONTHS.findIndex((x) => x.toLowerCase() === name);
  if (mi < 0) mi = MONTHS_ID.indexOf(name);
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
const gcalUrl = (ev, coupleText) => {
  const day = eventDateISO(ev.date).replace(/-/g, "");
  const times = [...String(ev.time || "").matchAll(/(\d{1,2})[.:](\d{2})/g)].map((x) => [Number(x[1]), x[2]]);
  const [a, b] = times;
  const start = a ? `${pad2(a[0])}${a[1]}00` : "080000";
  const end = b ? `${pad2(b[0])}${b[1]}00` : `${pad2(Math.min(23, (a ? a[0] : 8) + 2))}${a ? a[1] : "00"}00`;
  const text = `${ev.title} — ${coupleText}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${day}T${start}/${day}T${end}&location=${encodeURIComponent(ev.venue || "")}`;
};

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
      { threshold: 0.08 }
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
        transform: visible ? "none" : "translateY(22px)",
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- ikon garis ---------- */
function Ic({ children, size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
      {children}
    </svg>
  );
}
const IPin = (p) => <Ic {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.4" /></Ic>;
const ICal = (p) => <Ic {...p}><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></Ic>;
const IClock = (p) => <Ic {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Ic>;
const ICopy = (p) => <Ic {...p}><rect x="8.5" y="8.5" width="11" height="11" rx="2" /><path d="M15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" /></Ic>;
const IGlobe = (p) => <Ic {...p}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.3 3.5 8.5S14.5 18 12 20.5C9.5 18 8.5 15.2 8.5 12S9.5 6 12 3.5z" /></Ic>;
const IQr = (p) => <Ic {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM20 14v.01M14 20h3M20 17v4" /></Ic>;
const INote = (p) => <Ic {...p}><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></Ic>;

function Photo({ src, ratio = "4 / 5", alt = "", radius = 14 }) {
  return (
    <div className="rv-photo" style={{ aspectRatio: ratio, borderRadius: radius }}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : null}
    </div>
  );
}
function Head({ label, title, text }) {
  return (
    <Reveal>
      {label && <p className="rv-label">{label}</p>}
      <h2 className="rv-title">{title}</h2>
      {text && <p className="rv-it">{text}</p>}
    </Reveal>
  );
}

/* ================================================================== */
export default function RomanticVeilWedding({
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
  const dateText = `${wd} ${MONTHS[wm - 1]} ${wy}`;
  const nameA = couple.groom.shortName;
  const nameB = couple.bride.shortName;
  const coupleText = `${nameA} & ${nameB}`;
  const mainVenue = events[0]?.venue || "";

  const [guestName, setGuestName] = useState("Nama Tamu");
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to") || params.get("nama");
      if (to && to.trim()) setGuestName(to.trim());
    } catch (e) { /* no query params */ }
  }, []);

  useEffect(() => {
    if (document.getElementById("rv-fonts")) return;
    const l = document.createElement("link");
    l.id = "rv-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap";
    document.head.appendChild(l);
  }, []);

  const [opened, setOpened] = useState(false);
  const audioRef = useRef(null);
  const nextRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const openInvite = () => {
    if (opened) return;
    setOpened(true);
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    setTimeout(() => nextRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" }), 80);
  };
  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  };

  const [showQR, setShowQR] = useState(false);
  useEffect(() => {
    if (!showQR) return;
    const onKey = (e) => e.key === "Escape" && setShowQR(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showQR]);
  const qrUrl = buildQrUrl(buildQrPayload({ groom: nameA, bride: nameB, guestName, dateText }), "16162f");

  const countdown = useCountdown(target);
  const isPast = new Date(target) <= new Date();
  const cd = [
    [countdown.days, L.d],
    [countdown.hours, L.h],
    [countdown.minutes, L.m],
    [countdown.seconds, L.s],
  ];
  const lead = new Date(wy, wm - 1, 1).getDay();
  const totalDays = new Date(wy, wm, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: totalDays }, (_, i) => i + 1)];

  const [ch, setCh] = useState(0);
  const [showStory, setShowStory] = useState(false);
  const chap = loveStory[Math.min(ch, Math.max(loveStory.length - 1, 0))];
  useEffect(() => {
    if (!showStory) return;
    const onKey = (e) => e.key === "Escape" && setShowStory(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showStory]);

  const [showForm, setShowForm] = useState(false);
  const [rsvp, setRsvp] = useState({ name: "", message: "", attend: "hadir" });
  const [submitted, setSubmitted] = useState(false);
  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    try { await onRsvp?.({ ...rsvp, guestName }); } catch (_) {}
    setSubmitted(true);
  };

  const [copied, setCopied] = useState("");
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(""), 1800);
    } catch (_) {}
  };

  /* galeri dua kolom: tinggi total kedua kolom dibuat seimbang */
  const colA = memories.filter((_, i) => i % 2 === 0);
  const colB = memories.filter((_, i) => i % 2 === 1);
  const ratiosA = ["4 / 5", "1 / 1", "3 / 4"];
  const ratiosB = ["1 / 1", "4 / 5", "3 / 4"];

  const rsvpPhoto = events[events.length - 1]?.photo || coverPhoto;

  return (
    <div className={`rv-root ${!opened ? "rv-locked" : ""}`}>
      <style>{css}</style>

      <main className="rv-col">
        {/* ===== 1. HERO / COVER ===== */}
        <section className="rv-hero">
          <img className="rv-hero-bg" src={coverPhoto} alt="" />
          <div className="rv-hero-fade" />
          <div className="rv-hero-mid">
            <p className="rv-script">{L.invitedScript}</p>
            <h1 className="rv-date">
              <span>{MON3[wm - 1]}</span>
              <span>{wd}</span>
              <span>{wy}</span>
            </h1>
          </div>
          <div className="rv-hero-foot">
            <div className="rv-names"><span>{upper(nameA)}</span><i>&amp;</i><span>{upper(nameB)}</span></div>
            <hr />
            {mainVenue && <p className="rv-venue">{titleCase(mainVenue)}</p>}
            {!opened ? (
              <div className="rv-cover-box">
                <p className="rv-dear">{L.dear}</p>
                <p className="rv-guest">{guestName}</p>
                <button className="rv-btn" onClick={openInvite}>{L.open}</button>
                <button className="rv-btn ghost" onClick={() => setShowQR(true)}><IQr size={14} />{L.qr}</button>
              </div>
            ) : (
              <p className="rv-scroll">{L.scroll}<i /></p>
            )}
          </div>
        </section>

        {/* ===== 2. INVITATION + KALENDER + HITUNG MUNDUR ===== */}
        <section className="rv-sec" ref={nextRef}>
          <Head label={L.invLabel} title={L.invTitle} text={L.invText} />
          <Reveal delay={80}>
            <div className="rv-card rv-cal">
              <p className="rv-cal-m">{MONTHS[wm - 1]} {wy}</p>
              <div className="rv-cal-g">
                {["S", "M", "T", "W", "T", "F", "S"].map((w, i) => <span key={i} className="rv-cal-w">{w}</span>)}
                {cells.map((n, i) => <span key={i} className={n === wd ? "rv-cal-d on" : "rv-cal-d"}>{n || ""}</span>)}
              </div>
              {isPast ? (
                <p className="rv-passed">{L.passed}</p>
              ) : (
                <div className="rv-cd" role="timer" aria-label="Countdown to the wedding">
                  {cd.map(([n, lab]) => (
                    <div key={lab}>
                      <b>{pad2(n)}</b>
                      <small>{lab}</small>
                    </div>
                  ))}
                </div>
              )}
              {events[0] && <a className="rv-btn ghost wide" href={gcalUrl(events[0], coupleText)} target="_blank" rel="noreferrer"><ICal size={14} />{L.addCal}</a>}
            </div>
          </Reveal>
        </section>

        {/* ===== 3. KISAH ===== */}
        {loveStory.length > 0 && (
          <section className="rv-sec">
            <Head label={L.journeyLabel} title={L.journeyTitle} text={L.journeyText} />
            <Reveal delay={80}>
              <div className="rv-story">
                <div className="rv-story-in">
                  {chap.photo && <Photo src={chap.photo} ratio="16 / 10" alt={chap.title} radius={12} />}
                  <p className="rv-label sm">{L.chapter} {pad2(chap.track)}</p>
                  <h3 className="rv-story-t">{chap.title}</h3>
                  <p className="rv-story-x">{chap.text}</p>
                  <button className="rv-btn" onClick={() => setShowStory(true)}>{L.ourStory}</button>
                </div>
                {loveStory.length > 1 && (
                  <div className="rv-dots">
                    {loveStory.map((k, i) => (
                      <button key={k.track} className={i === ch ? "on" : ""} onClick={() => setCh(i)} aria-label={`${L.chapter} ${pad2(k.track)}`} />
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </section>
        )}

        {/* ===== 4. GALERI ===== */}
        {memories.length > 0 && (
          <section className="rv-sec">
            <Head label={L.galleryLabel} title={L.galleryTitle} />
            <Reveal delay={80}>
              <div className="rv-masonry">
                <div>{colA.map((m, i) => <Photo key={m.title + i} src={m.photo} ratio={ratiosA[i % ratiosA.length]} alt={m.title} />)}</div>
                <div>{colB.map((m, i) => <Photo key={m.title + i} src={m.photo} ratio={ratiosB[i % ratiosB.length]} alt={m.title} />)}</div>
              </div>
            </Reveal>
          </section>
        )}

        {/* ===== 5. TIMELINE ===== */}
        {events.length > 0 && (
          <section className="rv-sec">
            <Head label={L.planLabel} title={L.planTitle} />
            <ol className="rv-tl">
              {events.map((e, i) => (
                <li key={e.id} className={i % 2 === 0 ? "l" : "r"}>
                  <Reveal delay={i * 80} className="rv-tl-t">
                    <b>{e.time}</b>
                    <span>{e.title}</span>
                    {e.venue && <small>{titleCase(e.venue)}</small>}
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ===== 6. KARTU ACARA ===== */}
        {events.length > 0 && (
          <section className="rv-cards">
            {events.map((e, i) => (
              <div key={e.id}>
                {i > 0 && <div className="rv-follow"><i /><span>{L.followedBy}</span><i /></div>}
                <Reveal>
                  <div className="rv-card">
                    {e.photo && <Photo src={e.photo} ratio="16 / 9" alt={e.venue} radius={12} />}
                    <h3 className="rv-ecard-t">{e.title}</h3>
                    <ul className="rv-rows">
                      {e.date && <li><ICal /><span>{e.date}</span></li>}
                      {e.time && <li><IClock /><span>{e.time}</span></li>}
                      {e.venue && (
                        <li>
                          <IPin /><span>{titleCase(e.venue)}</span>
                          <button className="rv-copy" onClick={() => copy(e.venue)} aria-label={L.copyAddr} title={L.copyAddr}>
                            {copied === e.venue ? <small>{L.copied}</small> : <ICopy size={14} />}
                          </button>
                        </li>
                      )}
                    </ul>
                    <div className="rv-actions">
                      {e.mapsUrl && <a className="rv-btn" href={e.mapsUrl} target="_blank" rel="noreferrer"><IGlobe size={14} />{L.directions}</a>}
                      <a className="rv-btn ghost" href={gcalUrl(e, coupleText)} target="_blank" rel="noreferrer"><ICal size={14} />{L.addCal}</a>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </section>
        )}

        {/* ===== 7. THE COUPLE ===== */}
        <section className="rv-sec">
          <Head label={L.coupleLabel} title={L.coupleTitle} text={L.coupleText} />
          <div className="rv-duo">
            {[
              [couple.groom, L.groom],
              [couple.bride, L.bride],
            ].map(([c, role], i) => (
              <div key={role}>
                {i > 0 && <p className="rv-amp" aria-hidden="true">&amp;</p>}
                <Reveal>
                  <div className="rv-person">
                    <div className="rv-circle"><Photo src={c.photo} ratio="1 / 1" alt={c.name} radius={999} /></div>
                    <p className="rv-role">{role}</p>
                    <h3>{c.name}</h3>
                    {c.parent && <p className="rv-par">{c.parent}</p>}
                    {c.instagram && (
                      <a href={`https://instagram.com/${c.instagram.replace("@", "")}`} target="_blank" rel="noreferrer">@{c.instagram.replace("@", "")}</a>
                    )}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 8. RSVP ===== */}
        <section className="rv-join">
          <Reveal className="rv-pad">
            <p className="rv-label">{L.joinLabel}</p>
            <h2 className="rv-title">{L.joinTitle}</h2>
          </Reveal>
          <Reveal delay={60}>
            <div className="rv-banner"><Photo src={rsvpPhoto} ratio="16 / 9" alt="" radius={0} /></div>
          </Reveal>
          <Reveal className="rv-pad" delay={80}>
            <p className="rv-it">{L.rsvpText}</p>
            {submitted ? (
              <p className="rv-sent">{L.rsvpThanks}</p>
            ) : !showForm ? (
              <button className="rv-btn" onClick={() => setShowForm(true)}>{L.rsvpBtn}</button>
            ) : (
              <form className="rv-form" onSubmit={handleRsvpSubmit}>
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
                <button className="rv-btn" type="submit">{L.confirm}</button>
              </form>
            )}
          </Reveal>
        </section>

        {/* ===== 9. HADIAH ===== */}
        {(bankAccounts.length > 0 || giftPhone) && (
          <section className="rv-sec">
            <Head label={L.giftLabel} title={L.giftTitle} text={L.giftText} />
            <div className="rv-gifts">
              {bankAccounts.map((r, i) => (
                <Reveal key={r.bank} delay={i * 80}>
                  <div className="rv-card">
                    <p className="rv-label"><i className="rv-dot" style={{ background: r.color }} />{upper(r.bank)}</p>
                    <p className="rv-acc">{r.accountNumber}</p>
                    <p className="rv-an">a.n. {r.accountName}</p>
                    <button className="rv-btn ghost wide" onClick={() => copy(r.accountNumber)}><ICopy size={14} />{copied === r.accountNumber ? upper(L.copied) : L.copyNo}</button>
                  </div>
                </Reveal>
              ))}
              {giftPhone && (
                <Reveal delay={bankAccounts.length * 80}>
                  <div className="rv-card">
                    <p className="rv-label">{L.sendGift}</p>
                    <p className="rv-an">{L.giftHint}</p>
                    <a className="rv-acc rv-phone" href={`https://wa.me/${giftPhone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{giftPhone}</a>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* ===== 10. PENUTUP ===== */}
        <section className="rv-end">
          <img src={coverPhoto} alt="" />
          <div className="rv-end-fade" />
          <div className="rv-end-in">
            <p className="rv-script">{L.thanks}</p>
            <p className="rv-end-n">{upper(nameA)} &amp; {upper(nameB)}</p>
            <p className="rv-end-s">{L.thanksSub}</p>
            <p className="rv-end-d">{wd} {upper(MONTHS[wm - 1])} {wy}</p>
          </div>
        </section>
      </main>

      {/* ===== tombol melayang (sejajar dengan kolom undangan) ===== */}
      {opened && (
        <div className="rv-fabs">
          <button className="rv-fab" onClick={() => setShowQR(true)} aria-label={L.qrTitle}><IQr size={17} /></button>
          {audioUrl && (
            <button className={`rv-fab ${playing ? "on" : ""}`} onClick={toggleMusic} aria-label={playing ? "Pause music" : "Play music"}>
              {playing ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4.5" height="16" /><rect x="13.5" y="4" width="4.5" height="16" /></svg>
              ) : <INote size={16} />}
            </button>
          )}
        </div>
      )}
      {audioUrl && <audio ref={audioRef} src={audioUrl} loop preload="none" />}

      {showStory && (
        <div className="rv-modal" role="dialog" aria-modal="true" aria-label={L.journeyTitle} onClick={() => setShowStory(false)}>
          <div className="rv-modal-in wide" onClick={(e) => e.stopPropagation()}>
            <p className="rv-label">{L.journeyLabel}</p>
            <h2 className="rv-title">{L.journeyTitle}</h2>
            {loveStory.map((k) => (
              <article key={k.track} className="rv-chap">
                {k.photo && <Photo src={k.photo} ratio="16 / 10" alt={k.title} radius={12} />}
                <p className="rv-label sm">{L.chapter} {pad2(k.track)}</p>
                <h3 className="rv-story-t">{k.title}</h3>
                <p className="rv-story-x full">{k.text}</p>
              </article>
            ))}
            <button className="rv-btn" onClick={() => setShowStory(false)}>{L.closeStory}</button>
          </div>
        </div>
      )}

      {showQR && (
        <div className="rv-modal" role="dialog" aria-modal="true" aria-label={L.qrTitle} onClick={() => setShowQR(false)}>
          <div className="rv-modal-in" onClick={(e) => e.stopPropagation()}>
            <p className="rv-label">{L.qrTitle}</p>
            <p className="rv-script sm">{nameA} &amp; {nameB}</p>
            <p className="rv-guest">{guestName}</p>
            <div className="rv-qr"><img src={qrUrl} alt="QR Code Kehadiran" width={200} height={200} /></div>
            <p className="rv-it small">{L.qrHint}</p>
            <button className="rv-btn" onClick={() => setShowQR(false)}>{L.close}</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
const css = `
.rv-root{
  --bg:#171733; --card:#222246; --card2:#2a2a52; --gold:#d6b56d; --text:#ebe8f2; --mute:#aeacc4;
  --line:rgba(214,181,109,.38); --edge:rgba(255,255,255,.08);
  --gap:56px; --pad:24px;
  font-family:'Montserrat',system-ui,sans-serif; color:var(--text); background:#0b0b1c; min-height:100vh;
  -webkit-font-smoothing:antialiased;
}
.rv-root *{box-sizing:border-box}
.rv-locked{height:100vh; height:100dvh; overflow:hidden}
.rv-col{width:100%; max-width:430px; margin:0 auto; background:var(--bg); position:relative; overflow:hidden}
@media (min-width:700px){.rv-col{box-shadow:0 0 0 1px rgba(214,181,109,.15), 0 24px 70px rgba(0,0,0,.55)}}

/* ---- tipografi ---- */
.rv-label{font-size:10.5px; letter-spacing:.26em; text-transform:uppercase; color:var(--gold); text-align:center; margin:0 0 12px; font-weight:500; display:flex; align-items:center; justify-content:center; gap:8px}
.rv-label.sm{margin:18px 0 6px}
.rv-title{font-family:'Playfair Display',Georgia,serif; font-size:26px; font-weight:500; text-align:center; margin:0 0 16px; line-height:1.25}
.rv-it{font-family:'Playfair Display',Georgia,serif; font-style:italic; font-size:14.5px; line-height:1.75; color:var(--mute); text-align:center; margin:0 auto 28px; max-width:330px}
.rv-it.small{font-size:13px; margin:10px auto 20px}
.rv-script{font-family:'Great Vibes',cursive; font-size:clamp(24px,4.4vh,34px); line-height:1.1; color:rgba(255,255,255,.9); text-align:center; margin:0}
.rv-script.sm{font-size:32px; margin:4px 0 8px; color:var(--gold)}

/* ---- struktur section ---- */
.rv-sec{padding:var(--gap) var(--pad) 0; text-align:center}
.rv-pad{padding-left:var(--pad); padding-right:var(--pad)}
.rv-photo{width:100%; overflow:hidden; background:#26264a}
.rv-photo img{width:100%; height:100%; object-fit:cover; display:block}
.rv-card{background:var(--card); border:1px solid var(--edge); border-radius:22px; padding:16px; text-align:center}
.rv-card>.rv-photo{margin-bottom:18px}

/* ---- tombol ---- */
.rv-btn{display:inline-flex; align-items:center; justify-content:center; gap:8px; background:var(--gold); color:#1a1a35; border:1px solid var(--gold); border-radius:999px; padding:13px 26px; font:600 11px 'Montserrat',sans-serif; letter-spacing:.16em; text-decoration:none; cursor:pointer; transition:background .2s}
.rv-btn:hover{background:#e3c887}
.rv-btn.ghost{background:transparent; color:var(--text); border-color:rgba(255,255,255,.22)}
.rv-btn.ghost:hover{background:rgba(255,255,255,.06)}
.rv-btn.wide{display:flex; width:100%}
.rv-btn:focus-visible,.rv-fab:focus-visible,.rv-copy:focus-visible,.rv-dots button:focus-visible,.rv-form input:focus-visible,.rv-form select:focus-visible,.rv-form textarea:focus-visible,.rv-person a:focus-visible,.rv-phone:focus-visible{outline:2px solid var(--gold); outline-offset:3px}

/* ---- hero ---- */
.rv-hero{position:relative; height:100vh; height:100dvh; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden}
.rv-hero-bg{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 30%}
.rv-hero-fade{position:absolute; inset:0; background:linear-gradient(180deg,rgba(23,23,51,.05) 0%,rgba(23,23,51,.12) 38%,rgba(23,23,51,.78) 78%,var(--bg) 100%)}
.rv-hero-mid{position:relative; z-index:2; text-align:center; margin-bottom:clamp(10px,3vh,24px)}
.rv-date{font-family:'Playfair Display',Georgia,serif; font-weight:700; font-size:clamp(36px,8.4vh,64px); line-height:.95; color:#fff; margin:4px 0 0; text-shadow:0 2px 24px rgba(0,0,0,.35)}
.rv-date span{display:block}
.rv-hero-foot{position:relative; z-index:2; padding:0 var(--pad) calc(clamp(14px,3.6vh,32px) + env(safe-area-inset-bottom,0px))}
.rv-names{display:flex; justify-content:center; align-items:center; gap:14px; font-size:12px; letter-spacing:.24em; font-weight:500; color:#fff}
.rv-names i{font-family:'Great Vibes',cursive; font-style:normal; font-size:26px; letter-spacing:0; color:var(--gold); line-height:1}
.rv-hero-foot hr{border:0; border-top:1px solid rgba(255,255,255,.35); margin:clamp(8px,1.5vh,12px) 0}
.rv-venue{font-family:'Playfair Display',serif; font-style:italic; font-size:14.5px; text-align:center; margin:0; color:rgba(255,255,255,.9)}
.rv-cover-box{display:flex; flex-direction:column; align-items:center; gap:clamp(7px,1.4vh,10px); margin-top:clamp(10px,2.6vh,22px)}
.rv-dear{font-size:10.5px; letter-spacing:.3em; color:var(--gold); margin:0}
.rv-guest{font-family:'Playfair Display',serif; font-size:clamp(17px,2.9vh,22px); line-height:1.2; margin:-2px 0 clamp(2px,.8vh,6px); text-align:center; overflow-wrap:anywhere}
.rv-cover-box .rv-btn{width:100%; max-width:300px; padding:clamp(10px,1.8vh,13px) 20px}
.rv-scroll{display:flex; flex-direction:column; align-items:center; gap:6px; font-size:10px; letter-spacing:.3em; margin:clamp(12px,2.6vh,22px) 0 0; color:rgba(255,255,255,.75)}
.rv-scroll i{display:block; width:1px; height:22px; background:rgba(255,255,255,.6); animation:rv-scroll 1.8s ease-in-out infinite}
@keyframes rv-scroll{0%,100%{transform:scaleY(.4); transform-origin:top} 50%{transform:scaleY(1); transform-origin:top}}
@media (max-height:640px){
  .rv-dear,.rv-venue{display:none}
}
@media (max-height:520px){
  .rv-script,.rv-guest{display:none}
  .rv-date{font-size:30px}
  .rv-date span{display:inline}
  .rv-date span+span{margin-left:.28em}
  .rv-cover-box{flex-direction:row; flex-wrap:wrap; justify-content:center}
  .rv-cover-box .rv-btn{width:auto; max-width:none; flex:1 1 180px}
  .rv-scroll i{height:12px}
}

/* ---- kalender + hitung mundur (satu kartu) ---- */
.rv-cal{padding:26px 18px 18px}
.rv-cal-m{font-family:'Playfair Display',serif; font-size:24px; margin:0 0 18px}
.rv-cal-g{display:grid; grid-template-columns:repeat(7,1fr); row-gap:8px; max-width:310px; margin:0 auto 24px; text-align:center}
.rv-cal-w{font-size:10.5px; color:var(--mute); letter-spacing:.1em; padding-bottom:6px}
.rv-cal-d{font-size:13px; height:32px; line-height:32px; color:var(--mute); font-weight:300}
.rv-cal-d.on{color:var(--gold); border:1px solid var(--gold); border-radius:50%; width:32px; margin:0 auto; background:rgba(214,181,109,.12); font-weight:500}
.rv-cd{display:grid; grid-template-columns:repeat(4,1fr); max-width:310px; margin:0 auto 20px; padding:16px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); text-align:center}
.rv-cd>div+div{border-left:1px solid var(--edge)}
.rv-cd b{display:block; font-family:'Playfair Display',serif; font-weight:400; font-size:30px; line-height:1.1; color:var(--gold); font-variant-numeric:tabular-nums}
.rv-cd small{display:block; font-size:9.5px; letter-spacing:.18em; color:var(--mute); margin-top:6px}
.rv-passed{font-family:'Great Vibes',cursive; font-size:32px; color:var(--gold); margin:0 0 22px}

/* ---- kisah ---- */
.rv-story{background:var(--card); border-radius:22px; padding:12px; border:1px solid var(--edge)}
.rv-story-in{background:var(--card2); border-radius:16px; padding:12px 16px 22px}
.rv-story-t{font-family:'Playfair Display',serif; font-style:italic; font-weight:500; font-size:21px; margin:0 0 10px; line-height:1.3}
.rv-story-x{font-size:12.5px; line-height:1.8; color:var(--mute); margin:0 auto 18px; max-width:310px; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden}
.rv-story-x.full{display:block; -webkit-line-clamp:unset; margin-bottom:0}
.rv-dots{display:flex; justify-content:center; gap:2px; padding:8px 0 0}
.rv-dots button{width:26px; height:26px; border:0; padding:9px; background:rgba(255,255,255,.25); background-clip:content-box; border-radius:50%; cursor:pointer}
.rv-dots button.on{background:var(--gold); background-clip:content-box}

/* ---- galeri ---- */
.rv-masonry{display:grid; grid-template-columns:1fr 1fr; gap:10px; align-items:start}
.rv-masonry>div{display:flex; flex-direction:column; gap:10px}

/* ---- timeline ---- */
.rv-tl{list-style:none; margin:0; padding:0; position:relative}
.rv-tl::before{content:""; position:absolute; left:50%; top:8px; bottom:30px; border-left:1px solid var(--line)}
.rv-tl li{position:relative; display:grid; grid-template-columns:1fr 1fr; column-gap:28px; padding-bottom:28px}
.rv-tl li::before{content:""; position:absolute; left:50%; top:6px; width:7px; height:7px; border-radius:50%; background:var(--gold); transform:translateX(-50%); z-index:1}
.rv-tl li.l .rv-tl-t{grid-column:1; text-align:right}
.rv-tl li.r .rv-tl-t{grid-column:2; text-align:left}
.rv-tl-t b{display:block; font-size:12.5px; font-weight:600}
.rv-tl-t span{display:block; font-family:'Playfair Display',serif; font-size:14px; margin-top:4px}
.rv-tl-t small{display:block; font-size:11px; color:var(--mute); margin-top:4px; line-height:1.5}

/* ---- kartu acara ---- */
.rv-cards{padding:20px var(--pad) 0}
.rv-ecard-t{font-family:'Playfair Display',serif; font-size:22px; font-weight:500; margin:0 0 14px; line-height:1.3}
.rv-rows{list-style:none; margin:0 0 16px; padding:0; text-align:left; border-top:1px solid var(--edge)}
.rv-rows li{display:flex; align-items:center; gap:12px; padding:12px 4px; font-size:13px; border-bottom:1px solid var(--edge)}
.rv-rows li>svg{color:var(--gold)}
.rv-rows li>span{flex:1; min-width:0; overflow-wrap:anywhere}
.rv-copy{background:transparent; border:1px solid rgba(255,255,255,.18); color:var(--mute); border-radius:8px; min-width:32px; height:32px; padding:0 8px; display:grid; place-items:center; cursor:pointer}
.rv-copy small{font-size:10px; letter-spacing:.06em; color:var(--gold)}
.rv-actions{display:grid; gap:10px}
.rv-actions .rv-btn{width:100%}
.rv-follow{display:flex; flex-direction:column; align-items:center; gap:10px; padding:24px 0}
.rv-follow i{display:block; width:1px; height:24px; background:var(--line)}
.rv-follow span{font-size:10px; letter-spacing:.28em; color:var(--mute)}

/* ---- hadiah ---- */
.rv-gifts{display:grid; gap:14px}
.rv-acc{font-family:'Playfair Display',serif; font-size:25px; letter-spacing:.06em; margin:8px 0 4px; line-height:1.2; overflow-wrap:anywhere}
.rv-an{font-family:'Playfair Display',serif; font-style:italic; font-size:13.5px; color:var(--mute); margin:0 0 16px}
.rv-phone{display:inline-block; color:var(--gold); text-decoration:none; border-bottom:1px solid var(--line); font-size:22px; margin-bottom:6px}
.rv-dot{width:8px; height:8px; border-radius:50%; display:inline-block}

/* ---- pasangan: satu kolom ---- */
.rv-duo{display:flex; flex-direction:column; align-items:center}
.rv-amp{font-family:'Great Vibes',cursive; font-size:44px; line-height:1; color:var(--gold); margin:30px 0 26px}
.rv-person{text-align:center}
.rv-circle{width:176px; aspect-ratio:1/1; margin:0 auto 18px; border-radius:50%; padding:5px; border:1.5px solid var(--gold); background:var(--bg)}
.rv-circle .rv-photo{height:100%}
.rv-role{font-size:10.5px; letter-spacing:.26em; color:var(--gold); margin:0 0 8px}
.rv-person h3{font-family:'Playfair Display',serif; font-size:20px; font-weight:500; line-height:1.35; margin:0 auto 10px; max-width:300px}
.rv-par{font-family:'Playfair Display',serif; font-style:italic; font-size:13px; line-height:1.65; color:var(--mute); margin:0 auto 10px; max-width:280px}
.rv-person a{display:inline-block; font-size:12px; color:var(--gold); text-decoration:none; border-bottom:1px solid var(--line); letter-spacing:.06em}

/* ---- rsvp ---- */
.rv-join{padding:var(--gap) 0 0; text-align:center}
.rv-banner{margin:4px 0 28px}
.rv-form{display:grid; gap:18px; max-width:300px; margin:0 auto; text-align:left}
.rv-form label{display:grid; gap:6px}
.rv-form span{font-size:10.5px; letter-spacing:.22em; color:var(--gold)}
.rv-form input,.rv-form select,.rv-form textarea{width:100%; background:transparent; border:0; border-bottom:1px solid rgba(255,255,255,.3); border-radius:0; padding:8px 2px; font:400 14px 'Montserrat',sans-serif; color:var(--text); resize:none}
.rv-form option{color:#1a1a35}
.rv-form .rv-btn{justify-self:center; margin-top:6px}
.rv-sent{font-family:'Playfair Display',serif; font-style:italic; font-size:16px; line-height:1.5; color:var(--gold); margin:0}

/* ---- penutup ---- */
.rv-end{position:relative; margin-top:var(--gap); height:560px; overflow:hidden}
.rv-end img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 35%}
.rv-end-fade{position:absolute; inset:0; background:linear-gradient(180deg,var(--bg) 0%,rgba(23,23,51,.15) 35%,rgba(23,23,51,.65) 75%,var(--bg) 100%)}
.rv-end-in{position:absolute; left:0; right:0; bottom:0; padding:0 var(--pad) 64px; text-align:center}
.rv-end-n{font-size:13px; letter-spacing:.26em; font-weight:500; margin:10px 0 12px}
.rv-end-s{font-family:'Playfair Display',serif; font-style:italic; font-size:14px; color:rgba(255,255,255,.85); margin:0 0 16px}
.rv-end-d{font-size:10.5px; letter-spacing:.28em; color:var(--gold); margin:0}

/* ---- tombol melayang: menempel di sisi kanan kolom 430px ---- */
.rv-fabs{position:fixed; bottom:calc(16px + env(safe-area-inset-bottom,0px)); right:max(16px, calc(50% - 215px + 16px)); z-index:30; display:flex; flex-direction:column; gap:10px}
.rv-fab{width:44px; height:44px; border-radius:50%; border:1px solid var(--gold); background:var(--bg); color:var(--gold); display:grid; place-items:center; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,.45)}
.rv-fab.on{background:var(--gold); color:#1a1a35}

/* ---- modal ---- */
.rv-modal{position:fixed; inset:0; z-index:80; background:rgba(8,8,22,.82); display:flex; overflow-y:auto; padding:20px; animation:rv-fade .25s ease both}
.rv-modal-in{margin:auto; width:100%; max-width:340px; background:var(--card); border:1px solid var(--line); border-radius:22px; padding:30px 24px 26px; text-align:center; animation:rv-pop .3s cubic-bezier(.2,.8,.2,1) both}
.rv-modal-in.wide{max-width:390px}
.rv-chap{margin:0 0 26px; padding-bottom:24px; border-bottom:1px solid var(--edge)}
.rv-chap:last-of-type{border-bottom:0}
.rv-qr{display:flex; justify-content:center; margin:14px 0 4px}
.rv-qr img{background:#fff; padding:6px; border-radius:10px; display:block}
@keyframes rv-fade{from{opacity:0} to{opacity:1}}
@keyframes rv-pop{from{opacity:0; transform:translateY(14px) scale(.97)} to{opacity:1; transform:none}}
@media (prefers-reduced-motion:reduce){
  .rv-scroll i,.rv-modal,.rv-modal-in{animation:none}
}
`;