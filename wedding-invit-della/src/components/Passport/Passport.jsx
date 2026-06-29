import { useState, useEffect, useRef } from "react";

const COUPLE_PHOTOS = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
];
const GALLERY = [
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&q=80",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80",
  "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80",
  "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80",
  "https://images.unsplash.com/photo-1510172951991-856a654063f9?w=400&q=80",
];
const GROOM_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80";
const BRIDE_PHOTO = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80";
const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const WEDDING_DATE = new Date("2024-12-14T15:00:00+08:00");

const BANKS = [
  { name: "BCA", no: "1234567890", holder: "Victoria Hasan" },
  { name: "Mandiri", no: "0987654321", holder: "Victoria Hasan" },
  { name: "BNI", no: "1122334455", holder: "Gyubin Ko" },
];

const INITIAL_WISHES = [
  { name: "Ayu Dewi", status: "Hadir", msg: "Selamat menempuh hidup baru! 🎉", time: "25 March 2026" },
  { name: "Budi Santoso", status: "Hadir", msg: "Semoga langgeng sampai tua! ❤️", time: "26 March 2026" },
];

const NAV = [
  { id: "intro",   icon: "fa-envelope",      label: "Intro"   },
  { id: "groom",   icon: "fa-male",           label: "Groom"   },
  { id: "bride",   icon: "fa-female",         label: "Bride"   },
  { id: "gallery", icon: "fa-images",         label: "Gallery" },
  { id: "event",   icon: "fa-calendar",       label: "Event"   },
  { id: "rundown", icon: "fa-clock",          label: "Rundown" },
  { id: "dress",   icon: "fa-tshirt",         label: "Dress"   },
  { id: "map",     icon: "fa-map-marker-alt", label: "Map"     },
  { id: "gift",    icon: "fa-gift",           label: "Gift"    },
  { id: "rsvp",    icon: "fa-check-circle",   label: "RSVP"    },
  { id: "thanks",  icon: "fa-heart",          label: "Thanks"  },
];
const NAV_VISIBLE = 5;

// ─── decorative passport footer shown on short-content pages ────────────────
function PassportFooter() {
  return (
    <div
      className="mt-auto pt-4 pb-3 px-5 border-t flex flex-col items-center gap-2 select-none"
      style={{ borderColor: "#D8DDD5" }}
    >
      {/* MRZ-style strip */}
      <div
        className="w-full rounded-lg px-3 py-2 font-mono text-[8px] tracking-widest text-center leading-relaxed"
        style={{ background: "#F0F4EE", color: "#7C8F78" }}
      >
        <div>{"P<IDN GYUBIN<<KO<<<<<<<<<<<<<<<<<<<<<<<<"}</div>
        <div>{"14122024<7<IDN<9804247M2412147<<<<<<<<<6"}</div>
      </div>
      <div className="flex items-center gap-3 opacity-40">
        <div className="w-12 h-px" style={{ background: "#7C8F78" }} />
        <i className="fas fa-plane text-xs" style={{ color: "#7C8F78" }} />
        <div className="w-12 h-px" style={{ background: "#7C8F78" }} />
      </div>
      <p className="text-[9px] font-mono tracking-[0.2em] opacity-30" style={{ color: "#566251" }}>
        VALID FOR ONE LIFETIME
      </p>
    </div>
  );
}

// ─── helpers ─────────────────────────────────────────────────────────────────
function Stamp({ text, color = "green" }) {
  const cls =
    color === "pink"
      ? { border: "2px solid #E8A0B0", color: "#C06878" }
      : { border: "2px solid #7C8F78", color: "#566251" };
  return (
    <div
      className="inline-block rounded-full px-3 py-1 text-[9px] font-bold tracking-widest opacity-70 select-none"
      style={{ ...cls, transform: "rotate(-8deg)" }}
    >
      {text}
    </div>
  );
}

function PassportHeader() {
  return (
    <div
      className="text-white text-[9px] font-mono px-4 py-2 tracking-widest flex-shrink-0"
      style={{ background: "#7C8F78" }}
    >
      {"<<<<PASSPORT<<<TO<<<MARRIAGE<<<<<"}
      <br />
      {">>WE>>LOOK>>FORWARD>>TO>>SEE>>YOU"}
    </div>
  );
}

function WeddingPassHeader() {
  return (
    <div
      className="text-sm font-bold px-5 py-3 flex items-center gap-2 flex-shrink-0"
      style={{ background: "#E7CDC8", color: "#7C8F78" }}
    >
      <span>WEDDING PASS</span>
      <i className="fas fa-plane" />
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = WEDDING_DATE - new Date();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const Box = ({ v, label }) => (
    <div
      className="text-white rounded-xl px-3 py-2 text-center min-w-[58px]"
      style={{ background: "#7C8F78" }}
    >
      <div className="text-xl font-bold font-mono">{String(v).padStart(2, "0")}</div>
      <div className="text-[9px] mt-0.5 opacity-80">{label}</div>
    </div>
  );
  return (
    <div className="flex gap-2 justify-center flex-wrap my-4">
      <Box v={time.d} label="Days" />
      <Box v={time.h} label="Hours" />
      <Box v={time.m} label="Min." />
      <Box v={time.s} label="Secs." />
    </div>
  );
}

// ─── pages ────────────────────────────────────────────────────────────────────
// KEY PATTERN: every page root = "flex flex-col h-full bg-[#FAF8F4]"
// Short-content pages end with <PassportFooter /> which uses mt-auto to push to bottom

function HomePage({ onOpen }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-6 px-6 text-center" style={{ background: "#FAF8F4" }}>
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "#7C8F78" }}>
        Passport Wedding Invitation
      </p>
      <div
        className="w-[130px] h-[130px] mx-auto rounded-full flex flex-col items-center justify-center mb-5"
        style={{ border: "2px dashed #A8B8A0", background: "#F0F4EE" }}
      >
        <i className="fas fa-plane text-2xl mb-1" style={{ color: "#566251" }} />
        <div className="flex items-center gap-2 text-2xl font-serif" style={{ color: "#555" }}>
          <span>G</span>
          <i className="fas fa-times text-sm" style={{ color: "#7C8F78" }} />
          <span>V</span>
        </div>
        <i className="fas fa-heart text-base mt-1" style={{ color: "#D4748A" }} />
      </div>

      <h1 className="text-3xl italic mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#444" }}>
        Gyubin &amp; Victoria
      </h1>
      <p className="text-xs tracking-widest mb-6 font-mono" style={{ color: "#888" }}>14 · 12 · 2024</p>

      <div
        className="rounded-xl px-5 py-4 mb-7 w-full max-w-xs"
        style={{ background: "#F0F4EE", border: "1px solid #D8DDD5" }}
      >
        <p className="text-xs mb-1 font-mono tracking-wider" style={{ color: "#888" }}>KEPADA YTH.</p>
        <p className="text-xs" style={{ color: "#888" }}>Bapak / Ibu / Saudara/i</p>
        <p className="font-mono font-bold text-sm mt-1 tracking-wide" style={{ color: "#566251" }}>✦ Nama Tamu ✦</p>
      </div>

      <button
        onClick={onOpen}
        className="px-10 py-3 rounded-xl font-semibold tracking-wider text-sm transition-all active:scale-95"
        style={{ background: "#7C8F78", color: "white" }}
      >
        Open Invitation
      </button>
      <p className="text-[10px] mt-5 font-mono tracking-widest" style={{ color: "#ccc" }}>✈ VALID FOR ONE LIFETIME ✈</p>
    </div>
  );
}

function IntroPage() {
  return (
    <div className="flex flex-col h-full" style={{ background: "#FAF8F4" }}>
      <PassportHeader />
      <div className="p-5 text-center flex flex-col flex-1">
        <img
          src={COUPLE_PHOTOS[0]}
          alt="couple"
          className="w-full max-w-[220px] mx-auto rounded-xl object-cover mb-4 shadow-sm"
          style={{ height: "200px" }}
        />
        <div className="rounded-xl p-4 mb-4 text-left" style={{ background: "#F0F4EE", border: "1px solid #D8DDD5" }}>
          <p className="text-lg italic mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif", color: "#566251" }}>
            Dear beloved families &amp; friends,
          </p>
          <p className="text-sm leading-relaxed text-center" style={{ color: "#666" }}>
            We're so excited to celebrate our wedding with you.
            Find all the details you need for our big day here.
          </p>
          <p className="text-sm mt-3 italic text-center" style={{ color: "#7C8F78" }}>— Gyubin &amp; Victoria ♡</p>
        </div>
        <div className="flex justify-between items-end mt-auto pt-3 px-2">
          <Stamp text="MARRIED" />
          <Stamp text="LOVE APPROVED" color="pink" />
        </div>
      </div>
      <PassportFooter />
    </div>
  );
}

function ProfilePage({ isGroom }) {
  return (
    <div className="flex flex-col h-full p-3" style={{ background: "#FAF8F4" }}>
      <div className="rounded-2xl overflow-hidden flex flex-col flex-1" style={{ border: "5px solid #7C8F78" }}>
        <PassportHeader />
        <div className="p-4 flex flex-col flex-1">
          <p className="text-lg italic mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#566251" }}>Wedding Profile</p>
          <div className="rounded-xl overflow-hidden mb-3" style={{ border: "1px solid #D8DDD5" }}>
            <div className="flex gap-3 p-3" style={{ background: "#F5F7F4" }}>
              <img
                src={isGroom ? GROOM_PHOTO : BRIDE_PHOTO}
                alt={isGroom ? "groom" : "bride"}
                className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
              />
              <div className="text-sm space-y-2 pt-1">
                {[["Type","BRIDES"],["Code","LOVE"],["Passport No.", isGroom ? "14-12-2024" : "24-04-1998"]].map(([label, val]) => (
                  <div key={label}>
                    <p className="text-[9px] tracking-widest uppercase" style={{ color: "#aaa" }}>{label}</p>
                    <p className="font-semibold text-xs font-mono" style={{ color: "#444" }}>{val}</p>
                  </div>
                ))}
                <Stamp text="APPROVED" color="pink" />
              </div>
            </div>
          </div>
          <div className="rounded-xl p-3 space-y-3 text-sm" style={{ border: "1px solid #D8DDD5" }}>
            {[
              ["Name", isGroom ? "GYUBIN KO" : "VICTORIA HASAN"],
              [isGroom ? "First Born Son of" : "Only Daughter of",
               isGroom ? "Mr. Songgun Ko & Mrs. Kimia Ko" : "Mr. Sudarman & Mrs. Roeslina"],
              ["Description",
               isGroom ? "고송근, 김미아의 아들 고규빈" : "Sudarman, Roeslina 의 딸 빅토리아"],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-[9px] tracking-widest uppercase" style={{ color: "#aaa" }}>{label}</p>
                <p className="text-xs" style={{ color: "#555" }}>{val}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-auto pt-4">
            <Stamp text="MARRIED" />
            <Stamp text="LOVE APPROVED" color="pink" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryPage() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="flex flex-col h-full p-4" style={{ background: "#FAF8F4" }}>
      <p className="text-2xl italic text-center mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#566251" }}>
        Our Gallery
      </p>
      <div className="grid grid-cols-3 gap-1">
        {GALLERY.map((src, i) => (
          <img
            key={i} src={src} alt={`gallery-${i}`}
            className="w-full aspect-square object-cover rounded cursor-pointer transition hover:opacity-85"
            onClick={() => setSelected(src)}
          />
        ))}
      </div>
      <PassportFooter />
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <img src={selected} alt="full" className="max-w-full max-h-full rounded-xl" />
        </div>
      )}
    </div>
  );
}

function EventPage() {
  return (
    <div className="flex flex-col h-full p-5 text-center" style={{ background: "#FAF8F4" }}>
      <div className="mb-3 flex justify-center">
        <Stamp text="LOVE APPROVED" color="pink" />
      </div>
      <p className="text-3xl italic mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#566251" }}>
        See you there!
      </p>
      <div className="rounded-xl p-4 mb-2" style={{ background: "#F0F4EE", border: "1px solid #D8DDD5" }}>
        <p className="font-mono text-sm font-semibold" style={{ color: "#444" }}>Saturday, 14 December 2024</p>
        <p className="font-mono text-sm mt-1" style={{ color: "#666" }}>15:00 WITA – End</p>
        <p className="font-mono text-sm" style={{ color: "#666" }}>Conrad Hotel Bali</p>
        <p className="text-xs mt-2" style={{ color: "#999" }}>토요일, 2024년 12월 14일 · 오후 3시</p>
      </div>
      <Countdown />
      <button
        className="mx-auto px-6 py-2.5 rounded-xl text-sm font-semibold transition"
        style={{ background: "#7C8F78", color: "white" }}
      >
        Add to Calendar
      </button>
      <div className="flex justify-between items-center mt-auto pt-5">
        <Stamp text="MARRIED" />
        <Stamp text="LOVE APPROVED" color="pink" />
      </div>
      <PassportFooter />
    </div>
  );
}

function RundownPage() {
  const items = [
    { time: "15:00–16:00", title: "Holy Matrimony", desc: "Groom and Bride will be saying their wedding vows, witnessed by precious families and friends." },
    { time: "16:30–17:00", title: "Teapai Ceremony", desc: "Private event between families to honor parents through the tradition of tea serving." },
    { time: "17:00–19:00", title: "Sunset & Cocktail Hour", desc: "Guests enjoy cocktails while watching the beautiful sunset of Bali." },
    { time: "19:00–End", title: "Dinner Reception", desc: "Celebration for the Groom and Bride becoming ONE! Dinner provided with many corners to enjoy." },
  ];
  return (
    <div className="flex flex-col h-full" style={{ background: "#FAF8F4" }}>
      <WeddingPassHeader />
      <div className="p-4 flex flex-col flex-1">
        <p className="text-2xl italic text-center mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#D4748A" }}>
          Event Rundown
        </p>
        <div className="relative pl-5 flex-1">
          <div className="absolute left-2 top-2 bottom-2 w-px" style={{ background: "#D8DDD5" }} />
          {items.map((it, i) => (
            <div key={i} className="flex gap-3 mb-4 relative">
              <div
                className="w-5 h-5 rounded-full border-2 border-white z-10 flex-shrink-0 mt-0.5 -ml-5"
                style={{ background: "#7C8F78" }}
              />
              <div className="rounded-xl p-3 flex-1" style={{ background: "#F5F7F4", border: "1px solid #D8DDD5" }}>
                <p className="font-semibold text-xs mb-0.5 font-mono" style={{ color: "#7C8F78" }}>{it.time}</p>
                <p className="font-semibold text-sm" style={{ color: "#333" }}>{it.title}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "#666" }}>{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <PassportFooter />
      </div>
    </div>
  );
}

function DressPage() {
  const palette = [
    { name: "Sage Green", hex: "#8FAF8C" },
    { name: "Washed Blue", hex: "#A8B8C8" },
    { name: "Pigeon Blue", hex: "#6A7E96" },
    { name: "Duck Egg", hex: "#88B5B3" },
    { name: "Cool Grey", hex: "#B0B8C0" },
    { name: "Lilac", hex: "#C0A8C8" },
  ];
  return (
    <div className="flex flex-col h-full" style={{ background: "#FAF8F4" }}>
      <WeddingPassHeader />
      <div className="p-4 flex flex-col flex-1">
        <p className="text-2xl italic text-center mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#D4748A" }}>
          Dresscode
        </p>
        <p className="text-sm text-center mb-4 px-2" style={{ color: "#666" }}>
          Please wear pastel tones only — cool neutrals preferred.
        </p>
        <div className="rounded-xl p-4 mb-4" style={{ border: "1px solid #D8DDD5", background: "#F5F7F4" }}>
          <p className="text-[9px] tracking-widest text-center uppercase mb-3" style={{ color: "#aaa" }}>
            Cool Neutral Palette
          </p>
          <div className="grid grid-cols-3 gap-3 justify-items-center">
            {palette.map(c => (
              <div key={c.name} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm" style={{ background: c.hex }} />
                <p className="text-[10px] text-center leading-tight" style={{ color: "#666" }}>{c.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-3" style={{ background: "#FDF0EE", border: "1px solid #F0C8C0" }}>
          <p className="font-bold text-[10px] tracking-widest text-center mb-2" style={{ color: "#A05060" }}>PLEASE AVOID</p>
          <div className="grid grid-cols-2 gap-1">
            {["NO WHITES", "NO Jeans / Shorts", "NO T-Shirt", "NO Slippers", "NO Batik"].map(d => (
              <p key={d} className="text-xs flex items-center gap-1" style={{ color: "#666" }}>
                <span style={{ color: "#D4748A" }}>✕</span> {d}
              </p>
            ))}
          </div>
        </div>
        <PassportFooter />
      </div>
    </div>
  );
}

function MapPage() {
  return (
    <div className="flex flex-col h-full" style={{ background: "#FAF8F4" }}>
      <div className="overflow-hidden flex-shrink-0" style={{ height: "220px", background: "#D8DDD5" }}>
        <iframe
          title="map" width="100%" height="100%"
          style={{ border: 0 }} loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.9!2d115.228!3d-8.798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd244dc3b4e7f7d%3A0x8e62c08c6b69f35a!2sConrad%20Bali!5e0!3m2!1sen!2sid!4v1620000000000"
        />
      </div>
      <div className="p-5 text-center flex flex-col flex-1">
        <p className="text-2xl italic mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#566251" }}>
          Conrad Bali
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
          Jl. Pratama No.168, Tanjung Benoa<br />Kuta Selatan, Bali 80363
        </p>
        <a
          href="https://maps.google.com/?q=Conrad+Bali"
          target="_blank" rel="noopener noreferrer"
          className="inline-block mx-auto mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold transition"
          style={{ background: "#7C8F78", color: "white" }}
        >
          <i className="fas fa-directions mr-2" />Get Directions
        </a>
        <PassportFooter />
      </div>
    </div>
  );
}

function GiftPage({ onCashless, onGift }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#FAF8F4" }}>
      <PassportHeader />
      <div className="flex flex-col items-center justify-center flex-1 py-6 px-5 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: "#F0F4EE", border: "1px solid #D8DDD5" }}
        >
          <i className="fas fa-gift text-2xl" style={{ color: "#7C8F78" }} />
        </div>
        <p className="text-3xl italic mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#566251" }}>
          Thank You
        </p>
        <p className="text-sm leading-relaxed mb-7 max-w-xs" style={{ color: "#666" }}>
          Your presence is the greatest gift. But if you wish to honor us further, we're truly grateful.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={onCashless}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2"
            style={{ background: "#7C8F78", color: "white" }}
          >
            <i className="fas fa-university" />Bank Transfer
          </button>
          <button
            onClick={onGift}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2"
            style={{ border: "2px solid #7C8F78", color: "#566251", background: "transparent" }}
          >
            <i className="fas fa-box" />Send Gift
          </button>
        </div>
        <div className="flex justify-between w-full mt-auto pt-6">
          <Stamp text="MARRIED" />
          <Stamp text="LOVE APPROVED" color="pink" />
        </div>
      </div>
      <PassportFooter />
    </div>
  );
}

function RSVPPage({ wishes, onRSVP }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#FAF8F4" }}>
      <WeddingPassHeader />
      <div className="p-4 flex flex-col flex-1">
        <div className="relative rounded-xl overflow-hidden mb-4 flex-shrink-0" style={{ height: "170px" }}>
          <img src={COUPLE_PHOTOS[1]} alt="couple" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-end p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
            <p className="text-white text-sm font-medium">Confirm your attendance &amp; send your best wishes</p>
          </div>
        </div>
        <button
          onClick={onRSVP}
          className="w-full py-3 rounded-xl font-semibold mb-4 text-sm flex items-center justify-center gap-2 transition"
          style={{ background: "#7C8F78", color: "white" }}
        >
          <i className="fas fa-paper-plane" />Confirm Attendance (RSVP)
        </button>
        <p className="text-xs text-center mb-3 font-mono tracking-wider" style={{ color: "#aaa" }}>
          WISHES & ATTENDANCE
        </p>
        <div className="space-y-2 flex-1">
          {wishes.map((w, i) => (
            <div key={i} className="rounded-xl p-3" style={{ border: "1px solid #D8DDD5", background: "#F5F7F4" }}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#7C8F78" }}>
                    {w.name[0]}
                  </div>
                  <p className="font-semibold text-sm" style={{ color: "#333" }}>{w.name}</p>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={w.status === "Hadir"
                    ? { background: "#E8F4E8", color: "#3A6B3A" }
                    : { background: "#FFF0EE", color: "#A05060" }}
                >
                  {w.status}
                </span>
              </div>
              <p className="text-sm ml-10" style={{ color: "#555" }}>{w.msg}</p>
              <p className="text-xs ml-10 mt-1" style={{ color: "#aaa" }}>{w.time}</p>
            </div>
          ))}
        </div>
        <PassportFooter />
      </div>
    </div>
  );
}

function ThanksPage() {
  return (
    <div className="flex flex-col h-full" style={{ background: "#FAF8F4" }}>
      <PassportHeader />
      <div className="flex flex-col items-center justify-center flex-1 py-8 px-6 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
          style={{ background: "#FDF0EE", border: "1px solid #F0C8C0" }}
        >
          <i className="fas fa-heart text-3xl" style={{ color: "#D4748A" }} />
        </div>
        <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "#666" }}>
          Thank you for celebrating with us on our wedding day!
          Your company, love, and wishes made our day complete.
        </p>
        <p className="text-sm italic mb-1" style={{ color: "#aaa" }}>Sincerely,</p>
        <p className="text-3xl italic mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#D4748A" }}>
          Gyubin &amp; Victoria
        </p>
        <div
          className="rounded-xl p-3 text-center w-full max-w-xs"
          style={{ background: "#F0F4EE", border: "1px solid #D8DDD5" }}
        >
          <i className="fas fa-music text-sm mb-1" style={{ color: "#7C8F78" }} />
          <p className="text-xs leading-relaxed" style={{ color: "#888" }}>
            Music:<br />
            <span style={{ color: "#566251", fontWeight: 600 }}>IU – Love Wins All</span><br />
            Violin &amp; Piano cover
          </p>
        </div>
        <div className="flex justify-between w-full mt-auto pt-5">
          <Stamp text="MARRIED" />
          <Stamp text="LOVE APPROVED" color="pink" />
        </div>
      </div>
      <PassportFooter />
    </div>
  );
}

// ─── modals ───────────────────────────────────────────────────────────────────
function ModalShell({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="rounded-2xl w-full max-w-sm shadow-2xl" style={{ background: "#FAF8F4", maxHeight: "85vh", overflowY: "auto" }}>
        <div className="flex justify-between items-center px-5 pt-4 pb-3" style={{ borderBottom: "1px solid #D8DDD5" }}>
          <h3 className="font-bold" style={{ color: "#333" }}>{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition"
            style={{ color: "#aaa" }}
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Input({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-xs mb-1 block font-medium" style={{ color: "#666" }}>{label}</label>
      <input
        className="w-full rounded-lg px-3 py-2 text-sm outline-none"
        style={{ border: "1px solid #D8DDD5", background: "white", color: "#333" }}
        placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={e => e.target.style.borderColor = "#7C8F78"}
        onBlur={e => e.target.style.borderColor = "#D8DDD5"}
      />
    </div>
  );
}

function CashlessModal({ onClose }) {
  const [copied, setCopied] = useState(null);
  const copy = (text, idx) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };
  return (
    <ModalShell onClose={onClose} title="Bank Transfer">
      <p className="text-sm mb-4 text-center" style={{ color: "#666" }}>Pilih rekening tujuan transfer</p>
      {BANKS.map((b, i) => (
        <div key={b.name} className="rounded-xl p-3 mb-3" style={{ border: "1px solid #D8DDD5", background: "#F5F7F4" }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold" style={{ color: "#566251" }}>{b.name}</p>
              <p className="font-mono text-lg" style={{ color: "#333" }}>{b.no}</p>
              <p className="text-xs" style={{ color: "#888" }}>a.n. {b.holder}</p>
            </div>
            <button
              onClick={() => copy(b.no, i)}
              className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition"
              style={{ background: "#7C8F78", color: "white" }}
            >
              <i className={`fas ${copied === i ? "fa-check" : "fa-copy"} text-xs`} />
              {copied === i ? "Copied!" : "Salin"}
            </button>
          </div>
        </div>
      ))}
    </ModalShell>
  );
}

function GiftModal({ onClose }) {
  return (
    <ModalShell onClose={onClose} title="Send Gift">
      <div className="rounded-xl p-4 space-y-2 text-sm" style={{ background: "#FDF0EE", border: "1px solid #F0C8C0" }}>
        <p className="font-bold" style={{ color: "#A05060" }}>Konfirmasi ke:</p>
        <p style={{ color: "#555" }}><i className="fab fa-whatsapp text-green-600 mr-2" />+62 812-3456-7890 (Victoria)</p>
        <div className="pt-2 mt-1" style={{ borderTop: "1px solid #F0C8C0" }}>
          <p className="font-bold" style={{ color: "#A05060" }}>Alamat Pengiriman:</p>
          <p className="mt-1" style={{ color: "#555" }}>Jl. Melati No. 15, Cipete Selatan,<br />Jakarta Selatan 12410</p>
        </div>
      </div>
      <p className="text-xs mt-3 text-center" style={{ color: "#aaa" }}>
        Konfirmasi pengiriman via WhatsApp sebelum mengirim hadiah
      </p>
    </ModalShell>
  );
}

function RSVPModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", group: "", wa: "", attend: "", msg: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => { if (!form.name || !form.attend) return; onSubmit(form); };
  return (
    <ModalShell onClose={onClose} title="RSVP">
      <div className="space-y-3">
        <Input label="Nama" placeholder="Nama lengkap" value={form.name} onChange={v => set("name", v)} />
        <Input label="Dari" placeholder="Keluarga / Teman / Kolega" value={form.group} onChange={v => set("group", v)} />
        <div>
          <label className="text-xs mb-1 block font-medium" style={{ color: "#666" }}>No. WhatsApp</label>
          <div className="flex gap-2">
            <span className="rounded-lg px-3 py-2 text-sm" style={{ border: "1px solid #D8DDD5", background: "#F5F7F4", color: "#555" }}>+62</span>
            <input
              className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
              style={{ border: "1px solid #D8DDD5", background: "white", color: "#333" }}
              placeholder="812-3456-7890" value={form.wa}
              onChange={e => set("wa", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="text-xs mb-1 block font-medium" style={{ color: "#666" }}>Kehadiran</label>
          <select
            className="w-full rounded-lg px-3 py-2 text-sm outline-none"
            style={{ border: "1px solid #D8DDD5", background: "white", color: "#333" }}
            value={form.attend} onChange={e => set("attend", e.target.value)}
          >
            <option value="">Pilih kehadiran...</option>
            <option value="Hadir">✓ Hadir</option>
            <option value="Tidak Hadir">✗ Tidak Hadir</option>
            <option value="Masih Ragu">? Masih Ragu</option>
          </select>
        </div>
        <div>
          <label className="text-xs mb-1 block font-medium" style={{ color: "#666" }}>Ucapan &amp; Doa</label>
          <textarea
            className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
            style={{ border: "1px solid #D8DDD5", background: "white", color: "#333", minHeight: "80px" }}
            placeholder="Tulis ucapan terbaik untuk pengantin..."
            value={form.msg} onChange={e => set("msg", e.target.value)}
          />
        </div>
        <button
          onClick={submit}
          className="w-full py-3 rounded-xl font-semibold text-sm transition"
          style={{ background: "#7C8F78", color: "white" }}
        >
          Kirim RSVP
        </button>
      </div>
    </ModalShell>
  );
}

function QRModal({ name, onClose }) {
  return (
    <ModalShell onClose={onClose} title="Wedding Pass QR">
      <div className="flex flex-col items-center gap-3 py-2">
        <div
          className="w-40 h-40 rounded-xl flex items-center justify-center"
          style={{ border: "4px solid #7C8F78", background: "#F5F7F4" }}
        >
          <svg viewBox="0 0 100 100" className="w-32 h-32">
            <rect x={5} y={5} width={35} height={35} fill="none" stroke="#566251" strokeWidth="3" />
            <rect x={12} y={12} width={21} height={21} fill="#566251" />
            <rect x={60} y={5} width={35} height={35} fill="none" stroke="#566251" strokeWidth="3" />
            <rect x={67} y={12} width={21} height={21} fill="#566251" />
            <rect x={5} y={60} width={35} height={35} fill="none" stroke="#566251" strokeWidth="3" />
            <rect x={12} y={67} width={21} height={21} fill="#566251" />
            <rect x={45} y={45} width={7} height={7} fill="#566251" />
            <rect x={57} y={45} width={7} height={7} fill="#566251" />
            <rect x={69} y={45} width={7} height={7} fill="#566251" />
            <rect x={81} y={45} width={7} height={7} fill="#566251" />
            <rect x={45} y={57} width={7} height={7} fill="#566251" />
            <rect x={69} y={57} width={7} height={7} fill="#566251" />
            <rect x={45} y={69} width={7} height={7} fill="#566251" />
            <rect x={57} y={69} width={14} height={7} fill="#566251" />
            <rect x={81} y={69} width={7} height={7} fill="#566251" />
            <rect x={57} y={81} width={7} height={7} fill="#566251" />
            <rect x={75} y={81} width={13} height={7} fill="#566251" />
          </svg>
        </div>
        <p className="text-sm font-semibold" style={{ color: "#566251" }}>{name || "Wedding Guest"}</p>
        <p className="text-xs font-mono" style={{ color: "#aaa" }}>Wedding Pass · 14 Dec 2024</p>
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition mt-1"
          style={{ border: "2px solid #7C8F78", color: "#566251", background: "transparent" }}
        >
          <i className="fas fa-download mr-2" />Download Pass
        </button>
      </div>
    </ModalShell>
  );
}

// ─── music bar ────────────────────────────────────────────────────────────────
function MusicBar({ playing, muted, onTogglePlay, onToggleMute, song }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 flex-shrink-0" style={{ background: "#566251", color: "white" }}>
      <button
        onClick={onTogglePlay}
        className="w-8 h-8 rounded-full flex items-center justify-center transition flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.2)" }}
        aria-label={playing ? "Pause" : "Play"}
      >
        <i className={`fas ${playing ? "fa-pause" : "fa-play"} text-xs`} />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">{song}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="flex items-end gap-0.5" style={{ height: "12px" }}>
            {[8, 12, 6, 10].map((h, i) => (
              <div
                key={i}
                className={playing ? "animate-bar" : ""}
                style={{
                  width: "2px",
                  height: `${h}px`,
                  background: playing ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
                  borderRadius: "1px",
                  animationDelay: `${i * 0.18}s`,
                }}
              />
            ))}
          </div>
          <p className="text-[10px] ml-1" style={{ color: "rgba(255,255,255,0.55)" }}>
            {playing ? "Now Playing" : "Paused"}
          </p>
        </div>
      </div>
      <button
        onClick={onToggleMute}
        className="w-8 h-8 rounded-full flex items-center justify-center transition flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.2)" }}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        <i className={`fas ${muted ? "fa-volume-mute" : "fa-volume-up"} text-xs`} />
      </button>
    </div>
  );
}

// ─── nav bar ─────────────────────────────────────────────────────────────────
function NavBar({ visibleNav, page, onNav, mobile }) {
  return (
    <nav
      className="flex items-center justify-between flex-shrink-0"
      style={{
        background: "#E7CDC8",
        padding: mobile
          ? `6px 4px calc(6px + env(safe-area-inset-bottom, 0px))`
          : "6px 8px",
        gap: "2px",
      }}
    >
      {visibleNav.map(n => (
        <button
          key={n.id}
          onClick={() => onNav(n.id)}
          className="flex flex-col items-center gap-0.5 flex-1 transition-all"
          style={{
            padding: "6px 4px",
            fontSize: mobile ? "9px" : "10px",
            color: page === n.id ? "white" : "#8D6060",
            background: page === n.id ? "#7C8F78" : "transparent",
            borderRadius: page === n.id ? "10px" : "0",
            fontWeight: 500,
          }}
        >
          <i className={`fas ${n.icon}`} style={{ fontSize: mobile ? "13px" : "14px" }} />
          <span style={{ lineHeight: 1 }}>{n.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── inner shell used by both desktop card and mobile ────────────────────────
// This is the opened-state layout: scroll only in the page area
function InnerShell({ page, renderPage, visibleNav, onNav, playing, muted, onTogglePlay, onToggleMute, mobile }) {
  return (
    // outer: fills the card/screen — NO overflow here
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", minHeight: 0 }}>
      {/* page area: only this scrolls, and only when content is taller than available space */}
      <div
        key={page}
        className="page-fade scroll-none"
        style={{ flex: 1, overflowY: "auto", minHeight: 0 }}
      >
        {/* page root must be h-full so it stretches to fill when content is short */}
        <div style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
          {renderPage()}
        </div>
      </div>
      {/* music bar — always visible, never scrolls */}
      <MusicBar
        playing={playing} muted={muted}
        onTogglePlay={onTogglePlay} onToggleMute={onToggleMute}
        song="IU – Love Wins All (Violin & Piano)"
      />
      {/* nav — always visible, never scrolls */}
      <NavBar visibleNav={visibleNav} page={page} onNav={onNav} mobile={mobile} />
    </div>
  );
}

// ─── main app ─────────────────────────────────────────────────────────────────
export default function Passport() {
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState("intro");
  const [modal, setModal] = useState(null);
  const [wishes, setWishes] = useState(INITIAL_WISHES);
  const [qrName, setQrName] = useState("");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  const pageIdx = NAV.findIndex(n => n.id === page);
  const navStart = Math.max(0, Math.min(pageIdx - Math.floor(NAV_VISIBLE / 2), NAV.length - NAV_VISIBLE));
  const visibleNav = NAV.slice(navStart, navStart + NAV_VISIBLE);

  const handleOpen = () => {
    setOpened(true);
    setPage("intro");
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  };
  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => {}); setPlaying(true); }
  };
  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !muted;
    setMuted(m => !m);
  };
  const submitRSVP = (form) => {
    setWishes(w => [{ name: form.name, status: form.attend, msg: form.msg, time: "Just now" }, ...w]);
    setQrName(form.name);
    setModal("qr");
  };

  const renderPage = () => {
    switch (page) {
      case "intro":   return <IntroPage />;
      case "groom":   return <ProfilePage isGroom />;
      case "bride":   return <ProfilePage isGroom={false} />;
      case "gallery": return <GalleryPage />;
      case "event":   return <EventPage />;
      case "rundown": return <RundownPage />;
      case "dress":   return <DressPage />;
      case "map":     return <MapPage />;
      case "gift":    return <GiftPage onCashless={() => setModal("cashless")} onGift={() => setModal("gift")} />;
      case "rsvp":    return <RSVPPage wishes={wishes} onRSVP={() => setModal("rsvp")} />;
      case "thanks":  return <ThanksPage />;
      default:        return <IntroPage />;
    }
  };

  const commonShellProps = {
    page, renderPage, visibleNav, onNav: setPage,
    playing, muted, onTogglePlay: togglePlay, onToggleMute: toggleMute,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; height: 100%; background: #ECE8E1; font-family: 'Lato', sans-serif; overflow: hidden; }
        #root { height: 100%; }
        .scroll-none::-webkit-scrollbar { display: none; }
        .scroll-none { -ms-overflow-style: none; scrollbar-width: none; }
        .page-fade { animation: fadeIn .3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
        @keyframes barBounce { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
        .animate-bar { transform-origin: bottom; animation: barBounce 0.8s ease-in-out infinite; }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <audio ref={audioRef} src={MUSIC_URL} loop />

      {/* ── DESKTOP ──────────────────────────────────────────────── */}
      <div
        className="hidden md:flex"
        style={{ width: "100%", height: "100vh", alignItems: "center", justifyContent: "center", background: "#ECE8E1" }}
      >
        {/* left deco */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", opacity: 0.25, userSelect: "none", pointerEvents: "none", padding: "32px" }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "56px", fontStyle: "italic", color: "#7C8F78", textAlign: "center", lineHeight: 1.1 }}>G<br />&amp;<br />V</p>
          <div style={{ width: "1px", height: "100px", background: "#7C8F78" }} />
          <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#7C8F78", letterSpacing: "0.3em", transform: "rotate(90deg)", whiteSpace: "nowrap" }}>14 · 12 · 2024</p>
        </div>

        {/* ── CARD — fixed height, no outer scroll ── */}
        <div
          style={{
            width: "400px",
            height: "calc(100vh - 40px)",
            maxHeight: "860px",
            minHeight: "580px",
            background: "#FAF8F4",
            borderRadius: "24px",
            overflow: "hidden",          // ← clip; inner shell handles scroll
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            border: "1px solid #D8DDD5",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          {!opened
            ? <HomePage onOpen={handleOpen} />
            : <InnerShell {...commonShellProps} mobile={false} />
          }
        </div>

        {/* right deco */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", opacity: 0.25, userSelect: "none", pointerEvents: "none", padding: "32px" }}>
          <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#7C8F78", letterSpacing: "0.25em", transform: "rotate(-90deg)", whiteSpace: "nowrap" }}>PASSPORT TO MARRIAGE</p>
          <div style={{ width: "1px", height: "100px", background: "#7C8F78" }} />
          <i className="fas fa-plane" style={{ fontSize: "36px", color: "#7C8F78" }} />
        </div>
      </div>

      {/* ── MOBILE ───────────────────────────────────────────────── */}
      <div
        className="md:hidden"
        style={{
          width: "100%",
          height: "100dvh",          // dynamic viewport height — accounts for browser chrome
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",        // ← no outer scroll on mobile either
          background: "#FAF8F4",
        }}
      >
        {!opened
          ? <HomePage onOpen={handleOpen} />
          : <InnerShell {...commonShellProps} mobile={true} />
        }
      </div>

      {modal === "cashless" && <CashlessModal onClose={() => setModal(null)} />}
      {modal === "gift"     && <GiftModal     onClose={() => setModal(null)} />}
      {modal === "rsvp"     && <RSVPModal     onClose={() => setModal(null)} onSubmit={submitRSVP} />}
      {modal === "qr"       && <QRModal       name={qrName} onClose={() => setModal(null)} />}
    </>
  );
}
