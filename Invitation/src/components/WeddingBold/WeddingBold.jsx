import { useState, useEffect, useRef } from "react";

/* ─── Media ──────────────────────────────────────────────────────────── */
const BRIDE_IMG   = "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80";
const GROOM_IMG   = "https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=600&q=80";
const COUPLE_IMG  = "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80";
const GALLERY = [
  "https://images.unsplash.com/photo-1529636444744-adffc9135a5e?w=600&q=70",
  "https://images.unsplash.com/photo-1583939411023-14783179e581?w=600&q=70",
  "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=70",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=70",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=70",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=70",
];
const VIDEO_THUMB = "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=70";

/* Google Maps link for Patra Semarang Hotel */
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Patra+Semarang+Hotel+Convention+Semarang";

/* ─── Tokens ─────────────────────────────────────────────────────────── */
const C = {
  gold: "#c9a84c", goldLt: "#f5d98a", goldDim: "rgba(201,168,76,.38)",
  red: "#5a0a0a", redMid: "#7a1212",
  w: "#fff", wD: "rgba(255,255,255,.68)", wDD: "rgba(255,255,255,.32)",
  dark: "rgba(0,0,0,.26)",
};
const F = {
  cinzel: "'Cinzel Decorative','Cinzel',serif",
  cormorant: "'Cormorant Garamond',serif",
  vibes: "'Great Vibes',cursive",
};

/* ─── Global CSS ─────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Great+Vibes&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
textarea,button,input{font-family:inherit}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
@keyframes pulse{0%,100%{opacity:.65}50%{opacity:1}}
@keyframes coverExit{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(1.04)}}
@keyframes borderPulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0)}50%{box-shadow:0 0 18px 4px rgba(201,168,76,.28)}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

.c1{animation:fadeUp .75s ease both;animation-delay:.05s}
.c2{animation:fadeUp .75s ease both;animation-delay:.28s}
.c3{animation:fadeUp .75s ease both;animation-delay:.52s}
.c4{animation:fadeUp .75s ease both;animation-delay:.76s}
.c5{animation:fadeUp .75s ease both;animation-delay:1s}

.float{animation:floatY 4s ease-in-out infinite}
.pulse{animation:pulse 2.8s ease-in-out infinite}
.exit{animation:coverExit .46s ease forwards}
.bpulse{animation:borderPulse 2.6s ease-in-out infinite}

.shimmer{
  background:linear-gradient(90deg,#c9a84c 0%,#f5d98a 38%,#fffbe0 50%,#f5d98a 62%,#c9a84c 100%);
  background-size:400px 100%;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
  animation:shimmer 3.2s linear infinite;
}

.reveal{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease}
.reveal.in{opacity:1;transform:translateY(0)}
.d1{transition-delay:.08s}.d2{transition-delay:.18s}.d3{transition-delay:.28s}.d4{transition-delay:.38s}

.card{transition:transform .3s ease,box-shadow .3s ease}
.card:hover{transform:translateY(-5px);box-shadow:0 14px 44px rgba(0,0,0,.55),0 0 18px rgba(201,168,76,.18)}

.gimg{overflow:hidden;cursor:pointer}
.gimg img{transition:transform .42s ease;display:block}
.gimg:hover img{transform:scale(1.09)}

.btn{transition:background .25s,color .25s,transform .15s,box-shadow .25s;cursor:pointer}
.btn:hover{transform:translateY(-1px);box-shadow:0 4px 18px rgba(201,168,76,.3)}
.btn:active{transform:translateY(0)}

nav::-webkit-scrollbar{display:none}
nav{-ms-overflow-style:none;scrollbar-width:none}
.nav-btn{transition:color .18s,background .18s}
.nav-btn:hover{color:#c9a84c !important;background:rgba(201,168,76,.07) !important}

textarea:focus{outline:none;border-color:#c9a84c !important}
textarea::placeholder{color:rgba(255,255,255,.28);font-style:italic}
`;

function Styles() {
  useEffect(() => {
    const id = "wd-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id; el.textContent = CSS;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
  return null;
}

/* ─── Scroll reveal ──────────────────────────────────────────────────── */
function useReveal() {
  const r = useRef(null);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); ob.disconnect(); } }, { threshold: 0.1 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return r;
}

/* ─── Countdown ──────────────────────────────────────────────────────── */
function useCountdown(target) {
  const calc = () => {
    const d = new Date(target) - Date.now();
    if (d <= 0) return { days:0,hours:0,minutes:0,seconds:0 };
    return { days:Math.floor(d/86400000), hours:Math.floor(d%86400000/3600000), minutes:Math.floor(d%3600000/60000), seconds:Math.floor(d%60000/1000) };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

/* ─── SVG ornaments ──────────────────────────────────────────────────── */
const GoldDivider = () => (
  <svg viewBox="0 0 320 22" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:280,margin:"6px auto 0",display:"block"}}>
    <line x1="0" y1="11" x2="116" y2="11" stroke={C.gold} strokeWidth=".8"/>
    {[124,132,140,148,156,164,172,180,188,196].map((x,i,a) => (
      <line key={i} x1={x} y1={i%2===0?3:19} x2={a[i+1]??x+8} y2={i%2===0?19:3} stroke={C.gold} strokeWidth=".8"/>
    ))}
    <circle cx="160" cy="11" r="3.2" fill="none" stroke={C.gold} strokeWidth="1"/>
    <circle cx="160" cy="11" r="1.3" fill={C.gold} opacity=".85"/>
    <line x1="204" y1="11" x2="320" y2="11" stroke={C.gold} strokeWidth=".8"/>
  </svg>
);

const Corner = ({ flip }) => (
  <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"
    style={{width:52,height:52,position:"absolute",opacity:.82,
      ...(flip?{right:0,bottom:0,transform:"rotate(180deg)"}:{left:0,top:0})}}>
    <path d="M4,4 L4,56 Q4,66 14,66 L66,66" fill="none" stroke={C.gold} strokeWidth="1.1"/>
    <rect x="1.5" y="1.5" width="7" height="7" fill={C.gold} opacity=".5" rx=".8"/>
    <circle cx="66" cy="66" r="3" fill={C.gold} opacity=".5"/>
    <path d="M16,4 L16,16 Q16,26 26,26 L66,26" fill="none" stroke={C.gold} strokeWidth=".6" opacity=".4"/>
  </svg>
);

/* ─── Floral blobs ───────────────────────────────────────────────────── */
const Floral = ({ pos }) => {
  const base = { position:"absolute", width:108, height:108, pointerEvents:"none", zIndex:10 };
  const at = pos==="tr" ? {top:-10,right:-10} : {bottom:-10,left:-10,transform:"rotate(180deg)"};
  return (
    <div style={{...base,...at}}>
      <div style={{width:"100%",height:"100%",borderRadius:"55% 45% 42% 50%",filter:"blur(1.5px)",opacity:.88,
        background:`radial-gradient(ellipse at 55% 35%,rgba(232,160,32,.9) 0%,transparent 44%),
          radial-gradient(ellipse at 24% 66%,rgba(192,57,43,.8) 0%,transparent 40%),
          radial-gradient(ellipse at 76% 68%,rgba(39,160,80,.75) 0%,transparent 40%),
          radial-gradient(ellipse at 44% 18%,rgba(255,210,80,.55) 0%,transparent 34%)`}}/>
    </div>
  );
};

/* ─── Background ─────────────────────────────────────────────────────── */
const Bg = () => (
  <div style={{position:"fixed",inset:0,zIndex:0,background:"radial-gradient(ellipse at 18% 12%,#7a1212 0%,#5a0a0a 42%,#380606 100%)"}}>
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.065}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="btk" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <circle cx="24" cy="24" r="9.5" fill="none" stroke="#ffd700" strokeWidth=".7"/>
          <circle cx="24" cy="24" r="3.8" fill="none" stroke="#ffd700" strokeWidth=".55"/>
          <circle cx="24" cy="24" r="1.2" fill="#ffd700" opacity=".7"/>
          <path d="M0,24 Q12,12 24,24 Q36,36 48,24" fill="none" stroke="#ffd700" strokeWidth=".45"/>
          <path d="M24,0 Q36,12 24,24 Q12,36 24,48" fill="none" stroke="#ffd700" strokeWidth=".45"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#btk)"/>
    </svg>
  </div>
);

/* ─── Helpers ────────────────────────────────────────────────────────── */
const Sep = () => <div style={{height:1,background:`linear-gradient(90deg,transparent,${C.goldDim},transparent)`,margin:"0 20px"}}/>;

/* ══════════════════════════════════════════════════════════════════════
   COVER
══════════════════════════════════════════════════════════════════════ */
function Cover({ onOpen }) {
  const [out, setOut] = useState(false);
  const go = () => { setOut(true); setTimeout(onOpen, 460); };

  return (
    <section className={out ? "exit" : ""}
      style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",
        justifyContent:"center",position:"relative",padding:"48px 22px",textAlign:"center",overflow:"hidden"}}>
      <Floral pos="tr"/>
      <Floral pos="bl"/>

      {/* Label */}
      <p className="c1 pulse" style={{fontFamily:F.cinzel,letterSpacing:5,fontSize:8.5,color:C.gold,textTransform:"uppercase",marginBottom:26}}>
        Undangan Pernikahan
      </p>

      {/* Frame */}
      <div className="c2 bpulse" style={{border:`1px solid ${C.gold}`,padding:"40px 28px",maxWidth:288,width:"100%",
        position:"relative",background:"rgba(0,0,0,.2)",backdropFilter:"blur(7px)"}}>
        <Corner/><Corner flip/>

        {/* diamond side bars */}
        {["left","right"].map(s => (
          <div key={s} style={{position:"absolute",[s]:-15,top:"50%",transform:"translateY(-50%)",
            display:"flex",flexDirection:"column",gap:8}}>
            {[...Array(5)].map((_,i) => (
              <div key={i} style={{width:10,height:10,
                background:`linear-gradient(135deg,${C.gold},${C.goldLt})`,
                clipPath:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                opacity:i===2?1:.55,transform:i===2?"scale(1.25)":"scale(1)"}}/>
            ))}
          </div>
        ))}

        <div style={{height:1,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,marginBottom:26}}/>

        {/* Monogram */}
        <div className="float">
          <p style={{fontFamily:F.vibes,fontSize:76,color:C.w,lineHeight:1}}>DA</p>
        </div>

        <div style={{height:1,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,margin:"20px 0"}}/>

        <p className="shimmer" style={{fontFamily:F.vibes,fontSize:26,display:"block"}}>Ardiani Safitri</p>
        <p style={{fontFamily:F.cinzel,fontSize:8,color:C.gold,letterSpacing:5,marginTop:8}}>SEMARANG</p>
      </div>

      {/* Date strip */}
      <div className="c3" style={{marginTop:22,display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:30,height:1,background:C.goldDim}}/>
        <p style={{fontFamily:F.cinzel,fontSize:9,color:C.wD,letterSpacing:3}}>3 JULI 2026</p>
        <div style={{width:30,height:1,background:C.goldDim}}/>
      </div>

      {/* CTA */}
      <button className="c4 btn" onClick={go} style={{
        marginTop:28,padding:"13px 42px",background:"transparent",border:`1.5px solid ${C.gold}`,
        color:C.w,fontFamily:F.cinzel,fontSize:9,letterSpacing:4,borderRadius:2,textTransform:"uppercase"
      }}
        onMouseEnter={e=>{e.currentTarget.style.background=C.gold;e.currentTarget.style.color=C.red}}
        onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.w}}
      >Buka Undangan</button>

      {/* Quote */}
      <p className="c5" style={{marginTop:26,fontFamily:F.cormorant,fontStyle:"italic",
        fontSize:13.5,color:C.wDD,maxWidth:230,lineHeight:1.75}}>
        "Dua jiwa, satu takdir, selamanya."
      </p>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   COUPLE
══════════════════════════════════════════════════════════════════════ */
function CoupleSection() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section style={{padding:"64px 24px",textAlign:"center",position:"relative"}}>
      <div ref={r1} className="reveal">
        <p style={{fontFamily:F.cinzel,letterSpacing:5,fontSize:8.5,color:C.gold,textTransform:"uppercase",marginBottom:8}}>
          Undangan Pernikahan
        </p>
        <GoldDivider/>
      </div>

      <div ref={r2} className="reveal" style={{marginTop:30}}>
        <div className="card" style={{margin:"0 auto",width:"83%",maxWidth:285,
          border:`2px solid ${C.gold}`,position:"relative",boxShadow:`0 12px 50px rgba(0,0,0,.55)`}}>
          <img src={COUPLE_IMG} alt="couple"
            style={{width:"100%",display:"block",aspectRatio:"3/4",objectFit:"cover"}}/>
          <div style={{position:"absolute",inset:0,
            background:"linear-gradient(to bottom,transparent 44%,rgba(44,4,4,.92))",
            display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"22px 18px",textAlign:"center"}}>
            <p style={{fontFamily:F.vibes,fontSize:40,color:C.w,lineHeight:1}}>Dita</p>
            <p style={{fontFamily:F.cinzel,fontSize:11,color:C.gold,letterSpacing:4,margin:"4px 0"}}>&amp;</p>
            <p style={{fontFamily:F.vibes,fontSize:40,color:C.w,lineHeight:1}}>Amin</p>
          </div>
          {/* corner ticks */}
          {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((s,i)=>(
            <div key={i} style={{position:"absolute",...s,width:18,height:18,
              borderTop:i<2?`2px solid ${C.goldLt}`:"none",
              borderBottom:i>=2?`2px solid ${C.goldLt}`:"none",
              borderLeft:i%2===0?`2px solid ${C.goldLt}`:"none",
              borderRight:i%2===1?`2px solid ${C.goldLt}`:"none"}}/>
          ))}
        </div>

        <p style={{fontFamily:F.cormorant,fontStyle:"italic",color:C.wDD,
          fontSize:11,letterSpacing:4,textTransform:"uppercase",marginTop:22}}>
          Geser ke Bawah ↓
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   BRIDE & GROOM
══════════════════════════════════════════════════════════════════════ */
function BrideGroomSection() {
  const hdr = useReveal();
  const PersonCard = ({ img, role, name, parents, city, side, delay }) => {
    const r = useReveal();
    return (
      <div ref={r} className={`reveal card d${delay}`} style={{
        flex:1,minWidth:0,border:`1px solid ${C.goldDim}`,
        padding:"18px 13px",background:C.dark,backdropFilter:"blur(5px)",position:"relative"}}>
        <p style={{textAlign:"center",fontFamily:F.cinzel,fontSize:7,letterSpacing:3,color:C.gold,textTransform:"uppercase",marginBottom:13}}>
          {role}
        </p>
        <div style={{position:"relative",marginBottom:14}}>
          <img src={img} alt={name}
            style={{width:"100%",aspectRatio:"3/4",objectFit:"cover",display:"block",border:`1px solid ${C.goldDim}`}}/>
          <div style={{position:"absolute",[side==="left"?"left":"right"]:-7,top:"8%",width:5,height:"84%",
            background:`repeating-linear-gradient(180deg,${C.gold} 0px,${C.gold} 3px,transparent 3px,transparent 8px)`,
            opacity:.6}}/>
        </div>
        <p style={{fontFamily:F.vibes,fontSize:20,color:C.w,textAlign:"center",lineHeight:1.25,marginBottom:7}}>
          {name}
        </p>
        <p style={{fontFamily:F.cormorant,fontSize:10.5,color:C.wD,textAlign:"center",lineHeight:1.8}}>
          Putr{role.includes("Wanita")?"i":"a"} Tercinta dari<br/>
          <span style={{color:C.w,fontWeight:600}}>{parents}</span>
        </p>
        <p style={{fontFamily:F.cormorant,fontStyle:"italic",fontSize:10,color:C.gold,textAlign:"center",marginTop:8}}>
          ✦ {city}
        </p>
      </div>
    );
  };

  return (
    <section style={{padding:"60px 20px",position:"relative"}}>
      <div ref={hdr} className="reveal">
        <p style={{textAlign:"center",fontFamily:F.cinzel,letterSpacing:5,fontSize:8.5,color:C.gold,textTransform:"uppercase",marginBottom:8}}>
          Mempelai
        </p>
        <GoldDivider/>
      </div>
      <div style={{display:"flex",gap:13,marginTop:28}}>
        <PersonCard img={BRIDE_IMG} role="Mempelai Wanita" name="Pramarta Andita"
          parents="Sutono & Dewi Santika" city="Tembalang, Semarang" side="left" delay={1}/>
        <PersonCard img={GROOM_IMG} role="Mempelai Pria" name="Aminudin Syahputra"
          parents="Bambang Susilo & Wulan Sidji" city="Wonokromo, Surabaya" side="right" delay={2}/>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   GALLERY
══════════════════════════════════════════════════════════════════════ */
function GallerySection() {
  const hdr = useReveal(), body = useReveal();
  const [playing, setPlaying] = useState(false);
  const [light, setLight] = useState(null); // lightbox index

  return (
    <section style={{padding:"60px 20px",position:"relative"}}>
      <div ref={hdr} className="reveal">
        <p style={{fontFamily:F.cinzel,letterSpacing:5,fontSize:8.5,color:C.gold,textTransform:"uppercase",marginBottom:8,textAlign:"center"}}>Galeri</p>
        <GoldDivider/>
      </div>

      <div ref={body} className="reveal" style={{marginTop:24}}>
        {/* Video */}
        <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setPlaying(!playing)}>
          <img src={VIDEO_THUMB} alt="video"
            style={{width:"100%",display:"block",aspectRatio:"16/9",objectFit:"cover",border:`1px solid ${C.goldDim}`}}/>
          {!playing && (
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.36)"}}>
              <div style={{width:58,height:58,borderRadius:"50%",background:"rgba(201,168,76,.9)",
                display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(0,0,0,.4)"}}>
                <div style={{width:0,height:0,borderTop:"10px solid transparent",borderBottom:"10px solid transparent",
                  borderLeft:`18px solid ${C.red}`,marginLeft:5}}/>
              </div>
            </div>
          )}
          <div style={{position:"absolute",bottom:9,right:11,fontFamily:F.cinzel,fontSize:8.5,color:C.gold,letterSpacing:3}}>
            VIDEO
          </div>
        </div>

        {/* Grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginTop:4}}>
          {GALLERY.map((src,i)=>(
            <div key={i} className="gimg" style={{border:`1px solid ${C.goldDim}`}}
              onClick={()=>setLight(i)}>
              <img src={src} alt="" style={{width:"100%",aspectRatio:"1",objectFit:"cover"}}/>
            </div>
          ))}
        </div>

        <p style={{textAlign:"center",fontFamily:F.cormorant,fontStyle:"italic",
          color:C.wDD,fontSize:13.5,marginTop:22,lineHeight:1.85,padding:"0 10px"}}>
          "A successful marriage requires falling in love many times,<br/>always with the same person."
        </p>
      </div>

      {/* Lightbox */}
      {light !== null && (
        <div onClick={()=>setLight(null)} style={{
          position:"fixed",inset:0,zIndex:999,background:"rgba(0,0,0,.88)",
          display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"fadeIn .2s ease"}}>
          <img src={GALLERY[light]} alt="" style={{maxWidth:"100%",maxHeight:"90vh",objectFit:"contain",border:`1px solid ${C.goldDim}`}}/>
          <button onClick={()=>setLight(null)} style={{position:"fixed",top:18,right:18,
            background:"rgba(201,168,76,.18)",border:`1px solid ${C.goldDim}`,color:C.gold,
            width:38,height:38,borderRadius:"50%",fontSize:18,cursor:"pointer",fontFamily:F.cinzel}}>✕</button>
          {light > 0 && <button onClick={e=>{e.stopPropagation();setLight(light-1)}} style={{
            position:"fixed",left:12,top:"50%",transform:"translateY(-50%)",
            background:"rgba(201,168,76,.18)",border:`1px solid ${C.goldDim}`,color:C.gold,
            width:38,height:38,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>‹</button>}
          {light < GALLERY.length-1 && <button onClick={e=>{e.stopPropagation();setLight(light+1)}} style={{
            position:"fixed",right:12,top:"50%",transform:"translateY(-50%)",
            background:"rgba(201,168,76,.18)",border:`1px solid ${C.goldDim}`,color:C.gold,
            width:38,height:38,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>›</button>}
        </div>
      )}
    </section>
  );
}

/* ── EventCard & TimeBox — defined OUTSIDE EventSection so they are
   stable component identities and their useReveal hooks never reset
   when the countdown state updates every second.                      */
const TimeBox = ({ n, label }) => (
  <div style={{textAlign:"center",flex:1}}>
    <div style={{fontFamily:F.cinzel,fontSize:32,fontWeight:600,color:C.w,lineHeight:1}}>
      {String(n).padStart(2,"0")}
    </div>
    <div style={{fontFamily:F.cormorant,fontSize:9,color:C.wDD,letterSpacing:2.5,marginTop:3,textTransform:"uppercase"}}>
      {label}
    </div>
  </div>
);

function EventCard({ title, date, time, venue, addr, mapsUrl, delay }) {
  const r = useReveal();
  return (
    <div ref={r} className={`reveal d${delay}`} style={{
      border:`1px solid ${C.goldDim}`,padding:"26px 20px",marginTop:18,
      position:"relative",background:C.dark,backdropFilter:"blur(5px)"}}>
      <Corner/><Corner flip/>
      <h3 style={{fontFamily:F.cinzel,fontSize:14,color:C.w,textAlign:"center",marginBottom:14,letterSpacing:2}}>
        {title}
      </h3>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${C.goldDim},transparent)`,marginBottom:14}}/>
      <p style={{fontFamily:F.cormorant,textAlign:"center",color:C.wD,fontSize:14.5,marginBottom:3}}>{date}</p>
      <p style={{fontFamily:F.cinzel,textAlign:"center",color:C.gold,fontSize:10,letterSpacing:2,marginBottom:14}}>{time}</p>
      <p style={{fontFamily:F.cormorant,textAlign:"center",color:C.w,fontSize:14,fontWeight:600,marginBottom:4}}>{venue}</p>
      <p style={{fontFamily:F.cormorant,textAlign:"center",color:C.wDD,fontSize:12.5,lineHeight:1.7}}>{addr}</p>
      <div style={{display:"flex",flexDirection:"column",gap:9,marginTop:18}}>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{
          display:"flex",alignItems:"center",justifyContent:"center",gap:7,
          padding:"12px",background:"rgba(201,168,76,.13)",border:`1px solid ${C.gold}`,
          color:C.gold,fontFamily:F.cinzel,fontSize:8.5,letterSpacing:2.5,
          textDecoration:"none",borderRadius:2,textTransform:"uppercase"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          Buka Google Maps
        </a>
        <button className="btn" style={{
          padding:"12px",background:"transparent",border:`1px solid ${C.wDD}`,
          color:C.wD,fontFamily:F.cinzel,fontSize:8.5,letterSpacing:2.5,borderRadius:2,textTransform:"uppercase"}}>
          Anda Diundang di Sini
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   EVENT
══════════════════════════════════════════════════════════════════════ */
function EventSection() {
  const cd = useCountdown("2026-07-03T08:00:00");
  const hdr = useReveal(), cdRef = useReveal();

  return (
    <section style={{padding:"60px 20px",position:"relative"}}>
      <div ref={hdr} className="reveal">
        <p style={{textAlign:"center",fontFamily:F.cinzel,letterSpacing:5,fontSize:8.5,color:C.gold,textTransform:"uppercase",marginBottom:8}}>
          Detail Acara
        </p>
        <GoldDivider/>
      </div>

      {/* Countdown */}
      <div ref={cdRef} className="reveal" style={{
        display:"flex",alignItems:"center",gap:6,justifyContent:"center",marginTop:28,
        border:`1px solid ${C.goldDim}`,padding:"20px 12px",background:"rgba(0,0,0,.2)"}}>
        <TimeBox n={cd.days}    label="Hari"/>
        <div style={{fontFamily:F.cinzel,fontSize:28,color:C.gold,marginBottom:8}}>:</div>
        <TimeBox n={cd.hours}   label="Jam"/>
        <div style={{fontFamily:F.cinzel,fontSize:28,color:C.gold,marginBottom:8}}>:</div>
        <TimeBox n={cd.minutes} label="Menit"/>
        <div style={{fontFamily:F.cinzel,fontSize:28,color:C.gold,marginBottom:8}}>:</div>
        <TimeBox n={cd.seconds} label="Detik"/>
      </div>

      <EventCard title="AKAD NIKAH" date="Jumat, 3 Juli 2026" time="08:00 – 09:00 WIB"
        venue="Patra Semarang Hotel & Convention"
        addr="Jl. Sisingamangaraja No.132, Wonotingal, Candisari, Semarang"
        mapsUrl={MAPS_URL} delay={1}/>
      <EventCard title="RESEPSI PERNIKAHAN" date="Jumat, 3 Juli 2026" time="10:00 – 11:00 WIB"
        venue="Patra Semarang Hotel & Convention"
        addr="Jl. Sisingamangaraja No.132, Wonotingal, Candisari, Semarang"
        mapsUrl={MAPS_URL} delay={2}/>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   GIFT
══════════════════════════════════════════════════════════════════════ */
function GiftSection() {
  const hdr = useReveal();
  const [bankOpen, setBankOpen] = useState(true);
  const [gifOpen,  setGifOpen]  = useState(false);
  const [copied, setCopied]     = useState(null);

  const copy = (val, k) => {
    navigator.clipboard?.writeText(val).then(() => {
      setCopied(k); setTimeout(() => setCopied(null), 2200);
    });
  };

  const Acc = ({ label, open, toggle, children }) => (
    <div style={{border:`1px solid ${C.goldDim}`,marginBottom:9,background:"rgba(0,0,0,.2)"}}>
      <button onClick={toggle} style={{
        width:"100%",padding:"15px 18px",display:"flex",justifyContent:"space-between",
        alignItems:"center",background:"transparent",border:"none",cursor:"pointer"}}>
        <span style={{fontFamily:F.cinzel,fontSize:8.5,letterSpacing:3,color:C.gold,textTransform:"uppercase"}}>{label}</span>
        <span style={{color:C.gold,fontFamily:F.cinzel,fontSize:13}}>{open?"∧":"∨"}</span>
      </button>
      {open && <div style={{padding:"0 18px 20px"}}>{children}</div>}
    </div>
  );

  const BCard = ({ bank, acct, name, color, k }) => (
    <div style={{background:"#fff",borderRadius:6,padding:"16px 18px",marginBottom:10,boxShadow:"0 2px 12px rgba(0,0,0,.15)"}}>
      <p style={{fontFamily:F.cinzel,fontWeight:700,color,fontSize:12.5,marginBottom:7}}>{bank}</p>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:F.cormorant,fontSize:17,fontWeight:600,color:"#222",letterSpacing:.8}}>{acct}</span>
        <button onClick={()=>copy(acct,k)} className="btn" style={{
          background:"none",border:"none",cursor:"pointer",fontSize:20,
          color:copied===k?"#27ae60":"#aaa",transition:"color .2s",padding:"4px 6px"}}>
          {copied===k?"✓":"⎘"}
        </button>
      </div>
      <p style={{fontFamily:F.cormorant,fontSize:12,color:"#999",marginTop:3}}>{name}</p>
    </div>
  );

  return (
    <section style={{padding:"60px 20px",position:"relative"}}>
      <div ref={hdr} className="reveal">
        <p style={{textAlign:"center",fontFamily:F.cinzel,letterSpacing:3,fontSize:8.5,color:C.gold,textTransform:"uppercase",marginBottom:4}}>
          Pernikahan
        </p>
        <p style={{fontFamily:F.vibes,textAlign:"center",fontSize:44,color:C.w,marginBottom:4}}>Tanda Kasih</p>
        <p style={{fontFamily:F.cormorant,fontStyle:"italic",textAlign:"center",color:C.wD,fontSize:13.5,
          lineHeight:1.85,maxWidth:280,margin:"0 auto 26px"}}>
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
        </p>
      </div>

      <Acc label="Transfer Rekening" open={bankOpen} toggle={()=>setBankOpen(!bankOpen)}>
        <BCard bank="BCA" acct="98122XXXX" name="Pramarta Andita"    color="#005baa" k="bca"/>
        <BCard bank="Mandiri" acct="75021XXXX" name="Aminudin Syahputra" color="#e07b00" k="mandiri"/>
        <button className="btn" style={{
          width:"100%",padding:"12px",background:"transparent",border:`1px solid ${C.wDD}`,
          color:C.wD,fontFamily:F.cinzel,fontSize:8.5,cursor:"pointer",letterSpacing:2,borderRadius:2,marginTop:4}}>
          Konfirmasi Transfer
        </button>
      </Acc>

      <Acc label="Kirim Kado" open={gifOpen} toggle={()=>setGifOpen(!gifOpen)}>
        <p style={{fontFamily:F.cormorant,color:C.wD,fontSize:14,lineHeight:1.9}}>
          Silakan hubungi kami untuk alamat pengiriman:<br/>
          <span style={{color:C.gold,fontWeight:600}}>+62 812-XXXX-XXXX</span>
        </p>
      </Acc>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   RSVP
══════════════════════════════════════════════════════════════════════ */
/* ── helpers ── */
function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (s < 60)  return "Baru saja";
  if (s < 3600) return Math.floor(s/60) + " menit lalu";
  if (s < 86400) return Math.floor(s/3600) + " jam lalu";
  return Math.floor(s/86400) + " hari lalu";
}

// function RSVPSection() {
//   const r1 = useReveal(), r2 = useReveal();

//   /* ── form state ── */
//   const [rsvpName, setRsvpName] = useState("");
//   const [pax,      setPax]      = useState("1");
//   const [rsvpDone, setRsvpDone] = useState(null); // "hadir"|"tidak"

//   const [wishName, setWishName] = useState("");
//   const [wish,     setWish]     = useState("");
//   const [sending,  setSending]  = useState(false);
//   const [sent,     setSent]     = useState(false);

//   /* ── persistent data ── */
//   const [rsvpList, setRsvpList] = useState([]);   // [{name,pax,status,ts}]
//   const [wishes,   setWishes]   = useState([]);   // [{name,text,ts}]
//   const [loading,  setLoading]  = useState(true);

//   /* load on mount */
//   useEffect(() => {
//     (async () => {
//       try {
//         const [wr, rr] = await Promise.all([
//           window.storage.get("wedding:wishes", true),
//           window.storage.get("wedding:rsvp",   true),
//         ]);
//         if (wr) setWishes(JSON.parse(wr.value));
//         if (rr) setRsvpList(JSON.parse(rr.value));
//       } catch(_) {}
//       setLoading(false);
//     })();
//   }, []);

//   /* submit RSVP */
//   const submitRsvp = async (status) => {
//     if (!rsvpName.trim()) { alert("Mohon isi nama Anda terlebih dahulu."); return; }
//     const entry = { name: rsvpName.trim(), pax, status, ts: new Date().toISOString() };
//     const next = [entry, ...rsvpList];
//     setRsvpList(next);
//     setRsvpDone(status);
//     try { await window.storage.set("wedding:rsvp", JSON.stringify(next), true); } catch(_) {}
//   };

//   /* submit wish */
//   const submitWish = async () => {
//     if (!wish.trim()) return;
//     setSending(true);
//     const entry = { name: wishName.trim() || "Tamu", text: wish.trim(), ts: new Date().toISOString() };
//     const next = [entry, ...wishes];
//     try {
//       await window.storage.set("wedding:wishes", JSON.stringify(next), true);
//       setWishes(next);
//       setSent(true); setWish(""); setWishName("");
//       setTimeout(() => setSent(false), 3000);
//     } catch(_) { alert("Gagal menyimpan ucapan, coba lagi."); }
//     setSending(false);
//   };

//   /* summary counts */
//   const totalHadir = rsvpList.filter(r=>r.status==="hadir").reduce((s,r)=>s+parseInt(r.pax)||1,0);
//   const totalTidak = rsvpList.filter(r=>r.status==="tidak").length;

//   const inp = {
//     background:"rgba(0,0,0,.3)", border:`1px solid ${C.goldDim}`,
//     color:C.w, fontFamily:F.cormorant, fontSize:14, padding:"12px 14px",
//     borderRadius:2, width:"100%", outline:"none", transition:"border-color .2s",
//   };
//   const inpRed = { ...inp, background:"rgba(90,10,10,.07)", border:"1px solid rgba(90,10,10,.25)", color:"#3a0505" };

//   return (
//     <section style={{padding:"60px 20px 90px",position:"relative"}}>

//       {/* ── RSVP card ── */}
//       <div ref={r1} className="reveal">
//         <div style={{background:"#f0e7c4",borderRadius:4,padding:"34px 24px",
//           textAlign:"center",marginBottom:28,position:"relative",overflow:"hidden"}}>
//           <Floral pos="tr"/>

//           <p style={{fontFamily:F.cinzel,letterSpacing:4,fontSize:7.5,color:"#7a4a4a",marginBottom:6,textTransform:"uppercase"}}>
//             Konfirmasi
//           </p>
//           <p style={{fontFamily:F.vibes,fontSize:46,color:C.red,marginBottom:8}}>Kehadiran</p>
//           <p style={{fontFamily:F.cormorant,fontStyle:"italic",fontSize:13.5,color:"#7a4a4a",marginBottom:20,lineHeight:1.85}}>
//             Mohon konfirmasikan kehadiran Anda<br/>sebelum tanggal 3 Juli 2026
//           </p>

//           {!rsvpDone ? (<>
//             <input value={rsvpName} onChange={e=>setRsvpName(e.target.value)}
//               placeholder="Nama Anda" style={{...inpRed,marginBottom:10}}/>

//             <div style={{display:"flex",gap:8,marginBottom:14}}>
//               {["1","2","3","4+"].map(v=>(
//                 <button key={v} onClick={()=>setPax(v)} style={{
//                   flex:1,padding:"10px 4px",
//                   background:pax===v?C.red:"transparent",
//                   color:pax===v?C.w:C.red,
//                   border:`1.5px solid ${pax===v?C.red:"rgba(90,10,10,.35)"}`,
//                   cursor:"pointer",fontFamily:F.cinzel,fontSize:10,borderRadius:2,transition:"all .2s"}}>
//                   {v} org
//                 </button>
//               ))}
//             </div>

//             <button onClick={()=>submitRsvp("hadir")} style={{
//               display:"block",width:"100%",padding:"13px",
//               background:"#2c1a1a",color:C.w,border:"none",cursor:"pointer",
//               fontFamily:F.cinzel,fontSize:9,letterSpacing:3,marginBottom:10,borderRadius:2,
//               textTransform:"uppercase",transition:"background .25s"}}
//               onMouseEnter={e=>e.currentTarget.style.background=C.red}
//               onMouseLeave={e=>e.currentTarget.style.background="#2c1a1a"}>
//               Saya Akan Hadir
//             </button>
//             <button onClick={()=>submitRsvp("tidak")} style={{
//               display:"block",width:"100%",padding:"13px",
//               background:"transparent",color:C.red,
//               border:`1.5px solid ${C.red}`,cursor:"pointer",
//               fontFamily:F.cinzel,fontSize:9,letterSpacing:3,borderRadius:2,textTransform:"uppercase"}}>
//               Tidak Bisa Hadir
//             </button>
//           </>) : (
//             <div style={{padding:"16px 0"}}>
//               <p style={{fontSize:32,marginBottom:8}}>{rsvpDone==="hadir"?"🎉":"🙏"}</p>
//               <p style={{fontFamily:F.cormorant,fontStyle:"italic",fontSize:15,color:C.red,lineHeight:1.8}}>
//                 {rsvpDone==="hadir"
//                   ? `Terima kasih, ${rsvpName}!\nKami menantikan kehadiran Anda.`
//                   : `Terima kasih, ${rsvpName}.\nDoa Anda sangat berarti bagi kami.`}
//               </p>
//             </div>
//           )}

//           {/* live counter */}
//           {!loading && rsvpList.length > 0 && (
//             <div style={{marginTop:18,paddingTop:14,borderTop:"1px solid rgba(90,10,10,.15)",
//               display:"flex",justifyContent:"center",gap:24}}>
//               <div style={{textAlign:"center"}}>
//                 <p style={{fontFamily:F.cinzel,fontSize:22,color:C.red,lineHeight:1}}>{totalHadir}</p>
//                 <p style={{fontFamily:F.cormorant,fontSize:11,color:"#7a4a4a",marginTop:2}}>Tamu Hadir</p>
//               </div>
//               <div style={{width:1,background:"rgba(90,10,10,.2)"}}/>
//               <div style={{textAlign:"center"}}>
//                 <p style={{fontFamily:F.cinzel,fontSize:22,color:"#999",lineHeight:1}}>{totalTidak}</p>
//                 <p style={{fontFamily:F.cormorant,fontSize:11,color:"#7a4a4a",marginTop:2}}>Tidak Hadir</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Wishes ── */}
//       <div ref={r2} className="reveal">
//         <p style={{textAlign:"center",fontFamily:F.cinzel,letterSpacing:4,fontSize:8.5,
//           color:C.gold,textTransform:"uppercase",marginBottom:16}}>
//           Kirim Ucapan & Doa
//         </p>

//         <input value={wishName} onChange={e=>setWishName(e.target.value)}
//           placeholder="Nama Anda" style={{...inp,marginBottom:9}}
//           onFocus={e=>e.target.style.borderColor=C.gold}
//           onBlur={e=>e.target.style.borderColor=C.goldDim}/>

//         <textarea value={wish} onChange={e=>setWish(e.target.value)} rows={4}
//           placeholder="Tuliskan doa dan ucapan terbaik Anda untuk kedua mempelai…"
//           style={{...inp,resize:"vertical",lineHeight:1.8,marginBottom:9}}
//           onFocus={e=>e.target.style.borderColor=C.gold}
//           onBlur={e=>e.target.style.borderColor=C.goldDim}/>

//         <button className="btn" onClick={submitWish} disabled={sending} style={{
//           width:"100%",padding:"13px",
//           background:sent?"rgba(39,174,96,.15)":"transparent",
//           border:`1px solid ${sent?"#27ae60":C.gold}`,
//           color:sent?"#5cb85c":C.w,
//           fontFamily:F.cinzel,fontSize:9,letterSpacing:3,borderRadius:2,
//           textTransform:"uppercase",transition:"all .3s",
//           opacity:sending?.6:1,cursor:sending?"not-allowed":"pointer"}}>
//           {sending?"Menyimpan…":sent?"Terkirim ✓":"Kirim Ucapan"}
//         </button>

//         {/* Wish feed */}
//         <div style={{marginTop:26}}>
//           <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
//             <p style={{fontFamily:F.cinzel,fontSize:8,letterSpacing:3,color:C.goldDim,textTransform:"uppercase"}}>
//               Ucapan Tamu
//             </p>
//             {!loading && (
//               <p style={{fontFamily:F.cormorant,fontSize:12,color:C.wDD}}>
//                 {wishes.length} ucapan
//               </p>
//             )}
//           </div>

//           {loading && (
//             <p style={{fontFamily:F.cormorant,fontStyle:"italic",color:C.wDD,fontSize:13,textAlign:"center",padding:"20px 0"}}>
//               Memuat ucapan…
//             </p>
//           )}

//           {!loading && wishes.length === 0 && (
//             <p style={{fontFamily:F.cormorant,fontStyle:"italic",color:C.wDD,fontSize:13,textAlign:"center",padding:"20px 0"}}>
//               Jadilah yang pertama memberikan ucapan ✨
//             </p>
//           )}

//           {wishes.map((w,i) => (
//             <div key={i} style={{border:`1px solid ${C.goldDim}`,padding:"14px 16px",marginBottom:9,
//               background:"rgba(0,0,0,.18)",borderRadius:2,
//               animation:i===0?"fadeIn .4s ease":undefined}}>
//               <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
//                 <span style={{fontFamily:F.cinzel,fontSize:9,color:C.gold,letterSpacing:1}}>{w.name}</span>
//                 <span style={{fontFamily:F.cormorant,fontSize:11,color:C.wDD,whiteSpace:"nowrap",marginLeft:8}}>
//                   {timeAgo(w.ts)}
//                 </span>
//               </div>
//               <p style={{fontFamily:F.cormorant,fontSize:13.5,color:C.wD,lineHeight:1.75,fontStyle:"italic"}}>
//                 {w.text}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/* ══════════════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════════════ */
export default function WeddingBold() {
  const [opened, setOpened] = useState(false);
  const nav = ["Mempelai","Galeri","Acara","Hadiah","RSVP"];
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <>
      <Styles/>
      <Bg/>
      <div style={{maxWidth:430,margin:"0 auto",position:"relative",zIndex:1,
        fontFamily:F.cormorant,color:C.w,minHeight:"100vh"}}>
        {!opened ? (
          <Cover onOpen={()=>setOpened(true)}/>
        ) : (
          <>
            <nav style={{position:"sticky",top:0,zIndex:100,
              background:"rgba(40,4,4,.93)",backdropFilter:"blur(12px)",
              borderBottom:`1px solid ${C.goldDim}`,
              display:"flex",justifyContent:"center",gap:0,overflowX:"auto",
              animation:"fadeIn .45s ease both"}}>
              {nav.map(n=>(
                <button key={n} className="nav-btn" onClick={()=>scrollTo(n.toLowerCase())} style={{
                  padding:"11px 13px",background:"none",border:"none",cursor:"pointer",
                  color:C.wDD,fontFamily:F.cinzel,fontSize:7.5,letterSpacing:2.5,
                  textTransform:"uppercase",whiteSpace:"nowrap"}}>
                  {n}
                </button>
              ))}
            </nav>

            <div id="mempelai"><CoupleSection/></div>
            <Sep/>
            <BrideGroomSection/>
            <Sep/>
            <div id="galeri"><GallerySection/></div>
            <Sep/>
            <div id="acara"><EventSection/></div>
            <Sep/>
            <div id="hadiah"><GiftSection/></div>
            <Sep/>
            {/* <div id="rsvp"><RSVPSection/></div> */}

            <div style={{textAlign:"center",padding:"26px 20px",borderTop:`1px solid ${C.goldDim}`}}>
              <p style={{fontFamily:F.vibes,fontSize:30,color:C.gold,marginBottom:6}}>Dita & Amin</p>
              <p style={{fontFamily:F.cinzel,fontSize:7.5,color:C.wDD,letterSpacing:3}}>3 JULI 2026 · SEMARANG</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
