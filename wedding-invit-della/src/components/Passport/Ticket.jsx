import { useState, useEffect, useRef } from "react";

const COUPLE = {
  groom: { name: "Kevin Reyan", short: "KR", parent: "Son of Reynold Panggabean & Yohana Tairas", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  bride: { name: "Yoan Tiffany", short: "YT", parent: "Fourth Daughter of Donald F Sitompul & Adelina L Turangan", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  shortDate: "1.11.2025",
  venue: "Balenusa",
  address: "Jl. Pakubuwono VI No.6 2nd floor, RT.5/RW.6, Gunung, Kebayoran Baru, South Jakarta City, Jakarta 12120",
  holy: "16:00",
  reception: "18:30",
  rsvpDeadline: "10/25",
  mapsUrl: "https://maps.google.com/?q=Balenusa+Jakarta",
  music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};

const GALLERY = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=400&fit=crop",
];

const BANK_ACCOUNTS = [
  { bank: "BCA", account: "1234567890", name: "Kevin Reyan Panggabean" },
  { bank: "Mandiri", account: "0987654321", name: "Yoan Tiffany Sitompul" },
];

const WISHES_SEED = [
  { id: 1, name: "Nama Tamu", attendance: "Hadir", message: "Test", date: "15 May 2026 at 23.17" },
  { id: 2, name: "Wawan", attendance: "Hadir", message: "Happy wedding", date: "25 March 2026 at 11.41" },
  { id: 3, name: "Sarah", attendance: "Hadir", message: "Semoga menjadi keluarga yang sakinah mawaddah warahmah 🙏", date: "20 April 2026 at 09.00" },
];

const RUNDOWN = [
  { time: "15:35", label: "Arrived at Venue", icon: "fa-ring" },
  { time: "16:00", label: "Holy Matrimony", icon: "fa-car" },
  { time: "18:00", label: "Snack Time", icon: "fa-music" },
  { time: "18:30", label: "Wedding Reception", icon: "fa-mug-hot" },
  { time: "19:30", label: "Photo Time!", icon: "fa-camera" },
];

const S = {
  terra: "#8B3A1F",
  gold: "#C9A96E",
  cream: "#F5EFE0",
  warmWhite: "#FDFAF4",
  text: "#3D2010",
};

// ── Scroll animation hook ─────────────────────────────────────────────────────
function useScrollAnimation() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

// Animated section wrapper
function AnimSection({ children, direction = "up", delay = 0, style = {} }) {
  const [ref, visible] = useScrollAnimation();

  const getTransform = () => {
    if (direction === "up") return "translateY(40px)";
    if (direction === "down") return "translateY(-40px)";
    if (direction === "left") return "translateX(50px)";
    if (direction === "right") return "translateX(-50px)";
    if (direction === "fade") return "scale(0.96)";
    return "translateY(40px)";
  };

  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : getTransform(),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CompassRose({ size = 80, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="1" fill="none" />
      {[{ l:"N",x:50,y:10},{l:"S",x:50,y:93},{l:"E",x:92,y:53},{l:"W",x:7,y:53}].map(p=>(
        <text key={p.l} x={p.x} y={p.y} textAnchor="middle" fontSize="10" fill={color} fontWeight="bold">{p.l}</text>
      ))}
      <polygon points="50,14 53,46 50,50 47,46" fill={color} />
      <polygon points="50,86 53,54 50,50 47,54" fill={color} />
      <polygon points="14,50 46,47 50,50 46,53" fill={color} />
      <polygon points="86,50 54,47 50,50 54,53" fill={color} />
      <polygon points="50,14 56,44 50,50 44,44" fill={color} opacity="0.4" />
      <circle cx="50" cy="50" r="5" fill={color} />
    </svg>
  );
}

function TicketEdge({ bg }) {
  return (
    <div style={{ display:"flex", alignItems:"center", background: bg || "transparent", position:"relative", height: 24 }}>
      <div style={{ position:"absolute", left:-12, width:24, height:24, borderRadius:"50%", background: S.cream }} />
      <div style={{ flex:1, borderTop:`3px dashed rgba(139,58,31,0.3)`, margin:"0 12px" }} />
      <div style={{ position:"absolute", right:-12, width:24, height:24, borderRadius:"50%", background: S.cream }} />
    </div>
  );
}

function QRCanvas({ value, size = 160 }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff"; ctx.fillRect(0,0,size,size);
    const cell = size / 25;
    let hash = 0;
    for (let i=0;i<value.length;i++) hash = (hash<<5)-hash+value.charCodeAt(i);
    const draw = (x,y,w,h,c="#8B3A1F") => { ctx.fillStyle=c; ctx.fillRect(x*cell,y*cell,w*cell,h*cell); };
    [[0,0],[18,0],[0,18]].forEach(([ox,oy])=>{
      draw(ox,oy,7,7); draw(ox+1,oy+1,5,5,"#fff"); draw(ox+2,oy+2,3,3);
    });
    for(let r=0;r<25;r++) for(let c=0;c<25;c++){
      if((r<8&&c<8)||(r<8&&c>16)||(r>16&&c<8)) continue;
      if((hash^(r*31+c*17+r*c))&1) draw(c,r,1,1);
    }
  }, [value, size]);
  return <canvas ref={ref} width={size} height={size} style={{ display:"block", borderRadius: 4 }} />;
}

// ── FIXED RSVP Modal ──────────────────────────────────────────────────────────
function RSVPModal({ onClose, wishes, onSubmit }) {
  const [form, setForm] = useState({ name:"", group:"", phone:"", attendance:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const h = k => e => setForm(f=>({...f,[k]:e.target.value}));
  const submit = () => {
    if(!form.name||!form.attendance) return alert("Nama dan kehadiran wajib diisi.");
    onSubmit(form); setSubmitted(true);
  };
  const inp = { width:"100%", padding:"10px 12px", border:"1px solid #ddd", borderRadius:8, fontFamily:"inherit", fontSize:14, boxSizing:"border-box", outline:"none", background:"#fff" };
  const lbl = { fontSize:13, fontWeight:600, color:S.text, marginBottom:4, display:"block" };

  return (
    <div
      style={{
        position:"fixed", inset:0,
        background:"rgba(0,0,0,0.6)",
        zIndex:1000,
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"center",
        padding:"16px",
        overflowY:"auto",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background:"#fff",
          borderRadius:16,
          width:"100%",
          maxWidth:440,
          margin:"auto",
          boxShadow:"0 20px 60px rgba(0,0,0,0.35)",
          position:"relative",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div style={{
          background:S.terra,
          borderRadius:"16px 16px 0 0",
          padding:"20px 24px",
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          position:"sticky",
          top:0,
          zIndex:10,
        }}>
          <div>
            <div style={{ fontSize:30, fontWeight:900, color:"#fff", letterSpacing:6, lineHeight:1, fontFamily:"Georgia,serif" }}>RSVP</div>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:12, marginTop:4 }}>Kindly respond by {COUPLE.rsvpDeadline}</div>
          </div>
          <button
            onClick={onClose}
            style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}
          >✕</button>
        </div>

        <div style={{ padding:24 }}>
          {submitted ? (
            <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ fontSize:40 }}>🎉</div>
              <h3 style={{ color:S.terra, fontFamily:"serif", margin:"8px 0" }}>Terima Kasih!</h3>
              <p style={{ color:"#666", fontSize:13, marginBottom:20 }}>Kami tidak sabar untuk bertemu Anda!</p>
              <div style={{ background:S.cream, borderRadius:12, padding:20, display:"inline-block" }}>
                <QRCanvas value={`WEDDING-KR-YT-${form.name}`} size={160} />
                <div style={{ fontSize:12, color:S.terra, marginTop:8, fontWeight:600 }}>Tunjukkan QR ini saat hadir</div>
              </div>
              <br/>
              <button onClick={()=>{ const c=document.querySelector("canvas"); if(!c)return; const a=document.createElement("a");a.href=c.toDataURL();a.download="wedding-qr.png";a.click(); }}
                style={{ marginTop:16, background:S.terra, color:"#fff", border:"none", borderRadius:8, padding:"10px 24px", cursor:"pointer", fontSize:14, fontWeight:600 }}>
                <i className="fas fa-download" style={{ marginRight:8 }} />Download QR
              </button>
            </div>
          ) : (
            <>
              {[{l:"Nama",k:"name",p:"Nama Tamu",t:"text"},{l:"Grup / Instansi",k:"group",p:"Grup",t:"text"},{l:"No WhatsApp",k:"phone",p:"+62 8xx xxxx xxxx",t:"tel"}].map(({l,k,p,t})=>(
                <div key={k} style={{ marginBottom:16 }}>
                  <label style={lbl}>{l}</label>
                  <input type={t} placeholder={p} value={form[k]} onChange={h(k)} style={inp} />
                </div>
              ))}
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>Kehadiran</label>
                <select value={form.attendance} onChange={h("attendance")} style={{ ...inp, appearance:"none" }}>
                  <option value="">Pilih Kehadiran</option>
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                  <option value="Masih Ragu">Masih Ragu</option>
                </select>
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={lbl}>Komentar atau Ucapan</label>
                <textarea placeholder="Tuliskan ucapan Anda..." value={form.message} onChange={h("message")} rows={3} style={{ ...inp, resize:"vertical" }} />
              </div>
              <button onClick={submit} style={{ width:"100%", background:S.terra, color:"#fff", border:"none", borderRadius:10, padding:"13px 0", fontSize:16, fontWeight:700, cursor:"pointer", letterSpacing:1 }}>Kirim</button>
            </>
          )}

          {/* Wishes */}
          <div style={{ marginTop:28 }}>
            <div style={{ fontWeight:700, color:S.text, fontSize:14, marginBottom:12 }}>
              <i className="fas fa-comments" style={{ color:S.terra, marginRight:8 }} />Ucapan ({wishes.length})
            </div>
            {wishes.map(w=>(
              <div key={w.id} style={{ background:S.cream, borderRadius:10, padding:"12px 14px", marginBottom:10 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:S.terra, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, flexShrink:0 }}>
                    {w.name.slice(0,2).toUpperCase()}
                  </div>
                  <span style={{ fontWeight:700, fontSize:13, color:S.text }}>{w.name}</span>
                  <span style={{ background:"#d4edda", color:"#155724", fontSize:11, padding:"2px 8px", borderRadius:20, fontWeight:600 }}>{w.attendance}</span>
                </div>
                <p style={{ margin:"0 0 4px 40px", fontSize:13, color:"#555" }}>{w.message}</p>
                <div style={{ fontSize:11, color:"#999", marginLeft:40 }}>{w.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FIXED Gift Modal ──────────────────────────────────────────────────────────
function GiftModal({ onClose }) {
  const [copied, setCopied] = useState("");
  const copy = text => { navigator.clipboard.writeText(text); setCopied(text); setTimeout(()=>setCopied(""),2000); };

  return (
    <div
      style={{
        position:"fixed", inset:0,
        background:"rgba(0,0,0,0.6)",
        zIndex:1000,
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"center",
        padding:"16px",
        overflowY:"auto",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background:"#fff",
          borderRadius:16,
          width:"100%",
          maxWidth:400,
          margin:"auto",
          boxShadow:"0 20px 60px rgba(0,0,0,0.35)",
          overflow:"hidden",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div style={{
          background:S.terra,
          padding:"20px 24px",
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          position:"sticky",
          top:0,
          zIndex:10,
        }}>
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#fff", letterSpacing:2 }}>🎁 WEDDING GIFT</div>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:12, marginTop:2 }}>Transfer & Kado</div>
          </div>
          <button
            onClick={onClose}
            style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}
          >✕</button>
        </div>

        <div style={{ padding:24 }}>
          <p style={{ color:"#666", fontSize:13, marginBottom:20, textAlign:"center", lineHeight:1.7 }}>
            Doa restu Anda adalah hadiah terbesar bagi kami.<br/>Namun jika Anda ingin memberikan hadiah:
          </p>
          <div style={{ fontWeight:700, color:S.terra, marginBottom:12, fontSize:14 }}>
            <i className="fas fa-university" style={{ marginRight:8 }} />Transfer Bank
          </div>
          {BANK_ACCOUNTS.map(acc=>(
            <div key={acc.bank} style={{ background:S.cream, borderRadius:10, padding:14, marginBottom:10 }}>
              <div style={{ fontWeight:700, color:S.text, fontSize:15, marginBottom:2 }}>{acc.bank}</div>
              <div style={{ fontSize:20, fontWeight:800, color:S.terra, letterSpacing:2 }}>{acc.account}</div>
              <div style={{ fontSize:13, color:"#666", marginBottom:10 }}>a/n {acc.name}</div>
              <button onClick={()=>copy(acc.account)} style={{ background:copied===acc.account?"#28a745":S.terra, color:"#fff", border:"none", borderRadius:6, padding:"7px 16px", fontSize:13, cursor:"pointer", fontWeight:600, transition:"background .2s" }}>
                <i className={`fas ${copied===acc.account?"fa-check":"fa-copy"}`} style={{ marginRight:6 }} />
                {copied===acc.account?"Tersalin!":"Salin No. Rekening"}
              </button>
            </div>
          ))}
          <div style={{ fontWeight:700, color:S.terra, margin:"16px 0 12px", fontSize:14 }}>
            <i className="fas fa-box" style={{ marginRight:8 }} />Kado Fisik
          </div>
          <div style={{ background:S.cream, borderRadius:10, padding:14 }}>
            <div style={{ fontSize:13, color:S.text, lineHeight:1.8 }}>
              Silakan kirim kado ke:<br/>
              <strong>{COUPLE.address}</strong><br/>
              <span style={{ color:"#666" }}>a/n Kevin Reyan & Yoan Tiffany</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function TicketTravelling() {
  const [opened, setOpened] = useState(false);
  const [wishes, setWishes] = useState(WISHES_SEED);
  const [showRSVP, setShowRSVP] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().catch(()=>{}); setPlaying(true); }
  };

  const addWish = form => {
    setWishes(prev=>[{ id:Date.now(), name:form.name, attendance:form.attendance, message:form.message, date:new Date().toLocaleString("id-ID") }, ...prev]);
  };

  const worldMap = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png')";

  // ── COVER ──────────────────────────────────────────────────────────────────
  const coverView = (
      <div style={{
        height:"100vh",
        maxHeight:"100vh",
        overflow:"hidden",
        background:S.cream,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        fontFamily:"'Segoe UI',sans-serif",
        padding:"12px 16px",
        boxSizing:"border-box",
      }}>
        <div style={{
          width:"100%",
          maxWidth:440,
          maxHeight:"100%",
          display:"flex",
          flexDirection:"column",
          filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.2))",
        }}>
          <div style={{
            background:S.terra,
            borderRadius:"16px 16px 0 0",
            padding:"clamp(20px, 4vh, 44px) clamp(20px, 5vw, 36px) clamp(16px, 3vh, 36px)",
            textAlign:"center",
            position:"relative",
            overflow:"hidden",
            flex:"1 1 auto",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            minHeight:0,
          }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:worldMap, backgroundSize:"cover", backgroundPosition:"center", opacity:0.06 }} />
            <div style={{ position:"absolute", top:0, left:0, right:0, height:5, background:`repeating-linear-gradient(90deg,${S.gold} 0 22px,transparent 22px 32px)` }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:"clamp(9px, 1.6vw, 11px)", letterSpacing:"clamp(3px, 1vw, 7px)", color:"rgba(255,255,255,0.65)", textTransform:"uppercase", marginBottom:4, whiteSpace:"nowrap" }}>Wedding</div>
              <h1 style={{
                fontSize:"clamp(28px, 9vw, 46px)",
                fontWeight:900,
                color:"#fff",
                margin:0,
                letterSpacing:"clamp(2px, 1.5vw, 10px)",
                fontFamily:"Georgia,serif",
                textTransform:"uppercase",
                whiteSpace:"nowrap",
              }}>PASSPORT</h1>
              <div style={{ fontSize:"clamp(9px, 1.6vw, 11px)", letterSpacing:"clamp(2px, 1vw, 7px)", color:"rgba(255,255,255,0.65)", marginTop:2, textTransform:"uppercase", whiteSpace:"nowrap" }}>Wedding Invitation</div>
              <div style={{ margin:"clamp(14px, 3vh, 28px) auto" }}><CompassRose size={80} color="rgba(255,255,255,0.85)" /></div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, marginBottom:"clamp(10px, 2vh, 20px)" }}>
                <span style={{ fontSize:26, fontWeight:900, color:"#fff", fontFamily:"serif", letterSpacing:4 }}>KR</span>
                <div style={{ width:30, height:30, border:"2px solid rgba(255,255,255,0.4)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 6px", flexShrink:0 }}>
                  <i className="fas fa-ring" style={{ color:S.gold, fontSize:12 }} />
                </div>
                <span style={{ fontSize:26, fontWeight:900, color:"#fff", fontFamily:"serif", letterSpacing:4 }}>YT</span>
              </div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)", letterSpacing:4 }}>{COUPLE.shortDate}</div>
              <div style={{ marginTop:"clamp(10px, 2vh, 20px)", color:"rgba(255,255,255,0.8)", fontSize:13, lineHeight:1.6 }}>
                Kepada Yth; Bapak/Ibu/Saudara/i<br/>
                <strong style={{ color:"#fff", fontSize:16 }}>Nama Tamu</strong>
              </div>
            </div>
          </div>
          <TicketEdge bg="#fff" />
          <div style={{ background:"#fff", borderRadius:"0 0 16px 16px", padding:"14px clamp(10px, 3vw, 18px)", display:"flex", justifyContent:"space-between", alignItems:"center", gap:6, flexShrink:0 }}>
            <div style={{ minWidth:0, overflow:"hidden" }}>
              <div style={{ fontSize:9, color:"#aaa", letterSpacing:2, textTransform:"uppercase" }}>Destination</div>
              <div style={{ fontWeight:800, color:S.terra, fontSize:15, letterSpacing:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>BALENUSA</div>
              <div style={{ fontSize:10, color:"#999", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>Jakarta, Indonesia</div>
            </div>
            <div style={{ textAlign:"center", flexShrink:0 }}>
              <div style={{ fontSize:9, color:"#aaa", letterSpacing:2, textTransform:"uppercase" }}>Date</div>
              <div style={{ fontWeight:800, color:S.text, fontSize:13, whiteSpace:"nowrap" }}>01 NOV 2025</div>
            </div>
            <button onClick={()=>{
              setOpened(true);
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().then(()=>setPlaying(true)).catch(()=>{});
              }
            }} style={{ background:S.terra, color:"#fff", border:"none", borderRadius:30, padding:"10px clamp(10px, 3vw, 16px)", cursor:"pointer", fontWeight:700, fontSize:12, letterSpacing:0.5, boxShadow:`0 4px 15px rgba(139,58,31,0.4)`, whiteSpace:"nowrap", flexShrink:0 }}>
              Open Invitation
            </button>
          </div>
        </div>
        <button onClick={toggleMusic} style={{ position:"fixed", bottom:16, right:16, width:44, height:44, borderRadius:"50%", background:S.terra, color:"#fff", border:"none", cursor:"pointer", fontSize:16, boxShadow:"0 4px 15px rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50 }}>
          <i className={`fas ${playing?"fa-pause":"fa-play"}`} />
        </button>
      </div>
  );

  // ── FULL INVITATION ─────────────────────────────────────────────────────────
  const fullView = (
    <div style={{ fontFamily:"'Segoe UI',sans-serif", background:S.cream, minHeight:"100vh", maxWidth:600, margin:"0 auto", overflowX:"hidden", position:"relative" }}>

      {showRSVP && <RSVPModal onClose={()=>setShowRSVP(false)} wishes={wishes} onSubmit={addWish} />}
      {showGift && <GiftModal onClose={()=>setShowGift(false)} />}

      {/* Floating buttons */}
      <div style={{ position:"fixed", bottom:"max(16px, env(safe-area-inset-bottom))", right:16, display:"flex", flexDirection:"column", gap:10, zIndex:100 }}>
        <button onClick={()=>setShowGift(true)} title="Wedding Gift" style={{ width:48, height:48, borderRadius:"50%", background:S.gold, color:"#fff", border:"none", cursor:"pointer", fontSize:18, boxShadow:"0 4px 15px rgba(0,0,0,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <i className="fas fa-gift" />
        </button>
        <button onClick={toggleMusic} title="Toggle Music" style={{ width:48, height:48, borderRadius:"50%", background:S.terra, color:"#fff", border:"none", cursor:"pointer", fontSize:18, boxShadow:"0 4px 15px rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <i className={`fas ${playing?"fa-pause":"fa-volume-up"}`} />
        </button>
      </div>

      {/* ── 1. COVER ── */}
      <div style={{ background:S.terra, padding:"56px 24px 44px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:worldMap, backgroundSize:"cover", backgroundPosition:"center", opacity:0.06 }} />
        <div style={{ position:"absolute", top:0, left:0, right:0, height:5, background:`repeating-linear-gradient(90deg,${S.gold} 0 22px,transparent 22px 32px)` }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h1 style={{ fontSize:38, fontWeight:900, color:"#fff", margin:0, letterSpacing:8, fontFamily:"Georgia,serif", textTransform:"uppercase" }}>PASSPORT</h1>
          <div style={{ fontSize:10, letterSpacing:6, color:"rgba(255,255,255,0.65)", marginTop:2, textTransform:"uppercase" }}>Wedding Invitation</div>
          <div style={{ margin:"22px auto" }}><CompassRose size={90} color="rgba(255,255,255,0.8)" /></div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)", letterSpacing:4, marginBottom:14 }}>{COUPLE.shortDate}</div>
          <div style={{ color:"rgba(255,255,255,0.8)", fontSize:13, lineHeight:1.7 }}>
            Kepada Yth; Bapak/Ibu/Saudara/i<br/>
            <strong style={{ color:"#fff", fontSize:17 }}>Nama Tamu</strong>
          </div>
        </div>
      </div>

      {/* ── 2. QUOTE ── */}
      <AnimSection direction="up">
        <div style={{ background:S.warmWhite, padding:"40px 24px", textAlign:"center", position:"relative" }}>
          <div style={{ position:"absolute", top:16, left:16 }}><CompassRose size={36} color={S.terra} /></div>
          <div style={{ position:"absolute", top:16, right:16 }}>
            <div style={{ width:44, height:44, borderRadius:"50%", border:`2px solid ${S.terra}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <div style={{ fontSize:6, color:S.terra, fontWeight:700, letterSpacing:1 }}>MR & MRS</div>
              <div style={{ fontSize:12, color:S.terra }}>♥</div>
            </div>
          </div>
          <blockquote style={{ fontSize:14, fontStyle:"italic", color:S.terra, fontWeight:700, margin:"0 auto 24px", lineHeight:1.9, maxWidth:300, letterSpacing:0.3, fontFamily:"Georgia,serif" }}>
            "… IF WE LOVE ONE ANOTHER,<br/>GOD ABIDES IN US AND HIS LOVE IS PERFECTED IN US."<br/>
            <span style={{ fontSize:12, fontStyle:"normal", fontWeight:400 }}>- 1 John 4:12 -</span>
          </blockquote>
          <div style={{ position:"relative", background:"#fff", padding:"10px 10px 36px", transform:"rotate(1.5deg)", display:"inline-block", boxShadow:"0 8px 24px rgba(0,0,0,0.15)", maxWidth:220 }}>
            <img src={GALLERY[0]} alt="couple" style={{ width:"100%", height:180, objectFit:"cover", display:"block" }} />
            <div style={{ position:"absolute", bottom:8, right:10, fontFamily:"serif", fontWeight:900, color:S.terra, fontSize:13, letterSpacing:2 }}>KR<span style={{ color:S.gold }}>♥</span>YT</div>
          </div>
          <div style={{ fontSize:12, color:"#999", marginTop:10 }}>{COUPLE.shortDate}</div>
          <div style={{ marginTop:16 }}>
            <div style={{ display:"inline-block", border:`3px solid ${S.terra}`, borderRadius:4, padding:"4px 12px", opacity:0.6, transform:"rotate(-6deg)", fontFamily:"serif", color:S.terra, fontSize:11, letterSpacing:1, textTransform:"uppercase" }}>
              Ticket to Happily Ever After
            </div>
          </div>
          <div style={{ marginTop:22, background:S.terra, borderRadius:12, padding:"16px 20px", color:"rgba(255,255,255,0.9)", fontSize:13, lineHeight:1.8 }}>
            We invite you to be part of our cherished day.<br/>
            Your presence will make our celebration more meaningful,<br/>
            as we gather to share joy, love, and blessings together.
          </div>
        </div>
      </AnimSection>

      {/* ── 3. COUPLE ── */}
      <AnimSection direction="left">
        <div style={{ background:"#fff", padding:"32px 24px" }}>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:10, color:S.gold, letterSpacing:4, textTransform:"uppercase", fontWeight:700, marginBottom:4 }}>Wedding Passport</div>
            <h2 style={{ fontFamily:"Georgia,serif", color:S.terra, fontSize:20, margin:0 }}>KEVIN & YOAN</h2>
            <div style={{ height:2, width:50, background:S.gold, margin:"8px auto 0" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"120px 1fr", gap:0, marginBottom:0, background:S.cream, borderRadius:"12px 12px 0 0", overflow:"hidden" }}>
            <div style={{ position:"relative", height:160 }}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=top" alt="groom" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 70%, rgba(245,239,224,0.6))" }} />
            </div>
            <div style={{ padding:"16px 14px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div style={{ fontSize:9, color:S.gold, letterSpacing:2, textTransform:"uppercase", fontWeight:700, marginBottom:3 }}>Groom Name</div>
              <div style={{ fontWeight:900, fontSize:15, color:S.terra, lineHeight:1.2, marginBottom:6 }}>KEVIN REYAN<br/>PANGGABEAN</div>
              <div style={{ fontSize:9, color:S.terra, fontWeight:800, textTransform:"uppercase", letterSpacing:1, marginBottom:3 }}>The Beloved Only<br/>Son of</div>
              <div style={{ fontSize:11, color:"#666", lineHeight:1.6 }}>Reynold Panggabean<br/>& Yohana Tairas</div>
            </div>
          </div>
          <div style={{ height:1, background:`linear-gradient(to right, transparent, ${S.terra}40, transparent)` }} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 120px", gap:0, background:S.cream, borderRadius:"0 0 12px 12px", overflow:"hidden" }}>
            <div style={{ padding:"16px 14px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div style={{ fontSize:9, color:S.gold, letterSpacing:2, textTransform:"uppercase", fontWeight:700, marginBottom:3 }}>Bride Name</div>
              <div style={{ fontWeight:900, fontSize:15, color:S.terra, lineHeight:1.2, marginBottom:6 }}>YOAN TIFFANY<br/>SITOMPUL</div>
              <div style={{ fontSize:9, color:S.terra, fontWeight:800, textTransform:"uppercase", letterSpacing:1, marginBottom:3 }}>The Cherished Fourth<br/>Daughter of</div>
              <div style={{ fontSize:11, color:"#666", lineHeight:1.6 }}>Donald F Sitompul<br/>& Adelina L Turangan</div>
            </div>
            <div style={{ position:"relative", height:160 }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to left, transparent 70%, rgba(245,239,224,0.6))", zIndex:1 }} />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=top" alt="bride" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }} />
            </div>
          </div>
          <div style={{ textAlign:"center", marginTop:18 }}>
            <div style={{ display:"inline-block", border:`3px solid ${S.terra}`, borderRadius:4, padding:"4px 12px", opacity:0.6, transform:"rotate(-5deg)", fontFamily:"serif", color:S.terra, fontSize:10, letterSpacing:1, textTransform:"uppercase" }}>Ticket to Happily Ever After</div>
          </div>
        </div>
      </AnimSection>

      {/* ── 4. YOU'RE INVITED ── */}
      <AnimSection direction="fade">
        <div style={{ background:S.terra, padding:"32px 24px", textAlign:"center" }}>
          <div style={{ fontSize:10, letterSpacing:6, color:"rgba(255,255,255,0.65)", textTransform:"uppercase" }}>You're</div>
          <div style={{ fontSize:38, fontWeight:900, color:"#fff", letterSpacing:5, fontFamily:"Georgia,serif" }}>INVITED</div>
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:12, margin:"10px 0" }}>
            <i className="fas fa-plane" style={{ color:"#fff", fontSize:22, transform:"rotate(45deg)" }} />
            <CompassRose size={44} color="rgba(255,255,255,0.7)" />
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, marginTop:12 }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:30, fontWeight:900, color:"#fff", fontFamily:"serif" }}>KR</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.65)", letterSpacing:1 }}>KEVIN REYAN</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <div style={{ width:36, height:36, border:"2px solid rgba(255,255,255,0.4)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="fas fa-ring" style={{ color:S.gold, fontSize:14 }} />
              </div>
              <div style={{ fontSize:7, color:"rgba(255,255,255,0.45)", letterSpacing:1, textTransform:"uppercase" }}>We're getting married</div>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:30, fontWeight:900, color:"#fff", fontFamily:"serif" }}>YT</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.65)", letterSpacing:1 }}>YOAN TIFFANY</div>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* ── 5. EVENT DETAILS ── */}
      <AnimSection direction="up">
        <div style={{ background:S.warmWhite, padding:"0 16px 24px" }}>
          <div style={{ background:"#fff", borderRadius:"0 0 14px 14px", boxShadow:"0 6px 24px rgba(0,0,0,0.08)", overflow:"hidden" }}>
            <div style={{ padding:"20px 18px" }}>
              {/* FIX: event date row — use flexbox with equal flex children for center alignment on mobile */}
              <div style={{ display:"flex", gap:8, marginBottom:18, justifyContent:"space-between" }}>
                <div style={{ flex:1, textAlign:"center" }}>
                  <div style={{ fontSize:9, color:"#aaa", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Event Date</div>
                  <div style={{ fontWeight:900, fontSize:20, color:S.terra, lineHeight:1 }}>1 NOV</div>
                  <div style={{ fontWeight:700, fontSize:12, color:S.text }}>2025</div>
                </div>
                <div style={{ width:1, background:`rgba(139,58,31,0.15)`, margin:"4px 0" }} />
                <div style={{ flex:1, textAlign:"center" }}>
                  <div style={{ fontSize:9, color:"#aaa", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Holy Matrimony</div>
                  <div style={{ fontWeight:900, fontSize:20, color:S.terra }}>{COUPLE.holy}</div>
                </div>
                <div style={{ width:1, background:`rgba(139,58,31,0.15)`, margin:"4px 0" }} />
                <div style={{ flex:1, textAlign:"center" }}>
                  <div style={{ fontSize:9, color:"#aaa", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Reception</div>
                  <div style={{ fontWeight:900, fontSize:20, color:S.terra }}>{COUPLE.reception}</div>
                  <div style={{ marginTop:4, display:"flex", justifyContent:"center" }}>
                    <div style={{ border:`2px solid ${S.terra}`, borderRadius:4, padding:"2px 6px", opacity:0.6, transform:"rotate(-8deg)", fontSize:8, letterSpacing:0.5, color:S.terra, fontFamily:"serif", whiteSpace:"nowrap" }}>Ticket to HEA</div>
                  </div>
                </div>
              </div>

              {/* Destination */}
              <div style={{ background:S.cream, borderRadius:10, padding:12, marginBottom:14 }}>
                <div style={{ fontSize:9, color:"#aaa", textTransform:"uppercase", letterSpacing:1, marginBottom:2 }}>Destination</div>
                <div style={{ fontWeight:900, fontSize:20, color:S.terra, letterSpacing:2 }}>BALENUSA</div>
                <div style={{ fontSize:11, color:"#666", marginTop:4, lineHeight:1.6 }}>{COUPLE.address}</div>
              </div>
              {/* Dress Code */}
              <div style={{ borderTop:`2px dashed rgba(139,58,31,0.2)`, paddingTop:14, display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ display:"flex", gap:6, flexShrink:0, paddingTop:2 }}>
                  <i className="fas fa-shirt" style={{ color:S.terra, fontSize:16 }} />
                  <i className="fas fa-person-dress" style={{ color:S.terra, fontSize:16 }} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:S.terra, fontSize:11, letterSpacing:1, textTransform:"uppercase", marginBottom:3 }}>Dress Code</div>
                  <div style={{ fontWeight:800, color:S.text, fontSize:13 }}>Earth Tone Colors</div>
                  <div style={{ fontSize:12, color:"#666" }}>Strictly no Black, White, or Batik.</div>
                  <div style={{ fontSize:11, color:"#888", fontStyle:"italic" }}>Let your outfit reflect the warmth of nature</div>
                </div>
                <div style={{ transform:"rotate(-10deg)", flexShrink:0 }}>
                  <div style={{ border:`2px solid ${S.terra}`, borderRadius:4, padding:"4px 8px", opacity:0.55, textAlign:"center" }}>
                    <div style={{ fontSize:7, color:S.terra, fontWeight:700, letterSpacing:0.5 }}>ADMITTED</div>
                    <div style={{ fontSize:7, color:S.terra }}>DRESS CODE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* ── 6. RUNDOWN ── */}
      <AnimSection direction="right">
        <div style={{ background:S.terra, padding:"36px 24px" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:9, letterSpacing:5, color:"rgba(255,255,255,0.65)", textTransform:"uppercase" }}>Event</div>
            <div style={{ fontSize:28, fontWeight:900, color:"#fff", letterSpacing:5, fontFamily:"Georgia,serif" }}>RUNDOWN</div>
            <div style={{ display:"flex", justifyContent:"center", marginTop:10 }}>
              <i className="fas fa-plane" style={{ color:"#fff", fontSize:22, transform:"rotate(45deg)" }} />
            </div>
          </div>
          <div style={{ position:"relative", maxWidth:340, margin:"0 auto" }}>
            <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:2, background:"rgba(255,255,255,0.2)", transform:"translateX(-50%)" }} />
            {RUNDOWN.map((r,i)=>(
              <div key={r.time} style={{ display:"flex", alignItems:"center", marginBottom:28, position:"relative" }}>
                {i%2===0 ? (
                  <>
                    <div style={{ flex:1, textAlign:"right", paddingRight:18 }}>
                      <div style={{ fontSize:22, fontWeight:900, color:"#fff" }}>{r.time}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.65)", textTransform:"uppercase", letterSpacing:0.5 }}>{r.label}</div>
                    </div>
                    <div style={{ width:12, height:12, borderRadius:"50%", background:S.gold, flexShrink:0, zIndex:1 }} />
                    <div style={{ flex:1, paddingLeft:18 }}>
                      <i className={`fas ${r.icon}`} style={{ color:"rgba(255,255,255,0.55)", fontSize:22 }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ flex:1, textAlign:"right", paddingRight:18 }}>
                      <i className={`fas ${r.icon}`} style={{ color:"rgba(255,255,255,0.55)", fontSize:22 }} />
                    </div>
                    <div style={{ width:12, height:12, borderRadius:"50%", background:S.gold, flexShrink:0, zIndex:1 }} />
                    <div style={{ flex:1, paddingLeft:18 }}>
                      <div style={{ fontSize:22, fontWeight:900, color:"#fff" }}>{r.time}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.65)", textTransform:"uppercase", letterSpacing:0.5 }}>{r.label}</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </AnimSection>

      {/* ── 7. GALLERY ── */}
      <AnimSection direction="up" delay={100}>
        <div style={{ background:S.warmWhite, padding:"32px 24px" }}>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <h2 style={{ fontFamily:"Georgia,serif", color:S.terra, fontSize:22, margin:0, fontStyle:"italic" }}>Our Gallery</h2>
            <div style={{ height:2, width:50, background:S.gold, margin:"8px auto 0" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:4, borderRadius:12, overflow:"hidden" }}>
            {GALLERY.map((src,i)=>(
              <div key={i} style={{ aspectRatio:"1", overflow:"hidden" }}>
                <img src={src} alt={`gallery ${i+1}`} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .35s" }}
                  onMouseOver={e=>e.currentTarget.style.transform="scale(1.1)"}
                  onMouseOut={e=>e.currentTarget.style.transform="scale(1)"} />
              </div>
            ))}
          </div>
        </div>
      </AnimSection>

      {/* ── 8. MAP ── */}
      <AnimSection direction="left" delay={50}>
        <div style={{ background:"#fff", padding:"32px 24px" }}>
          <div style={{ textAlign:"center", marginBottom:16 }}>
            <div style={{ fontSize:10, color:S.gold, letterSpacing:4, textTransform:"uppercase", fontWeight:700, marginBottom:4 }}>Find Us</div>
            <h2 style={{ fontFamily:"Georgia,serif", color:S.terra, fontSize:20, margin:0, fontStyle:"italic" }}>{COUPLE.venue}</h2>
            <div style={{ height:2, width:50, background:S.gold, margin:"8px auto 0" }} />
          </div>
          <div style={{ position:"relative", borderRadius:12, overflow:"hidden", marginBottom:14, height:200 }}>
            <div style={{ position:"absolute", top:10, left:10, zIndex:10, background:"rgba(255,255,255,0.9)", borderRadius:"50%", padding:4 }}>
              <CompassRose size={32} color={S.terra} />
            </div>
            <iframe
              title="map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=106.787%2C-6.251%2C106.807%2C-6.238&layer=mapnik&marker=-6.2445%2C106.797"
              style={{ width:"100%", height:"100%", border:"none" }}
            />
          </div>
          <div style={{ fontSize:12, color:"#666", textAlign:"center", lineHeight:1.7, marginBottom:16 }}>{COUPLE.address}</div>
          <div style={{ textAlign:"center", marginBottom:12 }}>
            <div style={{ display:"inline-block", border:`3px solid ${S.terra}`, borderRadius:4, padding:"4px 12px", opacity:0.6, transform:"rotate(-5deg)", fontFamily:"serif", color:S.terra, fontSize:10, letterSpacing:1, textTransform:"uppercase" }}>Ticket to Happily Ever After</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <a href={COUPLE.mapsUrl} target="_blank" rel="noreferrer" style={{ display:"inline-block", background:S.terra, color:"#fff", textDecoration:"none", borderRadius:30, padding:"12px 28px", fontWeight:700, fontSize:14, letterSpacing:0.5 }}>
              <i className="fas fa-map-marker-alt" style={{ marginRight:8 }} />Petunjuk Ke Lokasi
            </a>
          </div>
        </div>
      </AnimSection>

      {/* ── 9. GIFT & TRANSFER ── */}
      <AnimSection direction="right" delay={50}>
        <div style={{ background:S.cream, padding:"32px 24px", textAlign:"center" }}>
          <div style={{ textAlign:"center", marginBottom:16 }}>
            <div style={{ fontSize:10, color:S.gold, letterSpacing:4, textTransform:"uppercase", fontWeight:700, marginBottom:4 }}>Wedding</div>
            <h2 style={{ fontFamily:"Georgia,serif", color:S.terra, fontSize:20, margin:0 }}>Gift & Transfer</h2>
            <div style={{ height:2, width:50, background:S.gold, margin:"8px auto 16px" }} />
          </div>
          <p style={{ color:"#666", fontSize:13, marginBottom:20, lineHeight:1.8 }}>
            Doa restu Anda adalah hadiah terbesar bagi kami.<br/>
            Namun jika Anda ingin memberikan hadiah, berikut pilihannya:
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setShowGift(true)} style={{ background:S.terra, color:"#fff", border:"none", borderRadius:30, padding:"12px 24px", cursor:"pointer", fontWeight:700, fontSize:14, display:"flex", alignItems:"center", gap:8 }}>
              <i className="fas fa-university" /> Transfer Bank
            </button>
            <button onClick={()=>setShowGift(true)} style={{ background:S.gold, color:"#fff", border:"none", borderRadius:30, padding:"12px 24px", cursor:"pointer", fontWeight:700, fontSize:14, display:"flex", alignItems:"center", gap:8 }}>
              <i className="fas fa-gift" /> Kirim Kado
            </button>
          </div>
        </div>
      </AnimSection>

      {/* ── 10. RSVP ── */}
      <AnimSection direction="up" delay={80}>
        <div style={{ background:S.terra, padding:"48px 24px", textAlign:"center" }}>
          <div style={{ fontSize:64, fontWeight:900, color:"#fff", lineHeight:0.9, fontFamily:"Georgia,serif", letterSpacing:14 }}>
            RS<br/>VP
          </div>
          <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13, margin:"14px 0", letterSpacing:1 }}>
            Kindly Respond by <strong style={{ color:"#fff" }}>{COUPLE.rsvpDeadline}</strong>
          </div>
          <button onClick={()=>setShowRSVP(true)} style={{ background:"#fff", color:S.terra, border:"none", borderRadius:30, padding:"14px 40px", fontWeight:800, fontSize:15, cursor:"pointer", letterSpacing:2, boxShadow:"0 4px 20px rgba(0,0,0,0.2)" }}>
            CLICK HERE
          </button>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13, marginTop:20, lineHeight:1.7 }}>
            Can't wait to share this wonderful day with you!
          </div>
          <div style={{ marginTop:24, borderRadius:12, overflow:"hidden", maxWidth:320, margin:"24px auto 0" }}>
            <img src={GALLERY[2]} alt="closing" style={{ width:"100%", height:200, objectFit:"cover" }} />
          </div>
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:10, marginTop:14 }}>
            Music: The Moment - Wedding Instrumental (No copyright music)
          </div>
        </div>
      </AnimSection>

      {/* Footer */}
      <div style={{ background:S.text, padding:"20px 24px", textAlign:"center" }}>
        <div style={{ fontSize:22, fontWeight:900, color:S.gold, fontFamily:"serif", letterSpacing:6 }}>KR ♥ YT</div>
        <div style={{ color:"rgba(100, 91, 91, 0.35)", fontSize:11, marginTop:6 }}>1 November 2025 · Jakarta, Indonesia</div>
      </div>
    </div>
  );

  // ── Single persistent audio element, survives cover -> invitation transition ──
  return (
    <>
      <audio ref={audioRef} src={COUPLE.music} loop preload="auto" />
      {opened ? fullView : coverView}
    </>
  );
}
