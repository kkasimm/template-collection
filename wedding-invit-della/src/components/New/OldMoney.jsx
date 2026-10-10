import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  OldMoneyWedding.jsx — undangan "old money"
 *  Palet: ivory, hijau botol, emas antik. Bingkai garis ganda, tanpa
 *  kemiringan/ornamen ramai; satu aksen: monogram + segel.
 * ------------------------------------------------------------------ */

const L = {
  dear: "Kepada Yth.",
  open: "Buka Undangan",
  qr: "QR Kehadiran",
  yes: "She said yes",
  glad: "Dengan hormat, kami mengundang Anda ke pernikahan kami pada",
  story: "Kisah Kami",
  chapter: "Bab",
  couple: "Mempelai",
  schedule: "Rangkaian Acara",
  dday: "Menuju Hari Bahagia",
  days: "Hari", hours: "Jam", min: "Menit", sec: "Detik",
  passed: "Hari ini adalah harinya",
  rsvp: "Konfirmasi Kehadiran",
  rsvpText: "Mohon konfirmasi kehadiran Anda",
  click: "Isi Konfirmasi",
  name: "Nama",
  attend: "Kehadiran",
  attending: "Dengan senang hati hadir",
  declining: "Mohon maaf, belum dapat hadir",
  message: "Ucapan & doa",
  confirm: "Kirim",
  thanksRsvp: "Terima kasih, konfirmasi Anda telah kami terima.",
  memories: "Kenangan",
  addresses: "Lokasi",
  openMap: "Buka peta",
  gift: "Hadiah Pernikahan",
  giftText: "Kehadiran Anda adalah hadiah terindah. Bila berkenan memberi lebih, kami menerimanya dengan penuh rasa syukur.",
  copy: "Salin nomor",
  copied: "Tersalin",
  sendGift: "Kirim hadiah",
  giftHint: "Hubungi kami untuk alamat pengiriman:",
  thank: "Terima Kasih",
  qrTitle: "QR Kehadiran",
  qrHint: "Kode ini khusus untuk Anda. Tunjukkan kepada petugas saat tiba di lokasi.",
  close: "Tutup",
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
  { bank: "BCA", accountNumber: "98122XXXX", accountName: "Pramarta Andita" },
  { bank: "MANDIRI", accountNumber: "75021XXXX", accountName: "Aminudin Syahputra" },
];
const GIFT_PHONE = "+62 812-XXXX-XXXX";

/* ─── Tanggal & jam otomatis dari EVENTS[0] ─── */
const _MID = ["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"];
const _MEN = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const eventDateISO = (text = "") => {
  const m = String(text).match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return "2025-06-21";
  const name = m[2].toLowerCase();
  let mi = _MEN.indexOf(name);
  if (mi < 0) mi = _MID.indexOf(name);
  return mi < 0 ? "2025-06-21" : `${m[3]}-${String(mi + 1).padStart(2, "0")}-${String(Number(m[1])).padStart(2, "0")}`;
};
const eventTimeISO = (text = "") => {
  const m = String(text).match(/(\d{1,2})[.:](\d{2})/);
  return m ? `${String(Number(m[1])).padStart(2, "0")}:${m[2]}:00` : "08:00:00";
};

/* ─── QR tamu ─── */
const guestCodeOf = (name) => btoa(unescape(encodeURIComponent(name))).slice(0, 10);
const buildQrPayload = ({ groom, bride, guestName, dateText }) =>
  `The Wedding Of ${groom} & ${bride}\nTamu: ${guestName}\nTanggal: ${dateText}\nKode: ${guestCodeOf(guestName)}`;
const buildQrUrl = (payload, color = "1f2a24") =>
  `https://api.qrserver.com/v1/create-qr-code/?size=230x230&margin=8&color=${color}&bgcolor=ffffff&data=${encodeURIComponent(payload)}`;

/* ─── helper tanggal ─── */
const MONTHS_L = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const MONTHS_ID = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const pad2 = (n) => String(n).padStart(2, "0");
const parseDate = (s) => {
  const [y, m, d] = String(s || "").split("-").map(Number);
  return { y, m, d };
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

/* ================== ORNAMEN ================== */
function Monogram({ a, b, size = 84 }) {
  return (
    <div className="om-mono" style={{ width: size, height: size }} aria-hidden="true">
      <span>{a}<i>&amp;</i>{b}</span>
    </div>
  );
}
function QrIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14v.01M14 20h3M20 17v4" />
    </svg>
  );
}
function Note({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" />
    </svg>
  );
}
function Divider() {
  return (
    <div className="om-div" aria-hidden="true">
      <i /><svg width="9" height="9" viewBox="0 0 10 10"><path d="M5 0l5 5-5 5-5-5z" fill="currentColor" /></svg><i />
    </div>
  );
}
function Photo({ src, ratio = "4 / 5", alt = "" }) {
  return (
    <div className="om-photo" style={{ aspectRatio: ratio }}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : null}
    </div>
  );
}
/* foto dalam bingkai: garis emas + passepartout ivory */
function Framed({ children }) {
  return <div className="om-frame">{children}</div>;
}

/* ================================================================== */
export default function OldMoneyWedding({
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
  const dateDot = `${pad2(wd)} · ${pad2(wm)} · ${wy}`;
  const dateNice = `${wd} ${MONTHS_ID[wm - 1]} ${wy}`;
  const dateText = `${wd} ${MONTHS_L[wm - 1].replace(/^./, (c) => c.toUpperCase())} ${wy}`;
  const nameA = couple.bride.shortName;
  const nameB = couple.groom.shortName;
  const venues = events.filter((e, i, arr) => e.venue && arr.findIndex((x) => x.venue === e.venue) === i);

  const [guestName, setGuestName] = useState("Nama Tamu");
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to") || params.get("nama");
      if (to && to.trim()) setGuestName(to.trim());
    } catch (e) { /* no query params */ }
  }, []);

  useEffect(() => {
    if (document.getElementById("om-fonts")) return;
    const l = document.createElement("link");
    l.id = "om-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap";
    document.head.appendChild(l);
  }, []);

  const [phase, setPhase] = useState("cover");
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const openInvite = () => {
    if (phase !== "cover") return;
    setPhase("opening");
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    setTimeout(() => setPhase("leaving"), 1100);
    setTimeout(() => {
      setPhase("open");
      window.scrollTo?.(0, 0);
    }, 1800);
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
  const qrUrl = buildQrUrl(buildQrPayload({ groom: nameB, bride: nameA, guestName, dateText }));

  const countdown = useCountdown(target);
  const isPast = new Date(target) <= new Date();
  const cd = [
    [countdown.days, L.days, 3],
    [countdown.hours, L.hours, 2],
    [countdown.minutes, L.min, 2],
    [countdown.seconds, L.sec, 2],
  ];

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

  const bgPhoto = events[0]?.photo || coverPhoto;
  const iA = nameA.charAt(0);
  const iB = nameB.charAt(0);

  return (
    <div className={`om-root ${phase !== "open" ? "om-locked" : ""}`}>
      <style>{css}</style>

      {/* ================= COVER ================= */}
      {phase !== "open" && (
        <div className={`om-cover ${phase === "leaving" ? "leaving" : ""}`} role="dialog" aria-label="Sampul undangan">
          <div className="om-cover-in">
            <p className="om-dear">{L.dear}<b>{guestName}</b></p>
            <div className={`om-env ${phase !== "cover" ? "open" : ""}`}>
              <div className="om-env-body">
                <div className="om-letter">
                  <p className="om-letter-t">{L.yes}</p>
                  <p className="om-letter-s">{L.glad}</p>
                  <p className="om-letter-d">{dateNice}</p>
                </div>
                <p className="om-env-date">{dateDot}</p>
              </div>
              <div className="om-flap">
                <div className="om-flap-shape" />
                <h1 className="om-env-names">
                  <span>{nameA}</span>
                  <em>&amp;</em>
                  <span>{nameB}</span>
                </h1>
                <div className="om-seal" aria-hidden="true">{iA}{iB}</div>
              </div>
            </div>
            <div className="om-cover-btns">
              <button className="om-btn solid" onClick={openInvite}>{L.open}</button>
              <button className="om-btn" onClick={() => setShowQR(true)}><QrIcon /> {L.qr}</button>
            </div>
          </div>
        </div>
      )}

      <main className="om-col">
        {/* ===== 1. HERO ===== */}
        <section className="om-hero">
          <img className="om-hero-bg" src={coverPhoto} alt="" />
          <div className="om-hero-fade" />
          <div className="om-card">
            <Monogram a={iA} b={iB} size={64} />
            <p className="om-card-t">{L.yes}</p>
            <p className="om-card-s">{L.glad}</p>
            <p className="om-card-d">{dateNice}</p>
            <p className="om-card-n">{nameA} &amp; {nameB}</p>
          </div>
        </section>

        {/* ===== 2. MEMPELAI ===== */}
        <section className="om-sec">
          <h2 className="om-h">{L.couple}</h2>
          <div className="om-couple">
            {[couple.bride, couple.groom].map((c, i) => (
              <figure key={i} className="om-person">
                <Framed><Photo src={c.photo} ratio="4 / 5" alt={c.name} /></Framed>
                <figcaption>
                  <h3>{c.name}</h3>
                  {c.parent && <p>{c.parent}</p>}
                  {c.instagram && (
                    <a href={`https://instagram.com/${c.instagram.replace("@", "")}`} target="_blank" rel="noreferrer">@{c.instagram.replace("@", "")}</a>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ===== 3. KISAH ===== */}
        {loveStory.length > 0 && (
          <section className="om-sec om-story">
            <Divider />
            <h2 className="om-h">{L.story}</h2>
            {loveStory.map((k) => (
              <article key={k.track} className="om-chap">
                {k.photo && <Framed><Photo src={k.photo} ratio="4 / 3" alt={k.title} /></Framed>}
                <p className="om-chap-n">{L.chapter} {pad2(k.track)}</p>
                <h3>{k.title}</h3>
                <p className="om-chap-t">{k.text}</p>
              </article>
            ))}
          </section>
        )}

        {/* ===== 4. ACARA ===== */}
        {events.length > 0 && (
          <section className="om-sched">
            <div className="om-sched-in">
              <h2 className="om-h">{L.schedule}</h2>
              <ol>
                {events.map((e, i) => {
                  const prev = events[i - 1];
                  const showDate = e.date && (!prev || prev.date !== e.date);
                  const showVenue = e.venue && (!prev || prev.venue !== e.venue);
                  return (
                    <li key={e.id}>
                      {i > 0 && <i className="om-vline" />}
                      <h3>{e.title}</h3>
                      <p className="om-st-time">{e.time}</p>
                      {showDate && <p className="om-st-d">{e.date}</p>}
                      {showVenue && <p className="om-st-d">{e.venue}</p>}
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>
        )}

        {/* ===== 5. HITUNG MUNDUR ===== */}
        <section className="om-sec om-dday">
          <h2 className="om-h sm">{L.dday}</h2>
          {isPast ? (
            <p className="om-passed">{L.passed}</p>
          ) : (
            <div className="om-cd" role="timer" aria-label="Hitung mundur pernikahan">
              {cd.map(([n, lab, w]) => (
                <div key={lab}>
                  <b>{String(n).padStart(w, "0")}</b>
                  <small>{lab}</small>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ===== 6. KENANGAN ===== */}
        {memories.length > 0 && (
          <section className="om-sec">
            <Divider />
            <h2 className="om-h">{L.memories}</h2>
            <div className="om-gal">
              {memories.map((m, i) => {
                const wide = i % 5 === 0;
                return (
                  <figure key={m.title + i} className={wide ? "wide" : ""}>
                    <Framed><Photo src={m.photo} ratio={wide ? "16 / 10" : "4 / 5"} alt={`Kenangan ${m.title}`} /></Framed>
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== 7. RSVP ===== */}
        <section className="om-sec om-rsvp">
          <Divider />
          <h2 className="om-h">{L.rsvp}</h2>
          <p className="om-lead">{L.rsvpText}</p>
          {submitted ? (
            <p className="om-sent">{L.thanksRsvp}</p>
          ) : !showForm ? (
            <button className="om-btn solid" onClick={() => setShowForm(true)}>{L.click}</button>
          ) : (
            <form className="om-form" onSubmit={handleRsvpSubmit}>
              <label>
                <span>{L.name}</span>
                <input required value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} />
              </label>
              <label>
                <span>{L.attend}</span>
                <select value={rsvp.attend} onChange={(e) => setRsvp({ ...rsvp, attend: e.target.value })}>
                  <option value="hadir">{L.attending}</option>
                  <option value="tidak">{L.declining}</option>
                </select>
              </label>
              <label>
                <span>{L.message}</span>
                <textarea rows={3} value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} />
              </label>
              <button className="om-btn solid" type="submit">{L.confirm}</button>
            </form>
          )}
        </section>

        {/* ===== 8. HADIAH ===== */}
        {(bankAccounts.length > 0 || giftPhone) && (
          <section className="om-sec om-gift">
            <Divider />
            <h2 className="om-h">{L.gift}</h2>
            <p className="om-lead">{L.giftText}</p>
            {bankAccounts.map((r) => (
              <div key={r.bank} className="om-bank">
                <small>{r.bank}</small>
                <p className="om-acc">{r.accountNumber}</p>
                <span>a.n. {r.accountName}</span>
                <button className="om-btn sm" onClick={() => copy(r.accountNumber)}>{copied === r.accountNumber ? L.copied : L.copy}</button>
              </div>
            ))}
            {giftPhone && (
              <div className="om-bank">
                <small>{L.sendGift}</small>
                <span className="om-hint">{L.giftHint}</span>
                <a className="om-acc om-phone" href={`https://wa.me/${giftPhone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{giftPhone}</a>
              </div>
            )}
          </section>
        )}

        {/* ===== 9. LOKASI ===== */}
        {venues.length > 0 && (
          <section className="om-addr">
            <img className="om-addr-bg" src={bgPhoto} alt="" />
            <div className="om-addr-in">
              <h2 className="om-h lt">{L.addresses}</h2>
              <ul>
                {venues.map((v) => (
                  <li key={v.venue}>
                    <h3>{v.venue}</h3>
                    {events.filter((e) => e.venue === v.venue).map((e) => (
                      <p key={e.id}><b>{e.title}</b><br />{e.date}, {e.time}</p>
                    ))}
                    {v.mapsUrl && <a href={v.mapsUrl} target="_blank" rel="noreferrer">{L.openMap}</a>}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ===== 10. PENUTUP ===== */}
        <section className="om-thanks">
          <Monogram a={iA} b={iB} size={92} />
          <p className="om-ty">{L.thank}</p>
          <p className="om-ty-n">{nameA} &amp; {nameB}</p>
        </section>
      </main>

      {phase === "open" && audioUrl && (
        <button className={`om-fab ${playing ? "on" : ""}`} onClick={toggleMusic} aria-label={playing ? "Jeda musik" : "Putar musik"}>
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4.5" height="16" /><rect x="13.5" y="4" width="4.5" height="16" /></svg>
          ) : <Note />}
        </button>
      )}
      {audioUrl && <audio ref={audioRef} src={audioUrl} loop preload="none" />}

      {showQR && (
        <div className="om-modal" role="dialog" aria-modal="true" aria-label={L.qrTitle} onClick={() => setShowQR(false)}>
          <div className="om-modal-in" onClick={(e) => e.stopPropagation()}>
            <p className="om-modal-k">{L.qrTitle}</p>
            <p className="om-modal-n">{nameA} <em>&amp;</em> {nameB}</p>
            <p className="om-modal-g">{guestName}</p>
            <div className="om-qr"><img src={qrUrl} alt="QR kehadiran" width={200} height={200} /></div>
            <p className="om-modal-h">{L.qrHint}</p>
            <button className="om-btn solid" onClick={() => setShowQR(false)}>{L.close}</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
const css = `
.om-root{
  --paper:#F6F1E7; --paper2:#EFE8D8; --ink:#1f2a24; --soft:#66605a;
  --green:#243b2f; --green-d:#182a20; --gold:#A98B4F; --gold-l:#CDB57F; --line:#cdbf9f;
  --serif:'Cormorant Garamond',Georgia,serif; --disp:'Bodoni Moda','Cormorant Garamond',serif;
  font-family:var(--serif); font-weight:500; font-size:17px; line-height:1.5; color:var(--ink); min-height:100vh;
  background:#d9d3c4; -webkit-font-smoothing:antialiased;
}
.om-root *{box-sizing:border-box}
.om-locked{height:100vh; overflow:hidden}
.om-col{width:100%; max-width:430px; margin:0 auto; background:var(--paper); overflow:hidden; position:relative}
@media (min-width:700px){.om-col{box-shadow:0 20px 60px rgba(24,42,32,.25)}}

/* tipografi */
.om-h{font-family:var(--disp); font-style:italic; font-weight:400; font-size:34px; line-height:1.1; text-align:center; margin:0 0 28px; color:var(--green)}
.om-h.sm{font-size:26px; margin-bottom:22px}
.om-h.lt{color:#f3ecdc}
.om-sec{padding:60px 28px 20px; text-align:center}
.om-lead{font-size:19px; line-height:1.5; max-width:300px; margin:0 auto 26px; color:var(--soft)}

/* pemisah */
.om-div{display:flex; align-items:center; justify-content:center; gap:14px; margin:0 auto 26px; color:var(--gold)}
.om-div i{display:block; width:60px; border-top:1px solid currentColor}

/* tombol */
.om-btn{display:inline-flex; align-items:center; justify-content:center; gap:8px; background:transparent; color:var(--green); border:1px solid var(--green); padding:13px 26px; font:600 13px var(--serif); letter-spacing:.14em; text-transform:uppercase; cursor:pointer; text-decoration:none; transition:background .2s,color .2s}
.om-btn:hover{background:rgba(36,59,47,.08)}
.om-btn.solid{background:var(--green); color:#f6f1e7}
.om-btn.solid:hover{background:var(--green-d)}
.om-btn.sm{padding:9px 18px; font-size:12px; margin-top:14px}
.om-btn:focus-visible,.om-fab:focus-visible,.om-form input:focus-visible,.om-form select:focus-visible,.om-form textarea:focus-visible,.om-addr li a:focus-visible,.om-person a:focus-visible,.om-phone:focus-visible{outline:2px solid var(--gold); outline-offset:3px}

/* monogram */
.om-mono{display:grid; place-items:center; margin:0 auto; border:1px solid var(--gold); border-radius:50%; position:relative; color:var(--green)}
.om-mono::after{content:""; position:absolute; inset:4px; border:1px solid var(--gold-l); border-radius:50%}
.om-mono span{font-family:var(--disp); font-style:italic; font-size:1.5em; line-height:1; font-size:26px; letter-spacing:-.02em}
.om-mono i{font-style:normal; font-size:.6em; margin:0 1px; color:var(--gold)}

/* cover */
.om-cover{position:fixed; inset:0; z-index:60; background:radial-gradient(circle at 50% 40%,#f8f4ea,#e6ddc8); display:flex; overflow-y:auto; transition:transform .75s cubic-bezier(.6,0,.9,.4), opacity .4s ease .35s}
.om-cover.leaving{transform:translateY(-102%); opacity:0}
.om-cover-in{margin:auto; width:100%; display:flex; flex-direction:column; align-items:center; padding:24px 18px}
.om-dear{font-size:17px; margin:0 0 18px; color:var(--soft); text-align:center; overflow-wrap:anywhere}
.om-dear b{display:block; font-family:var(--disp); font-style:italic; font-weight:400; font-size:24px; color:var(--green); margin-top:2px}
.om-env{position:relative; width:min(84vw,340px); height:min(56vh,450px); min-height:340px; perspective:1100px; flex:none}
.om-env-body{position:absolute; inset:0; background:#fbf8f1; border:1px solid var(--gold-l); box-shadow:0 18px 44px rgba(24,42,32,.2)}
.om-env-body::after{content:""; position:absolute; inset:7px; border:1px solid var(--line); pointer-events:none}
.om-env-date{position:absolute; left:0; right:0; bottom:7%; margin:0; text-align:center; font-size:19px; letter-spacing:.14em; color:var(--green)}
.om-letter{position:absolute; left:11%; right:11%; top:8%; bottom:22%; background:#fffdf8; padding:22px 16px; text-align:center; box-shadow:0 2px 10px rgba(0,0,0,.12); transition:transform .9s cubic-bezier(.3,.7,.2,1) .3s; display:flex; flex-direction:column; justify-content:center}
.om-env.open .om-letter{transform:translateY(-34px)}
.om-letter-t{font-family:var(--disp); font-style:italic; font-size:24px; margin:0 0 10px; color:var(--green)}
.om-letter-s{font-size:15px; margin:0 0 8px; line-height:1.45; color:var(--soft)}
.om-letter-d{font-style:italic; font-size:21px; margin:0; color:var(--green)}
.om-flap{position:absolute; left:0; right:0; top:0; height:70%; transform-origin:top center; backface-visibility:hidden; transition:transform .85s cubic-bezier(.5,0,.2,1); z-index:3; filter:drop-shadow(0 6px 6px rgba(24,42,32,.18))}
.om-flap-shape{position:absolute; inset:0; background:linear-gradient(180deg,#fffdf8,#f1ebdc); clip-path:polygon(0 0,100% 0,100% 8%,50% 100%,0 8%)}
.om-env.open .om-flap{transform:rotateX(180deg)}
.om-env-names{position:relative; z-index:2; margin:0; padding-top:17%; text-align:center; font-family:var(--disp); font-style:italic; font-weight:400; line-height:1; letter-spacing:-.02em; color:var(--green)}
.om-env-names span{display:block; font-size:clamp(32px,10vw,42px); overflow-wrap:anywhere}
.om-env-names em{display:block; font-size:20px; margin:4px 0; color:var(--gold)}
.om-seal{position:absolute; z-index:4; left:50%; bottom:-18px; transform:translateX(-50%); width:52px; height:52px; border-radius:50%; background:radial-gradient(circle at 35% 30%,#3a5a47,var(--green-d)); color:var(--gold-l); display:grid; place-items:center; font-family:var(--disp); font-style:italic; font-size:19px; box-shadow:0 3px 8px rgba(0,0,0,.3), inset 0 0 0 3px rgba(205,181,127,.35)}
.om-cover-btns{display:flex; flex-direction:column; gap:10px; width:min(84vw,340px); margin-top:34px}

/* hero */
.om-hero{position:relative; display:flex; align-items:flex-end; justify-content:center; min-height:640px; padding:300px 24px 56px}
.om-hero-bg{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:saturate(.7) sepia(.15) brightness(.92)}
.om-hero-fade{position:absolute; inset:0; background:linear-gradient(180deg,rgba(246,241,231,0) 50%,var(--paper) 100%)}
.om-card{position:relative; z-index:2; width:100%; max-width:320px; background:#fbf8f1; padding:30px 22px 28px; text-align:center; box-shadow:0 12px 30px rgba(24,42,32,.25); outline:1px solid var(--gold); outline-offset:-8px}
.om-card .om-mono{margin-bottom:14px}
.om-card-t{font-family:var(--disp); font-style:italic; font-size:30px; margin:0 0 12px; line-height:1.1; color:var(--green)}
.om-card-s{font-size:16px; line-height:1.5; margin:0 0 6px; color:var(--soft)}
.om-card-d{font-style:italic; font-size:23px; margin:0 0 14px; color:var(--green)}
.om-card-n{font-size:14px; letter-spacing:.18em; text-transform:uppercase; margin:0; color:var(--gold)}

/* foto berbingkai */
.om-photo{width:100%; overflow:hidden; background:var(--paper2)}
.om-photo img{width:100%; height:100%; object-fit:cover; display:block; filter:saturate(.85) sepia(.08)}
.om-frame{background:#fbf8f1; padding:8px; border:1px solid var(--gold); box-shadow:0 8px 20px rgba(24,42,32,.14); width:80%; margin:0 auto}

/* mempelai */
.om-couple{display:grid; gap:52px; padding-top:6px}
.om-person{margin:0}
.om-person figcaption{margin-top:22px}
.om-person h3{font-family:var(--disp); font-style:italic; font-weight:400; font-size:23px; line-height:1.25; margin:0 0 10px; color:var(--green)}
.om-person p{font-size:16px; line-height:1.55; margin:0 auto 10px; max-width:270px; color:var(--soft)}
.om-person a{display:inline-block; font-size:14px; letter-spacing:.1em; color:var(--gold); text-decoration:none; border-bottom:1px solid currentColor}

/* kisah */
.om-story{padding-bottom:6px}
.om-chap{margin:0 0 60px}
.om-chap .om-frame{margin-bottom:26px}
.om-chap-n{font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin:0 0 6px}
.om-chap h3{font-family:var(--disp); font-style:italic; font-weight:400; font-size:26px; line-height:1.15; margin:0 0 12px; color:var(--green)}
.om-chap-t{font-size:17px; line-height:1.65; margin:0 auto; max-width:310px; color:var(--soft)}

/* acara: panel hijau botol berbingkai emas */
.om-sched{padding:36px 22px; margin-top:14px; background:var(--green)}
.om-sched-in{background:var(--paper); padding:48px 20px 44px; text-align:center; outline:1px solid var(--gold); outline-offset:-8px}
.om-sched ol{list-style:none; margin:0; padding:0}
.om-vline{display:block; width:1px; height:34px; background:var(--gold); margin:20px auto}
.om-sched h3{font-family:var(--disp); font-weight:400; font-size:23px; line-height:1.15; margin:0 0 8px; color:var(--green)}
.om-st-time{font-size:19px; margin:0 0 4px}
.om-st-d{font-size:16px; line-height:1.45; margin:0; color:var(--soft)}

/* hitung mundur */
.om-dday{padding-top:60px; padding-bottom:34px}
.om-cd{display:grid; grid-template-columns:repeat(4,1fr); max-width:330px; margin:0 auto; border-top:1px solid var(--gold); border-bottom:1px solid var(--gold); padding:16px 0}
.om-cd>div{text-align:center}
.om-cd>div+div{border-left:1px solid var(--line)}
.om-cd b{display:block; font-family:var(--disp); font-weight:400; font-size:clamp(28px,8.5vw,36px); line-height:1; color:var(--green); font-variant-numeric:tabular-nums}
.om-cd small{display:block; font-size:14px; margin-top:8px; color:var(--soft)}
.om-passed{font-style:italic; font-size:26px; margin:6px 0 0; color:var(--green)}

/* galeri */
.om-gal{display:grid; grid-template-columns:1fr 1fr; gap:16px 14px}
.om-gal figure{margin:0; min-width:0}
.om-gal figure.wide{grid-column:span 2}
.om-gal .om-frame{width:100%; padding:6px}

/* rsvp */
.om-rsvp{padding-bottom:56px}
.om-form{display:grid; gap:20px; max-width:300px; margin:0 auto; text-align:left}
.om-form label{display:grid; gap:4px}
.om-form span{font-size:13px; letter-spacing:.12em; text-transform:uppercase; color:var(--soft)}
.om-form input,.om-form select,.om-form textarea{width:100%; background:transparent; border:0; border-bottom:1px solid var(--gold); border-radius:0; padding:8px 2px; font:500 18px var(--serif); color:var(--ink); resize:none}
.om-form .om-btn{justify-self:center; margin-top:6px}
.om-sent{font-style:italic; font-size:22px; line-height:1.4; margin:0; color:var(--green)}

/* hadiah */
.om-gift{padding-bottom:56px}
.om-bank{background:#fbf8f1; border:1px solid var(--gold); outline:1px solid var(--gold-l); outline-offset:-6px; padding:26px 18px; margin:0 auto 18px; max-width:310px; display:flex; flex-direction:column; align-items:center; text-align:center}
.om-bank small{font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:var(--gold)}
.om-acc{font-family:var(--disp); font-size:25px; letter-spacing:.04em; margin:10px 0 4px; line-height:1.15; overflow-wrap:anywhere; color:var(--green)}
.om-phone{text-decoration:none; border-bottom:1px solid var(--gold-l)}
.om-hint{margin-top:6px; color:var(--soft)}
.om-bank span{font-style:italic; font-size:16px}

/* lokasi */
.om-addr{position:relative; color:#f3ecdc}
.om-addr-bg{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:saturate(.5) brightness(.6)}
.om-addr::before{content:""; position:absolute; inset:0; background:rgba(24,42,32,.82); z-index:1}
.om-addr-in{position:relative; z-index:2; padding:60px 30px 62px; text-align:center}
.om-addr ul{list-style:none; margin:0; padding:0}
.om-addr li{margin:0 0 38px; padding-bottom:38px; border-bottom:1px solid rgba(205,181,127,.4)}
.om-addr li:last-child{margin:0; padding:0; border:0}
.om-addr h3{font-family:var(--disp); font-style:italic; font-weight:400; font-size:23px; line-height:1.2; margin:0 0 10px}
.om-addr li p{font-size:16px; line-height:1.55; margin:0 0 12px; color:#e2d9c5}
.om-addr li p b{font-weight:600; color:#f3ecdc}
.om-addr li a{display:inline-block; font-size:13px; letter-spacing:.16em; text-transform:uppercase; color:var(--gold-l); text-decoration:none; border-bottom:1px solid currentColor}

/* penutup */
.om-thanks{padding:64px 26px 100px; text-align:center}
.om-ty{font-family:var(--disp); font-style:italic; font-weight:400; font-size:clamp(36px,11vw,46px); line-height:1.1; margin:24px 0 0; color:var(--green)}
.om-ty-n{font-size:15px; letter-spacing:.18em; text-transform:uppercase; margin:16px 0 0; color:var(--gold)}

/* musik */
.om-fab{position:fixed; right:16px; bottom:16px; width:44px; height:44px; border-radius:50%; border:1px solid var(--gold); background:var(--paper); color:var(--green); display:grid; place-items:center; cursor:pointer; z-index:30; box-shadow:0 4px 14px rgba(24,42,32,.25)}
.om-fab.on{background:var(--green); color:var(--gold-l)}

/* modal QR */
.om-modal{position:fixed; inset:0; z-index:80; background:rgba(24,42,32,.75); display:flex; overflow-y:auto; padding:20px; animation:om-fade .25s ease both}
.om-modal-in{margin:auto; width:100%; max-width:330px; background:var(--paper); border:1px solid var(--gold); outline:1px solid var(--gold-l); outline-offset:-8px; padding:38px 26px 30px; text-align:center; animation:om-pop .3s cubic-bezier(.2,.8,.2,1) both}
.om-modal-k{font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin:0}
.om-modal-n{font-family:var(--disp); font-style:italic; font-size:26px; margin:8px 0 0; color:var(--green)}
.om-modal-n em{font-family:var(--serif)}
.om-modal-g{font-style:italic; font-size:21px; margin:4px 0 0; overflow-wrap:anywhere}
.om-qr{display:flex; justify-content:center; margin:18px 0 8px}
.om-qr img{background:#fff; padding:6px; border:1px solid var(--gold); display:block}
.om-modal-h{font-size:15px; line-height:1.5; margin:10px 0 20px; color:var(--soft)}
@keyframes om-fade{from{opacity:0} to{opacity:1}}
@keyframes om-pop{from{opacity:0; transform:translateY(14px) scale(.97)} to{opacity:1; transform:none}}
@media (prefers-reduced-motion:reduce){
  .om-cover,.om-letter,.om-flap,.om-modal,.om-modal-in{transition:none; animation:none}
}
`;