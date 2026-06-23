import { useState, useEffect, useRef } from "react";

// ── Dummy data ──────────────────────────────────────────────────────────────
const GROOM = {
    initials: "BI",
    name: "Briptu Indra Lukman Hakim S.H",
    short: "Indra",
    parents: "Putra dari Bapak H. Amad (Alm) dan Ibu Hj. Nurhalimah",
    instagram: "@indra_lukman",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
};
const BRIDE = {
    initials: "YF",
    name: "Yurita Febriyawati S.I.Kom",
    short: "Yunita",
    parents: "Putri dari Bapak Muslim (KBJ) dan Ibu Nurkhasanah",
    instagram: "@yurita_feb",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
};

const EVENTS = [
    {
        id: "akad",
        title: "Akad Nikah",
        date: "Sunday, 23 November 2025",
        time: "08.00 – 12.00 WIB",
        venue: "HOTEL SATU HATI",
        mapsUrl: "https://maps.google.com",
        cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=300&fit=crop",
    },
    {
        id: "resepsi",
        title: "Resepsi",
        date: "Sunday, 23 November 2025",
        time: "12.00 – 17.00 WIB",
        venue: "HOTEL SATU HATI",
        mapsUrl: "https://maps.google.com",
        cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=300&fit=crop",
    },
];

const LOVE_STORY = [
    {
        track: 1,
        title: "Pertemuan Kita",
        bg: "bg-orange-400",
        text: "text-white",
        photo: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=200&h=200&fit=crop",
        desc: "Mereka bertemu tanpa rencana, hanya dua orang asing yang kebetulan berada di tempat yang sama pada waktu yang tepat. Dari sapaan singkat yang awalnya biasa saja, tiba-tiba muncul percakapan yang terasa hangat dan berbeda.",
    },
    {
        track: 2,
        title: "Jatuh Cinta",
        bg: "bg-indigo-800",
        text: "text-white",
        photo: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=200&h=200&fit=crop",
        desc: "Dari pertemuan itu tumbuh rasa yang tak terduga. Setiap hari terasa lebih berwarna, setiap momen terasa lebih berarti bersama satu sama lain.",
    },
    {
        track: 3,
        title: "Mengikat Cinta",
        bg: "bg-orange-400",
        text: "text-white",
        photo: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=400&fit=crop",
        desc: "Mereka memutuskan untuk menjadikan cinta itu nyata. Sebuah janji diucapkan, dua keluarga bersatu, dan sebuah babak baru pun dimulai.",
    },
    {
        track: 4,
        title: "Married",
        bg: "bg-indigo-800",
        text: "text-white",
        photo: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=200&h=200&fit=crop",
        desc: "Hari yang paling dinantikan tiba. Di hadapan Allah dan orang-orang terkasih, mereka resmi menjadi sepasang suami istri yang saling melengkapi.",
    },
];

const MEMORIES = [
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=300&fit=crop", caption: "Sedia Aku Sebelum Hujan" },
    { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=300&h=300&fit=crop", caption: "Cinta Luar Biasa" },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&h=300&fit=crop", caption: "Bersama Selamanya" },
    { src: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=300&h=300&fit=crop", caption: "Kenangan Indah" },
    { src: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=300&h=300&fit=crop", caption: "Hari Bahagia" },
    { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=300&fit=crop", caption: "Momen Spesial" },
];

const DUMMY_MUSIC = {
    title: "Indra & Yunita: New Chapter",
    artist: "Wedding OST",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    video: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=340&fit=crop",
};

const WEDDING_DATE = new Date("2027-11-23T08:00:00");

// ── Countdown hook ──────────────────────────────────────────────────────────
function useCountdown(target) {
    const calc = () => {
        const diff = target - Date.now();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff % 86400000) / 3600000),
            minutes: Math.floor((diff % 3600000) / 60000),
            seconds: Math.floor((diff % 60000) / 1000),
        };
    };
    const [cd, setCd] = useState(calc);
    useEffect(() => {
        const id = setInterval(() => setCd(calc()), 1000);
        return () => clearInterval(id);
    });
    return cd;
}

// ── Scroll-reveal hook ──────────────────────────────────────────────────────
// Mengembalikan [ref, isVisible]. Elemen akan masuk animasi saat masuk viewport.
function useReveal(options = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.unobserve(el); // animasi cukup sekali
                }
            },
            { threshold: options.threshold ?? 0.12, ...options }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

// ── Reveal wrapper component ─────────────────────────────────────────────────
// Membungkus children dengan animasi slide-down + fade saat masuk viewport.
// delay dalam ms untuk stagger effect pada item dalam list.
function Reveal({ children, delay = 0, className = "" }) {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-40px)",
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

// ── QR Generator (canvas) ───────────────────────────────────────────────────
function QRCanvas({ data }) {
    const ref = useRef();
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const size = 160;
        canvas.width = size;
        canvas.height = size;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = "#1e2d6b";
        const cell = size / 21;
        for (let r = 0; r < 21; r++) {
            for (let c = 0; c < 21; c++) {
                const v = (r + c + data.charCodeAt((r * 21 + c) % data.length)) % 3 === 0;
                if (v) ctx.fillRect(c * cell, r * cell, cell, cell);
            }
        }
        [[0, 0], [14, 0], [0, 14]].forEach(([x, y]) => {
            ctx.fillStyle = "#1e2d6b";
            ctx.fillRect(x * cell, y * cell, 7 * cell, 7 * cell);
            ctx.fillStyle = "#fff";
            ctx.fillRect((x + 1) * cell, (y + 1) * cell, 5 * cell, 5 * cell);
            ctx.fillStyle = "#1e2d6b";
            ctx.fillRect((x + 2) * cell, (y + 2) * cell, 3 * cell, 3 * cell);
        });
    }, [data]);
    return <canvas ref={ref} style={{ width: 160, height: 160, imageRendering: "pixelated" }} />;
}

// ── RSVP Modal ──────────────────────────────────────────────────────────────
const INITIAL_COMMENTS = [
    { id: 1, name: "Nama Tamu", initial: "NT", color: "bg-yellow-400", status: "Hadir", comment: "yey", time: "19 May 2026 at 10.42" },
    { id: 2, name: "Puma", initial: "PU", color: "bg-red-400", status: "Hadir", comment: "Selamat ya", time: "30 March 2026 at 15.52" },
    { id: 3, name: "Nama Tamu", initial: "NT", color: "bg-yellow-400", status: "Hadir", comment: "selamat ya", time: "10 February 2026 at 17.06" },
    { id: 4, name: "Rafael", initial: "RA", color: "bg-purple-500", status: "Hadir", comment: "selamat", time: "9 February 2026 at 15.50" },
];

function RSVPModal({ onClose }) {
    const [form, setForm] = useState({ name: "", grup: "", wa: "", kehadiran: "", comment: "" });
    const [submitted, setSubmitted] = useState(false);
    const [comments, setComments] = useState(INITIAL_COMMENTS);
    const [showQR, setShowQR] = useState(false);

    const colors = ["bg-blue-500", "bg-green-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];

    const handleSubmit = () => {
        if (!form.name || !form.kehadiran) return;
        const initials = form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
        const color = colors[Math.floor(Math.random() * colors.length)];
        const now = new Date();
        const timeStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) + " at " + now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        setComments(prev => [{ id: Date.now(), name: form.name, initial: initials, color, status: form.kehadiran, comment: form.comment, time: timeStr }, ...prev]);
        setSubmitted(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="bg-amber-50 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-indigo-900">RSVP</h2>
                        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-400 text-white text-sm">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {submitted ? (
                        <div className="text-center py-4">
                            <div className="text-5xl mb-3">🎉</div>
                            <h3 className="text-xl font-bold text-indigo-900 mb-1">Thank You!</h3>
                            <p className="text-gray-500 text-sm mb-4">Your confirmation has been recorded in our reservation list.</p>
                            <button onClick={() => { setSubmitted(false); }} className="w-full py-3 rounded-xl bg-orange-400 text-white font-semibold mb-2">Update My Confirmation</button>
                            <button onClick={() => setShowQR(!showQR)} className="w-full py-3 rounded-xl border-2 border-teal-600 text-teal-700 font-semibold mb-4">
                                <i className="fas fa-qrcode mr-2"></i> Download QR Code
                            </button>
                            {showQR && (
                                <div className="flex flex-col items-center gap-2 mb-4 p-4 bg-white rounded-xl">
                                    <QRCanvas data={form.name + "-HALDY-ELOK-2025"} />
                                    <p className="text-xs text-gray-500">{form.name} – {form.kehadiran}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                                <input className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="Nama Tamu" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Grup</label>
                                <input className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="Grup" value={form.grup} onChange={e => setForm(p => ({ ...p, grup: e.target.value }))} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No WhatsApp</label>
                                <div className="flex gap-2">
                                    <span className="border rounded-xl px-3 py-2.5 text-sm bg-white text-gray-600">+62 ▾</span>
                                    <input className="flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="No WhatsApp" value={form.wa} onChange={e => setForm(p => ({ ...p, wa: e.target.value }))} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kehadiran</label>
                                <select className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white" value={form.kehadiran} onChange={e => setForm(p => ({ ...p, kehadiran: e.target.value }))}>
                                    <option value="">Kehadiran</option>
                                    <option value="Hadir">Hadir</option>
                                    <option value="Tidak Hadir">Tidak Hadir</option>
                                    <option value="Masih Ragu">Masih Ragu</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Komentar atau Ucapan</label>
                                <textarea className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none" rows={3} placeholder="Komentar atau Ucapan" value={form.comment} onChange={e => setForm(p => ({ ...p, comment: e.target.value }))} />
                            </div>
                            <button onClick={handleSubmit} className="w-full py-3 rounded-xl bg-orange-400 text-white font-semibold text-sm">Kirim</button>
                        </div>
                    )}

                    <div className="mt-6 space-y-3">
                        {comments.map(c => (
                            <div key={c.id} className="flex gap-3">
                                <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{c.initial}</div>
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-sm text-gray-800">{c.name}</span>
                                        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">{c.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{c.comment}</p>
                                    <p className="text-xs text-gray-400">{c.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Music Player float buttons ───────────────────────────────────────────────
function MusicPlayer({ playing, onToggle, muted, onMute }) {
    return (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-40">
            <button onClick={onToggle} className="w-11 h-11 rounded-full bg-orange-400 text-white shadow-lg flex items-center justify-center text-lg">
                <i className={`fas ${playing ? "fa-pause" : "fa-play"}`}></i>
            </button>
            <button onClick={onMute} className="w-11 h-11 rounded-full bg-orange-400 text-white shadow-lg flex items-center justify-center text-lg">
                <i className={`fas ${muted ? "fa-volume-mute" : "fa-volume-up"}`}></i>
            </button>
        </div>
    );
}

// ── Section heading helper ───────────────────────────────────────────────────
function SectionHeading({ title }) {
    return (
        <Reveal>
            <h2 className="text-2xl font-black text-indigo-900 text-center mb-1">{title}</h2>
            <div className="w-12 h-1 bg-orange-400 mx-auto mb-6 rounded"></div>
        </Reveal>
    );
}

// ── Ticket Cover (landing) ───────────────────────────────────────────────────
function TicketCover({ onOpen, guestName = "Nama Tamu" }) {
    return (
        <div className="min-h-screen bg-[#f5ede4] flex items-center justify-center p-4">
            {/* Desktop layout */}
            <div className="hidden md:flex gap-0 rounded-3xl overflow-hidden shadow-2xl" style={{ maxWidth: 780 }}>
                <div className="bg-white w-56 flex flex-col items-center justify-center p-8 gap-4 border-r-2 border-dashed border-gray-200 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-10 bg-[#1e2d6b] rounded-r-full"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-10 bg-[#f5ede4] rounded-l-full -mr-2"></div>
                    <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }} className="text-3xl font-black text-indigo-900 tracking-widest">INVITATION</div>
                    <div className="w-1 flex-1 border-l-2 border-dashed border-gray-200"></div>
                    <p className="text-xs text-gray-400 tracking-widest" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>BOARDING PASS</p>
                </div>
                <div className="bg-white flex-1 p-5 relative">
                    <div className="flex items-center justify-between mb-6">
                        <KAILogo />
                        <div className="ps-5 text-right">
                            <p className="font-bold text-sm text-indigo-900">KATENE RABI</p>
                            <p className="text-xs text-gray-400">PT KAMU UNTUK AKU (SELAMANYA)</p>
                        </div>
                    </div>
                    <div className="text-2xl font-black text-indigo-900 mb-1">INVITATION PASS</div>
                    <div className="text-xs text-gray-400 mb-1">Kode Booking / Booking Code</div>
                    <div className="text-lg font-black text-indigo-900 mb-6">N1K4HL3</div>
                    <div className="flex items-center gap-4 mb-6">
                        <div>
                            <div className="text-3xl font-black text-orange-400">HP</div>
                            <div className="text-sm text-gray-500">{GROOM.short.slice(0, 5)}</div>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-900"></div>
                            <div className="flex-1 border-t border-dashed border-gray-300"></div>
                            <div className="w-9 h-9 rounded-full bg-indigo-900 flex items-center justify-center text-white text-base"><i className="fas fa-train"></i></div>
                            <div className="flex-1 border-t border-dashed border-gray-300"></div>
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black text-orange-400">ER</div>
                            <div className="text-sm text-gray-500">{BRIDE.short.slice(0, 4)}</div>
                        </div>
                    </div>
                    <div className="border-t border-dashed border-gray-200 my-4"></div>
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-xs text-gray-400">Kepada Yth.</div>
                            <div className="font-bold text-indigo-900">{guestName}</div>
                            <div className="text-xs text-gray-400 mt-2">Tipe Penumpang</div>
                            <div className="font-bold text-indigo-900">VIP</div>
                        </div>
                        <Barcode />
                    </div>
                    <div className="mt-6 text-center">
                        <div className="text-xs text-gray-500 tracking-widest">WELCOME TO</div>
                        <div className="text-2xl font-black text-orange-400">HALDY & ELOK</div>
                        <div className="text-xs text-gray-500 tracking-widest">WEDDING CELEBRATION</div>
                    </div>
                    <button onClick={onOpen} className="mt-4 w-full py-3 rounded-xl bg-orange-400 text-white font-bold tracking-widest text-sm hover:bg-orange-500 transition">
                        OPEN TICKET
                    </button>
                </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden w-full max-w-sm">
                <div className="bg-[#1e2d6b] rounded-3xl p-4 shadow-2xl">
                    <div className="bg-white rounded-2xl overflow-hidden">
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-4">
                                <KAILogo />
                                <div className="text-right">
                                    <p className="font-bold text-xs text-indigo-900">KATENE RABI</p>
                                    <p className="text-[10px] text-gray-400">PT KAMU UNTUK AKU (SELAMANYA)</p>
                                </div>
                            </div>
                            <div className="text-lg font-black text-indigo-900 mb-1">INVITATION PASS</div>
                            <div className="text-[10px] text-gray-400">Kode Booking / Booking Code</div>
                            <div className="text-base font-black text-indigo-900 mb-4">N1K4HL3</div>
                            <div className="flex items-center gap-2 mb-2">
                                <div>
                                    <div className="text-xl font-black text-orange-400">HP</div>
                                    <div className="text-xs text-gray-500">{GROOM.short.slice(0, 5)}</div>
                                </div>
                                <div className="flex-1 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-900"></div>
                                    <div className="flex-1 border-t border-dashed border-gray-300"></div>
                                    <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-white text-sm"><i className="fas fa-train"></i></div>
                                    <div className="flex-1 border-t border-dashed border-gray-300"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-black text-orange-400">ER</div>
                                    <div className="text-xs text-gray-500">{BRIDE.short.slice(0, 4)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-5 h-8 bg-[#1e2d6b] rounded-r-full"></div>
                            <div className="flex-1 border-t-2 border-dashed border-gray-200 mx-1"></div>
                            <div className="w-5 h-8 bg-[#1e2d6b] rounded-l-full"></div>
                        </div>
                        <div className="p-5">
                            <div className="flex items-end justify-between mb-3">
                                <div>
                                    <div className="text-xs text-gray-400">Kepada Yth.</div>
                                    <div className="font-bold text-indigo-900 text-sm">{guestName}</div>
                                    <div className="text-xs text-gray-400 mt-2">Tipe Penumpang</div>
                                    <div className="font-bold text-indigo-900 text-sm">VIP</div>
                                </div>
                                <Barcode small />
                            </div>
                            <div className="text-center mt-2">
                                <div className="text-[10px] text-gray-500 tracking-widest">WELCOME TO</div>
                                <div className="text-xl font-black text-orange-400">HALDY & ELOK</div>
                                <div className="text-[10px] text-gray-500 tracking-widest">WEDDING CELEBRATION</div>
                            </div>
                            <button onClick={onOpen} className="mt-3 w-full py-3 rounded-xl bg-orange-400 text-white font-bold tracking-widest text-sm">
                                OPEN TICKET
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function KAILogo() {
    return (
        <div className="flex items-center">
            <span className="text-2xl font-black text-indigo-900">K</span>
            <span className="text-2xl font-black text-orange-400">U</span>
            <span className="text-2xl font-black text-indigo-900">A</span>
        </div>
    );
}

function Barcode({ small }) {
    const bars = Array.from({ length: small ? 20 : 28 }, (_, i) => i);
    return (
        <div className={`flex gap-0.5 ${small ? "h-10" : "h-12"}`}>
            {bars.map(i => (
                <div key={i} className="bg-indigo-900" style={{ width: (i % 3 === 0 ? 3 : 1.5) + "px", height: "100%" }}></div>
            ))}
        </div>
    );
}

// ── Main Invitation Content ──────────────────────────────────────────────────
function InvitationContent({ onRSVP, audioRef, playing, setPlaying, muted, setMuted }) {
    const cd = useCountdown(WEDDING_DATE);
    const [progress, setProgress] = useState(0.05);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.play()
            .then(() => setPlaying(true))
            .catch(() => {});
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (playing) { audioRef.current.pause(); } else { audioRef.current.play().catch(() => {}); }
        setPlaying(p => !p);
    };

    const toggleMute = () => {
        if (audioRef.current) audioRef.current.muted = !muted;
        setMuted(m => !m);
    };

    const cdBoxes = [
        { label: "Days", val: cd.days },
        { label: "Hours", val: cd.hours },
        { label: "Minutes", val: cd.minutes },
        { label: "Seconds", val: cd.seconds },
    ];

    return (
        <div className="bg-[#f5ede4] min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* ── Hero / Music — slide in on mount ── */}
                <section className="relative max-w-5xl mx-auto pt-6 px-4">
                    {/* Hero image animates from top */}
                    <Reveal>
                        <div className="relative overflow-hidden rounded-t-3xl" style={{ height: 240 }}>
                            <img src={DUMMY_MUSIC.video} alt="couple" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center text-indigo-900 text-xl shadow">
                                    <i className={`fas ${playing ? "fa-pause" : "fa-play"}`}></i>
                                </div>
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                                <div className="h-full bg-orange-400" style={{ width: `${progress * 100}%` }}></div>
                            </div>
                            <div className="absolute bottom-2 left-3 text-white text-xs">0.25</div>
                            <div className="absolute bottom-2 right-3 text-white text-xs">5.25</div>
                        </div>
                    </Reveal>

                    {/* Player panel — slight delay so it feels like it follows the image */}
                    <Reveal delay={100}>
                        <div className="bg-orange-400 text-white px-6 py-6 rounded-b-3xl">
                            <div className="flex justify-between items-center mb-2">
                                <button className="text-xl opacity-70"><i className="fas fa-random"></i></button>
                                <button className="text-xl"><i className="fas fa-step-backward"></i></button>
                                <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-white text-orange-400 flex items-center justify-center text-xl shadow">
                                    <i className={`fas ${playing ? "fa-pause" : "fa-play"}`}></i>
                                </button>
                                <button className="text-xl"><i className="fas fa-step-forward"></i></button>
                                <button className="text-xl opacity-70"><i className="fas fa-redo"></i></button>
                            </div>
                            <div className="font-bold text-lg">{DUMMY_MUSIC.title}</div>
                            <div className="inline-flex items-center gap-2 bg-white text-orange-400 text-xs rounded-full px-3 py-1 mt-1 font-medium">
                                {playing && (
                                    <span className="flex gap-0.5 items-end h-3">
                                        {[1, 2, 3].map(i => (
                                            <span key={i} className="w-0.5 bg-orange-400 rounded-full animate-bounce" style={{ height: `${i * 4}px`, animationDelay: `${i * 0.1}s` }}></span>
                                        ))}
                                    </span>
                                )}
                                Coming soon on Saturday, 14 December 2027
                            </div>

                            {/* Countdown — staggered per box */}
                            <div className="grid grid-cols-4 gap-4 mt-6 max-w-xl mx-auto">
                                {cdBoxes.map((b, i) => (
                                    <Reveal key={b.label} delay={i * 80}>
                                        <div className="bg-white rounded-xl py-3 text-center shadow">
                                            <div className="text-2xl font-black text-orange-400">{String(b.val).padStart(2, "0")}</div>
                                            <div className="text-xs text-gray-500 font-medium">{b.label}</div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>

                            <Reveal delay={200}>
                                <div className="mt-4 text-sm text-white/90 leading-relaxed">
                                    Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
                                </div>
                                <div className="text-xs text-white/70 mt-1">(Q.S Ar-Rum ayat 21)</div>
                            </Reveal>
                        </div>
                    </Reveal>
                </section>

                {/* ── Favourite Couple ── */}
                <section className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
                    <Reveal>
                        <div className="bg-orange-400 rounded-2xl overflow-hidden flex items-center gap-4 p-4">
                            <div className="flex-1">
                                <div className="text-white font-bold text-lg">Favourite</div>
                                <div className="text-white font-bold text-lg">Couple</div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=200&h=200&fit=crop" className="w-28 h-28 rounded-xl object-cover" alt="couple" />
                        </div>
                    </Reveal>

                    <Reveal delay={80}>
                        <p className="text-center text-orange-400 font-medium mt-8 mb-6 leading-relaxed">
                            Dengan memohon rahmat dan ridho Allah SWT kami bermaksud mengundang Bapak/Ibu/Saudara/i dalam acara Akad Nikah &amp; Resepsi putra-putri kami
                        </p>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Reveal delay={0}>
                            <div className="bg-indigo-800 rounded-3xl p-5 flex items-center gap-5 min-h-[140px] shadow-lg">
                                <img src={GROOM.photo} alt={GROOM.name} className="w-24 h-24 rounded-full object-cover border-4 border-orange-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <span className="inline-block bg-orange-400 text-white text-xs px-3 py-1 rounded-full mb-2">{GROOM.instagram}</span>
                                    <h3 className="text-white font-bold text-xl leading-tight">{GROOM.name}</h3>
                                    <p className="text-white/70 text-sm mt-2 leading-relaxed">{GROOM.parents}</p>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={120}>
                            <div className="bg-orange-400 rounded-3xl p-5 flex items-center gap-5 min-h-[140px] shadow-lg">
                                <img src={BRIDE.photo} alt={BRIDE.name} className="w-24 h-24 rounded-full object-cover border-4 border-white flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <span className="inline-block bg-indigo-800 text-white text-xs px-3 py-1 rounded-full mb-2">{BRIDE.instagram}</span>
                                    <h3 className="text-white font-bold text-xl leading-tight">{BRIDE.name}</h3>
                                    <p className="text-white/80 text-sm mt-2 leading-relaxed">{BRIDE.parents}</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Timeline & Location ── */}
                <section className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
                    <SectionHeading title="Timeline & Location" />
                    <div className="grid md:grid-cols-2 gap-6">
                        {EVENTS.map((ev, i) => (
                            <Reveal key={ev.id} delay={i * 120}>
                                <div className="rounded-3xl overflow-hidden relative h-[220px] md:h-[320px]">
                                    <img src={ev.cover} className="w-full h-full object-cover" alt={ev.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <div className="text-xl font-black">{ev.title}</div>
                                        <div className="flex items-center gap-2 text-sm mt-1 flex-wrap">
                                            <i className="fas fa-calendar-alt text-orange-400"></i> {ev.date}
                                            <i className="fas fa-clock text-orange-400 ml-2"></i> {ev.time}
                                            <i className="fas fa-map-marker-alt text-orange-400 ml-2"></i> {ev.venue}
                                        </div>
                                        <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block bg-orange-400 text-white text-xs px-4 py-1.5 rounded-full font-semibold">
                                            Petunjuk Lokasi
                                        </a>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── Confirm Attendance ── */}
                <section className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
                    <SectionHeading title="Confirm Attendance" />
                    <Reveal delay={80}>
                        <div className="bg-indigo-800 rounded-3xl p-8 text-center max-w-3xl mx-auto">
                            <p className="text-white/80 text-sm leading-relaxed mb-4">
                                Silakan tekan tombol di bawah ini untuk mengkonfirmasi kehadiran Anda dan mengirim ucapan atau doa. Kami sangat menghargai kehadiran Anda!
                            </p>
                            <button onClick={onRSVP} className="bg-orange-400 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-500 transition">
                                Konfirmasi Kehadiran
                            </button>
                        </div>
                    </Reveal>
                </section>

                {/* ── Our Love Story ── */}
                <section className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
                    <SectionHeading title="Our Love Story" />
                    <div className="grid md:grid-cols-2 gap-6">
                        {LOVE_STORY.map((s, i) => (
                            <Reveal key={s.track} delay={i * 100}>
                                <div className={`${s.bg} rounded-3xl overflow-hidden flex flex-col md:flex-row`}>
                                    <img src={s.photo} className="w-full md:w-44 h-52 md:h-auto object-cover" alt={s.title} />
                                    <div className="p-4 flex-1">
                                        <div className={`${s.text} text-right`}>
                                            <div className="text-xs font-semibold opacity-70">Track {s.track}</div>
                                            <div className="font-black text-base">{s.title}</div>
                                        </div>
                                        <p className={`${s.text} text-xs mt-2 leading-relaxed opacity-90`}>{s.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── Our Memories ── */}
                <section className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
                    <SectionHeading title="Our Memories" />
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {MEMORIES.map((m, i) => (
                            <Reveal key={i} delay={i * 70}>
                                <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "1" }}>
                                    <img src={m.src} className="w-full h-full object-cover transition duration-500 hover:scale-110" alt={m.caption} />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-2">
                                        <p className="text-white text-xs font-medium">{m.caption}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── Footer ── */}
                <Reveal>
                    <footer className="rounded-2xl bg-orange-400 px-4 md:px-8 py-10 max-w-5xl mx-auto text-center mt-10 mb-6">
                        <div className="flex items-center justify-center gap-1 mb-3">
                            <span className="text-3xl font-black text-white">K</span>
                            <span className="text-3xl font-black text-indigo-900">U</span>
                            <span className="text-3xl font-black text-white">A</span>
                        </div>
                        <p className="text-white/80 text-sm mb-4">Dengan penuh cinta dan kebahagiaan, kami mengundang Anda untuk bersama kami merayakan momen istimewa ini.</p>
                        <div className="text-white font-black text-xl">HALDY &amp; ELOK</div>
                        <div className="text-white/70 text-xs mt-1">WEDDING CELEBRATION</div>
                    </footer>
                </Reveal>

                <MusicPlayer playing={playing} onToggle={togglePlay} muted={muted} onMute={toggleMute} />
            </div>
        </div>
    );
}

// ── Root App ─────────────────────────────────────────────────────────────────
export default function Kai() {
    const [opened, setOpened] = useState(false);
    const [showRSVP, setShowRSVP] = useState(false);

    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

    const handleOpen = () => {
        setOpened(true);
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => setPlaying(true))
                .catch(() => {});
        }
    };

    return (
        <div className="font-sans">
            <audio ref={audioRef} loop style={{ display: "none" }}>
                <source src={DUMMY_MUSIC.src} type="audio/mpeg" />
            </audio>

            {!opened ? (
                <TicketCover onOpen={handleOpen} guestName="Nama Tamu" />
            ) : (
                <InvitationContent
                    onRSVP={() => setShowRSVP(true)}
                    audioRef={audioRef}
                    playing={playing}
                    setPlaying={setPlaying}
                    muted={muted}
                    setMuted={setMuted}
                />
            )}
            {showRSVP && <RSVPModal onClose={() => setShowRSVP(false)} />}
        </div>
    );
}
