import { useEffect } from "react";

const PHOTOS_F = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&q=80",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=200&q=80",
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&q=80",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=200&q=80",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&q=80",
  "https://images.unsplash.com/photo-1526080652727-5b77f74eacd2?w=200&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80",
  "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=200&q=80",
];

const LABELS = [
  "Cover Buku",
  "Usia & Tanggal",
  "Ucapan Ulang Tahun",
  "Lagu Untukmu",
  "Momen Berdua",
  "Kutipan Romantis",
  "Halaman Personal",
  "Terima Kasih",
  "Penutup",
];

const HMASK = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

const DATES = [
  [null, null, null, null, null, null, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, null, null, null, null, null],
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.gr-root {
  width: 100vw; height: 100vh;
  background: #111;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
}

/* ── SCENE ── */
.gr-scene { perspective: 2400px; width: 760px; height: 510px; position: relative; }

.gr-book {
  width: 760px; height: 510px;
  position: relative; transform-style: preserve-3d;
  filter: drop-shadow(0 40px 80px rgba(0,0,0,.8));
}

/* ── SPREADS ── */
.gr-spread {
  position: absolute; inset: 0;
  display: flex; border-radius: 3px;
  overflow: hidden; opacity: 0;
  transition: opacity .05s;
}
.gr-spread.active { opacity: 1; }

.gr-half { width: 50%; height: 100%; overflow: hidden; position: relative; }
.gr-half-l { border-right: 1px solid rgba(0,0,0,.12); }

/* ── SPINE ── */
.gr-spine {
  position: absolute; left: 50%; top: 0;
  width: 4px; height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,.18), rgba(255,255,255,.08), rgba(0,0,0,.18));
  z-index: 30; pointer-events: none; transform: translateX(-50%);
}
.gr-spine-sl {
  position: absolute; left: 50%; top: 0;
  width: 24px; height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,.08), transparent);
  z-index: 20; pointer-events: none;
}
.gr-spine-sr {
  position: absolute; left: 50%; top: 0;
  width: 24px; height: 100%;
  background: linear-gradient(to left, rgba(0,0,0,.08), transparent);
  z-index: 20; pointer-events: none; transform: translateX(-100%);
}

/* ── FLIPPER ── */
.gr-flipper {
  position: absolute; top: 0; width: 50%; height: 100%;
  transform-style: preserve-3d; z-index: 40; pointer-events: none;
  will-change: transform;
}
.gr-f-front, .gr-f-back {
  position: absolute; inset: 0;
  backface-visibility: hidden; overflow: hidden;
}
.gr-f-back { transform: rotateY(180deg); }

/* ── CONTROLS ── */
.gr-controls { display: flex; align-items: center; gap: 16px; margin-top: 28px; }
.gr-btn {
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.15);
  color: rgba(255,255,255,.8);
  padding: 9px 28px; border-radius: 50px;
  cursor: pointer; font-size: 12px; letter-spacing: .8px;
  font-family: 'DM Sans', sans-serif; font-weight: 500;
  transition: all .2s; text-transform: uppercase;
}
.gr-btn:hover:not(:disabled) {
  background: rgba(255,255,255,.15);
  border-color: rgba(255,255,255,.3); color: #fff;
}
.gr-btn:disabled { opacity: .25; cursor: default; }
.gr-pip-wrap { display: flex; gap: 6px; align-items: center; }
.gr-pip {
  width: 5px; height: 5px; border-radius: 50%;
  background: rgba(255,255,255,.2);
  transition: all .3s; cursor: pointer;
}
.gr-pip.on { background: rgba(255,255,255,.7); width: 18px; border-radius: 3px; }
.gr-pg-lbl {
  color: rgba(255,255,255,.35); font-size: 10px;
  letter-spacing: .5px; min-width: 140px; text-align: center;
  margin-top: 10px;
}

/* ── CSS VARS ── */
.gr-root {
  --cream: #f5f0ea; --cream2: #ede8e1; --cream3: #e2dcd5;
  --ink: #1c1c1c; --ink2: #3a3530; --ink3: #6b6560;
  --red: #a83232; --red2: #c0392b;
  --gold: #b8935a; --dark: #111111; --dark2: #1e1e1e;
}

/* ════════════════════
   P1 – COVER
════════════════════ */
.p1 { background: var(--cream); }
.p1l {
  background: var(--cream);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  position: relative; padding: 32px;
}
.p1l::before {
  content: ''; position: absolute;
  inset: 16px; border: 1px solid rgba(0,0,0,.1); pointer-events: none;
}
.p1l::after {
  content: ''; position: absolute;
  inset: 20px; border: 1px solid rgba(0,0,0,.05); pointer-events: none;
}
.p1-script {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px; font-weight: 300; font-style: italic;
  color: var(--ink2); line-height: 1.2; text-align: center; letter-spacing: 1px;
}
.p1-year {
  font-family: 'DM Sans', sans-serif; font-size: 11px;
  font-weight: 400; letter-spacing: 6px; color: var(--ink3);
  margin-top: 16px; text-align: center;
}
.p1-divider { width: 32px; height: 1px; background: var(--gold); margin: 14px auto; }
.p1r {
  background: var(--cream2);
  display: flex; flex-direction: column;
  align-items: flex-end; justify-content: flex-end;
  padding: 24px; position: relative; overflow: hidden;
}
.p1-ghost {
  font-family: 'Playfair Display', serif;
  font-size: 220px; font-weight: 900;
  color: rgba(0,0,0,.04); line-height: .85;
  user-select: none; position: absolute;
  bottom: -16px; right: -8px; letter-spacing: -8px;
}
.p1-num-badge { position: relative; z-index: 1; text-align: right; }
.p1-n {
  font-family: 'Playfair Display', serif;
  font-size: 64px; font-weight: 900; color: var(--ink); line-height: 1;
}
.p1-th {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-weight: 300; font-style: italic;
  color: var(--ink3); vertical-align: super; margin-left: 2px;
}
.p1-birthday {
  font-family: 'DM Sans', sans-serif;
  font-size: 9px; letter-spacing: 4px; color: var(--ink3); margin-top: 4px;
}

/* ════════════════════
   P2 – TANGGAL + KALENDER
════════════════════ */
.p2 { background: var(--cream); }
.p2l {
  background: var(--cream);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  position: relative; padding: 28px;
}
.p2-age { text-align: center; position: relative; display: inline-block; }
.p2-big {
  font-family: 'Playfair Display', serif;
  font-size: 148px; font-weight: 900; color: var(--ink);
  line-height: .9; letter-spacing: -4px;
}
.p2-sup {
  font-family: 'Cormorant Garamond', serif;
  font-size: 38px; font-style: italic; font-weight: 300;
  color: var(--red); vertical-align: super;
}
.p2-born {
  font-size: 9px; letter-spacing: 3px; color: var(--ink3);
  text-align: center; margin-top: 32px;
}
.p2-img {
  width: 68px; height: 68px; border-radius: 50%; object-fit: cover;
  border: 3px solid var(--cream);
  box-shadow: 0 2px 16px rgba(0,0,0,.12);
  position: absolute; bottom: 0; right: -14px;
}
.p2r {
  background: var(--cream2);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 28px; position: relative;
}
.p2-lines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    to right, transparent, transparent 19px,
    rgba(0,0,0,.035) 19px, rgba(0,0,0,.035) 38px
  );
}
.p2-cal { position: relative; z-index: 1; text-align: center; }
.p2-month {
  font-family: 'Playfair Display', serif;
  font-size: 22px; font-weight: 700; letter-spacing: 5px;
  color: var(--ink); margin-bottom: 12px;
}
.p2-cal table { border-collapse: collapse; font-size: 11px; }
.p2-cal th {
  color: var(--ink3); font-weight: 500;
  padding: 2px 7px; font-size: 10px; letter-spacing: .5px;
}
.p2-cal td { padding: 3px 7px; text-align: center; color: var(--ink2); font-size: 11px; }
.p2-cal td.sun { color: var(--red); }
.p2-cal td.hi {
  background: var(--red); color: #fff; border-radius: 50%;
  width: 22px; height: 22px;
  display: inline-flex; align-items: center; justify-content: center; margin: auto;
}
.p2-dt { font-size: 10px; letter-spacing: 2px; color: var(--ink3); margin-top: 14px; }

/* ════════════════════
   P3 – UCAPAN
════════════════════ */
.p3 { background: var(--cream); }
.p3l { position: relative; overflow: hidden; background: #1a1a1a; }
.p3-img {
  width: 100%; height: 100%; object-fit: cover;
  filter: grayscale(80%) brightness(.75);
  transition: transform 6s ease;
}
.p3-img:hover { transform: scale(1.04); }
.p3-ovl {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent 40%, rgba(0,0,0,.5));
}
.p3-cat {
  position: absolute; top: 16px; left: 50%;
  transform: translateX(-50%); font-size: 22px; opacity: .8;
}
.p3r {
  background: var(--cream);
  padding: 28px 24px;
  display: flex; flex-direction: column;
}
.p3-eyebrow {
  font-size: 9px; letter-spacing: 4px; color: var(--red);
  font-weight: 500; margin-bottom: 8px;
}
.p3-big-title {
  font-family: 'Playfair Display', serif;
  font-size: 38px; font-weight: 900; color: var(--ink);
  line-height: .95; letter-spacing: -1px; margin-bottom: 4px;
}
.p3-script-t {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-style: italic; font-weight: 300;
  color: var(--ink3); margin-bottom: 16px;
}
.p3-divs { width: 28px; height: 1px; background: var(--gold); margin-bottom: 14px; }
.p3-msg { font-size: 10px; color: var(--ink3); line-height: 1.75; flex: 1; }
.p3-pols { display: flex; gap: 8px; margin-top: 14px; justify-content: flex-end; }
.p3-pol {
  background: #fff; padding: 4px 4px 14px;
  box-shadow: 2px 3px 12px rgba(0,0,0,.15);
}
.p3-pol:nth-child(odd) { transform: rotate(2.5deg) translateY(-4px); }
.p3-pol:nth-child(even) { transform: rotate(-2deg); }
.p3-pol img { width: 75px; height: 56px; object-fit: cover; filter: grayscale(50%); display: block; }

/* ════════════════════
   P4 – MUSIK
════════════════════ */
.p4 { background: var(--cream); }
.p4l {
  background: var(--cream);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; padding: 24px;
}
.p4-lbl { font-size: 8.5px; letter-spacing: 3px; color: var(--ink3); text-align: center; font-weight: 500; }
.p4-vinyl-wrap { position: relative; width: 118px; height: 118px; }
.p4-vinyl {
  width: 118px; height: 118px; border-radius: 50%; object-fit: cover;
  filter: grayscale(100%) brightness(.35);
  animation: gr-spin 9s linear infinite;
}
.p4-center {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 32px; height: 32px; border-radius: 50%; overflow: hidden;
  border: 2px solid rgba(255,255,255,.25);
}
.p4-center img { width: 100%; height: 100%; object-fit: cover; }
.p4-bar {
  width: 130px; height: 2px;
  background: rgba(0,0,0,.1); border-radius: 2px;
  position: relative; overflow: hidden;
}
.p4-bar::after {
  content: ''; position: absolute; left: 0; top: 0;
  width: 38%; height: 100%; background: var(--ink3); border-radius: 2px;
}
.p4-ctrl { display: flex; gap: 14px; align-items: center; color: var(--ink3); }
.p4-play {
  width: 30px; height: 30px; border-radius: 50%;
  border: 1.5px solid var(--ink3);
  display: flex; align-items: center; justify-content: center; font-size: 11px;
}
.p4r {
  background: var(--dark2);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 14px; padding: 24px;
}
.p4-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px; font-weight: 900; color: #fff;
  letter-spacing: 2px; text-align: center;
}
.p4-home-wrap { position: relative; display: inline-block; }
.p4-home-ic { font-size: 64px; line-height: 1; }
.p4-couple-img {
  width: 66px; height: 66px; border-radius: 50%; object-fit: cover;
  border: 3px solid var(--dark2);
  position: absolute; right: -12px; bottom: -6px;
}
.p4-sub { font-size: 9px; letter-spacing: 3px; color: rgba(255,255,255,.4); font-weight: 500; }

@keyframes gr-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* ════════════════════
   P5 – MOMEN BERDUA
════════════════════ */
.p5 { background: var(--cream); }
.p5l {
  background: var(--cream);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 16px; padding: 28px;
}
.p5-lbl { font-size: 9px; letter-spacing: 2.5px; color: var(--ink3); text-align: center; }
.p5-clock {
  width: 130px; height: 160px;
  border-radius: 50% 50% 50% 50% / 55% 55% 45% 45%;
  border: 2px solid rgba(0,0,0,.15); background: #fff;
  display: flex; align-items: center; justify-content: center; position: relative;
}
.p5-c-inner { position: relative; width: 96px; height: 96px; }
.p5-clock-num {
  position: absolute; font-size: 9px; color: #777;
  transform: translate(-50%, -50%);
}
.hand { position: absolute; bottom: 50%; left: 50%; background: var(--ink); border-radius: 2px; transform-origin: bottom center; }
.h-hour { width: 3px; height: 28%; transform: translateX(-50%) rotate(150deg); }
.h-min  { width: 2px; height: 40%; transform: translateX(-50%) rotate(40deg); }
.p5r {
  background: var(--ink);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; padding: 24px;
}
.tape-photo {
  position: relative; background: #fff;
  padding: 5px 5px 16px;
  box-shadow: 3px 4px 16px rgba(0,0,0,.45);
}
.tape-photo::before {
  content: ''; position: absolute;
  width: 28px; height: 10px;
  background: rgba(255,255,255,.45);
  top: -4px; left: 50%; transform: translateX(-50%) rotate(-3deg);
}
.tape-photo img {
  width: 110px; height: 74px; object-fit: cover;
  filter: grayscale(20%); display: block;
}

/* ════════════════════
   P6 – QUOTES
════════════════════ */
.p6 { background: var(--dark); }
.p6l { position: relative; overflow: hidden; }
.p6-bg { width: 100%; height: 100%; object-fit: cover; filter: grayscale(40%) brightness(.65); }
.p6-ovl {
  position: absolute; inset: 0;
  background: linear-gradient(to right, transparent 30%, rgba(17,17,17,.7));
}
.p6-script {
  position: absolute; bottom: 28px; left: 20px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 46px; font-style: italic; font-weight: 300;
  color: rgba(255,255,255,.85); line-height: 1.05;
}
.p6r {
  background: var(--dark);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 36px; gap: 18px;
}
.p6-mark {
  font-family: 'Cormorant Garamond', serif;
  font-size: 48px; font-style: italic;
  color: rgba(255,255,255,.1); line-height: 1; margin-bottom: -8px;
}
.p6-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px; font-style: italic;
  color: rgba(255,255,255,.65); text-align: center;
  line-height: 1.8; font-weight: 300;
}
.p6-hr { width: 20px; height: 1px; background: var(--gold); }
.p6-author { font-size: 10px; letter-spacing: 2.5px; color: rgba(255,255,255,.35); font-weight: 500; }

/* ════════════════════
   P7 – PERSONAL
════════════════════ */
.p7 { background: var(--cream); }
.p7l {
  background: var(--cream2);
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-end;
  padding-bottom: 36px; overflow: hidden;
}
.p7-ghost {
  font-family: 'Cormorant Garamond', serif;
  font-size: 64px; font-style: italic; font-weight: 300;
  color: rgba(0,0,0,.08); text-align: center; line-height: 1.1; padding: 0 16px;
}
.p7r {
  background: var(--cream);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 32px; gap: 14px;
}
.p7-write-lbl { font-size: 9px; letter-spacing: 3px; color: var(--ink3); }
.p7-lines-box {
  width: 100%; border: 1px solid rgba(0,0,0,.1);
  padding: 14px; background: #fff;
}
.p7-line { height: 1px; background: rgba(0,0,0,.06); margin-bottom: 20px; }
.p7-line:last-child { margin-bottom: 0; }

/* ════════════════════
   P8 – TERIMA KASIH
════════════════════ */
.p8 { background: var(--dark); }
.p8l {
  display: flex; align-items: center; justify-content: center; padding: 16px;
}
.heart-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px; }
.hpol { background: #fff; padding: 2px 2px 8px; width: 48px; }
.hpol img { width: 100%; height: 34px; object-fit: cover; filter: grayscale(50%); display: block; }
.hpol.blank { background: transparent; }
.p8r {
  background: var(--dark);
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-end;
  padding: 34px; gap: 10px;
}
.p8-thank {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px; font-style: italic; font-weight: 300;
  color: rgba(255,255,255,.85);
}
.p8-sub { font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,.35); text-align: center; line-height: 2; }
.p8-heart { font-size: 20px; color: rgba(255,255,255,.15); margin-top: 4px; }

/* ════════════════════
   P9 – PENUTUP
════════════════════ */
.p9 { background: var(--cream); }
.p9-heres { font-size: 11px; letter-spacing: 3px; color: var(--ink3); font-weight: 500; }
.p9-line { display: flex; align-items: baseline; gap: 10px; margin-top: 6px; }
.p9-num {
  font-family: 'Playfair Display', serif;
  font-size: 80px; font-weight: 900; color: var(--ink);
  line-height: .9; letter-spacing: -2px;
}
.p9-amp {
  font-family: 'Cormorant Garamond', serif;
  font-size: 70px; font-style: italic; font-weight: 300; color: var(--red);
}
.p9-beyond {
  font-family: 'Cormorant Garamond', serif;
  font-size: 66px; font-style: italic; font-weight: 300; color: var(--ink);
}
.p9-divider { width: 24px; height: 1px; background: var(--gold); margin: 16px auto; }
.p9-heart { font-size: 16px; color: rgba(0,0,0,.2); }
`;

/* ─── CALENDAR ─── */
const CalendarTable = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <table>
      <thead>
        <tr>
          {days.map((d, i) => (
            <th key={i} style={i === 0 ? { color: "var(--red)" } : {}}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {DATES.map((row, ri) => (
          <tr key={ri}>
            {row.map((n, ci) => {
              if (!n) return <td key={ci}>&nbsp;</td>;
              if (n === 24) return (
                <td key={ci}><div className="p2-cal td hi">{n}</div></td>
              );
              const isSun = ci === 0 || [5, 12, 19, 26].includes(n);
              return <td key={ci} className={isSun ? "sun" : ""}>{n}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/* ─── CLOCK FACE ─── */
const ClockFace = () => {
  const nums = [12,1,2,3,4,5,6,7,8,9,10,11];
  return (
    <div className="p5-c-inner">
      {nums.map((n, i) => {
        const angle = (i / 12) * 360;
        const r = 42;
        const x = 50 + r * Math.sin(angle * Math.PI / 180);
        const y = 50 - r * Math.cos(angle * Math.PI / 180);
        return (
          <span
            key={n}
            className="p5-clock-num"
            style={{ left: `${x}%`, top: `${y}%` }}
          >{n}</span>
        );
      })}
      <div className="hand h-hour" />
      <div className="hand h-min" />
    </div>
  );
};

/* ─── HEART GRID ─── */
const HeartGrid = () => {
  let idx = 0;
  return (
    <div className="heart-grid">
      {HMASK.flat().map((vis, i) => {
        if (!vis) return <div key={i} className="hpol blank" style={{ width: 48, height: 44 }} />;
        const src = PHOTOS_F[idx % PHOTOS_F.length]; idx++;
        return (
          <div key={i} className="hpol">
            <img src={src} alt="" />
          </div>
        );
      })}
    </div>
  );
};

/* ─── PAGE SPREADS ─── */
const Spread1 = () => (
  <div className="gr-spread gr-page active" id="s0">
    <div className="gr-half gr-half-l p1l">
      <div className="p1-script">Happy<br />Birthday</div>
      <div className="p1-divider" />
      <div className="p1-year">TWENTY · 2004</div>
    </div>
    <div className="gr-half p1r">
      <div className="p1-ghost">20</div>
      <div className="p1-num-badge">
        <div><span className="p1-n">20</span><span className="p1-th">th</span></div>
        <div className="p1-birthday">BIRTHDAY</div>
      </div>
    </div>
  </div>
);

const Spread2 = () => (
  <div className="gr-spread gr-page" id="s1">
    <div className="gr-half gr-half-l p2l">
      <div className="p2-age">
        <span className="p2-big">20</span>
        <span className="p2-sup">th</span>
        <img
          src="https://images.unsplash.com/photo-1492446845049-9c50cc313f00?w=200&q=80"
          alt="" className="p2-img"
        />
      </div>
      <div className="p2-born">BORN · 24.03.2004</div>
    </div>
    <div className="gr-half p2r">
      <div className="p2-lines" />
      <div className="p2-cal">
        <div className="p2-month">MARCH</div>
        <CalendarTable />
        <div className="p2-dt">24 · 03 · 2004</div>
      </div>
    </div>
  </div>
);

const Spread3 = () => (
  <div className="gr-spread gr-page" id="s2">
    <div className="gr-half gr-half-l p3l">
      <img
        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
        alt="" className="p3-img"
      />
      <div className="p3-ovl" />
      <div className="p3-cat">🐱</div>
    </div>
    <div className="gr-half p3r">
      <div className="p3-eyebrow">BIRTHDAY · 2024</div>
      <div className="p3-big-title">TWENTY</div>
      <div className="p3-script-t">years of you</div>
      <div className="p3-divs" />
      <p className="p3-msg">
        Wishing you a day full of happiness, love, and amazing memories.
        May this year be your best year yet. Keep shining and creating timeless
        moments. You deserve all the joy in this world. Here's to more adventures,
        success, and smiles. Happy birthday, my darling.
      </p>
      <div className="p3-pols">
        <div className="p3-pol">
          <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&q=80" alt="" />
        </div>
        <div className="p3-pol">
          <img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&q=80" alt="" />
        </div>
      </div>
    </div>
  </div>
);

const Spread4 = () => (
  <div className="gr-spread gr-page" id="s3">
    <div className="gr-half gr-half-l p4l">
      <div className="p4-lbl">SONG THAT REMINDS ME OF YOU</div>
      <div className="p4-vinyl-wrap">
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80"
          alt="" className="p4-vinyl"
        />
        <div className="p4-center">
          <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=100&q=80" alt="" />
        </div>
      </div>
      <div className="p4-bar" />
      <div className="p4-ctrl">
        <span style={{ fontSize: 15, cursor: "pointer" }}>⏮</span>
        <div className="p4-play">⏸</div>
        <span style={{ fontSize: 15, cursor: "pointer" }}>⏭</span>
        <span style={{ fontSize: 13, cursor: "pointer" }}>♡</span>
      </div>
    </div>
    <div className="gr-half p4r">
      <div className="p4-title">THIS IS<br />HOME</div>
      <div className="p4-home-wrap">
        <div className="p4-home-ic">🏠</div>
        <img
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=200&q=80"
          alt="" className="p4-couple-img"
        />
      </div>
      <div className="p4-sub">WHEN YOU ARE THERE</div>
    </div>
  </div>
);

const Spread5 = () => (
  <div className="gr-spread gr-page" id="s4">
    <div className="gr-half gr-half-l p5l">
      <div className="p5-lbl">TIME WITH YOU</div>
      <div className="p5-clock">
        <ClockFace />
      </div>
      <div className="p5-lbl" style={{ fontSize: 9, letterSpacing: "1.5px", color: "#aaa" }}>
        24 · 03 · 2004
      </div>
    </div>
    <div className="gr-half p5r">
      {[
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=300&q=80",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&q=80",
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&q=80",
      ].map((src, i) => (
        <div
          key={i}
          className="tape-photo"
          style={{ transform: `rotate(${[-2, 2.5, -1][i]}deg)` }}
        >
          <img src={src} alt="" />
        </div>
      ))}
    </div>
  </div>
);

const Spread6 = () => (
  <div className="gr-spread gr-page" id="s5">
    <div className="gr-half gr-half-l p6l">
      <img
        src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80"
        alt="" className="p6-bg"
      />
      <div className="p6-ovl" />
      <div className="p6-script">Your<br />my<br />Boy</div>
    </div>
    <div className="gr-half p6r">
      <div className="p6-mark">"</div>
      <p className="p6-quote">
        From one who is<br />endlessly proud of you,<br />always and forever.
      </p>
      <div className="p6-hr" />
      <div className="p6-author">— LIZZIE</div>
    </div>
  </div>
);

const Spread7 = () => (
  <div className="gr-spread gr-page" id="s6">
    <div className="gr-half gr-half-l p7l">
      <div className="p7-ghost">Happy<br />Birthday<br />my love</div>
    </div>
    <div className="gr-half p7r">
      <div className="p7-write-lbl">YOUR MESSAGE</div>
      <div className="p7-lines-box">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="p7-line" />
        ))}
      </div>
    </div>
  </div>
);

const Spread8 = () => (
  <div className="gr-spread gr-page" id="s7">
    <div className="gr-half p8l">
      <HeartGrid />
    </div>
    <div className="gr-half p8r">
      <div className="p8-thank">Thank you</div>
      <p className="p8-sub">for being part<br />of my story</p>
      <div className="p8-heart">♡</div>
    </div>
  </div>
);

const Spread9 = () => (
  <div className="gr-spread gr-page" id="s8">
    <div
      className="gr-half gr-half-l"
      style={{
        background: "var(--cream2)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 13, fontStyle: "italic",
        color: "rgba(0,0,0,.18)", letterSpacing: 1,
        textAlign: "center", padding: 24, lineHeight: 1.6,
      }}>
        always<br />&amp; forever
      </div>
    </div>
    <div
      className="gr-half"
      style={{
        background: "var(--cream)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}
    >
      <div className="p9-heres">Here's to</div>
      <div className="p9-line">
        <span className="p9-num">20</span>
        <span className="p9-amp">&amp;</span>
      </div>
      <div className="p9-beyond">Beyond</div>
      <div className="p9-divider" />
      <div className="p9-heart">♡</div>
    </div>
  </div>
);

/* ─── MAIN COMPONENT ─── */
export default function Grey() {
  const TOTAL = 9;

  useEffect(() => {
    let cur = 0;
    let busy = false;

    const spreads = document.querySelectorAll(".gr-page");
    const pipsEl  = document.getElementById("gr-pips");
    const prevBtn = document.getElementById("gr-prev");
    const nextBtn = document.getElementById("gr-next");
    const pgLbl   = document.getElementById("gr-lbl");
    const flipper = document.getElementById("gr-flipper");
    const ff      = document.getElementById("gr-ff");
    const fb      = document.getElementById("gr-fb");

    /* build pips */
    for (let i = 0; i < TOTAL; i++) {
      const p = document.createElement("div");
      p.className = "gr-pip" + (i === 0 ? " on" : "");
      p.addEventListener("click", () => goTo(i));
      pipsEl.appendChild(p);
    }

    function updateUI() {
      prevBtn.disabled = cur === 0 || busy;
      nextBtn.disabled = cur === TOTAL - 1 || busy;
      pgLbl.textContent = LABELS[cur];
      [...pipsEl.children].forEach((p, i) => {
        p.className = "gr-pip" + (i === cur ? " on" : "");
      });
    }
    updateUI();

    function showSpread(idx) {
      spreads.forEach((s, i) => {
        s.style.opacity = i === idx ? "1" : "0";
        s.classList.toggle("active", i === idx);
      });
    }

    function goTo(target) {
      if (busy || target === cur || target < 0 || target >= TOTAL) return;
      busy = true;
      const dir = target > cur ? "next" : "prev";
      const from = cur, to = target;
      const fromEl = spreads[from];
      const toEl   = spreads[to];

      ff.innerHTML = "";
      fb.innerHTML = "";

      if (dir === "next") {
        const c1 = fromEl.cloneNode(true);
        c1.style.cssText = "position:absolute;left:-50%;top:0;width:200%;height:100%;display:flex;border-radius:0;overflow:hidden;opacity:1";
        ff.appendChild(c1);
        const c2 = toEl.cloneNode(true);
        c2.style.cssText = "position:absolute;left:0;top:0;width:200%;height:100%;display:flex;border-radius:0;overflow:hidden;opacity:1";
        fb.appendChild(c2);
        flipper.style.cssText = "display:block;position:absolute;top:0;right:0;width:50%;height:100%;transform-origin:left center;z-index:40;transform:rotateY(0deg);transform-style:preserve-3d";
      } else {
        const c1 = fromEl.cloneNode(true);
        c1.style.cssText = "position:absolute;left:0;top:0;width:200%;height:100%;display:flex;border-radius:0;overflow:hidden;opacity:1";
        ff.appendChild(c1);
        const c2 = toEl.cloneNode(true);
        c2.style.cssText = "position:absolute;left:-50%;top:0;width:200%;height:100%;display:flex;border-radius:0;overflow:hidden;opacity:1";
        fb.appendChild(c2);
        flipper.style.cssText = "display:block;position:absolute;top:0;left:0;width:50%;height:100%;transform-origin:right center;z-index:40;transform:rotateY(0deg);transform-style:preserve-3d";
      }

      fromEl.style.opacity = "0";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          flipper.style.transition = "transform .72s cubic-bezier(.77,0,.175,1)";
          flipper.style.transform  = dir === "next" ? "rotateY(-180deg)" : "rotateY(180deg)";
        });
      });

      setTimeout(() => {
        cur = to;
        flipper.style.transition = "none";
        flipper.style.display    = "none";
        showSpread(cur);
        busy = false;
        updateUI();
      }, 740);
    }

    prevBtn.addEventListener("click", () => { if (!busy && cur > 0) goTo(cur - 1); });
    nextBtn.addEventListener("click", () => { if (!busy && cur < TOTAL - 1) goTo(cur + 1); });
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="gr-root">
        <div className="gr-scene">
          <div className="gr-book">

            <Spread1 />
            <Spread2 />
            <Spread3 />
            <Spread4 />
            <Spread5 />
            <Spread6 />
            <Spread7 />
            <Spread8 />
            <Spread9 />

            {/* Flipper */}
            <div
              id="gr-flipper"
              style={{
                display: "none", position: "absolute", transformStyle: "preserve-3d",
                zIndex: 40, pointerEvents: "none", willChange: "transform",
              }}
            >
              <div
                id="gr-ff"
                style={{
                  position: "absolute", inset: 0,
                  backfaceVisibility: "hidden", overflow: "hidden",
                }}
              />
              <div
                id="gr-fb"
                style={{
                  position: "absolute", inset: 0,
                  backfaceVisibility: "hidden", overflow: "hidden",
                  transform: "rotateY(180deg)",
                }}
              />
            </div>

            <div className="gr-spine" />
            <div className="gr-spine-sl" />
            <div className="gr-spine-sr" />
          </div>

          {/* Controls */}
          <div className="gr-controls">
            <button className="gr-btn" id="gr-prev" disabled>← PREV</button>
            <div className="gr-pip-wrap" id="gr-pips" />
            <button className="gr-btn" id="gr-next">NEXT →</button>
          </div>
          <div className="gr-pg-lbl" id="gr-lbl" />
        </div>
      </div>
    </>
  );
}
